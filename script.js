/** 
 * Функция длинного вычитания через рекурсию.
 * @param max наибольшее значение из пары
 * @param min наименьшее значение из пары
 * @param result результат вычитания на каждом шаге
 * @param carry 1 в уме
 * @returns 
 */

function subtract(max, min, result, carry){
   if(max.length == 0 && min.length == 0 && !carry)
      return result;
   const sub = parseInt(max.pop() || '0') - parseInt(min.pop() || '0') - (carry || 0);
   carry = sub < 0 ? 1: 0;
   return subtract(max, min, +sub + carry * 10 + (result || ""), carry);
}


/**
 *  Основная функция для отображения результатов.
 * Сделано все по условию. Основнная функция через вычитание, а чтоб сократить остальные действия взял BigInt
 * @returns
 */
function showResult() {
	let firstValue = firstNumber.value;
	let secondValue = secondNumber.value;
	let resultValue = '';	// Если данные некорректны ничего не выводим
	if (firstValue.length === 0 || secondValue.length === 0 || firstValue.includes('-') || secondValue.includes('-')) {
		document.getElementById('subResult').value = resultValue;
		return;
	};
	if (BigInt(firstValue) >= BigInt(secondValue)) {		// чтоб всегда первый элемент был не меньше второго
		resultValue = BigInt(subtract(firstValue.split(""), secondValue.split(""), ""));	// избавляемся от нулей в начале, но не от результата "0"
	} else {
		resultValue = BigInt('-' + subtract(secondValue.split(""), firstValue.split(""), ""));
	}
   document.getElementById('subResult').value = resultValue;
}


/**
 * Судя по фото там нет кнопоки вызова. По этому решил сделать динамический подсчет
 * @returns 
 */
firstNumber.oninput = () => showResult();
secondNumber.oninput = () => showResult();