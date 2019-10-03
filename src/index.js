module.exports = function multiply(first, second) {
  let firstMultiplier = first.split('').reverse();
  let secondMultiplier = second.split('');
  let interimProductsArray = [];
  let remainderDecimal;

  for (let i = secondMultiplier.length - 1; i >= 0; i--) {
    remainderDecimal = 0;
    let currentProduct = firstMultiplier.reduce((product, number, index, array) => {
      if ((number * secondMultiplier[i] + remainderDecimal) < 10) {
        product.push(String(number * secondMultiplier[i] + remainderDecimal))
        remainderDecimal = 0;
      }
      else {
        if (index == array.length - 1) {
          product.push((String(number * secondMultiplier[i] + remainderDecimal)).split('').reverse().join(''));
          remainderDecimal = 0;
        }
        else {
          product.push(String((number * secondMultiplier[i] + remainderDecimal) % 10));
          remainderDecimal = ((number * secondMultiplier[i] + remainderDecimal) - ((number * secondMultiplier[i] + remainderDecimal) % 10)) / 10;
        }
      }
      return product;
    }, [])
    interimProductsArray.push(currentProduct.join('').split('')); /*добавляем каждое получившееся произведение*/
  }

  let startAddingIndex = 1;
  let interimAddArray = [];
  let additionProductsNumbers;

  while (interimProductsArray.length > 1) {
    for (let i = 0; i < interimProductsArray.length; i++) {
      let resultProduct = interimProductsArray[0];
      let currentProduct = interimProductsArray[1];

      if (i == 1) {
        for (let j = 0; j < startAddingIndex; j++) {
          interimAddArray.push(resultProduct[j]);
        }
        for (let u = 0; u < currentProduct.length; u++) {

          if (!resultProduct[startAddingIndex + u]) {
            interimAddArray.push(String(Number(currentProduct[u]) + remainderDecimal));
            continue;
          }

          additionProductsNumbers = Number(currentProduct[u]) + Number(resultProduct[startAddingIndex + u]) + remainderDecimal; /*здесь ошибка с Nan вылазит когда индекс resultProduct просим которого у него нет*/

          if (additionProductsNumbers < 10) {
            interimAddArray.push(String(additionProductsNumbers));
            remainderDecimal = 0;
          }
          else {
            interimAddArray.push(String(additionProductsNumbers % 10));
            remainderDecimal = (additionProductsNumbers - (additionProductsNumbers % 10)) / 10;
          }
        }
      }
    }
    interimProductsArray.splice(0, 2);
    startAddingIndex += 1;
    interimProductsArray.unshift(interimAddArray.slice());
    interimAddArray.length = 0;
    remainderDecimal = 0;
  }

  return interimProductsArray.reduce((finalString, element, index, array) => {
  return finalString + element.reverse().join('');
  }, '');
}
