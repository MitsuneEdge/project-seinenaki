/* src/script/indexSidebar.js */

document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const key = document.querySelector('.key');

    // 初始状态为收起
    header.classList.add('collapsed');

    // 点击key按钮切换展开/收起状态
    key.addEventListener('click', function() {
        header.classList.toggle('collapsed');
    });
});