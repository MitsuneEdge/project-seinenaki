/* src/script/indexSidebar.js */

document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('nav');
    const key = document.querySelector('.key');

    // 初始为收起状态
    nav.classList.add('collapsed');

    // 点击切换展开/收起
    key.addEventListener('click', function() {
        nav.classList.toggle('collapsed');
    });
});