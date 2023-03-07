let user = { name: "John" };
let admin = { name: "Admin" };

function sayHi() {
  console.log(this.name);
}

// используем одну и ту же функцию в двух объектах
user.f = sayHi;
admin.f = sayHi;

// эти вызовы имеют  разное значение this
// "this" внутри функции - это объект "перед точкой"
admin.f(); // John  (this == user)
