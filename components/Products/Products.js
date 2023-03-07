// компоненты будут реализованы в виде классов. Для каждого компонента
// используем метод render(), который будет отображать данные на странице из КАТАЛОГА, с помощью
// цикла for each и возвращать новой переменной element (конкретный id или price)

class Products {
  // значения добавить в корзины и убрать из корзины будет повторяться, поэтому хорошо бы создать конструктор

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
    this.classNameActive = 'products-element__btn_active'; // сюда пишем название класса, а дальше обьявляем
    this.labelAdd = 'Добавить в корзину';
    this.labelRemove = 'Удалить из корзины';
    // И теперь заменяем переменные на текст в коде ниже соответственно
  }

  // для обработчика события (onclick) нам нужно будет вызвать метод внутри всего класса

  handleSetLocationStorage(element, id) {
    // когда мы нажимаем кнопку в любом случае нам надо скорректировать локальное хранилище
    const { pushProduct, products } = localStorageUtil.putProducts(id);
    // result будет представлять из себя обьект у которого два ключа (из папки LocalStorageUtil: pushProduct,products)
    // теперь нам необходимо добавить проверки
    // если пуш продуктс равно тру, то мы добавляем к элементу класс лист

    if (pushProduct) {
      element.classList.add(this.classNameActive);
      element.innerHTML = this.labelRemove;
    } else {
      element.classList.remove(this.classNameActive);
      element.innerHTML = this.labelAdd;
    }

    // здесь обработчик события нажатия на кнопку, поэтому, чтобы счетчик товаров в корзине работал, мы добавляем метод из Header.js
    // в скобках заменяем на products и определяем его длинну
    headerPage.render(products.length);
  }

  // render() – генерирует, отображает на экран корневой DOM-элемент и заголовок меню.
  //Объектная Модель Документа (DOM) - это представление HTML-документа в виде дерева тегов.
  //Самый простой способ найти HTML элемент в DOM — это использовать его идентификатор id.

  render() {
    const productsStore = localStorageUtil.getProducts(); // store это хранилище
    // на каждой этерации нам нужно добавлять новый элемент li
    let htmlCatalog = '';

    CATALOG.forEach(({ id, name, price, img }) => {
      let activeClass = '';
      let activeText = '';

      // через id мы например можем проверить есть ли он в сторе или нет, поэтому делаем проверку

      if (productsStore.indexOf(id) === -1) {
        // если id = -1, значит совпадения не найдено и в кнопку надо добавить надпись добавить в корзину
        activeText = this.labelAdd;
      } else {
        activeClass = ' ' + this.classNameActive; // добавили еще один класс для второй кнопки
        // Иначи текст будет передавать удалить из корзины
        activeText = this.labelRemove;
      }

      // внутри цикла нужно задать две переменные с id для, кнопок добавить в корзину и удалить из корзины
      // в наш каталог будем добавлять каждый раз новый контент
      // Шаблонными литералами называются строковые литералы, допускающие использование
      // выражений внутри. С ними вы можете использовать многострочные литералы и строковую
      // интерполяцию.
      htmlCatalog += `
        <li class="products-element">
          <span class="products-element__name">${name}</span>
          <img class="products-element__img" src="${img}" />
          <span class="products-element__price">
            ⚡️ ${price.toLocaleString()} USD
          </span>
          <button class="products-element__btn${activeClass}" onclick="productsPage.handleSetLocationStorage(this, '${id}');"> 
            ${activeText}
          </button> 
        </li> 
      `;
      // выше был добавлен обработчик события, чтобы мы могли по щелчку изменять локальное хранилище
      // знак доллара обычно подразумевает document.getElementById
    });

    const html = `
      <ul class="products-container">
        ${htmlCatalog}
      </ul>
    `;
    ROOT_PRODUCTS.innerHTML = html;
  }
}

// для вывода нужен экземпляр:

const productsPage = new Products();

// //  также эту строчку мы перенсли в отдельную папку index.js
// productsPage.render();
