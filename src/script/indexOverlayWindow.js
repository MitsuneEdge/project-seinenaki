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
            console.error('缺少必要的元素:', { overlayWindow, triggerBtn });
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

            // 获取触发器位置
            try {
                const triggerRect = triggerBtn[side].getBoundingClientRect();
            } catch (error) {
                console.error(`显示${side}侧窗口失败:` , error);
            }

            // 设置窗口可见
            overlayWindow[side].style.display = 'flex';
            overlayWindow[side].style.justifyContent = 'center';
            overlayWindow[side].style.alignItems = 'center';
            if(side == 'L')
                overlayWindow[side].style.transform = 'translateX(-40%)';
            else
                overlayWindow[side].style.transform = 'translateX(40%)';
            overlayCore.style.display = 'flex';

            // 点击外部关闭
            document.addEventListener('click', handleOutsideClick, true);
        }

        // 隐藏所有窗口
        function hideAllWindows() {
            overlayCore.style.display = 'none';
            Object.values(overlayWindow).forEach(overlayWindow => {
                overlayWindow.style.display = 'none';
            });
            activeWindow = null;
            document.removeEventListener('click', handleOutsideClick, true);
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                hideAllWindows();
            }
        });

        // 处理外部点击
        function handleOutsideClick(e) {
            if (!overlayCore.contains(e.target) && e.target !== triggerBtn) {
                hideAllWindows();
            }
        }

        // 点击事件处理（委托给触发器容器）
        document.body.addEventListener('click', (e) => {
            // 检查是否点击了触发器或其中的图片
            const triggerClicked =
                e.target.closest('#window-trigger-L') ||
                e.target.closest('#window-trigger-R');

            const windowClicked = e.target.closest('[id^="overlay-window-"]');

            if (triggerClicked) {
                e.preventDefault();
                const side = triggerClicked.id.split('-').pop(); // 获取L或R
                showOverlay(side);
            } else if (!windowClicked) {
                hideAllWindows();
            }
        });

        /*
        // 窗口滚动时重新计算位置
        window.addEventListener('scroll', () => {
            if (activeWindow) {  // 检查当前是否有活动窗口
                showOverlay(activeWindow);  // 传入当前活动窗口侧
            }
        });

        // 窗口大小改变时重新计算位置
        window.addEventListener('resize', () => {
            if (activeWindow) {  // 检查当前是否有活动窗口
                showOverlay(activeWindow);  // 传入当前活动窗口侧
            }
        });

        */
    });
}