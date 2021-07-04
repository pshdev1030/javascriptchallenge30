# 20210704 DAY4

## 문제정의
배열로 여러 작업들을 한다.

## 요구조건
* 배열 메서드에 대한 이해
* 배열에 대한 이해

## 참고한 내용
* arr.sort()

## 해결 방법
배열의 메서드를 사용하여 해결하였다.

## 내 답안
```javascript
     // Array.prototype.filter()
    // 1. Filter the list of inventors for those who were born in the 1500's.
    let array_of_1500s= inventors.filter(ele=>{
      if(ele.year<1600&&ele.year>=1500) return ele;
    });
    console.table(array_of_1500s);

    // Array.prototype.map()
    // 2. Give us an array of the inventors first and last names
    let array_of_names=inventors.map(
      ele=>{
        return ele.first+ '  '+ele.last;
    })
    console.log(array_of_names);

    // Array.prototype.sort()
    // 3. Sort the inventors by birthdate, oldest to youngest
    let array_of_birthdate=inventors.slice().sort((a,b)=>{
      return a.year-b.year;
    })
    console.table(array_of_birthdate);

    // Array.prototype.reduce()
    // 4. How many years did all the inventors live all together?
    const year_of_lives=inventors.reduce((acc,cur)=>{
      return acc+=cur.passed-cur.year;
    },0)
    console.log(year_of_lives);

    // 5. Sort the inventors by years lived
    let array_of_lived=inventors.slice().sort((a,b)=>{
      return (b.passed-b.year)-(a.passed-a.year);
    })
    console.table(array_of_lived);

    // 6. create a list of Boulevards in Paris that contain 'de' anywhere in the name
    // https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris
    const array_of_de=people.filter(ele=>{
      if(ele.includes('de')){
        return ele;
      }
    })
    console.log(array_of_de);

    // 7. sort Exercise
    // Sort the people alphabetically by last name
    let array_of_lastname=people.slice().sort((a,b)=>{
      const nameofa=a.split(',')[0];
      const nameofb=b.split(',')[0];
      if(nameofa<nameofb) return -1;
      else return 1;
    })
    console.log(array_of_lastname);

    // 8. Reduce Exercise
    // Sum up the instances of each of these
    const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck' ];

    const map=data.reduce((acc,cur)=>{
      if(!acc[cur]){
        acc[cur]=0;
      }
        acc[cur]++;
      return acc;
    },{})
    console.log(map);

```

## 모범답안
```javascript
    // Array.prototype.filter()
    // 1. Filter the list of inventors for those who were born in the 1500's
    const fifteen = inventors.filter(inventor => (inventor.year >= 1500 && inventor.year < 1600));

    console.table(fifteen);

    // Array.prototype.map()
    // 2. Give us an array of the inventor first and last names
    const fullNames = inventors.map(inventor => `${inventor.first} ${inventor.last}`);
    console.log(fullNames);

    // Array.prototype.sort()
    // 3. Sort the inventors by birthdate, oldest to youngest
    // const ordered = inventors.sort(function(a, b) {
    //   if(a.year > b.year) {
    //     return 1;
    //   } else {
    //     return -1;
    //   }
    // });

    const ordered = inventors.sort((a, b) => a.year > b.year ? 1 : -1);
    console.table(ordered);

    // Array.prototype.reduce()
    // 4. How many years did all the inventors live?
    const totalYears = inventors.reduce((total, inventor) => {
      return total + (inventor.passed - inventor.year);
    }, 0);

    console.log(totalYears);

    // 5. Sort the inventors by years lived
    const oldest = inventors.sort(function(a, b) {
      const lastInventor = a.passed - a.year;
      const nextInventor = b.passed - b.year;
      return lastInventor > nextInventor ? -1 : 1;
    });
    console.table(oldest);

    // 6. create a list of Boulevards in Paris that contain 'de' anywhere in the name
    // https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris

    // const category = document.querySelector('.mw-category');
    // const links = Array.from(category.querySelectorAll('a'));
    // const de = links
    //             .map(link => link.textContent)
    //             .filter(streetName => streetName.includes('de'));

    // 7. sort Exercise
    // Sort the people alphabetically by last name
    const alpha = people.sort((lastOne, nextOne) => {
      const [aLast, aFirst] = lastOne.split(', ');
      const [bLast, bFirst] = nextOne.split(', ');
      return aLast > bLast ? 1 : -1;
    });
    console.log(alpha);

    // 8. Reduce Exercise
    // Sum up the instances of each of these
    const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck', 'pogostick'];

    const transportation = data.reduce(function(obj, item) {
      if (!obj[item]) {
        obj[item] = 0;
      }
      obj[item]++;
      return obj;
    }, {});

    console.log(transportation);
```

## 모범답안과의 비교

## 느낀점
* map을 만드는 문제는 좀 참신했다.

## arr.sort
* 문자열로 만들고 utf-16 코드 유닛 값을 기준으로 순서를 정렬한다.
* 숫자 정렬에 적합하지 않다.
* 반환값은 1 or 0 or -1 단 변경은 -1에서만 일어난다.
  * -1일 경우만 순서를 바꾼다.
  * sort((a,b)=>b-a) a=arr[1] b=arr[0]이 들어옴( 순서가 반대다 );
    * sort((next,prev)=>prev-next); 이런식으로 작성해야 한다.

## reference
https://velog.io/@jakeseo_me/Javascript-Sort%ED%95%A8%EC%88%98%EC%97%90-%EB%8C%80%ED%95%9C-%EC%9E%A1%EC%A7%80%EC%8B%9D