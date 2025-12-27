import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';

import contentRoutes from './routes/content.js';
import { initDatabase } from './models/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

// 中间件配置
app.use(helmet({
  contentSecurityPolicy: isProduction ? {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
    }
  } : false,
  crossOriginEmbedderPolicy: false
}));
app.use(compression());
app.use(cors({
  origin: isProduction ? process.env.ALLOWED_ORIGINS?.split(',') || ['https://your-domain.com'] : ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// 静态文件服务（用于生产环境）
if (isProduction) {
  app.use(express.static(path.join(__dirname)));
}

// API路由
app.use('/api/content', contentRoutes);

// 健康检查端点
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 静态文件服务（提供前端页面）
app.use(express.static(path.join(__dirname)));

// 处理/view/{id}格式的URL
app.get('/view/:id', (req, res) => {
  const contentId = req.params.id;
  // 重定向到view.html并传递id参数
  res.redirect(`/view.html?id=${contentId}`);
});

// SPA路由处理
app.get('*', (req, res) => {
  // 如果是API请求，返回404
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'Not Found' });
  }
  
  // 否则提供前端页面
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 启动服务器
async function startServer() {
  try {
    // 初始化数据库
    await initDatabase();
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();