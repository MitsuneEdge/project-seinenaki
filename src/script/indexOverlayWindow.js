/* src/script/indexOverlayWindow.js */

// 获取元素引用
document.addEventListener('DOMContentLoaded', () => {
    const trigger = document.querySelector('.window-trigger');
    const overlay = document.getElementById('window-overlay');

    // 检查元素是否存在
    if (!trigger || !overlay) {
        console.error('关键元素未找到！');
        return; // 修复：添加了闭合大括号
    }

    const modalContent = document.querySelector('.window-content'); // 修正选择器

// 点击触发元素
trigger.addEventListener('click', (e) => {
    // 阻止事件冒泡（避免立即触发关闭）
    e.stopPropagation();
    const rect = trigger.getBoundingClientRect();
    const centerY = rect.top + rect.height / 2;
    const modalHeight = window.innerHeight * 0.9;

    // 获取视口高度并计算90vh的像素值
    const viewportHeight = window.innerHeight;
    const modalHeight = viewportHeight * 0.9; // 90vh

    // 设置模态窗口初始位置（与触发元素水平对齐）
    modalContent.style.top = `${centerY - (modalHeight / 2)}px`;
    overlay.classList.replace('modal-hidden', 'modal-visible');
    });

    // 点击遮罩关闭
    overlay.addEventListener('click', () => {
        overlay.classList.replace('modal-visible', 'modal-hidden');
    });

    // 阻止内容区域点击关闭
    modalContent.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});