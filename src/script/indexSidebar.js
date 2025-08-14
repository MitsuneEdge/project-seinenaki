/* src/script/indexSidebar.js */

document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('.indexSidebar-nav');
    const key = document.querySelector('.key');
    const buttons = document.querySelectorAll('.jump2page, #musicPlayerButton');

    if (!nav || !key) {
        console.error('元素未找到');
        return;
    }

    // 初始状态
    nav.classList.add('collapsed');
    disableButtons(true);

    // 点击切换
    key.addEventListener('click', function() {
        const isCollapsed = nav.classList.toggle('collapsed');
        disableButtons(isCollapsed);
    });

    // 禁用/启用按钮函数
    function disableButtons(disable) {
        buttons.forEach(btn => {
            btn.disabled = disable;
            btn.style.visibility = disable ? 'hidden' : 'visible';
        });
    }
});