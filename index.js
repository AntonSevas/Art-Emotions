// в этом файле будет функция рендер, которая будет ренднерить первоначальные данные
function render() {
  // перенесли из header.js :
  // все что нам вернется нужно уместить куда-то, в переменную productsstore

  const productsStore = localStorageUtil.getProducts();

  // чтобы узнать количество товаров в корзине, которое вернулось из метода - используем метод для измерения длинны массива (length)

  // productsStore.length; и все это мы можем передавть в рендер

  // вызываем метод render() из класса header, чтобы все это отрендерилось
  headerPage.render(productsStore.length);

  // перенесли из папки products.js

  productsPage.render();
}

spinnerPage.render();

// скопировали из старой папки catalog
let CATALOG = [];

// и сразу вызываем эту функцию
// render(); и после переносим в .then

// здесь мы будем делать ajax запрос с помощью функции fetch

// передаем url на который хотим передать запрос

//   fetch('server/catalog.json');

// // fetch возвращает promis поэтому здесь можно использовать then и catch
// // в then будет result(res), используем стрелочную функцию и формат результата будет json
//   .then(res => res.json())
//   // здесь уже будет тело файла catalog json, и здесь мы можем уже скорректировать наш catalog
//   .then(body => {
//     CATALOG = body;
//     render();
//   })
//   // но также у нас может быть ошибка поэтому пропишем ниже catсh
//   .catch(error => {
//     // и пока просто выведем ошибку в консоль
//     console.log(error);
//   });

// С помошью сайта jsonserve.com создали эмитацию сервера, заменив изначальный файл на ссылку
// server/catalog.json
// https://api.jsonserve.com/C8epJC
// Сайт чето не работает поэтому пока оставил то что было

fetch('server/catalog.json')
  .then((res) => res.json())
  .then((body) => {
    CATALOG = body;

    setTimeout(function () {
      spinnerPage.handleClear();
      render();
    }, 1000);
  })
  .catch((error) => {
    spinnerPage.handleClear();
    errorPage.render();
  });
