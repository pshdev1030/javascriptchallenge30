# 20210705 DAY5

## 문제정의
flex를 다룬다.

## 요구조건
* flex와 속성들에 대한 이해

## 참고한 내용
* 애니메이션

## 해결 방법
flex 속성들을 css에 정의하여 클래스리스트를 추가하는 방식으로 작성하였다.

## 내 답안
```html
  <style>
    html {
      box-sizing: border-box;
      background: #ffc600;
      font-family: 'helvetica neue';
      font-size: 20px;
      font-weight: 200;
    }
    
    body {
      margin: 0;
    }
    
    *, *:before, *:after {
      box-sizing: inherit;
    }

    .panels {
      min-height: 100vh;
      overflow: hidden;
      display:flex;
    }

    .panel {
      background: #6B0F9C;
      box-shadow: inset 0 0 0 5px rgba(255,255,255,0.1);
      color: white;
      text-align: center;
      align-items: center;
      /* Safari transitionend event.propertyName === flex */
      /* Chrome + FF transitionend event.propertyName === flex-grow */
      transition:
        font-size 0.7s cubic-bezier(0.61,-0.19, 0.7,-0.11),
        flex 0.7s cubic-bezier(0.61,-0.19, 0.7,-0.11),
        background 0.2s;
      font-size: 20px;
      background-size: cover;
      background-position: center;
      justify-content: center;
      align-items: center;
      display:flex;
      flex-direction:column;
      flex-grow:1;
    }

    .panel1 { background-image:url(https://source.unsplash.com/gYl-UtwNg_I/1500x1500); }
    .panel2 { background-image:url(https://source.unsplash.com/rFKUFzjPYiQ/1500x1500); }
    .panel3 { background-image:url(https://images.unsplash.com/photo-1465188162913-8fb5709d6d57?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&w=1500&h=1500&fit=crop&s=967e8a713a4e395260793fc8c802901d); }
    .panel4 { background-image:url(https://source.unsplash.com/ITjiVXcwVng/1500x1500); }
    .panel5 { background-image:url(https://source.unsplash.com/3MNzGlQM7qs/1500x1500); }

    /* Flex Children */
    .panel > * {
      margin: 0;
      width: 100%;
      transition: transform 0.5s;
    }

    .panel p {
      text-transform: uppercase;
      font-family: 'Amatic SC', cursive;
      text-shadow: 0 0 4px rgba(0, 0, 0, 0.72), 0 0 14px rgba(0, 0, 0, 0.45);
      font-size: 2em;
    }
    
    .panel p:nth-child(2) {
      font-size: 4em;
    }

    .panel p:nth-child(1) {
      visibility:hidden;
    }

    .panel p:nth-child(3) {
      visibility:hidden;
    }

    .panel.open {
      flex-grow:5;
      font-size: 40px;
    }

  </style>

    <script>
    const panel=document.getElementsByClassName('panel');
    for(x of panel){
      let first=x.firstElementChild;
      let last=x.lastElementChild;
      let cur=x;
      x.addEventListener('click',()=>{
        cur.classList.toggle('open');
        first.style.visibility=first.style.visibility === '' ? 'visible':'';
        last.style.visibility=last.style.visibility === '' ? 'visible':'';
      })
    }

  </script>

```

## 모범답안
```html
  <style>
    html {
      box-sizing: border-box;
      background: #ffc600;
      font-family: 'helvetica neue';
      font-size: 20px;
      font-weight: 200;
    }
    
    body {
      margin: 0;
    }
    
    *, *:before, *:after {
      box-sizing: inherit;
    }

    .panels {
      min-height: 100vh;
      overflow: hidden;
      display: flex;
    }

    .panel {
      background: #6B0F9C;
      box-shadow: inset 0 0 0 5px rgba(255,255,255,0.1);
      color: white;
      text-align: center;
      align-items: center;
      /* Safari transitionend event.propertyName === flex */
      /* Chrome + FF transitionend event.propertyName === flex-grow */
      transition:
        font-size 0.7s cubic-bezier(0.61,-0.19, 0.7,-0.11),
        flex 0.7s cubic-bezier(0.61,-0.19, 0.7,-0.11),
        background 0.2s;
      font-size: 20px;
      background-size: cover;
      background-position: center;
      flex: 1;
      justify-content: center;
      display: flex;
      flex-direction: column;
    }

    .panel1 { background-image:url(https://source.unsplash.com/gYl-UtwNg_I/1500x1500); }
    .panel2 { background-image:url(https://source.unsplash.com/rFKUFzjPYiQ/1500x1500); }
    .panel3 { background-image:url(https://images.unsplash.com/photo-1465188162913-8fb5709d6d57?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&w=1500&h=1500&fit=crop&s=967e8a713a4e395260793fc8c802901d); }
    .panel4 { background-image:url(https://source.unsplash.com/ITjiVXcwVng/1500x1500); }
    .panel5 { background-image:url(https://source.unsplash.com/3MNzGlQM7qs/1500x1500); }

    /* Flex Items */
    .panel > * {
      margin: 0;
      width: 100%;
      transition: transform 0.5s;
      flex: 1 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .panel > *:first-child { transform: translateY(-100%); }
    .panel.open-active > *:first-child { transform: translateY(0); }
    .panel > *:last-child { transform: translateY(100%); }
    .panel.open-active > *:last-child { transform: translateY(0); }

    .panel p {
      text-transform: uppercase;
      font-family: 'Amatic SC', cursive;
      text-shadow: 0 0 4px rgba(0, 0, 0, 0.72), 0 0 14px rgba(0, 0, 0, 0.45);
      font-size: 2em;
    }
    
    .panel p:nth-child(2) {
      font-size: 4em;
    }

    .panel.open {
      flex: 5;
      font-size: 40px;
    }
    
    @media only screen and (max-width: 600px) {
      .panel p {
        font-size: 1em;
      }
    }
  </style>
  <script>
    const panels = document.querySelectorAll('.panel');

    function toggleOpen() {
      console.log('Hello');
      this.classList.toggle('open');
    }

    function toggleActive(e) {
      console.log(e.propertyName);
      if (e.propertyName.includes('flex')) {
        this.classList.toggle('open-active');
      }
    }

    panels.forEach(panel => panel.addEventListener('click', toggleOpen));
    panels.forEach(panel => panel.addEventListener('transitionend', toggleActive));
  </script>

```

## 모범답안과의 비교
* 클릭하면 글자가 보이고 너비가 커지는 것 까지는 구현했다.
* 글자가 위에서 떨어지는 애니메이션 같은 걸 구현을 못 하였다.
* 보고 클로닝하는거라 디테일도 다른 부분이 있다.

## 느낀점
* 애니메이션쪽이 좀 막힌다.. 뭔가 시간을 투자해서 공부해야하는 건 맞는데 아깝기도 하고..
* transitionend 이벤트에 등록해놓은 transition propertyname으로 이벤트 처리를 할 수 있다.

* querySelectorAll 이랑 getElementsby~ 메서드랑 반환형이 다른것 같다. querySelectorAll은 forEach 메서드가 사용이 가능하다..

