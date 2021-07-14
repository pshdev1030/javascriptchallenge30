
# 20210714 DAY14

## 문제정의
객체와 배열의 여러가지 복사 방식을 알아본다.

## 요구조건
* spread문법
* 객체 메서드
* 배열 메서드

## 참고한 내용
* JSON.parse,JSON.stringify (https://ithub.tistory.com/54)
* Object.assign( https://blogpack.tistory.com/706 )

## 해결 방법
* 관련 메서드를 이용하여서 해결하였다.
* 모범답안을 참조하여 공부하였다.

## Object.assign(target,source)
* 열거할 수 있는 하나 이상의 출처 객체로부터 대상 객체로 속성을 복사할 때 사용한다. 대상 객체를 반환한다.
* 깊은 복사
```javascript
  const src={a:1,b:2}
  const Obj=Object.assign({},src);
```

* 값 추가
```javascript
  const src={a:1,b:2}
  const Obj=Object.assign({},src),{c:3,d:4};
```

## JSON.parse
* string 객체를 json객체로 변환한다.
## JSON.stringify
* json객체를 string객체로 변환한다.

* 깊은 복사
```javascript
const src={a:1,b:2}
const obj=JSON.parse(JSON.stringify(src));
```

## spread 연산자
* 1 level 복사에선 깊은복사가 된다. 2level부터는 안 됨
```javascript
const src={a:1,b:2}
const obj={...src};

const src2=[1,2];
const arr=[...src];
```

## 느낀점
* offset류들은 브라우저 기준 위치..