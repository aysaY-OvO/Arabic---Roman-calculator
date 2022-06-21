'use strict';

function calculator(str) {
  let result;
  let equal;

  const romanMatrix = {
    I: 1,
    II: 2,
    III: 3,
    IV: 4,
    V: 5,
    VI: 6,
    VII: 7,
    VIII: 8,
    IX: 9,
    X: 10,
    XX: 20,
    XXX: 30,
    XL: 40,
    L: 50,
    LX: 60,
    LXX: 70,
    LXXX: 80,
    XC: 90,
    C: 100,
  };

  const arr = str.split(' ');
  console.log(arr);
  let [x, operator, y] = arr;

  function operatorCheck(sign, x, y) {
    switch (sign) {
      case '+':
        equal = +x + +y;
        break;
      case '-':
        equal = +x - +y;
        break;
      case '*':
        equal = +x * +y;
        break;
      case '/':
        equal = +x / +y;
        break;
      default:
        throw new Error('Недопустимый математический оператор');
    }
    return equal;
  }

  const entries = Object.entries(romanMatrix);

  const keys = Object.keys(romanMatrix);

  //Switch Roman digits to Arabic
  function romanToArabic(matrix, operand) {
    const matrixEl = matrix.filter((el) => operand === el[0]).flat();
    const [roman, arabic] = matrixEl;
    return arabic;
  }

  //Switch Arabic digits to Roman
  function arabicToRoman(matrix, result) {
    const matrixEl = matrix.filter((el) => result === el[1]).flat();
    const [roman, arabic] = matrixEl;
    return roman;
  }

  //Roman digits more than ten
  function romanMoreThenTen(num) {
    if (num % 10 == 0) {
      return arabicToRoman(entries, num);
    } else {
      const str = num.toString();
      const tens = str.slice(0, 1);
      const ones = str.slice(1);
      const romanUnits = arabicToRoman(entries, +ones);
      const equalDoz = (+tens * 10).toString();
      const romanTens = arabicToRoman(entries, +equalDoz);
      const romanStr = romanTens.toString() + romanUnits.toString();
      return romanStr;
    }
  }

  if (arr.includes(x) && arr.includes(operator) && arr.includes(y) && arr.length === 3) {
    if (keys.includes(x) && keys.includes(y)) {
      x = romanToArabic(entries, x);
      y = romanToArabic(entries, y);
      if (x >= 1 && x <= 10 && y >= 1 && y <= 10) {
        operatorCheck(operator, x, y);
        if (Math.trunc(equal) < 1) {
          result = '';
        } else if (Math.trunc(equal) <= 10 || Math.trunc(equal) === 100) {
          result = arabicToRoman(entries, Math.trunc(equal));
        } else if (Math.trunc(equal) > 10 && Math.trunc(equal) < 100) {
          result = romanMoreThenTen(Math.trunc(equal));
        }
      } else {
        throw new Error(
          'Операнды должны находиться в диапозоне от 1 до 10 и должны быть целыми числами.'
        );
      }
    } else if (
      keys.includes(x) ||
      (typeof y == 'number' && keys.includes(y)) ||
      typeof x == 'number'
    ) {
      throw new Error('Используются одновременно разные системы счисления.');
    } else if (
      typeof x == 'number' ||
      (typeof y == 'number' && Number.isInteger(+x)) ||
      (Number.isInteger(+y) && x >= 1 && x <= 10 && y >= 1 && y <= 10)
    ) {
      operatorCheck(operator, x, y);
      result = Math.trunc(equal);
    } else {
      throw new Error(
        'Операнды должны находиться в диапозоне от 1 до 10 и должны быть целыми числами.'
      );
    }
  } else {
    throw new Error(
      'Нарушен формат математической операции. Ожидается два операнда и один оператор.'
    );
  }
  return result.toString();
}
console.log(calculator('5 * 5'));
