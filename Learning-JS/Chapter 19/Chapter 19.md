# Chapter 19. 제이쿼리

제이쿼리는 DOM을 조작하거나 Ajax 요청을 실행할 때 널리 쓰이는 라이브러리이다.
사실 제이쿼리로 할 수 있는 일은 모두 DOM API로도 할 수 있다.

제이쿼리의 장점

- 제이쿼리를 사용하면 브라우저 호환성을 걱정하지 않아도 된다. 특히 오래된 브라우저를 지원해야 할 때 골치 아픈 일이 줄어든다.
- 제이쿼리가 제공하는 Ajax API는 무척 단순한 편이다. 요즘은 웹사이트에서 Ajax를 아주 많이 사용하므로 이 장점은 무시할 수 없다.
- 제이쿼리는 내장된 DOM API를 더 유용하고 단순하게 바꾼 메서드를 제공한다.

제이쿼리는 DOM API로 직접 구현하려면 시간이 아주 많이 걸리는 기능을 간편하게 제공한다.

### 19.1 맥가이버 나이프, 달러 기호

제이쿼리는 자바스크립트에서 달러 기호를 식별자로 쓸 수 있다는 장점을 활용한 첫 번째 라이브러리 중 하나이다.
프로젝트에서 제이쿼리를 사용할 때는 jQuery나 \$를 쓴다.

### 19.2 제이쿼리 불러오기

제이쿼리를 불러오는 가장 쉬운 방법은 CDN을 이용하는 것이다.

### 19.3 DOM 기다리기

브라우저가 HTML 파일을 읽고 해석하고 렌더링하는 과정은 복잡하다.

제이쿼리에서는 브라우저가 페이지를 완전히 읽고 DOM을 구축한 다음에만 호출되는 콜백 안에 코드를 작성해서 이런 문제를 피할 수 있다.

### 19.4 제이쿼리로 감싼 DOM 요소

제이쿼리로 DOM을 조작할 때 가장 많이 쓰는 방법은 제이쿼리로 DOM 요소를 감싸는 방법이다.
제이쿼리로 DOM을 조작할 때는 우선 DOM 요소 셋(셋이라고 했지만, 요소 하나만 있을 때도 있고 아예 없을 때도 있습니다)을 감싸는 제이쿼리 객체를 만든다.

제이쿼리 함수(\$이나 jQuery)로 DOM 요소 셋을 감싼 것을 제이쿼리 객체라고 부른다.
제이쿼리 함수를 호출할 때는 주로 CSS 선택자나 HTML을 사용한다.

CSS 선택자로 제이쿼리를 호출하면 해당 선택자에 일치하는 제이쿼리 객체가 반환된다.
이 객체는 document.querySelectorAll이 반환하는 컬렉션과 거의 비슷하다.

HTML로 제이쿼리를 호출하면 그에 맞는 DOM 요소가 새로 만들어진다.

### 19.5 요소 조작

제이쿼리를 쓰면 매우 쉽게 콘텐츠를 추가하거나 제거할 수 있다.

제이쿼리에는 text와 html 메서드가 있다.
이들은 각각 요소의 textContent, innerHTML 프로퍼티에 대응한다.

html 메서드를 쓰면 DOM을 수정할 수 있다.

제이쿼리는 아주 쉽게 여러 요소를 동시에 수정할 수 있다.
DOM API로 같은 일을 하려면 document.querySelectorAll()이 반환하는 컬렉션을 순회하면서 작업해야 한다.
제이쿼리는 기본적으로 제이쿼리 객체에 들어있는 모든 요소에 같은 작업을 하면서 루프 실행을 대신해 준다.

요소를 제거할 때는 제이쿼리 객체에서 remove를 호출한다.

제이쿼리 메서드는 모두 제이쿼리 객체를 반환한다.
반환된 객체에서 다시 메서드를 호출하는 식으로, 메서드를 체인으로 연결할 수 있다.
체인을 사용하면 아주 간단히 여러 요소를 조작할 수 있다.

append 메서드는 제이쿼리 객체에 들어있는 모든 요소에 매개변수로 넘긴 콘텐츠를 이어 붙인다.

append는 일치하는 요소에 자식을 추가한다.
형제를 삽입할 때는 before와 after를 사용한다.

삽입 메서드는 삽입할 '자리'에 호출하지만, 반대로 삽입할 '요소'에서 호출하는 appendTo, insertBefore, insertAfter 메서드도 있다.

제이쿼리에서는 요소의 스타일도 쉽게 바꿀 수 있다.
클래스를 추가할 때는 addClass, 클래스를 제거할 때는 removeClass를 사용한다.
클래스에 토글하는 toggleClass 메서드도 있다.
이 메서드는 요소에 특정 클래스가 없으면 추가하고, 있으면 제거한다.
css 메서드를 써서 스타일을 직접 수정할 수도 있다.
:even과 :odd 선택자를 써서 짝수 번째, 홀수 번째 요소를 선택할 수도 있다.

filter는 셋 요소 일치 선택자에 맞는 요소만 남도록 선택 범위를 줄인다.

not은 filter의 반대이다.

find는 주어진 선택자에 일치하는 자손만 남긴다.

### 19.6 제이쿼리 취소

제이쿼리 객체로 감싼 것을 취소하고 DOM 요소에 직접 접근하려면 get 메서드를 사용한다.

### 19.7 Ajax

제이쿼리에는 Ajax 호출을 간편하면서도 세밀히 컨트롤할 수 있는 메서드가 있다.
가장 널리 쓰는 Ajax 호출을 간편하게 바꾼 get과 post 메서드도 있다.
이들 메서드는 콜백을 지원하기도 하지만, 서버 응답을 처리할 때 권장하는 방법인 프라미스를 반환하기도 한다.