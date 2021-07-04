# 20210703 DAY3

## 문제정의
input의 값에 따라 이미지를 후처리 해야한다.

## 요구조건
* input의 값을 얻어와서 이미지를 변형하면 된다.
* filter

## 참고한 내용
* input값 변화 실시간 감지
* blur(filter)
* 

## 해결 방법
getElement로 html을 얻어와서 이벤트를 등록하였다.
<br>
html의 속성값에 접근하여 js로 핸들링할 수 있다.
<br>
input의 value값으로 이미지에 효과를 주었다.
<br>
margin값을 spacing값에 따라 변화시키고 backgroundColor를 주었다.



## 내 답안
```html
  <script>
    const img=document.getElementsByTagName('img').item(0);
    const hl=document.getElementsByClassName('hl').item(0);

    const spacing= document.getElementById('spacing');
    function spacingEvent(){
      img.style.padding=`${spacing.value}px`;
    }
    spacing.addEventListener('input',spacingEvent)

    const base= document.getElementById('base');
    function baseColorEvent(){
      img.style.backgroundColor=`${base.value}`;
      hl.style.color=`${base.value}`;
    }
    base.addEventListener('input',baseColorEvent);

    const blur= document.getElementById('blur');
    function blurEvent(){
      img.style.filter=`blur(${blur.value}px)`;
    }
    blur.addEventListener('input',blurEvent);
  
    spacingEvent();
    baseColorEvent();
    blurEvent();
  </script>
```

## 모범답안
```html
  <script>
    const inputs = document.querySelectorAll('.controls input');

    function handleUpdate() {
      const suffix = this.dataset.sizing || '';
      document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
    }

    inputs.forEach(input => input.addEventListener('change', handleUpdate));
    inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));
  </script>
```

## 모범답안과의 비교
함수를 만들고 등록하면서도 비슷한 작업을 한다는 느낌을 많이 받았다.
<br>
html을 가져와서 html에 html의 value만큼의 css효과를 주는건데 모범답안에서는 html의 name과 value로 가독성 좋고 짧게 작성 하였다.
<br>
이벤트 함수에서 this로 접근하는 방식은 나도 처음에 그렇게 작성하였다가 맨 처음 열었을 때 이미지에 효과가 적용되지 않아서 this를 안 쓰는 방향으로 수정했다.
<br>
모범답안에선 js로 style을 실시간으로 수정하는게 아니라 초기에 css로 작성해서 등록해놓았다..
<br>
css에서 태그 안에 css변수를 이용하여 등록 후 js에서 변수명을 가져와서 수정하였다.
<br>


## 느낀점
* addEventListener로 다룰 수 있는 것이 생각보다 많다..
* input의 type이 되게 많다..
* css중 filter는 처음 사용해봤는데 신기했다.
* --로 css 변수를 사용하는 방식도 처음 접했다

## css 변수
* --변수이름 : 값;
* 사용 var(변수이름);

## data-
* data-sizing으로 html의 attribute로 등록해놓고 이를 js로 접근하여 값을 가져왔다.
* data뿐만 아니라 변화시킬 속성도 html의 속성으로 등록해놓고 js로 접근해서 수정하였다.