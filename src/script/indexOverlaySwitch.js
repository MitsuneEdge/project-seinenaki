/* src/script/indexOverlaySwitch.js */

if (!window.__SCRIPT_EXECUTED__) {
    window.__SCRIPT_EXECUTED__ = true;

    // 主逻辑（只会执行一次）
    console.log('脚本已执行');

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
        const indexText = {
            L : document.getElementById('overlay-content-L'),
            R : document.getElementById('overlay-content-R')
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

        //文字数组
        const text = {
            L: [
                '/content/OverlayWindow/indexContent-L1.html',
                '/content/OverlayWindow/indexContent-L2.html'
            ],
            R: [
                '/content/OverlayWindow/indexContent-R1.html',
                '/content/OverlayWindow/indexContent-R2.html'
            ]
        };

        // 检查元素是否存在
        if (!indexImage.L || !indexImage.R || !triggerBtn.L || !triggerBtn.R || !indexText.L || !indexText.R) {
            console.error('缺少必要的元素:', { indexImage, triggerBtn , indexText });
            return;
        }

        // 当前显示的图片索引
        let currentImageIndex = {
            L: 0,
            R: 0
        };

        let currentTextIndex = {
            L: 0,
            R: 0
        };

        // 初始化显示第一张图片
        updateImage('L');
        updateImage('R');

        // 初始化显示第一组文字
        updateText('L');
        updateText('R');

        // 按钮点击事件（区分左右侧按钮）
        triggerBtn.L.addEventListener('click', function() {
            currentImageIndex.L = (currentImageIndex.L + 1) % images.L.length;
            updateImage('L');
            updateText('L');
        });

        triggerBtn.R.addEventListener('click', function() {
            currentImageIndex.R = (currentImageIndex.R + 1) % images.R.length;
            updateText('R');
            updateImage('R');
        });

        // 更新图片显示的函数
        function updateImage(side) {
            if (!indexImage[side] || !images[side] || !images[side][currentImageIndex[side]]) {
                console.error(`更新图片失败: ${side}侧数据无效`);
                return;
            }

            // 设置新图片并添加淡入效果
            indexImage[side].style.backgroundImage = `url($images[side][currentImageIndex[side]]})`;
            indexImage[side].style.backgroundSize = 'contain';
            indexImage[side].style.backgroundPosition = 'center';
            indexImage[side].style.backgroundRepeat = 'no-repeat';

            // 调试信息（显示当前图片路径）
            //console.log(`${side}侧当前显示图片: ${images[side][currentImageIndex[side]]}`);
        }

        function updateText(side) {
            if (!indexImage[side] || !images[side] || !images[side][currentImageIndex[side]]) {
                console.error(`更新文字失败: ${side}侧数据无效`);
                return;
            }

            //设置新文字
            indexText[side].innerHTML = url($text[side][currentTextIndex[side]]});

            console.log(`${side}侧当前显示文字: ${text[side][currentTextIndex[side]]}`);
        }
    });
}