// почему то не работает

class Shopping {
  // этот метод добавляется для того чтобы очистить окно с корзиной
  handleClear() {
    ROOT_SHOPPING.innerHTML = '';
  }

  render() {
    const productsStore = localStorageUtil.getProducts();
    let htmlCatalog = '';
    let sumCatalog = 0;

    // строки внутри окна с корзиной
    CATALOG.forEach(({ id, name, art, material, price }) => {
      if (productsStore.indexOf(id) !== -1) {
        htmlCatalog += `
                  <tr>
                      <td class="shopping-element__name">⚡️ ${name}</td>
                      <td class="shopping-element__price">${price.toLocaleString()} USD</td>
                  </tr>
              `;
        sumCatalog += price;
      }
    });
    // Создание таблицы для строк html-catalog
    const html = `
          <div class="shopping-container">
              <div class="shopping__close" onclick="shoppingPage.handleClear();"></div>
              <table>
                  ${htmlCatalog}
                  <tr>
                      <td class="shopping-element__name">💥 Сумма:</td>
                      <td class="shopping-element__price">${sumCatalog.toLocaleString()} USD</td>
                  </tr>
              </table>
          </div>
      `;
    ROOT_SHOPPING.innerHTML = html;
  }
}

const shoppingPage = new Shopping();
