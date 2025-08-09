/* src/script/indexOverlayWindow.js */

// 获取元素引用
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', async () => {
        const triggerBtn = {
            L : document.getElementById('window-trigger-L'),
            R : document.getElementById('window-trigger-R')
        };
        const overlayCore = document.getElementById('overlay-core');
        const overlayWindow = {
            L : document.getElementById('overlay-window-L'),
            R : document.getElementById('overlay-window-R')
        };
        const contentSectionL = document.getElementById('content-section-L');
        const contentSectionR = document.getElementById('content-section-R');

        // 异步加载外部html文件
        const loadContent = async (path) => {
            try {
                const response = await fetch(path);
                if (!response.ok) throw new Error(`Failed to load ${path}`);
                return await response.text();
            } catch (error) {
                console.error(error);
                return `<p>加载内容失败: ${error.message}</p>`;
            }
        };

        // 检查元素是否存在
        if (!triggerBtn.L || !triggerBtn.R || !overlayWindow.L || !overlayWindow.R) {
            console.error('元素未找到');
            return;
        }

        //关闭全部窗口
        let activeWindow = null;

        async function showOverlay(side) {

            // 隐藏所有窗口
            hideAllWindows();

            // 设置活动窗口
            activeWindow = side;

            // 加载外部内容
            //await loadContent(side);

            // 计算拟态窗口位置（与触发器同一高度）
            const top = triggerRect.top;
            const left = triggerRect.right + 10; // 在触发器右侧10px处显示

            // 设置窗口可见
            overlayWindow[side].style.display = 'flex';
            overlayCore.style.display = 'block';

            // 点击外部关闭
            document.addEventListener('click', handleOutsideClick, true);
        }

        // 隐藏所有窗口
        function hideAllWindows() {
            overlayCore.style.display = 'none';
            Object.values(overlayWindow).forEach(window => {
                window.style.display = 'none';
                window.innerHTML = defaultContent[window.id.split('-').pop()]; // 恢复默认内容
            });
            activeWindow = null;
            document.removeEventListener('click', handleOutsideClick, true);
        }

        // 处理外部点击
        function handleOutsideClick(e) {
            if (!overlayCore.contains(e.target) && e.target !== triggerBtn) {
                hideOverlay();
            }
        }

        // 触发器点击事件
        triggerBtn.L.addEventListener('click', (e) => {
            e.stopPropagation();
            if (overlayCore.style.display === 'block') {
                hideAllWindows();
            } else {
                showOverlay('L');
            }
        });

        triggerBtn.R.addEventListener('click', (e) => {
            e.stopPropagation();
            if (overlayCore.style.display === 'block') {
                hideAllWindows();
            } else {
                showOverlay('R');
            }
        });

        // 窗口滚动时重新计算位置
        window.addEventListener('scroll', () => {
            if (overlayCore.style.display === 'block') {
                showOverlay(); // 重新计算位置
            }
        });

          // 窗口大小改变时重新计算位置
        window.addEventListener('resize', () => {
            if (overlayCore.style.display === 'block') {
                showOverlay(); // 重新计算位置
            }
        });
    });
}