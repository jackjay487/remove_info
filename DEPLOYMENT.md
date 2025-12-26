# 🔥 阅后即焚应用 - 部署指南

## 环境要求

### 服务器要求
- **操作系统**: Linux (Ubuntu 20.04+ / CentOS 7+)
- **Node.js**: 18.x 或更高版本
- **内存**: 至少 512MB RAM
- **存储**: 至少 1GB 可用空间
- **网络**: 支持 HTTPS 的域名

### 软件依赖
- Node.js 18.x+
- npm 8.x+
- PM2 (推荐用于生产环境)
- Nginx (推荐用于反向代理)

## 快速部署

### 1. 服务器准备

```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装 Node.js (使用 NodeSource 仓库)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 验证安装
node --version
npm --version
```

### 2. 上传项目文件

将项目文件上传到服务器，例如 `/opt/burn-after-reading` 目录：

```bash
# 创建项目目录
sudo mkdir -p /opt/burn-after-reading
sudo chown $USER:$USER /opt/burn-after-reading

# 上传项目文件到此目录
```

### 3. 安装依赖

```bash
# 进入项目目录
cd /opt/burn-after-reading

# 安装根目录依赖
npm install

# 安装后端依赖
cd backend && npm install && cd ..

# 安装前端依赖
cd frontend && npm install && cd ..
```

### 4. 配置环境变量

```bash
# 复制环境变量示例文件
cp .env.example .env

# 编辑生产环境配置
nano .env
```

修改 `.env` 文件：

```env
NODE_ENV=production
PORT=3000
DATA_DIR=./data

# 重要：生产环境必须修改以下密钥
SESSION_SECRET=your-unique-session-secret-change-this
ENCRYPTION_KEY=your-unique-encryption-key-change-this

# 配置允许的域名
ALLOWED_ORIGINS=https://your-domain.com

LOG_LEVEL=info
```

### 5. 构建生产版本

```bash
# 构建前端
npm run build:frontend

# 构建后端
npm run build:backend
```

### 6. 使用 PM2 启动应用（推荐）

```bash
# 全局安装 PM2
sudo npm install -g pm2

# 使用 PM2 启动应用
npm run pm2:start

# 查看应用状态
npm run pm2:status

# 查看日志
npm run pm2:logs
```

### 7. 配置 PM2 开机自启

```bash
# 生成启动脚本
pm2 startup

# 保存当前进程列表
pm2 save
```

## Nginx 反向代理配置

### 1. 安装 Nginx

```bash
# Ubuntu/Debian
sudo apt install nginx -y

# CentOS/RHEL
sudo yum install nginx -y
```

### 2. 创建 Nginx 配置文件

创建 `/etc/nginx/sites-available/burn-after-reading`：

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    
    # 重定向 HTTP 到 HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com www.your-domain.com;
    
    # SSL 证书配置
    ssl_certificate /path/to/your/certificate.crt;
    ssl_certificate_key /path/to/your/private.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384;
    
    # 安全头
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    
    # 静态文件缓存
    location /assets/ {
        alias /opt/burn-after-reading/frontend/dist/assets/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # API 代理
    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # SPA 路由处理
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 3. 启用站点并重启 Nginx

```bash
# 启用站点 (Ubuntu/Debian)
sudo ln -s /etc/nginx/sites-available/burn-after-reading /etc/nginx/sites-enabled/

# 测试配置
sudo nginx -t

# 重启 Nginx
sudo systemctl restart nginx
```

## SSL 证书配置

### 使用 Let's Encrypt (Certbot)

```bash
# 安装 Certbot
sudo apt install certbot python3-certbot-nginx -y

# 获取 SSL 证书
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# 设置自动续期
sudo crontab -e
# 添加：0 12 * * * /usr/bin/certbot renew --quiet
```

## 防火墙配置

```bash
# 启用防火墙
sudo ufw enable

# 允许 SSH
sudo ufw allow ssh

# 允许 HTTP/HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# 查看状态
sudo ufw status
```

## 监控和维护

### 1. 应用监控

```bash
# 查看应用状态
npm run pm2:status

# 查看实时日志
npm run pm2:logs

# 监控资源使用
pm2 monit
```

### 2. 日志管理

```bash
# 查看应用日志
tail -f /opt/burn-after-reading/logs/combined.log

# 日志轮转配置 (如果需要)
sudo nano /etc/logrotate.d/burn-after-reading
```

### 3. 备份策略

```bash
# 备份数据库文件
cp -r /opt/burn-after-reading/data /backup/location/

# 创建备份脚本
nano /opt/burn-after-reading/scripts/backup.sh
```

## 故障排除

### 常见问题

1. **应用无法启动**
   ```bash
   # 检查端口占用
   netstat -tulpn | grep :3000
   
   # 检查环境变量
   echo $NODE_ENV
   
   # 查看详细错误
   npm run pm2:logs
   ```

2. **静态资源无法加载**
   - 检查 Nginx 配置中的静态文件路径
   - 确认前端构建文件存在

3. **API 请求失败**
   - 检查 CORS 配置
   - 验证环境变量中的域名配置

### 性能优化

1. **启用 Gzip 压缩**
   ```nginx
   gzip on;
   gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
   ```

2. **调整 PM2 配置**
   ```javascript
   // 在 ecosystem.config.js 中调整
   max_memory_restart: '1G',
   instances: 2, // 根据 CPU 核心数调整
   ```

## 更新部署

当需要更新应用时：

```bash
# 停止应用
npm run pm2:stop

# 备份当前版本
cp -r /opt/burn-after-reading /opt/burn-after-reading-backup-$(date +%Y%m%d)

# 更新代码
# (上传新版本文件)

# 安装新依赖
npm install
cd backend && npm install && cd ..
cd frontend && npm install && cd ..

# 构建新版本
npm run build

# 启动应用
npm run pm2:start

# 验证部署
curl -I https://your-domain.com/health
```

## 安全建议

1. **定期更新依赖**
   ```bash
   npm audit fix
   npm update
   ```

2. **监控安全漏洞**
   - 定期运行 `npm audit`
   - 关注 Node.js 安全公告

3. **文件权限设置**
   ```bash
   chmod 600 .env
   chmod 700 data/
   ```

## 支持与维护

如需技术支持，请检查：
- 应用日志：`/opt/burn-after-reading/logs/`
- PM2 状态：`pm2 status`
- 系统资源：`top`, `free -h`, `df -h`

---

**注意**: 部署前请务必备份重要数据，并在测试环境验证部署流程。