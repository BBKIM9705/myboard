//누군가 만들어 놓은 공동 사용용 자바스크립트 객체
const user = {
    name: 'Mike',
    age: 30
}

//Symbol : 유일한 식별자 생성 --> 타인이 만든 객체에 영향을 덜 주면서 개인이 자신의
//                               프로퍼티[(property)Ex.age 등..]를 객체에 추가할 때 사용
//개별 작업자가 공동용 자바스크립트 객체인 user에 새로운 프로퍼티를 추가하고
// 그 영향을 다른 객체 사용자가 영향을 덜 받게 함
const showName = Symbol('show name'); //심볼 구분자를 만들고 심볼 선언
const showAge =Symbol('show id');
user[showName] = function(){
    console.log(this.name);
}; //A라는 사람이 객체에 영향을 안 주면서 객체를 이용하여 뭔가를 할 함수를 선언하여 추가
user[showAge] = function(){
    console.log(this.age);
}
user[showName]();
user[showAge]();


/////////////////// 객체 내 프로퍼티 값 출력
//for(let key in user){
//    console.log(`His ${key} is ${user[key]}.`);
//}