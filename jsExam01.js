var a; //undefined로 초기화
console.log(a); //undefined --> 왜???

console.log(b); //memory Reference 에러

const name = {
    eng: 'kim',
    kor: '김'
}

console.log(name);
console.log(name.kor);
name.eng = 'park';
console.log(name);

const name1 = '김철수';
const age = 25;

//이름은 김철수이고 나이는 25세 입니다.
console.log('이름은 ' + name1 + '이고 나이는 ' + age + '세 입니다.');
console.log(`이름은 ${name1}이고 나이는 ${age}세 입니다.`);

var b = 1;  //var 변수는 중복 선언이 가능
if(true){
    b = 5;
} //블록 레벨 스코프가 안 먹음 --> 전역(Global)변수
console.log(b); //5 출력

var c = 5; //함수 레벨의 스코프
function aa(){
    var c = 30;
    console.log("함수내부의 c = " + c);
}
aa(); //30, var 변수는 함수내부에서 선언 및 초기화될 경우에만 영향을 준다
console.log(c); //5

let d = 20; //블록 레벨 스코프
if(true) {
    let d = 30;
}

console.log(d); //20

console.log(typeof(c));
let cc = '안녕';
console.log(typeof(cc));

//함수 선언식 --> 호이스트 처리
function main(){ //함수 선언, 초기화, 할당을 동시에 처리
    console.log("hello");
}
main(); //함수 실행

//함수 표현식 --> 호이스트 처리가 안됨
const main1 = function(){ //익명 함수
    console.log("hello");
}
main1();

//화살표 함수
const main2 = () => {
    console.log("hello");
}
main2();

function mul(num) {
    return num*num;
}

function mulNum(func, number){
    return func(number);
}

console.log(mulNum(mul,3));

const person = {
    name: "홍길동", //property
    birthday:"19950520",
    pId : "12345",
    sayName: function(){
        return this.name;
    }

};

console.log(person.name);

let bb = 'age';
const user = {
    name: 'Mike',
    [bb] : 30
}

console.log(user);

const user1 = {
    [1+4]: 5,
    ["안녕" + "하세요"]: "Hello"
}

console.log(user1);

const user2 = {
    name: 'Peter',
    age: 30
}
const cloneUser = user2; //깊은 복사(Deep Copy)

console.log(cloneUser);
cloneUser.name = 'Tom';
console.log(user2.name);
console.log(user2 === cloneUser);

//초기값이 빈 객체인 {}에 user2 객체를 "병합"
const newUser = Object.assign({}, user2);
newUser.name = 'John';
console.log(newUser.name); //Jhon
console.log(user2.name); //Tom

const user3 = {
    name: 'Mike',
    age: 30,
    gender: 'male'
}
console.log(Object.keys(user3)); //객체의 키를 배열로 반환
console.log(Object.values(user3)); //객체의 value을 배열로 반환
console.log(Object.entries(user3)); //객체의 키/value 전체를 반환

const arr = [
    ["name", "Mike"],
    ["age", 30],
    ["gender", "male"]
]
console.log(Object.fromEntries(arr)); //배열을 key/value 타입의 객체로 변환

const str = `{

    "name": "홍길동",
    "age": 25,
    "married": false,
    "family": {"father": "홍민서", "mother": "춘심"},
    "hobbies": ["독서","음악감상"],
    "jobs": null
}`;

const obj= JSON.parse(str);
console.log(obj);