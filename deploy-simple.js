const fs = require('fs');
const path = require('path');

// 创建简化的生产版本
function createSimpleDeployment() {
  console.log('开始创建简化部署版本...');
  
  // 创建部署目录
  const deployDir = path.join(__dirname, 'deploy');
  if (!fs.existsSync(deployDir)) {
    fs.mkdirSync(deployDir, { recursive: true });
  }
  
  // 复制前端文件
  const frontendFiles = ['index.html', 'view.html'];
  frontendFiles.forEach(file => {
    const source = path.join(__dirname, 'frontend', file);
    const dest = path.join(deployDir, file);
    
    if (fs.existsSync(source)) {
      fs.copyFileSync(source, dest);
      console.log(`✓ 复制 ${file}`);
    }
  });
  
  // 复制后端文件
  const backendFiles = ['server.js', 'package.json', 'package-lock.json'];
  backendFiles.forEach(file => {
    const source = path.join(__dirname, 'backend', file);
    const dest = path.join(deployDir, file);
    
    if (fs.existsSync(source)) {
      fs.copyFileSync(source, dest);
      console.log(`✓ 复制 ${file}`);
    }
  });
  
  // 复制模型和路由文件
  const modelsDir = path.join(deployDir, 'models');
  const routesDir = path.join(deployDir, 'routes');
  
  if (!fs.existsSync(modelsDir)) {
    fs.mkdirSync(modelsDir, { recursive: true });
  }
  if (!fs.existsSync(routesDir)) {
    fs.mkdirSync(routesDir, { recursive: true });
  }
  
  fs.copyFileSync(
    path.join(__dirname, 'backend', 'models', 'database.js'),
    path.join(modelsDir, 'database.js')
  );
  
  fs.copyFileSync(
    path.join(__dirname, 'backend', 'routes', 'content.js'),
    path.join(routesDir, 'content.js')
  );
  
  // 创建简化的package.json
  const packageJson = {
    name: "burn-after-reading-simple",
    version: "1.0.0",
    description: "阅后即焚应用 - 简化部署版本",
    main: "server.js",
    scripts: {
      "start": "node server.js",
      "dev": "node server.js"
    },
    dependencies: {
      "express": "^4.18.2",
      "cors": "^2.8.5",
      "body-parser": "^1.20.2"
    }
  };
  
  fs.writeFileSync(
    path.join(deployDir, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  );
  
  // 创建启动脚本
  const startScript = `#!/bin/bash
cd /tmp
npm install
node server.js
`;
  
  fs.writeFileSync(path.join(deployDir, 'start.sh'), startScript);
  
  console.log('✓ 简化部署版本创建完成');
  console.log('部署目录: ' + deployDir);
  console.log('\n部署说明:');
  console.log('1. 将 deploy 目录上传到腾讯云服务器');
  console.log('2. 进入 deploy 目录');
  console.log('3. 运行: npm install');
  console.log('4. 运行: npm start');
}

createSimpleDeployment();