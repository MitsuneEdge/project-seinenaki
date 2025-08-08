/* src/script/indexOverlayWindow.js */

// 获取元素引用
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
    const trigger = document.getElementById('window-trigger');
    const overlay = document.getElementById('window-overlay');
    const content = document.getElementById('window-content');

    // 检查元素是否存在
    if (!trigger || !overlay || !content) {
        console.error('元素未找到:', { trigger, overlay, content });
        return;
    }

    // 点击触发元素
    trigger.addEventListener('click', (e) => {
        // 阻止事件冒泡（避免立即触发关闭）
        e.stopPropagation();
        overlay.classList.replace('window-hidden', 'window-visible');
        });

        // 点击遮罩关闭
        overlay.addEventListener('click', () => {
            overlay.classList.replace('window-visible', 'window-hidden');
        });

        // 阻止内容区域点击关闭
        content.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });
}