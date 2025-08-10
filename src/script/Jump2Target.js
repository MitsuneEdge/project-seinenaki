/* src/script/Jump2Target.js */

document.querySelectorAll('.jump2page').forEach(div => {
    div.addEventListener('click', function() {
        const targetClass = this.getAttribute('data-target');
        const targetElement = document.querySelector(`.${targetClass}`);

        if (targetElement) {
            // 平滑滚动到目标元素
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});