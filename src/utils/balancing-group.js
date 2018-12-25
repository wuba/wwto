function find(row) {
  const tagOpen = '{';
  const tagClose = '}';

  let start = row.indexOf(tagOpen);
  let end = row.indexOf(tagClose);
  let valid = start <= end;

  let result = '';
  let counter = 0;

  for (let i = start; i < row.length; i++) {
    if (row[i] === tagOpen) {
      counter++;
    } else if (row[i] === tagClose) {
      counter--;
      if (counter === 0) {
        end = i;
        break;
      }
    }
  }

  if (valid && counter === 0) {
    result = row.substring(start, end + 1);
  }

  return result;
}

var testStr = `
  /**
   * 组件的属性列表
   */
  properties: {
    modalData: {
      type: Object,
      value: {},
      observer: function (newVal, oldVal) {
        // 每次进弹框清除数据
        if (newVal && oldVal && newVal.isShow != oldVal.isShow && newVal.isShow == true) {
          this.setData({
            inputValue: 0
          })
        }
      }
    },
    paymentData: {
      type: Object,
      value: {},
      observer: function () {
        console.log(this.data.modalData);
      }
    },
    exchangeData: {
      type: Object,
      value: {},
      observer: function () {
        console.log(this.data.exchangeData);
      }
    },
    codeData: {
      type: Object,
      value: {},
      observer: function () {
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    paymentMoney: 0,
    surplusMoney: 0,
    inputValue: 0,
  }
`;

module.exports = find;