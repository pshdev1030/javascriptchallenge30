## 20210716 DAY16

## 문제정의
*text-shadow를 이용하여 마우스 이벤트를 만든다.

## 요구조건
* CSS를 조작한다.
* 그림자를 이해한다
* offset을 이해한다.

## 참고한 내용
* 모범 답안을 참조하여 해결하고 공부하였다.
* 엘리먼트의 크기 속성(https://ohgyun.com/571,https://ko.javascript.info/size-and-scroll)

## 엘리먼트의 크기 관련 속성
* OffsetWidth, offsetHeight
    - offset은 요소가 화면에서 차지하는 전체 크기를 나타낸다.
    - 엘리먼트의 크기에 패딩과 보더, 스크롤바의 사이즈를 포함한 값을 리턴한다.(요소 바깥부분의 너비와 높이 정보)


    <img src="https://t1.daumcdn.net/cfile/tistory/273E0D40554DADB32D"/>

* clientWidth, clientHeight
    - 테두리 안 영역의 사이즈 정보
    - 실제로 보여지고 있는 컨텐츠가 차지하는 공간이다. 
    - 보더와 스크롤바를 제외한 실제 컨텐츠의 크기를 리턴한다.


    <img src="https://t1.daumcdn.net/cfile/tistory/26535837554DADB411"/>
* scrollWidth,srcollHeight
    - 스크롤 바에 의해 감춰진 영역도 포함하는 크기를 반환한다.

* offsetLeft, offsetTop
    - 부모를 기준으로 오른쪽, 아래쪽으로 얼마나 떨어져 있는지를 나타낸다.

* clientLeft,clientTop
    - 요소 내부의테두리의 두께

* scrollLeft,scrollTop
    - 스크롤이 움직임에 따라 가려진 영역의 너비와 높이를 나타낸다.(TOP 세로 Left 가로)



## 모범 답안
```javascript
  const hero=document.querySelector('.hero');
  const text=hero.querySelector('h1');
  const walk=500;//100px

  function shadow(e){
    const {offsetWidth:width,offsetHeight:height}=hero;
    let {offsetX:x,offsetY:y}=e;
    // 커서의 위치
    
    if(this!==e.target){
      x=x+e.target.offsetLeft;
      y=y+e.target.offsetTop;
    }
    

    const xWalk=Math.round((x/width*walk)-(walk/2));
    const yWalk=Math.round((y/height*walk)-(walk/2));
    console.log(xWalk,yWalk);

    text.style.textShadow=`
    ${xWalk}px ${yWalk}px 0 rgba(255,0,255,0.7),
    ${xWalk*-1}px ${yWalk}px 0 rgba(0,255,255,0.7),
    ${yWalk}px ${xWalk*-1}px 0 rgba(0,255,0,0.7),
    ${yWalk*-1}px ${xWalk}px 0 rgba(0,0,255,0.7)
    `;
  }

  hero.addEventListener('mousemove',shadow);
  ```

## 모범답안과의 비교


## 느낀점
* 요소의 위치와 높이, 너비등을 나타내는 속성들에 대해 확실하게 정리랄 수 있었다.



https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetLeft
https://homzzang.com/b/js-1277
https://webclub.tistory.com/104
https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetTop
