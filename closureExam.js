function outerFunc(){
    var x = 10;
    var innerFunc = function(){
        console.log(x);
    }
    return innerFunc;
}

//내부 함수 innerFunc가 변수 inner에게로 반환됨.
//그리고나서, outerFunc는 Lifecycle을 마치고 종료.
//그렇게되면 원래는 x=10 값도 사라져야 하는데
//x=10값을 기억해내서(Lexical Environment에 기억되어져 있음)
//이런 역할을 하는 함수를 클로저(Closure)라고 함.
//클로저는 자신이 생성될때의 환경(Lexical Environment)을 기억하는 함수
//즉시 실행 함수(IIFE : Immediately-invoked Function Express)에서
//클로저를 반환하는 형태로 운영되며,
//상태 유지, 전역변수의 사용 억제, 정보 은닉 등의 용도로 사용
var inner = outerFunc();
inner();