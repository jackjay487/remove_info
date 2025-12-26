# 贡献指南

感谢您对阅后即焚项目的关注！我们欢迎各种形式的贡献，包括但不限于代码贡献、文档改进、问题报告和功能建议。

## 开发环境设置

### 前置要求
- Node.js 18.x 或更高版本
- npm 8.x 或更高版本
- Git

### 本地开发设置

1. **克隆仓库**
   ```bash
   git clone https://github.com/your-username/remove_info.git
   cd remove_info
   ```

2. **安装依赖**
   ```bash
   # 安装根目录依赖
   npm install
   
   # 安装后端依赖
   cd backend
   npm install
   
   # 安装前端依赖
   cd ../frontend
   npm install
   ```

3. **环境配置**
   ```bash
   # 复制环境变量文件
   cp .env.example .env
   
   # 根据需要修改环境变量
   ```

4. **启动开发服务器**
   ```bash
   # 启动后端服务器（端口3000）
   cd backend
   npm run dev
   
   # 启动前端开发服务器（端口5173）
   cd ../frontend
   npm run dev
   ```

## 贡献流程

### 1. 创建分支

请从 `main` 分支创建一个新的功能分支：

```bash
git checkout -b feature/your-feature-name
```

分支命名规范：
- `feature/` - 新功能
- `fix/` - 错误修复
- `docs/` - 文档更新
- `refactor/` - 代码重构

### 2. 开发与测试

- 确保代码符合项目编码规范
- 添加或更新相关测试
- 运行现有测试确保没有破坏现有功能
- 测试您的修改

### 3. 提交代码

使用描述性的提交信息：

```bash
git add .
git commit -m "feat: 添加内容加密功能"
git commit -m "fix: 修复销毁计时器问题"
git commit -m "docs: 更新API文档"
```

提交信息格式：
- `feat:` - 新功能
- `fix:` - 错误修复
- `docs:` - 文档更新
- `style:` - 代码格式调整
- `refactor:` - 代码重构
- `test:` - 测试相关
- `chore:` - 构建过程或辅助工具变动

### 4. 推送分支

```bash
git push origin feature/your-feature-name
```

### 5. 创建Pull Request

1. 在GitHub上创建Pull Request
2. 提供清晰的描述说明您的修改
3. 关联相关Issue（如果有）
4. 等待代码审查

## 代码规范

### JavaScript/Node.js
- 使用ES6+语法
- 使用2个空格缩进
- 使用单引号
- 添加必要的注释
- 遵循Airbnb JavaScript风格指南

### HTML/CSS
- 语义化HTML标签
- 使用BEM命名规范
- 响应式设计
- 移动端优先

### 项目结构
```
├── backend/          # 后端代码
│   ├── models/       # 数据模型
│   ├── routes/       # API路由
│   └── middleware/   # 中间件
├── frontend/         # 前端代码
│   ├── src/          # 源码目录
│   └── dist/         # 构建输出
├── shared/           # 共享代码
└── docs/            # 项目文档
```

## 报告问题

如果您发现bug或有功能建议，请创建Issue：

1. 检查是否已有相关Issue
2. 提供清晰的描述
3. 包含复现步骤
4. 提供环境信息（操作系统、浏览器版本等）
5. 添加截图或日志（如果适用）

## 功能开发指南

### 后端开发
- 遵循RESTful API设计原则
- 添加输入验证和错误处理
- 编写单元测试
- 更新API文档

### 前端开发
- 确保响应式设计
- 优化性能
- 添加必要的用户反馈
- 测试跨浏览器兼容性

### 安全性
- 不要硬编码敏感信息
- 验证所有用户输入
- 使用HTTPS
- 遵循安全最佳实践

## 测试

运行测试套件：

```bash
# 运行所有测试
npm test

# 运行后端测试
cd backend
npm test

# 运行前端测试
cd ../frontend
npm test
```

## 构建与部署

### 开发构建
```bash
npm run build:dev
```

### 生产构建
```bash
npm run build:prod
```

### 部署
参考 [DEPLOYMENT.md](./DEPLOYMENT.md) 文件了解详细部署说明。

## 沟通渠道

- GitHub Issues: 问题报告和功能讨论
- Pull Requests: 代码贡献
- 项目文档: 技术细节和使用说明

## 行为准则

我们致力于为所有贡献者创造一个友好、尊重的环境。请：
- 使用包容性语言
- 尊重不同的观点和经验
- 建设性地接受批评
- 专注于对社区最有利的事情

## 许可证

通过向本项目贡献代码，您同意您的贡献将根据项目的MIT许可证进行授权。

---

感谢您的贡献！让我们一起打造更好的阅后即焚应用。