## 20210715 DAY15

## 문제정의
localStorage를 이용하여 데이터를 저장한다.

## 요구조건
* JSON 
* localStorage

## 참고한 내용
* JSON()
* localStorage(https://developer.mozilla.org/ko/docs/Web/API/Window/localStorage)
* HTML 요소의 속성 추가(https://nowonbun.tistory.com/724)
* 이벤트 위임(https://ko.javascript.info/event-delegation)

## 해결 방법
* 로컬스토리지의 값이 빈 값일경우 빈 배열, 그렇지 않을경우 데이터를 받아와서 동기화하였다.
* dataset을 이용하여 id와 value로 관리하였다. 중복을 우려해 index+value를 id로 하였다.
* JSON 객체를 서버와 주고받았다.

## 이벤트 위임
* 컨테이너에 하나의 핸들러를 할당합니다.
* 핸들러의 event.target을 사용해 이벤트가 발생한 요소가 어디인지 알아냅니다.
* 원하는 요소에서 이벤트가 발생했다고 확인되면 이벤트를 핸들링합니다.

## 내 코드
```javascript
  const addItems = document.querySelector('.add-items');
  const itemsList = document.querySelector('.plates');
  const initialState=`<li>Loading Tapas...</li>`;
  const items = JSON.parse(window.localStorage.getItem('examitems'))||[];
  function setItemList(){
    let str=items.reduce((acc,ele,idx)=>{
      acc=acc+
      `<li>
        <input type="checkbox" data-id=${idx+ele}/>
        <label data-id=${idx+ele}>${ele}</label>
      </li>`
      return acc;
    },"")
    itemsList.innerHTML=str;
  }

  function toggleEvent(e){
    if(e.target.tagName==='INPUT'||
      e.target.tagName==='LABEL'){
      let id=e.target.dataset.id;
      let input=document.querySelector(`input[data-id="${id}/"]`);
      input.checked=!input.checked;
    }
  }

  function submitEvent(e){
    e.preventDefault();
    let input=addItems.firstElementChild;
    console.log(input.value);
    items.push(input.value);
    localStorage.setItem('examitems',JSON.stringify(items));
    input.value="";
    setItemList();
  }

  itemsList.addEventListener('click',toggleEvent);
  addItems.addEventListener('submit',submitEvent);
  setItemList();
```

## 모범 답안
```javascript
   const addItems = document.querySelector('.add-items');
  const itemsList = document.querySelector('.plates');
  const items = JSON.parse(localStorage.getItem('items')) || [];

  function addItem(e) {
    e.preventDefault();
    const text = (this.querySelector('[name=item]')).value;
    const item = {
      text,
      done: false
    };

    items.push(item);
    populateList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items));
    this.reset();
  }

  function populateList(plates = [], platesList) {
    platesList.innerHTML = plates.map((plate, i) => {
      return `
        <li>
          <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
          <label for="item${i}">${plate.text}</label>
        </li>
      `;
    }).join('');
  }

  function toggleDone(e) {
    if (!e.target.matches('input')) return; // skip this unless it's an input
    const el = e.target;
    const index = el.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
  }

  addItems.addEventListener('submit', addItem);
  itemsList.addEventListener('click', toggleDone);

  populateList(items, itemsList);
```

## 모범답안과의 비교
~~* 적고 나서 보니 check를 관리하지 않았다..~~ 
* DELETE코드를 관리하는 코드로 수정하였다.
* 모범 답안은 이벤트 위임을 활용하였다. 나도 활용하긴 했는데 무의식적인 활용이다,,, 공부해야겠다..


## 느낀점
* attributes 추가 https://nowonbun.tistory.com/724
* HTML도 하나의 객체여서 HTMLNAME.asdf로 속성에 접근 가능(없는 속성은 undefined이다 초기에)
* 쿼리셀렉터를 꼭 도큐먼트에서 할 필요가 없다.

## 삭제 기능이 추가된 코드
```javascript
  const addItems = document.querySelector('.add-items');
  const itemsList = document.querySelector('.plates');
  const initialState=`<li>Loading Tapas...</li>`;
  const items = JSON.parse(window.localStorage.getItem('delexamitems'))||[];
  let index=items.length;

  function newItem(value,id){
    return {value:value,id:id+value,done:false};
  }

  function setItemList(arr){
    let str;
    if(arr.length===0) str=initialState;
    else{
      str=arr.reduce((acc,ele)=>{
      acc=acc+
      `<li>
        <input type="checkbox" data-id=${ele.id} ${ele.done?'checked':''}/>
        <label data-id=${ele.id}>${ele.value}</label>
        <button data-id=${ele.id}>Delete item</button>
      </li>`
      return acc;
    },"");
    }
    itemsList.innerHTML=str;
  }

  function deleteItem(id,arr){
    let delitemIdx=arr.findIndex(ele=>ele.id===id);
    arr.splice(delitemIdx,1);
    localStorage.setItem('delexamitems',JSON.stringify(arr));
  }

  function pushItem(value,index,arr){
    arr.push(newItem(value,index));
    localStorage.setItem('delexamitems',JSON.stringify(arr));
    index=index++;
  }


  function editCheckItem(index,arr){
    arr[index].done=!arr[index].done
    localStorage.setItem('delexamitems',JSON.stringify(arr));
  }

  function toggleEvent(e){
    e.preventDefault();
    if(e.target.tagName==='INPUT'||
      e.target.tagName==='LABEL'){
      let id=e.target.dataset.id;
      let input=document.querySelector(`input[data-id="${id}"]`);
      input.checked=!input.checked;
      let tmp=items.findIndex(ele=>ele.id===id);
      editCheckItem(tmp,items);
      }
    else if(e.target.tagName==='BUTTON'){
      let id=e.target.dataset.id;
      deleteItem(id,items);
      setItemList(items);
    }
  }
  
  function submitEvent(e){
    e.preventDefault();
    let input=addItems.querySelector('[name="item"]');
    pushItem(input.value,++index,items);
    input.value="";
    setItemList(items);
  }

  itemsList.addEventListener('click',toggleEvent);
  addItems.addEventListener('submit',submitEvent);
  setItemList(items);
```

