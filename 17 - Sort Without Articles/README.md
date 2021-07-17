## 20210717 DAY17

## 문제정의
* 정규표현식으로 The,An,a제외하고 단어 비교

## 요구조건
* 정규 표현식에 대한 이해
## 참고한 내용
* 정규표현식(https://wikidocs.net/4308,https://regexper.com/#%5B%5Eabc%7Ckqw%5D)

## 엘리먼트의 크기 관련 속성

## 내 답안
```javascript
const bands = ['The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil', 'Norma Jean', 'The Bled', 'Say Anything', 'The Midway State', 'We Came as Romans', 'Counterparts', 'Oh, Sleeper', 'A Skylit Drive', 'Anywhere But Here', 'An Old Dog'];

function reg(str){
  return str.replace(/^(a |the |an )/i,'').trim();
}

const arrsort=bands.sort((a,b)=>{
  if(reg(a)>reg(b)){
    return 1;
  }else{
    return -1;
  }
});

let innerstr=arrsort.map(ele=>`<li>${ele}</li>`).join('');

document.querySelector('#bands').innerHTML=innerstr;
```

## 모범 답안
```javascript
const bands = ['The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil', 'Norma Jean', 'The Bled', 'Say Anything', 'The Midway State', 'We Came as Romans', 'Counterparts', 'Oh, Sleeper', 'A Skylit Drive', 'Anywhere But Here', 'An Old Dog'];

function strip(bandName) {
  let k=bandName.replace(/^(a |the |an )/i, '').trim();
}

const sortedBands = bands.sort((a, b) => strip(a) > strip(b) ? 1 : -1);

document.querySelector('#bands').innerHTML =
  sortedBands
    .map(band => `<li>${band}</li>`)
    .join('');

console.log(sortedBands);
```

## 모범답안과의 비교
* 비슷하다


## 느낀점
