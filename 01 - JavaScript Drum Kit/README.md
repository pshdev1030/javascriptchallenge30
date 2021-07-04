# 20210701 DAY1

## 문제정의 
해당하는 키보드를 누를 때 버튼이 눌린것을 화면에 표시하고 소리를 재생하기

## 요구조건
* audio 태그 다루기
* 키보드에 이벤트 등록하기 (해당 버튼에 css추가 및 소리 재생)

## 참고한 내용
* vanilla js 키보드 이벤트
* css 속성 선택자
* queryselector
* audio 태그 재생

## 해결 방법
window.addEventListener를 통해서 해결하였다.
<br>
해당하는 키에 audio태그의 play() 메서드를 등록하고 classList에 'playing'을 등록하였다.

재생시 딜레이 문제가 발생하였다.
<br>
이는 keydown이벤트에 currentTime=0을 두어 처음부터 재생되도록 하였다.

## 내 답안
```html
<script>
  const keyDownEvent=e=>{
    const {keyCode}=e;
      const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
      const key = document.querySelector(`div[data-key="${keyCode}"]`);
      if(!audio||!key) return ;
      
      audio.currentTime=0;
      audio.play();
      key.classList.add("playing");
  }

  const keyUpEvent=e=>{
    const {keyCode}=e;
      const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
      const key = document.querySelector(`div[data-key="${keyCode}"]`);
      if(!audio||!key) return ;
      
      key.classList.remove("playing");
  }
  
  window.addEventListener("keydown",keyDownEvent);
  window.addEventListener("keyup",keyUpEvent);

</script>
```

## 모범답안
```html
<script>
  function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('playing');
  }

  function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
    if (!audio) return;

    key.classList.add('playing');
    audio.currentTime = 0;
    audio.play();
  }

  const keys = Array.from(document.querySelectorAll('.key'));
  keys.forEach(key => key.addEventListener('transitionend', removeTransition));
  window.addEventListener('keydown', playSound);
</script>
```

## 모범답안과의 비교
나는 keyup과 keydown을 이용하여 이벤트를 등록하였는데
모범답안에서는 transitionend를 이용하여 이벤트를 등록하였다.

또한 습관적으로 콜백함수를 만들어서 등록하였는데,
키를 누르자마자 발생하는 이벤트기 때문에 굳이 콜백함수의 형태로 전달하지 않아도 되었다.

차이는 없지만 가독성면에서 모범답안이 더 알아보기 쉬웠던 것 같다.

## 느낀점
vanilla js에 다뤄보지 않은 부분이 생각보다 많다는 것을 다시금 느꼈다.
addEventListener는 복수의 동일 이벤트 타입 리스너를 등록할 수 있다..