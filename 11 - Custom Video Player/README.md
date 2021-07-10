# 202107011 DAY11

## 문제정의
* 비디오 플레이어를 만드는 이벤트이다.

## 요구조건
* 비디오 태그의 method와 attributes에 대한 이해가 필요하다.

## 참고한 내용
* 비디오 태그(https://developer.mozilla.org/ko/docs/Web/API/HTMLMediaElement)
* 절대좌표, 상대좌표(https://velog.io/@jacob0122/%EC%A0%88%EB%8C%80%EC%A2%8C%ED%91%9C-%EC%83%81%EB%8C%80%EC%A2%8C%ED%91%9C)


## 해결 방법
* 비디오 태그의 메서드와 속성을 이용하여 해결하였다.
* 부모요소에 대한 상대좌표를 구해서 드래그를 해결했다.
* 드래그 시에는 flag를 두어 이를 이용하였다.



## 내 답안
```javascript
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
```

## 모범답안
```javascript
/* Get Our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/* Build out functions */
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  console.log(icon);
  toggle.textContent = icon;
}

function skip() {
 video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

/* Hook up the event listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
```

## 모범답안과의 비교
* 상대좌표를 구하는데에 다른 방법으로 구했다. 모범 답안에선 offsetWidth 와 offsetX의 비를 이용해서 구했다. 이게 계산이 덜해서 더 빠르다.
* 추가적으로 볼륨과 재생속도의 드래그 이벤트를 구현하였다.
* 나는 재생이나 정지버튼을 누를 때만 버튼이 바뀌도록 구현했는데 모범답안에선 play와 pause에 각각 마우스 버튼 바뀌는걸 등록하였다. 한가지 함수가 한가지 기능을 해야한다는 면에서 이쪽이 더 좋은 것 같다.
* dataset으로 접근해서 변수를 가져왔다. 이거 아는 개념인데 떠오르지가 않는다.
* string에 저장후 객체명[string]()을 통해 메서드를 실행하였다. 한가지 함수에서 두가지 실행 맥락을 달리 할 경우 유용한 방법같다.

## 느낀점
* 코드를 간략하게 적기위한 테크닉들을 많이 알았다.
* 한가지 함수가 한가지 기능만 하도록 적는게 베스트인 것 같다.