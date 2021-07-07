# 20210708 DAY8

## 문제정의
Canvas API를 다룬다. 색을 변화시킨다.

## 요구조건
* Canvas API에 대한 이해

## 참고한 내용
* Canvas API MDN(https://developer.mozilla.org/ko/docs/Web/API/Canvas_API)
* 선 그리기(https://curryyou.tistory.com/324,https://nykim.work/12)
* 드래그 앤 드롭 이벤트(https://ko.javascript.info/mouse-drag-and-drop)
* removeEventListener
* HSL Color(https://www.w3schools.com/colors/colors_hsl.asp)

## 해결 방법


## 내 답안
```javascript
  const canvas=document.getElementById('draw');
  //canvas 엘리멘트 참조
  const ctx=canvas.getContext('2d');
  //랜더링 될 대상
  ctx.lineJoin='round';
  ctx.lineCap='round';
  ctx.lineWidth=100;
  let lineWIdthFlag=true;
  let color='red'
  let hue=0;
  let lastX=0;
  let lastY=0;

  const mouseMove=(e)=>{
    ctx.strokeStyle=`hsl(${hue},100%,50%)`;
    // hsl 색코드 사용 hue,saturation, lightness
    ctx.beginPath();
    ctx.moveTo(lastX,lastY);
    ctx.lineTo(e.offsetX,e.offsetY);
    ctx.stroke();
    
    lastX=e.offsetX;
    lastY=e.offsetY;
    if(ctx.lineWidth>=100||ctx.lineWidth<=1) lineWIdthFlag=!lineWIdthFlag;
    if(lineWIdthFlag) ctx.lineWidth++;
    else ctx.lineWidth--;

    hue>360? hue=0: hue++;
  }

  canvas.addEventListener('mousedown',(e)=>{
    lastX=e.offsetX;
    lastY=e.offsetY;
    canvas.addEventListener('mousemove',mouseMove);
  });
  canvas.addEventListener('mouseup',()=>{
    canvas.removeEventListener('mousemove',mouseMove);
  });

```

## 모범답안
```javascript
const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 100;
// ctx.globalCompositeOperation = 'multiply';

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e) {
  if (!isDrawing) return; // stop the fn from running when they are not moused down
  console.log(e);
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.beginPath();
  // start from
  ctx.moveTo(lastX, lastY);
  // go to
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];

  hue++;
  if (hue >= 360) {
    hue = 0;
  }
  if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
    direction = !direction;
  }

  if(direction) {
    ctx.lineWidth++;
  } else {
    ctx.lineWidth--;
  }

}

canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});


canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);


```

## 모범답안과의 비교
* 드래그를 구현해야 헀는데 나는 첫 클릭이 발생시에 mousemove에 이벤트를 등록하고 mouseup에 이벤트를 제거하도록 구현하였다. 이 부분을 모범답안에선 flag를 통해 제어하였다.
* 이벤트를 등록하고 제거하는것이 더 비효율적일거 같다가도 모범답안은 이벤트 함수 콜이 계속 이루어져서 뭐가 더 효율적인지는 모르겠다.
* 가독성 면에서는 모범답안이 더 좋은 것 같다. flag를 두고 관리하는 것이 읽기는 편한 것 같다.
* mouseout에 이벤트를 등록하지 않아서 그리다가 나갔다 와도 그리던게 유효하다.
## 느낀점
* offsetY,screenY,clientY의 차이를 알게 되었다.
*  많은 아이디어를 얻을 수 있었다. 직전 마우스 좌표를 저장해놓고 현재 마우스 좌표와 비교하며 마우스의 움직임을 추적할 수 있다.
* HSL 색표현법에 대해 알게 되었다. 그라데이션을 구현할 떄 좋은 것 같다.

