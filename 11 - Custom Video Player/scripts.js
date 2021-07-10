const player=document.querySelector('.viewer')
const playButton=document.querySelector('.player__button');
const progress=document.querySelector('.progress');
const progressFilled=document.querySelector('.progress__filled');
const skipButtons=document.querySelectorAll('button[data-skip]');
const volumeInput=document.querySelector('[name="volume"]')
const playbackRateInput=document.querySelector('[name="playbackRate"]');

let volumeflag=false;
let playbackRateflag=false;
let progressflag=false;

function playButtonEvent(e){
    player.paused===true
    ?playButton.innerHTML='| |'
    :playButton.innerHTML='►'
    
    player.paused===true
    ?player.play()  
    :player.pause()
}

function progressBarEvent(e){
    let percentage=(this.currentTime/this.duration)*100;
    progressFilled.style.flexBasis=`${percentage}%`;
}

function progressBarClickEvent(e){
    if(e.type==='click'){
        let percentage=(e.offsetX/progress.getBoundingClientRect().right)*100;
        progressFilled.style.flexBasis=`${percentage}%`;
        player.currentTime=(percentage/100)*player.duration;
    }
    else if(progressflag){
        let percentage=(e.offsetX/progress.getBoundingClientRect().right)*100;
        progressFilled.style.flexBasis=`${percentage}%`;
        player.currentTime=(percentage/100)*player.duration;
    }
}

function skipEvent(e){
    let skiptime=parseFloat(this.attributes.getNamedItem('data-skip').value)+player.currentTime;
    player.currentTime=skiptime;
}

function volumeEvent(e){
    if(volumeflag){
        player.volume=e.target.value;
    }
}

function playbackRateEvent(e){
    if(playbackRateflag){
        player.playbackRate=e.target.value;
    }
}



playButton.addEventListener('click',playButtonEvent);
player.addEventListener('timeupdate',progressBarEvent);
player.addEventListener('click',playButtonEvent);
progress.addEventListener('click',progressBarClickEvent);
progress.addEventListener('mousemove',progressBarClickEvent);
progress.addEventListener('mousedown',()=>progressflag=true);
progress.addEventListener('mouseup',()=>progressflag=false);
skipButtons.forEach(ele=>ele.addEventListener('click',skipEvent));
volumeInput.addEventListener('change',volumeEvent);
volumeInput.addEventListener('mousemove',volumeEvent);
volumeInput.addEventListener('mousedown',()=>volumeflag=true);
volumeInput.addEventListener('mouseup',()=>volumeflag=false);
playbackRateInput.addEventListener('change',playbackRateEvent);
playbackRateInput.addEventListener('mousemove',playbackRateEvent);
playbackRateInput.addEventListener('mousedown',()=>playbackRateflag=true);
playbackRateInput.addEventListener('mouseup',()=>playbackRateflag=false);