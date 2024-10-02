const person = {
    name: '김철수',
    birthYear: 1988,
    calcAge: function(){
        console.log(2023 - this.birthYear);
    }
}

person.calcAge(); //35

const calculateAge = person.calcAge;
calculateAge(); 
/*
calculateAge는 function(){ console.log(2023 - this.birthYear) ;}을 참조하게 되고,
따라서, this.birthYear의 this는 어떠한 값도 가르키지 않기 때문에
this.birthYear의 값은 numll이 됨. 2023-null이 되는 연산이 만들어 지므로
NaN이 발생
*/

//NaN : Not A Number : 숫자가 아닌게 연산을 하려면 하거나 0을 0으로 나누면 발생


//참조할 변수가 영역내에 위치하면 영역내의 변수값을 가져오고,
//그렇지 않으면 상위 영역내에 있는 변수값을 가져온다. --> 렉시컬 스코핑(Lexical Scoping)
//이렇게 계속 상위 영역으로 찾아가는 것을 스코프 체인(Scope Chain)
var name = 'zero';
function log(){
    console.log(name);
}

function wrapper(){
    var name = 'nero';
    log(); //함수를 호출한 곳이 아닌 이 함수가 선언된 곳에서 제일 가까운 곳에 있는 변수를 참조
}
wrapper();

const obj = { //네임스페이스
    a: 0,
    b: 1,
}

const obj1 = {
    a: 0,
    b: 1,
}

//구조분해할당 예제 : 배열이나 객체의 속성을 분해해서 그 값을 개별 변수에 담을 수 있도록 하는 거...
let users = ['Mike', 'Tom', 'Jane'];
//let [users1, users2, users3] = users;

//console.log(users1);

let str = "Mike-Tom-Jane";
let [user1, users2, users3] = str.split('-'); //-를 분리자(delimit)로 인식해서 문자열을 분리
console.log(users2);

//let [a,b,c] = [1,2];
//console.log(`a=${a}, b=${b}, c=${c}`);

let [a=3, b=4, c=5] = [1,2];
console.log(`a=${a}, b=${b}, c=${c}`);

let [u1, ,u2] = ['Mike', 'Tom', 'Jane'];
console.log(u1);
console.log(u2);

let a1 = 1;
let b1 = 2;
[a1, b1] = [b1, a1];
console.log(`a1 = ${a1}, b1 = ${b1}`);

let user11 = {
    name11: 'Jane',
    age: 10,
    gender: 'female'
};
let {name11, age, gender} = user11;
console.log(name11);