# 腾讯云部署指南

## 问题诊断

您遇到的错误 `[StaticAssetsBuilder]: Command failed with code 127` 通常表示：
- 腾讯云环境中缺少必要的构建工具
- Node.js版本不兼容
- 权限问题

## 解决方案

### 方案1：使用简化部署（推荐）

由于我们的前端是纯HTML/CSS/JS，不需要复杂的构建过程，可以使用简化部署方案：

#### 步骤1：生成简化部署包

```bash
# 在本地运行简化部署脚本
node deploy-simple.js
```

这将创建一个 `deploy` 目录，包含所有必要的文件。

#### 步骤2：上传到腾讯云

1. 将 `deploy` 目录上传到腾讯云服务器
2. 确保服务器已安装 Node.js 16+ 版本

#### 步骤3：在腾讯云服务器上部署

```bash
# 进入部署目录
cd deploy

# 安装依赖
npm install

# 启动服务
npm start
```

### 方案2：手动部署（如果方案1失败）

#### 步骤1：准备部署文件

在本地创建部署目录结构：

```
deploy/
├── server.js          # 后端服务器
├── package.json       # 依赖配置
├── models/
│   └── database.js    # 数据库模型
├── routes/
│   └── content.js     # API路由
├── index.html         # 主页面
├── view.html          # 查看页面
└── data/              # 数据目录（需要创建）
```

#### 步骤2：修改服务器配置

修改 `server.js` 中的静态文件服务路径：

```javascript
// 修改静态文件目录
app.use(express.static(__dirname));
```

#### 步骤3：上传并运行

1. 将整个 `deploy` 目录上传到腾讯云
2. 运行 `npm install && npm start`

### 方案3：使用Docker部署（高级）

创建 `Dockerfile`：

```dockerfile
FROM node:16-alpine

WORKDIR /app

# 复制部署文件
COPY deploy/ ./

# 安装依赖
RUN npm install

# 暴露端口
EXPOSE 3000

# 启动应用
CMD ["npm", "start"]
```

构建并运行：

```bash
docker build -t burn-after-reading .
docker run -p 3000:3000 burn-after-reading
```

## 腾讯云具体配置

### 1. 服务器要求
- **操作系统**: CentOS 7+ / Ubuntu 18.04+
- **Node.js**: 16.x 或更高版本
- **内存**: 至少 1GB
- **存储**: 至少 10GB

### 2. 环境检查

在腾讯云服务器上运行以下命令检查环境：

```bash
# 检查Node.js版本
node --version

# 检查npm版本
npm --version

# 检查系统信息
uname -a
```

### 3. 安装Node.js（如果需要）

```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# CentOS/RHEL
curl -fsSL https://rpm.nodesource.com/setup_16.x | sudo bash -
sudo yum install -y nodejs
```

### 4. 防火墙配置

确保腾讯云安全组开放3000端口：

```bash
# 检查防火墙状态
sudo ufw status

# 开放3000端口
sudo ufw allow 3000
sudo ufw allow 22  # SSH端口
sudo ufw enable
```

### 5. 使用PM2进行进程管理

```bash
# 安装PM2
npm install -g pm2

# 使用PM2启动应用
pm2 start server.js --name "burn-after-reading"

# 设置开机自启
pm2 startup
pm2 save
```

## 故障排除

### 错误代码127解决方案

1. **检查Node.js安装**
   ```bash
   node --version
   # 如果未安装，使用上述方法安装
   ```

2. **检查权限**
   ```bash
   # 给部署目录权限
   chmod -R 755 deploy
   ```

3. **检查路径**
   ```bash
   # 确保在正确的目录
   pwd
   ls -la
   ```

### 端口被占用

```bash
# 检查端口占用
netstat -tulpn | grep 3000

# 杀死占用进程
kill -9 <PID>
```

### 内存不足

```bash
# 检查内存使用
free -h

# 清理缓存
sync && echo 3 > /proc/sys/vm/drop_caches
```

## 监控和维护

### 日志查看

```bash
# 查看应用日志
pm2 logs burn-after-reading

# 查看系统日志
tail -f /var/log/syslog
```

### 性能监控

```bash
# 安装监控工具
npm install -g clinic

# 性能分析
clinic doctor -- node server.js
```

## 备份和恢复

### 数据备份

```bash
# 备份数据文件
cp -r data/ data_backup_$(date +%Y%m%d)

# 压缩备份
tar -czf backup_$(date +%Y%m%d).tar.gz data/
```

### 恢复数据

```bash
# 解压备份
tar -xzf backup_20231227.tar.gz

# 恢复数据
cp -r data_backup_20231227/* data/
```

## 联系方式

如果遇到问题，请：
1. 检查本指南中的故障排除部分
2. 查看项目GitHub Issues
3. 联系技术支持

---

**注意**: 部署前请确保已阅读并理解 [DEPLOYMENT.md](./DEPLOYMENT.md) 中的安全注意事项。