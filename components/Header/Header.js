class Header {
  // для того что бы открывалась страница с корзиной
  handlerOpenShoppingPage() {
    shoppingPage.render();
  }

  // render() – генерирует, отображает на экран корневой DOM-элемент и заголовок меню.
  //Объектная Модель Документа (DOM) - это представление HTML-документа в виде дерева тегов.
  //Самый простой способ найти HTML элемент в DOM — это использовать его идентификатор id.
  render(count) {
    // count обозначает какое то количество, у нас это количество из длинны массива productsStore.length, о нем ниже в конце
    const html = `
        <div class="header-container">
          <div class="header-counter onclick="headerPage.handlerOpenShoppingPage()">
          💕${count - 37}
          </div>
        </div>
      `;
    // паралельно создаем стиль в header css c этими файлами
    //ТАКЖЕ нам нужно отрендерить блок который мы сделали выше, используя папку констатны (constants).root.js и в ней корневой узел ROOT-HEADER
    ROOT_HEADER.innerHTML = html;
  }
}

// сразу делаем экземпляр класса по аналогии с тем, как  делали product page
// Класс становится полезным, когда вы создаете экземпляр класса. Экземпляр — это объект, содержащий данные и поведение, описанные классом.
// Оператор new создает экземпляр класса в JavaScript таким образом: instance = new Class().
// Например, вы можете создать экземпляр класса User с помощью оператора new:
// const myUser = new User();

const headerPage = new Header();

// чтобы отображалось количество товаров в корзине нужно обратиться к локальному хранилищу, которое мы создавали ранее
// что бы получить доступ к хранилищу и был создан localstorageUtil в папке localstorageUtil. Там мы создали экземпляр этого класса
// с двумя методами getProducts и putProducts
// поэтому мы вызываем экземпляр класса localstorageUtil и после этого через точку вызываем метод getproducts

// localStorageUtil.getProducts();

// // все что нам вернется нужно уместить куда-то, в переменную productsstore

// две фунции ниже мы перенесли в отдельную функцию в папку index.js чтобы сделать очередность рейдеринга на всем сайте

// const productsStore = localStorageUtil.getProducts();

// // чтобы узнать количество товаров в корзине, которое вернулось из метода - используем метод для измерения длинны массива (length)

// // productsStore.length; и все это мы можем передавть в рендер

// // вызываем метод render() из класса header, чтобы все это отрендерилось
// headerPage.render(productsStore.length);
