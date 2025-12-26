# 🔥 阅后即焚 (Burn After Reading)

[![GitHub license](https://img.shields.io/github/license/your-username/burn-after-reading)](https://github.com/your-username/burn-after-reading/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/your-username/burn-after-reading)](https://github.com/your-username/burn-after-reading/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/your-username/burn-after-reading)](https://github.com/your-username/burn-after-reading/network)
[![GitHub issues](https://img.shields.io/github/issues/your-username/burn-after-reading)](https://github.com/your-username/burn-after-reading/issues)

一个安全、私密的消息传递应用，消息在被阅读后自动销毁，保护您的隐私安全。

## ✨ 特性

- 🔐 **安全加密** - 消息在存储时自动加密
- ⏱️ **自动销毁** - 阅读后10秒自动销毁消息
- 📱 **响应式设计** - 完美支持移动端和桌面端
- 🔄 **实时销毁** - 基于时间或阅读次数的销毁机制
- 📊 **访问日志** - 完整的消息访问记录
- 🚀 **高性能** - 基于Node.js和现代前端技术栈

## 🎯 使用场景

- 发送敏感信息（密码、密钥等）
- 临时分享重要文件
- 保护个人隐私对话
- 企业内部的敏感信息传递

## 🛠️ 技术栈

### 后端
- **Node.js** - 运行时环境
- **Express.js** - Web框架
- **JSON文件存储** - 轻量级数据存储

### 前端
- **原生HTML/CSS/JavaScript** - 无框架依赖
- **Vite** - 构建工具
- **响应式设计** - 移动端优化

### 部署
- **PM2** - 进程管理
- **Nginx** - 反向代理
- **Let's Encrypt** - SSL证书

## 🚀 快速开始

### 环境要求

- Node.js 18.x 或更高版本
- npm 8.x 或更高版本

### 本地开发

1. **克隆项目**
```bash
git clone https://github.com/your-username/burn-after-reading.git
cd burn-after-reading
```

2. **安装依赖**
```bash
# 安装根目录依赖
npm install

# 安装后端依赖
cd backend && npm install && cd ..

# 安装前端依赖
cd frontend && npm install && cd ..
```

3. **启动开发环境**
```bash
npm run dev
```

4. **访问应用**
- 前端界面: http://localhost:5174
- 后端API: http://localhost:3000

### 生产部署

详细部署指南请参考 [DEPLOYMENT.md](./DEPLOYMENT.md)

```bash
# 构建生产版本
npm run build

# 启动生产环境
npm run start:production

# 或使用PM2（推荐）
npm run pm2:start
```

## 📁 项目结构

```
burn-after-reading/
├── backend/                 # 后端代码
│   ├── models/             # 数据模型
│   ├── routes/             # API路由
│   ├── server.js           # 服务器入口
│   └── package.json        # 后端依赖
├── frontend/               # 前端代码
│   ├── index.html          # 创建页面
│   ├── view.html           # 查看页面
│   ├── vite.config.js      # Vite配置
│   └── package.json        # 前端依赖
├── shared/                 # 共享代码
├── data/                   # 数据存储目录
├── logs/                   # 日志文件目录
├── .github/                # GitHub配置
├── README.md               # 项目说明
├── DEPLOYMENT.md           # 部署指南
└── package.json            # 项目配置
```

## 🔧 API接口

### 创建消息
```http
POST /api/content
Content-Type: application/json

{
  "content": "您的私密消息",
  "expiresIn": 600
}
```

### 查看消息
```http
GET /api/content/{id}
```

### 健康检查
```http
GET /health
```

## 🔒 安全特性

- **内容加密**: 所有消息在存储时自动加密
- **单次查看**: 消息只能被查看一次
- **时间控制**: 支持自定义过期时间
- **访问日志**: 完整的访问记录和审计
- **CORS保护**: 严格的前后端分离安全策略

## 🤝 贡献指南

我们欢迎任何形式的贡献！请阅读 [CONTRIBUTING.md](./CONTRIBUTING.md) 了解如何参与项目开发。

### 开发流程

1. Fork 本项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📝 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](./LICENSE) 文件了解详情。

## 🐛 问题反馈

如果您遇到任何问题或有功能建议，请通过以下方式联系我们：

- [创建Issue](https://github.com/your-username/burn-after-reading/issues)
- 发送邮件到: your-email@example.com

## 🙏 致谢

感谢所有为本项目做出贡献的开发者！

## 📞 技术支持

- **文档**: 查看 [DEPLOYMENT.md](./DEPLOYMENT.md) 获取详细部署指南
- **问题**: 在 [Issues](https://github.com/your-username/burn-after-reading/issues) 中报告问题
- **讨论**: 加入我们的 [Discussions](https://github.com/your-username/burn-after-reading/discussions)

---

⭐ 如果这个项目对您有帮助，请给我们一个星标！