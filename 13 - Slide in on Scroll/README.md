
# 20210705 DAY5

## 문제정의
텍스트를 입력받고 이를 시나 주에 포함하는 도시를 출력한다.

## 요구조건
* 정규표현식...

## 참고한 내용
* 스크롤( https://velog.io/@sa02045/Scroll-%EC%A0%95%EB%A6%AC )
* height( https://blogpack.tistory.com/706 )

## 해결 방법
* 스크롤 시 마다 이벤트를 호출하여 해결하였다.


## 내 답안
```javascript
    const imgs=document.querySelectorAll('img');
    function slideHandler(e){
      imgs.forEach(ele=>{
        const curScroll=window.innerHeight+scrollY;
        const eleHalf=ele.offsetTop+ele.height/2;
        const eleBottom=ele.offsetTop+ele.height;

        if(curScroll>eleHalf&&window.scrollY<eleBottom){
          ele.classList.add('active');
        }
        else{
          ele.classList.remove('active');
        }
      }) 
    }
    window.addEventListener('scroll',debounce(slideHandler));
```

## 모범답안
```javascript
    function checkSlide() {
      sliderImages.forEach(sliderImage => {
        // half way through the image
        const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.height / 2;
        // bottom of the image
        const imageBottom = sliderImage.offsetTop + sliderImage.height;
        const isHalfShown = slideInAt > sliderImage.offsetTop;
        const isNotScrolledPast = window.scrollY < imageBottom;
        if (isHalfShown && isNotScrolledPast) {
          sliderImage.classList.add('active');
        } else {
          sliderImage.classList.remove('active');
        }
      });
    }
    window.addEventListener('scroll', debounce(checkSlide));
```

## 모범답안과의 비교
* 거의 다른게 없다 ㅠ

## 느낀점
* offset류들은 브라우저 기준 위치..