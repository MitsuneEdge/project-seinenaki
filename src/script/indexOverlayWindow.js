/* src/script/indexOverlayWindow.js */

// 获取元素引用
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', async () => {
        const overlay = document.getElementById('window-overlay');
        const trigger = {
            L : document.getElementById('window-trigger-L'),
            R : document.getElementById('window-trigger-R')
        };
        const content = {
            L : document.getElementById('window-content-L'),
            R : document.getElementById('window-content-R')
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
    if (!trigger.L || !trigger.R || !overlay || !content.L || !content.R) {
        console.error('元素未找到');
        return;
    }

    overlay.addEventListener('click', () => {
        overlay.classList.replace('window-visible', 'window-hidden');
    });

    content.L.addEventListener('click', (e) => {e.stopPropagation();});
    content.R.addEventListener('click', (e) => {e.stopPropagation();});

    // 点击触发元素
    trigger.L.addEventListener('click', async (e) => {
        // 阻止事件冒泡（避免立即触发关闭）
        e.stopPropagation();
        content.L.innerHTML = await loadContent('/content/OverlayWindow/indexContent-L1.html');
        content.R.innerHTML = await loadContent('/content/OverlayWindow/indexContent-L2.html');
        overlay.classList.replace('window-hidden', 'window-visible');
    });

    trigger.R.addEventListener('click', async (e) => {
        // 阻止事件冒泡（避免立即触发关闭）
        e.stopPropagation();
        content.L.innerHTML = await loadContent('/content/OverlayWindow/indexContent-R1.html');
        content.R.innerHTML = await loadContent('/content/OverlayWindow/indexContent-R2.html');
        overlay.classList.replace('window-hidden', 'window-visible');
        });
    });
}