/* src/script/indexGameMechanicsImage.js */

function preloadImages() {
    const imagePaths = [
        '/image/Reserve_Example_1.jpg',
        '/image/Reserve_Example_2.jpg',
        '/image/Reserve_Example_3.jpg',
        '/image/Reserve_Example_4.jpg',
        '/image/Reserve_Example_5.jpg'
    ];

    imagePaths.forEach(path => {
        const img = new Image();
        img.src = path;
    });
}

// 显示图片到右侧区域
export function showImage(imagePath) {
    const rightContent = document.getElementById('rightContent');

    // 创建图片元素
    const imgElement = document.createElement('img');
    imgElement.src = imagePath;
    imgElement.alt = "模块展示图";
    imgElement.style.opacity = '0'; // 初始透明用于淡入效果

    // 清空并添加新内容
    rightContent.innerHTML = '';
    rightContent.appendChild(imgElement);

    // 添加淡入效果
    setTimeout(() => {
        imgElement.style.opacity = '1';
    }, 10);
}

// 初始化函数
function initModuleInteraction() {
    // 获取所有左侧模块
    const modules = document.querySelectorAll('.GameMechanics-L-module');

    // 为每个模块绑定事件
    modules.forEach((module, index) => {
        module.addEventListener('mouseover', () => {
            const imagePath = `/image/Reserve_Example_{index + 1}.jpg`;
            showImage(imagePath);
        });
    });

    // 默认显示第一张图片
    showImage('/image/Reserve_Example_1.jpg');
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    preloadImages();
    initModuleInteraction();
});