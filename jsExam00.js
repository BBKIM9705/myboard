
var a; //a라는 변수 선언 --> var 타입의 변수일 경우 변수 선언시 자동으로 undefined라는 값이 들어감
console.log(a);

console.log(null == undefined); //동등 연산자
console.log(null === undefined); //일치 연산자

//자바스크립트의 일반형 데이터 타입/원시형 데이터 타입
const locationOne = 'korea';
const locationTwo = 'korea';

console.log(locationOne === locationTwo); //값도 같고 타입도 같음


//객체(Object)타입
const locationOne1 = { //자바스크립트 객체 --> 객체가 만들어진 메모리내의 주소를 할당
    country: 'korea',
    country: 'won'
};

const locationTwo1 = {
    country: 'korea',
    currency: 'won'
};

console.log(locationOne1 === locationTwo1); //값은 같으나 주소가 다름

//////////////////////////////////////////////////////////////

let b;
console.log(b);