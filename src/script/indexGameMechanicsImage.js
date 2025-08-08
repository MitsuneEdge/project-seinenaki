/* src/script/indexGameMechanicsImage.js */

// 预加载所有图片
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

    //Debug
    img.onerror = () => console.error(`Failed to load: ${path}`);
}

// 显示图片到右侧区域
export function showImage(imagePath, moduleElement) {
    const rightContent = document.getElementById('rightContent');

    // 创建图片元素
    const imgElement = document.createElement('img');
    imgElement.src = imagePath;
    imgElement.alt = "模块展示图";
    imgElement.style.opacity = '0';

    // 清空并添加新内容
    rightContent.innerHTML = '';
    rightContent.appendChild(imgElement);

    // 添加淡入效果
    setTimeout(() => {
        imgElement.style.opacity = '1';
    }, 10);

    // 移除所有模块的高亮样式
    document.querySelectorAll('.GameMechanics-L-module').forEach(module => {
        module.classList.remove('active-module');
    });

    // 为当前模块添加高亮样式
    moduleElement.classList.add('active-module');
}

// 初始化函数
function initModuleInteraction() {
    //Debug
    console.log(document.getElementById('rightContent'));

    // 获取所有左侧模块
    const modules = document.querySelectorAll('.GameMechanics-L-module');

    // 为每个模块绑定事件
    modules.forEach((module, index) => {
        module.addEventListener('mouseover', () => {
            showImage(imagePaths[index], module);
        });
    });

    // 默认显示第一张图片并高亮第一个模块
    showImage(imagePaths[0], modules[0]);
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    preloadImages();
    initModuleInteraction();
});