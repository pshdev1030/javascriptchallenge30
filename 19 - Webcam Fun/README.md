## 20210718 DAY18

## 문제정의
* 웹캠과 캔버스의 연동

## 요구조건
* canvas
* 웹캠

## 참고한 내용
* 모범답안을 참조하였다.

## 모범 답안
```javascript
const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo(){
    navigator.mediaDevices.getUserMedia({video:true,audio:false})
    .then(localMediaStream=>{
        console.log(localMediaStream);
        video.srcObject = localMediaStream;
        video.play();
     })
     .then(()=>{paintToCanvas()})
     .catch(error=>{
         console.error('OH NO!!!',error);
     });
}

function paintToCanvas(){
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;

    return setInterval(()=>{
        ctx.drawImage(video,0,0,width,height);
        //take the pixels out
        let pixels=ctx.getImageData(0,0,width,height);
        //mess with them
        //rgb코드들이 연속해서 저장되어있는 배열을 받는다.
        pixels=rgbSplit(pixels);
        ctx.globalAlpha=0.8;
        //put them back
        ctx.putImageData(pixels,0,0);
    },16);
}

function takePhoto(){
    //played the sound
    snap.currentTime=0;
    snap.play();

    //take the data out of the canvas

    const data=canvas.toDataURL('image/jpeg');
    const link=document.createElement('a');
    link.href=data;
    link.setAttribute('download','handsome');
    link.innerHTML=`<img src="${data}" alt="Handsome Man"/>`
    strip.insertBefore(link,strip.firstChild);
}

function redEffect(pixels){
    for(let i=0;i<pixels.data.length;i+=4){
        pixels.data[i+0]=pixels.data[i+0]+100;
        pixels.data[i+1]=pixels.data[i+1]-50;
        pixels.data[i+2]=pixels.data[i+2]*0.5;
    }
    return pixels;
}

function rgbSplit(pixels){
    for(let i=0;i<pixels.data.length;i+=4){
        pixels.data[i-150]=pixels.data[i+0]
        pixels.data[i+500]=pixels.data[i+1]
        pixels.data[i-550]=pixels.data[i+2]
    }
    return pixels;
}

function greenScreen(pixels){

}

getVideo();
video.addEventListener('canplay',paintToCanvas);
```


## 느낀점
* 캔버스 사용은 정말 적응이 잘 안 된다ㅠ
* 이론으로만 배운 픽셀을 직접 조작해보는게 신기했다. 컴퓨터그래픽스 과목에서 대강 다루어본적은 있는데 좀 더 와닿았다.