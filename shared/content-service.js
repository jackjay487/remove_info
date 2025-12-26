// 共享的内容服务逻辑
// 可以在H5和小程序中复用

class ContentService {
    constructor(baseUrl = '/api') {
        this.baseUrl = baseUrl;
    }

    // 创建新内容
    async createContent(content, expiresIn = 86400) {
        try {
            const response = await fetch(`${this.baseUrl}/content`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: content,
                    expiresIn: expiresIn
                })
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || '创建失败');
            }

            return data;
        } catch (error) {
            console.error('创建内容失败:', error);
            throw error;
        }
    }

    // 获取内容
    async getContent(contentId) {
        try {
            const response = await fetch(`${this.baseUrl}/content/${contentId}`);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || '获取内容失败');
            }

            return data;
        } catch (error) {
            console.error('获取内容失败:', error);
            throw error;
        }
    }

    // 销毁内容
    async destroyContent(contentId) {
        try {
            const response = await fetch(`${this.baseUrl}/content/${contentId}/destroy`, {
                method: 'POST'
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || '销毁失败');
            }

            return data;
        } catch (error) {
            console.error('销毁内容失败:', error);
            throw error;
        }
    }

    // 检查内容状态
    async getContentStatus(contentId) {
        try {
            const response = await fetch(`${this.baseUrl}/content/${contentId}/status`);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || '检查状态失败');
            }

            return data;
        } catch (error) {
            console.error('检查内容状态失败:', error);
            throw error;
        }
    }

    // 生成分享链接
    generateShareUrl(contentId, baseUrl = window.location.origin) {
        return `${baseUrl}/view.html?id=${contentId}`;
    }

    // 验证内容格式
    validateContent(content) {
        if (!content || content.trim().length === 0) {
            return { valid: false, error: '内容不能为空' };
        }

        if (content.length > 10000) {
            return { valid: false, error: '内容长度不能超过10000个字符' };
        }

        return { valid: true };
    }

    // 格式化时间显示
    formatTimeLeft(seconds) {
        if (seconds <= 0) return '已过期';
        
        if (seconds < 60) {
            return `${seconds}秒`;
        } else if (seconds < 3600) {
            return `${Math.floor(seconds / 60)}分钟`;
        } else {
            return `${Math.floor(seconds / 3600)}小时`;
        }
    }
}

// 导出单例实例
export const contentService = new ContentService();

// 导出类供其他环境使用
export default ContentService;