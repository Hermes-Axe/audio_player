/**
 * 控制播放器 播放 暂停 上一曲 下一曲
 */

/**
 * 播放 暂停
 */
/**
 * v2.0 2020-9-22
 * 1. 修改了播放进度条圆点点击会造成进度条偏置量变为圆点内部偏移量造成的
 *      播放进度回到初始位置的BUG
 * 2. IIFE封装组件，不向外部暴露任何方法和属性，防止了对全局命名空间的污染
 */

(function (){
    var audio = document.getElementsByTagName('audio')[0];
    var audioPlay = document.getElementById('audio-play');
    audioPlay.onclick = function(){
        if(audio.paused){
            audio.play();
            audioPlay.innerHTML = 
                `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="18" fill="transparent" stroke="black" stroke-width="2"></circle>
                    <line x1="15" y1="10" x2="15" y2="30" stroke="black" stroke-width="5"></line>
                    <line x1="25" y1="10" x2="25" y2="30" stroke="black" stroke-width="5"></line>
                </svg>`;
                audioPoster.classList.add('poster-move');
        }
        else{
            audio.pause();
            audioPlay.innerHTML = 
                `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="18" fill="transparent" stroke="black" stroke-width="2"></circle>
                    <polygon points="14,10 14,30 32,20" fill="black"></polygon>
                </svg>`;
            audioPoster.classList.remove('poster-move');
        }
    };

    /**
     * 播放控件显示与隐藏
     */
    var audioBoxi = 0;
    var audioBox = document.getElementById('audio-box');
    audio.volume = 1;
    var audioBoxBtn = document.getElementById('audio-box-btn');
    audioBoxBtn.onclick = function(){
        if(audioBoxi%2==0){
            audioBox.style.left = '-280px';
            audioBoxBtn.innerHTML = 
            `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <polyline points="14,10 24,21 14,32" fill="transparent" stroke="#444" stroke-width="2"></polyline>
            </svg>`;
        }
        else{
            audioBox.style.left = '0';
            audioBoxBtn.innerHTML = 
            `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <polyline points="28,10 18,21 28,32" fill="transparent" stroke="#444" stroke-width="2"></polyline>
            </svg>`;
        }
        audioBoxi++;
    };

    /**
     * 上一曲 下一曲
     */
    var nextBtn = document.getElementById('audio-next');
    var upBtn = document.getElementById('audio-back');
    var audioPoster = document.getElementById('audioPoster');
    var audioDesc = document.getElementById('audioDesc');
    var songIndex = 0;
    nextBtn.onclick = function(){
        if(songIndex == audioData.data.length-1){
            songIndex = 0;
        }
        else{
            songIndex++;
        }

        if(audio.paused){
            audio.pause();
            audio.src = audioData.data[songIndex].songSrc;
            audioPoster.src = audioData.data[songIndex].posterSrc;
        }
        else{
            audio.pause();
            audio.src = audioData.data[songIndex].songSrc;
            audioPoster.src = audioData.data[songIndex].posterSrc;
            audio.play();
        }
        audioDesc.innerHTML = audioData.data[songIndex].name + " - " + audioData.data[songIndex].singer;
        progressCir.style.left = 0;
        barDOM.style.width = "0%";
    };

    upBtn.onclick = function(){
        if(songIndex == 0){
            songIndex = audioData.data.length-1;
        }
        else{
            songIndex--;
        }

        if(audio.paused){
            audio.pause();
            audio.src = audioData.data[songIndex].songSrc;
            audioPoster.src = audioData.data[songIndex].posterSrc;
        }
        else{
            audio.pause();
            audio.src = audioData.data[songIndex].songSrc;
            audioPoster.src = audioData.data[songIndex].posterSrc;
            audio.play();
        }
        audioDesc.innerHTML = audioData.data[songIndex].name + " - " + audioData.data[songIndex].singer;
        progressCir.style.left = 0;
        barDOM.style.width = "0%";
    };
    var progressCir = document.getElementsByClassName('progress-circle')[0];
    var barDOM = document.getElementById('progressBar');
    audio.ontimeupdate = function(){
        var barWidth = audio.currentTime / audio.duration;
        barDOM.style.width = barWidth * 100 + "%";
        progressCir.style.left = barWidth * 160 + "px";
    };

    audio.onended = function(){
        // audio.pause();
        songIndex++;
        if(songIndex == audioData.data.length){
            songIndex = 0;
        }
        audio.src = audioData.data[songIndex].songSrc;
        audioPoster.src = audioData.data[songIndex].posterSrc;
        audioDesc.innerHTML = audioData.data[songIndex].name + " - " + audioData.data[songIndex].singer;
        progressCir.style.left = 0;
        barDOM.style.width = "0%";
        audio.play();
    };

    /** 
     * 点击进度条切换进度
     */
    var progressBarBox = document.getElementById('progressBarBox');
    progressBarBox.onclick = function(e){
        console.log(e.offsetX/160 * audio.duration);
        console.log(e.target.classList.value)
        if(e.target.classList.value === 'progress-bar'||e.target.classList.value === 'progress-bar-box'){
            audio.currentTime = e.offsetX/160 * audio.duration;        
        }
        e.stopPropagation();
    };
})()
