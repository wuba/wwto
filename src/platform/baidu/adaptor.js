function getInstance() {
  var wx = swan;
  wx['has_baidu_hook_flag'] = true;

  const getStorageSync = swan['getStorageSync'];
  wx['getStorageSync'] = (key) => {
    const val = getStorageSync(key);
    if (val === 'undefined') {
      return '';
    }
    return val;
  };

  const request = wx.request;
  wx.request = (opt) => {
    // 方法名必须大写
    if (opt.method) {
      opt.method = opt.method.toUpperCase();
    }

    // post请求会将数据序列化，字符串序列化会前后多一个双引号导致后端接口异常
    // TOO 还需要对返回结果处理
    if (opt.method === 'POST' && typeof opt.data === 'string') {
      opt.header = opt.header || {};
      opt.header['content-type'] = 'application/x-www-form-urlencoded';
    }

    // 默认按text解析！
    if (!opt.responseType) {
      opt.responseType = 'json';
    }

    return request(opt);
  };

  const createAnimation = wx.createAnimation;
  wx.createAnimation = function() {
    let animation = createAnimation.call(this, arguments);

    // 处理option字段缺失的问题
    if (!animation.option) {
      animation.option = {
        transformOrigin: animation.transformOrigin,
        transition: {
          delay: animation.delay,
          duration: animation.duration,
          timingFunction: animation.timingFunction
        }
      };
    }

    // 处理step方法链式调用BUG
    let step = animation.__proto__.step;
    animation.__proto__.step = function() {
      return step.apply(this, arguments) || this;
    };

    return animation;
  };

  wx.showShareMenu = wx.showShareMenu || ((opt) => {});

  // 画布导出为图片
  const canvasToTempFilePath = wx.canvasToTempFilePath;
  wx.canvasToTempFilePath = function(opt, self) {
    const success = opt.success || emptyFn;
    opt.success = function(res) {
      if (res) {
        res.tempFilePath = res.tempFilePath || res.tempImagePath;
      }
      success(res);
    };
    canvasToTempFilePath.call(this, opt, self);
  };

  return wx;
}

export default getInstance();