# 20210702 DAY2

## 문제정의 
시계를 구현하는 문제이다.
360/시 분 초 만큼 회전시키면 될 것 같다.

## 요구조건
* Data객체로 이벤트 등록
* setInterval활용

## 참고한 내용
* Date객체
* 회전 시키기
* css를 직접 삽입하기
* transform
* setInterval

## 해결 방법
360을 12 60 60 으로 나누어 시간이 바뀔 때 마다 각 침이 움직이도록 하였다.
<br>
=> 시침의 움직임에 따라 분침의 움직임이 계산이 되지 않았다.

각각 하위 침의 움직임으로 각도를 계산하도록 수정하였다.
<br>
ex)시침 = 현재 시침의 각도 + 분침의 각도마다 조금씩 움직여 시간이 다 됐을 때 30도만큼 움직이도록 구현하였다.

<br>
임의로 회전시켜봤는데 말 그래도 침만 회전하길래 for문으로 style에 transform-origin속성을 추가해주었다.


## 내 답안
```html
  <script>
    let arr=document.getElementsByClassName('hand');
    const [hour,min,second]=arr;

    for (let i of arr){
      i.style.transformOrigin='center right'
    }

    const timerFunction=()=>{
      const date= new Date();

      const curHours=date.getHours();
      const curMinutes=date.getMinutes();
      const curSeconds=date.getSeconds();

      const hoursDeg =(curHours*30)+(30/curMinutes)+90;
      hour.style.transform=`rotate(${hoursDeg}deg)`;

      const minutesDeg =(curMinutes*6)+(6/curSeconds)+90;
      min.style.transform=`rotate(${minutesDeg}deg)`;
      
      const secondsDeg =curSeconds*6+90;
      second.style.transform=`rotate(${secondsDeg}deg)`;
    }

    setInterval(timerFunction,1000);
  </script>
```

## 모범답안
```html
<script>
  const secondHand = document.querySelector('.second-hand');
  const minsHand = document.querySelector('.min-hand');
  const hourHand = document.querySelector('.hour-hand');

  function setDate() {
    const now = new Date();

    const seconds = now.getSeconds();
    const secondsDegrees = ((seconds / 60) * 360) + 90;
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

    const mins = now.getMinutes();
    const minsDegrees = ((mins / 60) * 360) + ((seconds/60)*6) + 90;
    minsHand.style.transform = `rotate(${minsDegrees}deg)`;

    const hour = now.getHours();
    const hourDegrees = ((hour / 12) * 360) + ((mins/60)*30) + 90;
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;
  }

  setInterval(setDate, 1000);

  setDate();

</script>
```

## 모범답안과의 비교

* 나는 시 분 초 선언하였는데 초 분 시 순서대로 선언하는 것이 가독성이 더 좋다.
* 모범답안이 수식에서도 가독성이 더 좋은 듯 하다.. 임의로 계산하기보단 풀어써서 알아보기 쉽게 하는것이 나은 것 같다.
* 모범답안은 .hand라는 클래스 내부에 transform-origin을 정의하였는데 나는 script 내부에서 for문으로 추가해주어서 처음 랜더링 되는 시점에서의 속도차이가 있다.
* 바닐라 js만 건들라는 줄 알았는데 딱히 그건 아닌가보다.

## 느낀점
-이 들어가는 css는 앞 철자를 대문자로 해서 접근하는것도 알고는 있었는데 낯설었다..
ex) transform-origin =>transformOrigin

for in 인덱스
for of 값