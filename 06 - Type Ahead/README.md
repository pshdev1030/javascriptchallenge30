# 20210705 DAY5

## 문제정의
텍스트를 입력받고 이를 시나 주에 포함하는 도시를 출력한다.

## 요구조건
* 정규표현식...

## 참고한 내용

## 해결 방법


## 내 답안
```javascript
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const city=[];
const data=fetch(endpoint)
.then(fetcheddata=>fetcheddata.json())
.then(citydata=>city.push(...citydata));

const search=document.querySelector('.search-form > input');
const list=document.querySelector('.suggestions');
const listHTML=list.innerHTML;
let debouncetimer;

function amountCommas(val){
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
  }

function hilight(val,input){
  const reg=new RegExp(`${input}`,'i');
  const result=val.match(reg);
  if(!result) return val ;
  return val.replace(reg,`<span class=hl>${result[0]}</span>`);
}

const searchEvent=(e)=>{
  e.preventDefault();
  if(debouncetimer){
    clearTimeout(debouncetimer);
  }
  debouncetimer=setTimeout(function(){
  const input=e.target.value.toUpperCase();
  if(input.length===0) {
    list.innerHTML=listHTML;
    return ;
  }
  
  const citylist=city.reduce((acc,value)=>{
    if(value.city.toUpperCase().includes(input)||value.state.toUpperCase().includes(input)) {
      acc.push({
        city: value.city,
        state: value.state,
        population:value.population
      });
    }
    return acc;
  },[]);

  list.innerHTML="";

  citylist.forEach(ele=>{
    list.innerHTML+=`<li>
      <span>${hilight(ele.city,input)}, 
      ${hilight(ele.state,input)}</span>
      <span class=population>${amountCommas(ele.population)}</span> 
      </li>`
  })
  },400)
};

search.addEventListener('input',searchEvent);
```

## 모범답안
```javascript
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];
fetch(endpoint)
  .then(blob => blob.json())
  .then(data => cities.push(...data));

function findMatches(wordToMatch, cities) {
  return cities.filter(place => {
    // here we need to figure out if the city or state matches what was searched
    const regex = new RegExp(wordToMatch, 'gi');
    return place.city.match(regex) || place.state.match(regex)
  });
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches() {
  const matchArray = findMatches(this.value, cities);
  const html = matchArray.map(place => {
    const regex = new RegExp(this.value, 'gi');
    const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
    const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
    return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
      </li>
    `;
  }).join('');
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);

```

## 모범답안과의 비교

## 느낀점
* 코테용 정규표현식 정도만 알아두었는데, 이런 색인 작업에 필수로 쓰인다는 것을 알았다.
* 정확히는 input에 해당하는 부분을 하이라이트 하는게 정규표현식을 사용하는 방법이 제일 간단하고 연산도 적을 것 같았다.
* 이번 기회로 알게되서 다행이다. 정규표현식을 완벽하게 다룰 수는 없어도 대강의 이해는 필요할 것 같다.
* 별개로 디바운싱을 적용하였다.
* 별개의 함수로 작성하고 하나의 함수가 하나의 작업만 하도록 해 함수화 하여야 깔끔한 코드를 작성할 수 있는데 이게 꽤나 번거롭다.