/**
 * 提取闭合标签内的内容（模拟正则平衡组的功能）
 * @param {String} row      源字符串
 * @param {String} tagOpen  开始标签
 * @param {String} tagClose 闭合标签
 * @returns String
 *
 * TODO
 * 只支持单字符的开/闭标签
 * 不兼容注释中存在不配对开、闭合标签的情况
 *
 *
 const testStr = `
   properties: {
      modalData: {
        type: Object,
        value: {},
        observer: function (newVal, oldVal) {
          // 每次进弹框清除数据
        }
      }
    },

   data: {
      paymentMoney: 0,
      surplusMoney: 0,
      inputValue: 0,
    }
   `;

 extraBalancingGroup(testStr);
 {
   modalData: {
     type: Object,
     value: {},
     observer: function (newVal, oldVal) {
       // 每次进弹框清除数据
     }
   }
 }
 **/
function extraBalancingGroup(row, tagOpen = '{', tagClose = '}') {
  const start = row.indexOf(tagOpen);
  let end = row.indexOf(tagClose);
  let result = '';
  let counter = 0;

  if (end <= start) {
    return result;
  }

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

  if (counter === 0) {
    result = row.substring(start, end + 1);
  }

  return result;
}

module.exports = extraBalancingGroup;