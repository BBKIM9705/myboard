//Object 최상위 객체의 prototype을 상속
function User(name, age) { //생성자 함수 --> 코드 중복성을 제거
    this.name = name;
    this.age = age;
    this.sayName = function(){
        console.log(this.name);
    }
}



let user1 = new User('Mike', 30); //User 함수 객체의 prototype을 상속
//user1은 User.prototype을 상속 받음.
let user2 = new User('Jane', 22);

user1.sayName();
user2.sayName();

class User1 {
    constructor(name){
        this.name = name; //name이라는 멤버변수가 생성
    }

    sayHi(){
        console.log(this.name);
    }
}

let user3 = new User1('John');
user3.sayHi();

class User4 {
    constructor(name){
        this.name = name;
    }

    get name(){
        return this._name; //자바스크립트에서 변수명 앞에 있는 _는 private 제한조건을 의미
    }
    set name(name) {
        this._name = name;
    }
}

let user4 = new User4('보라'); //setter 메소드 호출
console.log(user4.name); //getter 메소드 호출

class Animal {
    constructor(name){ //생성자, 멤버변수 생성
        this.speed = 0;
        this.name = name;
    }

    run(speed){
        this.speed = speed;
        console.log(`${this.name}은/는 속도 ${this.speed}로 달립니다.`);
    }

    stop(){
        this.speed = 0;
        console.log(`${this.name}이/가 멈췄습니다.`);
    }
}

class Rabbit extends Animal {
    hide(){
        console.log(`${this.name}이/가 숨었습니다.`);
    }
}

let rabbit = new Rabbit ('흰 토끼');

rabbit.run(5);
rabbit.hide();

const str = `{

"name": "홍길동",
"age": 25,
"married": false,
"family": {"father": "홍민서", "mother": "춘심"},
"hobbies": ["독서","음악감상"],
"jobs": null
}`;

//외부에서 자바스크립트가 있는 프런트 프로그램으로 JSON 포맷의 데이터가 전송되면
//자바스크립트에선 전송된 데이터를 바로 인식을 못함
//그래서, JSON.parse()로 역직렬화(deseraialization)
//직렬화(seraialization) : 데이터를 네트워크 등으로 전송시 전송에 편리하도록 데이터 포맷을 변환
//역직렬화 : 직렬화되어 전송된 데이터를 프로그램에서 인식할 수 있도록 변환
const obj= JSON.parse(str);
console.log(obj.name);