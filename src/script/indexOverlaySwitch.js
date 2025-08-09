/* src/script/indexOverlaySwitch.js */

document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const triggerBtn = {
        L : document.getElementById('overlay-content-BtnL'),
        R : document.getElementById('overlay-content-BtnR')
    };
    const indexImage = {
        L : document.getElementById('indexImage-L'),
        R : document.getElementById('indexImage-R')
    };

    // 图片数组
    const images = {
        L: [
            '/image/war&kal.png',
            '/image/Reserve_Example_1.jpg'
        ],
        R: [
            '/image/humph_rabbit.jpg',
            '/image/Reserve_Example_2.jpg'
        ]
    };

    // 检查元素是否存在
    if (!indexImage.L || !indexImage.R || !triggerBtn.L || !triggerBtn.R) {
        console.error('缺少必要的元素:', { indexImage, triggerBtn });
        return;
    }

    // 当前显示的图片索引
    let currentImageIndex = {
        L: 0,
        R: 0
    };

    // 初始化显示第一张图片
    updateImage('L');
    updateImage('R');

    // 按钮点击事件（区分左右侧按钮）
    triggerBtn.L.addEventListener('click', function() {
        currentImageIndex.L = (currentImageIndex.L + 1) % images.L.length;
        updateImage('L');
    });

    triggerBtn.R.addEventListener('click', function() {
        currentImageIndex.R = (currentImageIndex.R + 1) % images.R.length;
        updateImage('R');
    });

    // 更新图片显示的函数
    function updateImage(side) {
        if (!indexImage[side] || !images[side] || !images[side][currentImageIndex[side]]) {
            console.error(`更新图片失败: ${side}侧数据无效`);
            return;
        }

        // 设置新图片并添加淡入效果
        indexImage[side].style.backgroundImage = `url(${images[side][currentImageIndex[side]})`;
        indexImage[side].style.opacity = 0;

        setTimeout(() => {
            indexImage[side].style.opacity = 1;
            indexImage[side].style.transition = 'opacity 0.5s ease';
        }, 10);

        // 调试信息（显示当前图片路径）
        console.log(`${side}侧当前显示图片: ${images[side][currentImageIndex[side]]}`);
    }
});