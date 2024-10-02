//가변형 매개변수 처리
const add = (...numbers) => {
    let result = 0;
    numbers.forEach((num)=> (result += num));
    console.log("result = " + result);
}

add(1,2,3,4,5);
add(1,2,3,4,5,6,7,8,9,10);

//가변 매개 변수를 가진 생성자 함수
function User(name, age, ...skills){
    this.name = name;
    this.age = age;
    this.skills = skills;
}
const user1 = new User('Mike', 30, 'html', 'css', 'JS');
const user2 = new User('Tom', 30, 'JS', 'React');

console.log(user1);
console.log(user2);

let arr1 = [1,2,3];
let arr2 = [4,5,6];

//전개구문(Spread Syntax)
let result = [0,...arr1,...arr2,7,8,9];
console.log(result);

let user = {name:'Mike'};
let mike = {...user, age:30};
console.log(mike);

let member = {name: 'Mike'};
let info = {age: 30};
let fe = ["JS", "React"];
let lang = ["Korean", "English"];

member = {
    ...member,
    ...info,
    skills : [...fe, ...lang],
}
console.log(member);