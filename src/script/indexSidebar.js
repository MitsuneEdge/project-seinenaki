/* src/script/indexSidebar.js */

document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('.indexSidebar-nav');
    const key = document.querySelector('.key');

    // 检查元素是否存在
    if (!nav || !key) {
        console.error('导航元素或key元素未找到');
        return;
    }

    // 初始为收起状态
    nav.classList.add('collapsed');

    // 点击切换展开/收起
    key.addEventListener('click', function() {
        nav.classList.toggle('collapsed');
    });
});