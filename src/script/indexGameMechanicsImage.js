/* src/script/indexGameMechanicsImage.js */

// 预加载所有图片
function preloadImages() {
    const imagePaths = [
        '/image/Reserver_Example_1.jpg',
        '/image/Reserver_Example_2.jpg',
        '/image/Reserver_Example_3.jpg',
        '/image/Reserver_Example_4.jpg',
        '/image/Reserver_Example_5.jpg'
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
            const imageNumber = index + 1;
            const imagePath = `/image/Reserver_Example_${imageNumber}.jpg`;
            showImage(imagePath);
        });
    });

    // 默认显示第一张图片
    showImage('/image/Reserver_Example_1.jpg');
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    preloadImages();
    initModuleInteraction();
});