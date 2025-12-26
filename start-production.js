#!/usr/bin/env node

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 设置生产环境变量
process.env.NODE_ENV = 'production';

// 启动后端服务器
const server = spawn('node', ['backend/server.js'], {
  cwd: __dirname,
  stdio: 'inherit',
  env: process.env
});

server.on('error', (error) => {
  console.error('启动服务器失败:', error);
  process.exit(1);
});

server.on('exit', (code) => {
  console.log(`服务器进程退出，退出码: ${code}`);
  process.exit(code);
});

// 处理退出信号
process.on('SIGINT', () => {
  console.log('收到退出信号，正在关闭服务器...');
  server.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('收到终止信号，正在关闭服务器...');
  server.kill('SIGTERM');
});