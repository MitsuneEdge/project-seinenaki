/* src/script/index/Jump2Target.js */

document.querySelectorAll('[data-trigger="jump2page"]').forEach(div => {
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

/* <button class="jump2page" data-target="storyIntroduce">关于游戏</button> */
/* class=jump2page，data-target选择需要跳转到的元素 */