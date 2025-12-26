import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(process.cwd(), '../data');
const contentsFile = path.join(dataDir, 'contents.json');
const accessLogsFile = path.join(dataDir, 'access_logs.json');

// 确保数据目录存在
function ensureDataDirectory() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// 初始化数据库文件
export async function initDatabase() {
  ensureDataDirectory();
  
  // 创建空的JSON文件
  if (!fs.existsSync(contentsFile)) {
    fs.writeFileSync(contentsFile, JSON.stringify([]));
  }
  
  if (!fs.existsSync(accessLogsFile)) {
    fs.writeFileSync(accessLogsFile, JSON.stringify([]));
  }
  
  console.log('✅ Database initialized successfully');
}

// 读取内容数据
export function readContents() {
  ensureDataDirectory();
  if (!fs.existsSync(contentsFile)) {
    return [];
  }
  const data = fs.readFileSync(contentsFile, 'utf8');
  return JSON.parse(data);
}

// 写入内容数据
export function writeContents(contents) {
  ensureDataDirectory();
  fs.writeFileSync(contentsFile, JSON.stringify(contents, null, 2));
}

// 读取访问记录
export function readAccessLogs() {
  ensureDataDirectory();
  if (!fs.existsSync(accessLogsFile)) {
    return [];
  }
  const data = fs.readFileSync(accessLogsFile, 'utf8');
  return JSON.parse(data);
}

// 写入访问记录
export function writeAccessLogs(logs) {
  ensureDataDirectory();
  fs.writeFileSync(accessLogsFile, JSON.stringify(logs, null, 2));
}

// 数据库操作工具函数
export async function dbRun(sql, params = []) {
  // 简化实现，返回模拟结果
  return { id: Date.now(), changes: 1 };
}

export async function dbGet(sql, params = []) {
  // 简化实现，返回空结果
  return null;
}

export async function dbAll(sql, params = []) {
  // 简化实现，返回空数组
  return [];
}