/* src/script/indexOverlayWindow.js */

// 获取元素引用
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', async () => {
        const overlayCore = document.getElementById('overlay-core');
        const trigger = {
            L : document.getElementById('window-trigger-L'),
            R : document.getElementById('window-trigger-R')
        };
        const content = {
            L : document.getElementById('overlay-window-L'),
            R : document.getElementById('overlay-window-R')
        };

    // 异步加载外部html文件
    const loadContent = async (path) => {
        try {
            const response = await fetch(path);
            if (!response.ok) throw new Error(`Failed to load ${path}`);
            return await response.text();
        } catch (error) {
            console.error(error);
            return `<p>加载内容失败: ${error.message}</p>`;
        }
    };

    // 检查元素是否存在
    if (!trigger.L || !trigger.R || !content.L || !content.R) {
        console.error('元素未找到');
        return;
    }
    });
}