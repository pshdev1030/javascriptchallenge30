## 202107229 DAY 21

## 문제 정의
* Navigator를 다룬다.

## 요구 사항
* 문제 정의와 같다.

## 참고한 내용
* Navigator(https://developer.mozilla.org/ko/docs/Web/API/Navigator)

## 내 코드
```javascript
    const nav = document.querySelector('.arrow');
    const speed = document.querySelector('.speed-value');

    navigator.geolocation.watchPosition((data) => {
      speed.textContent = data.coords.speed;
      nav.style.transform = `rotate(${data.coords.heading}deg)`;
    }, (err) => {
      console.error(err);
    });
```
## 모범 답안
```javascript
    const arrow = document.querySelector('.arrow');
    const speed = document.querySelector('.speed-value');

    navigator.geolocation.watchPosition((data) => {
      console.log(data);
      speed.textContent = data.coords.speed;
      arrow.style.transform = `rotate(${data.coords.heading}deg)`;
    }, (err) => {
      console.error(err);
    });
```
## 모범 답안과 차이점
* 한번 다루어봤던 navigator라 어렵지 않게 할 수 있었다.

## 느낀점