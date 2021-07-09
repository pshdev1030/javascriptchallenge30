# 202107010 DAY10

## 문제정의
* 체크박스의 다중처리를 구현하는 문제이다.

## 요구조건
* shift를 누르면 사이에 있는 것들을 다같이 true처리한다.

## 참고한 내용
* input 태그의 checked


## 해결 방법
* 전날 챌린지처럼 last에 최근 클릭한 input을 저장하고 배열의 forEach를 이용하여 해결하였다.


## 내 답안
```javascript
let last;
  const checklist=document.querySelectorAll(' .inbox input');
  function clickEvent(e){
    if(e.shiftKey&&this.checked){
      let between=false;
      checklist.forEach(ele=>{
        if(ele===this||ele===last){
          between=!between;
        }
        if(between){
          ele.checked=true;
        }
      })
    }
      last=this;
  };
  checklist.forEach(ele=>ele.addEventListener('click',clickEvent));
```

## 모범답안
```javascript
const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');

let lastChecked;

function handleCheck(e) {
  // Check if they had the shift key down
  // AND check that they are checking it
  let inBetween = false;
  if (e.shiftKey && this.checked) {
    // go ahead and do what we please
    // loop over every single checkbox
    checkboxes.forEach(checkbox => {
      console.log(checkbox);
      if (checkbox === this || checkbox === lastChecked) {
        inBetween = !inBetween;
        console.log('Starting to check them in between!');
      }

      if (inBetween) {
        checkbox.checked = true;
      }
    });
  }

  lastChecked = this;
}

checkboxes.forEach(checkbox => checkbox.addEventListener('click', handleCheck));
```

## 모범답안과의 비교
* 비슷한 방법으로 구현했다.
* 이벤트를 등록하는 코드에서 id를 넣어서 구현도 해보고 여러 방법을 이용했는데 괜찮은 것 같다.

## 느낀점
* 화살표 함수가 아닌 일반 함수로 작성하여 바인딩된 this를 쓸 수 있었다.
* ~~구현하고 나서 true뿐만 아니라 토글을 구현해보려했는데 알고리즘이 명확하게 정리되지 않아서 구현하는데 예외경우를 완벽하게 처리하지 못하여 원래대로 납두었다. ~~
* 기본 이벤트가 있기 떄문에 구현이 약간 헷갈렸다. 특정 경우에 대한 처리만 적어주면 될 것 같다.
* 일단 돌아가는게 중요한거 같다. 적을 떄부터 가독성을 고려하다보니 적는게 좀 막힌다..


## 토글
```javascript
  let last;
  const checklist=document.querySelectorAll(' .inbox input');
  function clickEvent(e){
    if(e.shiftKey&&this.checked&&last!==undefined&&last!==this){
      let between=false;
      checklist.forEach(ele=>{
        if(ele===this||ele===last){
          between=!between;
        }
        if(between){
          ele.checked=true;
        }
      })
    }
    else if(e.shiftKey&&!this.checkedlast!==undefined&&last!==this){
      let between=false;
      checklist.forEach(ele=>{
        if(ele===last){
          between=!between;
          ele.checked=false;
        }
        if(ele===this){
          between=!between;
        }
        if(between){
          ele.checked=false;
        }
      })
    }
      last=this;
  };
  checklist.forEach(ele=>ele.addEventListener('click',clickEvent));
```
* 조건문을 통해 구현하였다. toggle같은경우 현재 컨디션에 따라 달라져서 처리해야할 예외가 오히려 많아져서 코드가 길어져서 false와 true로 구현하였다.
* clickEvent 함수 내부의 작업의 구성이 비슷하여서 둘을 함수로 빼서 작성하면 가독성 면에서 훨씬 좋을 것 같다. 코드도 재사용 하고..!