# 20210707 DAY7

## 문제정의
배열을 다룬다

## 요구조건
* 배열 메서드에 대한 이해

## 참고한 내용
* 없음

## 해결 방법
배열 메서드를 통해 해결하였다.

## 내 답안
```javascript
    // Some and Every Checks
    // Array.prototype.some() // is at least one person 19 or older?
      console.log(people.some(ele=>ele.year>=2013));
    // Array.prototype.every() // is everyone 19 or older?
      console.log(people.every(ele=>ele.year>=2013));

    // Array.prototype.find()
    // Find is like filter, but instead returns just the one you are looking for
    // find the comment with the ID of 823423
      console.log(comments.find(ele=>ele.id===823423));

    // Array.prototype.findIndex()
    // Find the comment with this ID
    // delete the comment with the ID of 823423
      comments.splice(comments.findIndex(ele=>ele.id===823423),1);
      console.log(comments);
```

## 모범답안
```javascript
    // Some and Every Checks
    // Array.prototype.some() // is at least one person 19?
    // const isAdult = people.some(function(person) {
    //   const currentYear = (new Date()).getFullYear();
    //   if(currentYear - person.year >= 19) {
    //     return true;
    //   }
    // });

    const isAdult = people.some(person => ((new Date()).getFullYear()) - person.year >= 19);

    console.log({isAdult});
    // Array.prototype.every() // is everyone 19?

    const allAdults = people.every(person => ((new Date()).getFullYear()) - person.year >= 19);
    console.log({allAdults});

    // Array.prototype.find()
    // Find is like filter, but instead returns just the one you are looking for
    // find the comment with the ID of 823423


    const comment = comments.find(comment => comment.id === 823423);

    console.log(comment);

    // Array.prototype.findIndex()
    // Find the comment with this ID
    // delete the comment with the ID of 823423
    const index = comments.findIndex(comment => comment.id === 823423);
    console.log(index);

    // comments.splice(index, 1);

    const newComments = [
      ...comments.slice(0, index),
      ...comments.slice(index + 1)
    ];

```

## 모범답안과의 비교
* date객체 대신 그냥 하드코딩을 하였다.

## 느낀점
* 그닥 없다..
