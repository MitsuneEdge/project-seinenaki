/* src/script/musicPlayerControl.js */

const music = document.getElementById('bgMusic');
const musicButton = document.getElementById('musicPlayerButton');

// 初始音量设为10%
music.volume = 0.1;

// 自动播放尝试（需用户交互的浏览器会失败）
function attemptAutoPlay() {
    const playPromise = music.play();
    if (playPromise !== undefined) {
        playPromise.catch(() => {
            // 自动播放失败时不处理，等待用户点击
        });
    }
}

// 切换播放/停止状态
async function toggleMusic() {
    if (music.paused) {
        music.play();
        musicButton.textContent = '停止音乐';
        musicButton.classList.add('playing');
    } else {
        music.pause();
        musicButton.textContent = '播放音乐';
        musicButton.classList.remove('playing');
    }
}

// 按钮点击事件
musicButton.addEventListener('click', toggleMusic);

// 页面加载后尝试自动播放（可选）
window.addEventListener('load', attemptAutoPlay);