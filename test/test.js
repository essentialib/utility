let person = [
    { name: '홍길동', age: 20 },
    { name: '김철수', age: 30 },
    { name: '김영희', age: 40 }
]
console.log($.filter(person, p => p.age > 20));
console.log($(person).filter(p => p.age > 20).map(p => p.name).value());