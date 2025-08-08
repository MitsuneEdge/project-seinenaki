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
    if (!trigger.L || !trigger.R || !content.L || !content.R) {
        console.error('元素未找到');
        return;
    }

    overlay.addEventListener('click', () => {
        const windowContent = document.getElementById('window-content');
        const isLeft = windowContent.classList.contains('slide-from-left');

        // 根据进入方向决定退出方向
        windowContent.style.transform = isLeft ? 'translateX(-100vw)' : 'translateX(100vw)';
    });

    content.L.addEventListener('click', (e) => {e.stopPropagation();});
    content.R.addEventListener('click', (e) => {e.stopPropagation();});

    // 点击触发元素
    trigger.L.addEventListener('click', async (e) => {
        // 阻止事件冒泡（避免立即触发关闭）
        e.stopPropagation();
        const windowContent = document.getElementById('window-content');

        // 设置从左进入的动画
        windowContent.classList.remove('slide-from-right');
        windowContent.classList.add('slide-from-left');

        // 强制重绘确保动画重置
        void windowContent.offsetWidth;

        content.L.innerHTML = await loadContent('/content/OverlayWindow/indexContent-L1.html');
        content.R.innerHTML = await loadContent('/content/OverlayWindow/indexContent-L2.html');

        //显示窗口
        //overlay.classList.replace('window-hidden', 'window-visible');
    });

    trigger.R.addEventListener('click', async (e) => {
        // 阻止事件冒泡（避免立即触发关闭）
        e.stopPropagation();
        const windowContent = document.getElementById('window-content');

        // 设置从右进入的动画
        windowContent.classList.remove('slide-from-left');
        windowContent.classList.add('slide-from-right');

        // 强制重绘确保动画重置
        void windowContent.offsetWidth;

        content.L.innerHTML = await loadContent('/content/OverlayWindow/indexContent-R1.html');
        content.R.innerHTML = await loadContent('/content/OverlayWindow/indexContent-R2.html');

        //显示窗口
        //overlay.classList.replace('window-hidden', 'window-visible');
        });
    });
}