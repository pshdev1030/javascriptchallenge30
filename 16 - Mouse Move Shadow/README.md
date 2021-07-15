# 20210716 DAY16

## 문제정의
* 키 입력을 받아 조건을 만족했을 경우 특정 함수를 호출한다.

## 요구조건
* 키보드 이벤트에 대한 이해

## 참고한 내용

## 해결 방법
* window.addEventListener함수를 통해 해결하였다.
* join함수를 통해 문자열로 변환하고 히든 입력과 비교하였다.

## 내 답안
```javascript
let input=[];
  const answer='wesbos';

  window.addEventListener('keyup',(e)=>{
    input.push(e.key);
    while(input.length>answer.length){
      input.shift();
    }
    if(input.join('')===answer){
      console.log('Ding Ding');
      cornify_add();
    }
  })
```

## 모범답안
```javascript
const pressed = [];
const secretCode = 'wesbos';

window.addEventListener('keyup', (e) => {
  console.log(e.key);
  pressed.push(e.key);
  pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);
  if (pressed.join('').includes(secretCode)) {
    console.log('DING DING!');
    cornify_add();
  }
  console.log(pressed);
});
```

## 모범답안과의 비교
* 로직이 크게 차이는 없는거같다.
* 모범답안이 배열 메서드를 좀 더 잘 이용하였다.
* 근데 내가 더 깔끔한거같다,,,,(아마도)

## 느낀점
