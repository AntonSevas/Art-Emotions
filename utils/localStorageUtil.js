// Написание класса по работе с локальным хронилищем

class LocalStorageUtil {
  // В классе свойство задается в конструкторе

  // constructor(param1, param2, …) это специальный метод в теле класса, который инициализирует экземпляр. Это место, где вы можете установить начальные значения для полей или выполнить любые настройки объектов.
  // В следующем примере конструктор устанавливает начальное значение поля name:
  // class User {
  //   constructor(name) {
  //     this.name = name;
  //   }
  // }
  // constructor класса User использует один параметр name, который используется для установки начального значения поля this.name.
  // Внутри конструктора значение this равно вновь созданному экземпляру.
  // Аргументы, используемые для создания экземпляра класса, становятся параметрами конструктора:
  // class User {
  //   constructor(name) {
  //     name; // => 'Jon Snow'
  //     this.name = name;
  //   }
  // }
  // const user = new User('Jon Snow');
  // Параметр name внутри конструктора имеет значение ‘Jon Snow’.
  // Если вы не определяете конструктор для класса, создается конструктор по умолчанию. Конструктор по умолчанию является пустой функцией, которая не изменяет экземпляр.
  // В то же время класс JavaScript может иметь до одного конструктора.

  constructor() {
    // Кратко Грубо говоря, this — это ссылка на некий объект, к свойствам которого можно получить доступ внутри вызова функции. Этот this — и есть контекст выполнения.
    this.keyName = 'products';
  }
  // записываем два метода, первый позволяет получить все продукты, которые находятся в локальном хронилище
  getProducts() {
    // нужно вызвать метод get item у localStorage
    const productsLocalStorage = localStorage.getItem(this.keyName);
    // добавим проверочное условие, если не равно null, то нужно распарсить строку и перенсти ее в массив с помощью json.parse
    if (productsLocalStorage !== null) {
      // из строки в массив
      return JSON.parse(productsLocalStorage);
    }
    return [];
  }
  // второй нужен, для того, чтобы добавить какое-то новое значение в локальное хранилище
  // соответсвенно этот метод будет принимать Id товара
  putProducts(id) {
    let products = this.getProducts();
    let pushProduct = false;
    const index = products.indexOf(id);

    if (index === -1) {
      products.push(id);
      pushProduct = true;
    } else {
      products.splice(index, 1);
    }

    localStorage.setItem(this.keyName, JSON.stringify(products));

    return { pushProduct, products };
  }
}

const localStorageUtil = new LocalStorageUtil();
