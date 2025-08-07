export function adjustFontSize() {
    const title = document.querySelector('.index_title');
    const container = index_title.parentElement;

    // 重置字体大小
    index_title.style.fontSize = '';

    // 如果文本溢出则减小字号
    while (index_title.scrollWidth > container.offsetWidth) {
        const currentSize = parseFloat(getComputedStyle(index_title).fontSize);
        index_title.style.fontSize = (currentSize - 1) + 'px';
    }
}

// 初始执行+窗口变化时执行
window.addEventListener('load', adjustFontSize);
window.addEventListener('resize', adjustFontSize);