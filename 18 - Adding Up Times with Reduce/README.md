## 20210718 DAY18

## 문제정의
* video태그의 재생시간들을 모두 더해서 시분초의 형태로 반환해야한다.

## 요구조건
* dataset
* querySelector

## 참고한 내용
* querySelectorAll(https://developer.mozilla.org/ko/docs/Web/API/Document/querySelectorAll)
* NodeList(https://developer.mozilla.org/ko/docs/Web/API/NodeList)

## 엘리먼트의 크기 관련 속성

## 내 답안
```javascript
  let videos=Array.from(document.querySelectorAll("[data-time]"));
  
  videos=videos.reduce((acc,ele)=>{
    let time=ele.dataset.time.split(':');
    let minute=parseInt(time[0]);
    let seconds=parseInt(time[1]);

    acc[1]+=minute;
    acc[2]+=seconds;

    acc[1]+=Math.floor(acc[2]/60);
    acc[2]%=60;
    
    acc[0]+=Math.floor(acc[1]/60);
    acc[1]%=60;
    return acc;
  },Array.from({length:3},()=>0))

  console.log(...videos);
```

## 모범 답안
```javascript
  const timeNodes = Array.from(document.querySelectorAll('[data-time]'));

  const seconds = timeNodes
    .map(node => node.dataset.time)
    .map(timeCode => {
      const [mins, secs] = timeCode.split(':').map(parseFloat);
      return (mins * 60) + secs;
    })
    .reduce((total, vidSeconds) => total + vidSeconds);

    let secondsLeft = seconds;
    const hours = Math.floor(secondsLeft / 3600);
    secondsLeft = secondsLeft % 3600;

    const mins = Math.floor(secondsLeft / 60);
    secondsLeft = secondsLeft % 60;

    console.log(hours, mins, secondsLeft);
```

## 모범답안과의 비교
* 초 단위로 한번에 계산해서 나중에 나눴다.
* 함수 메서드들을 여러번 호출하였다. 로직을 여러개로 나눠서 하나씩 처리한다는 점에서 이쪽이 더 깔끔한 것 같다.
* map함수 내부에 parseFloat를 전달하여 숫자를 반환하는 것도 좋은 것 같다.


## 느낀점
* Document 메소드 querySelectorAll() 는 지정된 셀렉터 그룹에 일치하는 다큐먼트의 엘리먼트 리스트를 나타내는 정적(살아 있지 않은) NodeList 를 반환합니다.

* NodeList 가 Array 는 아니지만, forEach() 를 사용하여 반복할 수 있습니다. 또한 Array.from() 을 사용하여 Array 로 변환 할 수도 있습니다. 그러나 일부 오래된 브라우저는 아직NodeList.forEach() 또는 Array.from() 를 구현하지 않았습니다. 이것은 Array.prototype.forEach() 를 사용하여 회피할 수 있습니다. — 이 문서의 예제를 참조하세요.

* 가끔 map을 중첩한 함수형태들을 보면서 깔끔하다고 생각이 들 때가 있다. (python의 zip함수와 같은 함수를 보면서..) 나도 이러한 구조들을 많이 시도해보고 모방해보아야 겠다.