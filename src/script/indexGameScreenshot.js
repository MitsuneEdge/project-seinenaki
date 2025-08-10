/* src/script/indexGameScreenshot.js */

document.addEventListener('DOMContentLoaded', function() {
    // 配置内容配对数组
    const contentPairs = [
        {
            html: '/content/indexGameScreenshot/indexScreenShot-1.html',
            image: '/image/Reserve_Example_1.jpg'
        },
        {
            html: '/content/indexGameScreenshot/indexScreenShot-2.html',
            image: '/image/Reserve_Example_2.jpg'
        },
        {
            html: '/content/indexGameScreenshot/indexScreenShot-3.html',
            image: '/image/Reserve_Example_3.jpg'
        },
        {
            html: '/content/indexGameScreenshot/indexScreenShot-4.html',
            image: '/image/Reserve_Example_4.jpg'
         },
         {
            html: '/content/indexGameScreenshot/indexScreenShot-5.html',
            image: '/image/Reserve_Example_5.jpg'
         },
        // 添加更多配对...
    ];

    // 获取DOM元素
    const leftContainer = document.querySelector('.GameScreenshot-L');
    const rightContainer = document.querySelector('.GameScreenshot-R');
    const container = document.querySelector('.GameScreenshot-container');
    const prevButton = document.getElementById('prev-btn');
    const nextButton = document.getElementById('next-btn');

    // 当前显示索引和轮播控制
    let currentIndex = 0;
    let autoRotateInterval;
    const rotationInterval = 5000; // 5秒轮换间隔

    // 初始化显示第一组内容
    updateContent();
    startAutoRotation();

    // 更新显示内容
    function updateContent() {
        const currentPair = contentPairs[currentIndex];

        // 更新左侧图片
        leftContainer.innerHTML = `
            <img class="screenshot-image" src="${currentPair.image}"
                 alt="游戏截图${currentIndex + 1}">
        `;

        // 加载并更新右侧HTML内容
        fetch(currentPair.html)
            .then(response => response.text())
            .then(html => {
                rightContainer.innerHTML = `
                    <div class="screenshot-content">${html}</div>
                `;
            })
            .catch(error => {
                console.error('加载内容失败:', error);
                rightContainer.innerHTML = `
                    <div class="screenshot-content">
                        <p>内容加载失败</p>
                    </div>
                `;
            });
    }

    // 切换上一组内容
    function showPrevious() {
        currentIndex = (currentIndex - 1 + contentPairs.length) % contentPairs.length;
        updateContent();
    }

    // 切换下一组内容
    function showNext() {
        currentIndex = (currentIndex + 1) % contentPairs.length;
        updateContent();
    }

    // 开始自动轮播
    function startAutoRotation() {
        if (!autoRotateInterval) {
            autoRotateInterval = setInterval(showNext, rotationInterval);
        }
    }

    // 暂停自动轮播
    function pauseAutoRotation() {
        if (autoRotateInterval) {
            clearInterval(autoRotateInterval);
            autoRotateInterval = null;
        }
    }

    // 鼠标悬停暂停轮播
    container.addEventListener('mouseenter', pauseAutoRotation);
    container.addEventListener('mouseleave', startAutoRotation);
    // 添加按钮事件监听
    //if (prevButton) prevButton.addEventListener('click', showPrevious);
    //if (nextButton) nextButton.addEventListener('click', showNext);

});