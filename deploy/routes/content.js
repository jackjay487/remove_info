import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { readContents, writeContents, readAccessLogs, writeAccessLogs, initDatabase } from '../models/database.js';

const router = express.Router();

// 创建新内容
router.post('/', async (req, res) => {
  try {
    const { content, expiresIn = 600 } = req.body; // 默认10分钟过期
    
    if (!content || content.trim().length === 0) {
      return res.status(400).json({ error: '内容不能为空' });
    }
    
    if (content.length > 10000) {
      return res.status(400).json({ error: '内容长度不能超过10000个字符' });
    }
    
    const contentId = uuidv4();
    const expiresAt = new Date(Date.now() + expiresIn * 1000);
    
    // 读取现有内容
    const contents = readContents();
    
    // 添加新内容
    const newContent = {
      id: contentId,
      content: content.trim(),
      encrypted_content: null,
      created_at: new Date().toISOString(),
      expires_at: expiresAt.toISOString(),
      is_destroyed: false,
      destroy_time: null,
      view_count: 0,
      max_views: 2  // 允许查看2次（一次预览，一次正式查看）
    };
    
    contents.push(newContent);
    writeContents(contents);
    
    res.json({
      id: contentId,
      message: '内容创建成功',
      viewUrl: `/view.html?id=${contentId}`,
      expiresAt: expiresAt.toISOString()
    });
    
  } catch (error) {
    console.error('创建内容失败:', error);
    res.status(500).json({ error: '创建内容失败' });
  }
});

// 获取内容（带销毁逻辑）
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userIp = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent');
    
    // 读取内容
    const contents = readContents();
    const content = contents.find(c => c.id === id);
    
    if (!content) {
      return res.status(404).json({ error: '内容不存在或已被销毁' });
    }
    
    // 检查是否已过期
    if (new Date(content.expires_at) < new Date()) {
      return res.status(410).json({ error: '内容已过期' });
    }
    
    // 检查是否已被销毁
    if (content.is_destroyed) {
      return res.status(410).json({ error: '内容已被销毁' });
    }
    
    // 增加查看次数
    content.view_count += 1;
    
    // 注意：这里不立即标记为销毁，由前端控制销毁时间
    // 只有在查看次数达到上限时才标记为销毁，但允许用户查看内容
    // 销毁由前端计时器控制
    if (content.view_count >= content.max_views) {
      // 不立即标记为销毁，允许用户查看内容
      // 销毁由前端计时器控制
    }
    
    writeContents(contents);
    
    // 记录访问日志
    const accessLogs = readAccessLogs();
    accessLogs.push({
      id: Date.now(),
      content_id: id,
      user_ip: userIp,
      user_agent: userAgent,
      access_time: new Date().toISOString()
    });
    writeAccessLogs(accessLogs);
    
    res.json({
      id: content.id,
      content: content.content,
      view_count: content.view_count,
      max_views: content.max_views,
      is_destroyed: content.is_destroyed,
      destroy_time: content.destroy_time,
      expires_at: content.expires_at,
      created_at: content.created_at
    });
    
  } catch (error) {
    console.error('获取内容失败:', error);
    res.status(500).json({ error: '获取内容失败' });
  }
});

// 获取内容状态
router.get('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    
    const contents = readContents();
    const content = contents.find(c => c.id === id);
    
    if (!content) {
      return res.status(404).json({ error: '内容不存在' });
    }
    
    res.json({
      id: content.id,
      view_count: content.view_count,
      max_views: content.max_views,
      is_destroyed: content.is_destroyed,
      destroy_time: content.destroy_time,
      expires_at: content.expires_at,
      created_at: content.created_at
    });
    
  } catch (error) {
    console.error('获取内容状态失败:', error);
    res.status(500).json({ error: '获取内容状态失败' });
  }
});

// 销毁内容
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const contents = readContents();
    const contentIndex = contents.findIndex(c => c.id === id);
    
    if (contentIndex === -1) {
      return res.status(404).json({ error: '内容不存在' });
    }
    
    contents[contentIndex].is_destroyed = true;
    contents[contentIndex].destroy_time = new Date().toISOString();
    
    writeContents(contents);
    
    res.json({ message: '内容已销毁' });
    
  } catch (error) {
    console.error('销毁内容失败:', error);
    res.status(500).json({ error: '销毁内容失败' });
  }
});

// POST方式销毁内容（前端调用）
router.post('/:id/destroy', async (req, res) => {
  try {
    const { id } = req.params;
    
    const contents = readContents();
    const contentIndex = contents.findIndex(c => c.id === id);
    
    if (contentIndex === -1) {
      return res.status(404).json({ error: '内容不存在' });
    }
    
    contents[contentIndex].is_destroyed = true;
    contents[contentIndex].destroy_time = new Date().toISOString();
    
    writeContents(contents);
    
    res.json({ message: '内容已销毁' });
    
  } catch (error) {
    console.error('销毁内容失败:', error);
    res.status(500).json({ error: '销毁内容失败' });
  }
});

export default router;