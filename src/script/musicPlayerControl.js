/* src/script/musicPlayerControl.js */

document.addEventListener('DOMContentLoaded', function() {
    const musicPlayerButton = document.getElementById('musicPlayerButton');
    const backgroundMusic = document.getElementById('backgroundMusic');
    //const currentSongDisplay = document.getElementById('currentSong');

    // 歌曲列表
    const songs = [
        'https://music.163.com/song/media/outer/url?id=2691120935.mp3', /* 春之圆舞曲 */
        'https://music.163.com/song/media/outer/url?id=28481734.mp3', /* a memories for us feat."Day's" MANYO */
        'https://music.163.com/song/media/outer/url?id=686361.mp3' /* 桜华月想 */
    ];

    let currentSongIndex = -1;

    // 设置音量为10%
    backgroundMusic.volume = 0.1;

    // 随机选择下一首歌
    function getRandomSong() {
        let nextIndex;
        do {
            nextIndex = Math.floor(Math.random() * songs.length);
        } while (songs.length > 1 && nextIndex === currentSongIndex);

        currentSongIndex = nextIndex;
        return songs[currentSongIndex];
    }

    // 加载并播放歌曲
    function playRandomSong() {
        const song = getRandomSong();
        backgroundMusic.src = song;
        backgroundMusic.play()
            .then(() => {
                //currentSongDisplay.textContent = `正在播放: ${song}`;
                musicPlayerButton.textContent = '暂停音乐';
            })
            .catch(error => {
                console.error('播放失败:', error);
            });
    }

    // 按钮点击事件
    musicPlayerButton.addEventListener('click', function() {
        if (backgroundMusic.paused) {
            if (!backgroundMusic.src) {
                // 如果还没有选择歌曲，随机选择一首
                playRandomSong();
            } else {
                backgroundMusic.play()
                .then(() => {
                    musicPlayerButton.textContent = '暂停音乐';
                });
            }
        } else {
            backgroundMusic.pause();
            musicPlayerButton.textContent = '播放音乐';
        }
    });

    // 歌曲结束时自动播放下一首
    backgroundMusic.addEventListener('ended', function() {
        playRandomSong();
    });

     // 处理网络错误
    backgroundMusic.addEventListener('error', function() {
        console.error('加载音乐失败');
        setTimeout(playRandomSong, 2000);
    });

    // 初始状态显示
    //currentSongDisplay.textContent = '音乐已停止';
});