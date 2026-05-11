/**
 * 微信 JSSDK 封装工具
 * 注意：此为占位实现，实际使用时需要后端提供签名服务
 */

const isWeChat = () => {
  const ua = window.navigator.userAgent.toLowerCase();
  return ua.indexOf('micromessenger') !== -1;
};

const isWeChatWork = () => {
  const ua = window.navigator.userAgent.toLowerCase();
  return ua.indexOf('wxwork') !== -1;
};

export const wechatUtils = {
  isWeChat: isWeChat(),
  isWeChatWork: isWeChatWork(),

  /**
   * 判断是否在 iOS WKWebView 中运行
   */
  isWKWebView: () => {
    return typeof window !== 'undefined' && window.__wxjs_is_wkwebview === true;
  },

  /**
   * 隐藏微信 WebView 顶部导航栏
   */
  hideWindowBar: () => {
    if (isWeChat() && typeof WeixinJSBridge !== 'undefined') {
      WeixinJSBridge.invoke('hideWindowView', {}, () => {});
    }
  },

  /**
   * 配置微信 JSSDK
   * @param {object} config - 微信配置 { appId, timestamp, nonceStr, signature }
   * @param {function} ready - 配置成功后的回调
   * @param {function} error - 配置失败的回调
   */
  config: (config, ready, error) => {
    if (!isWeChat()) {
      if (ready) ready();
      return;
    }

    const defaultConfig = {
      debug: false,
      jsApiList: [
        'updateAppMessageShareData',
        'updateTimelineShareData',
        'scanQRCode',
        'chooseImage',
        'previewImage',
        'getLocation',
        'openLocation',
      ],
    };

    if (typeof window.wx !== 'undefined') {
      window.wx.config({ ...defaultConfig, ...config });
      window.wx.ready(() => {
        if (ready) ready();
      });
      window.wx.error((res) => {
        if (error) error(res);
      });
    } else {
      // 动态加载 JSSDK
      const script = document.createElement('script');
      script.src = 'https://res.wx.qq.com/open/js/jweixin-1.6.0.js';
      script.onload = () => {
        window.wx.config({ ...defaultConfig, ...config });
        window.wx.ready(() => {
          if (ready) ready();
        });
        window.wx.error((res) => {
          if (error) error(res);
        });
      };
      document.head.appendChild(script);
    }
  },

  /**
   * 设置分享内容
   * @param {object} shareData - 分享数据 { title, desc, link, imgUrl }
   */
  setShareData: (shareData) => {
    if (!isWeChat() || typeof window.wx === 'undefined') return;

    const defaultData = {
      title: '房抵易融 - 专业贷款超市',
      desc: '公积金、按揭、学历贷，多种贷款产品一网打尽',
      link: window.location.href.split('#')[0],
      imgUrl: `${window.location.origin}/logo.png`,
    };

    const data = { ...defaultData, ...shareData };

    try {
      window.wx.updateAppMessageShareData(data);
      window.wx.updateTimelineShareData({
        title: data.title,
        link: data.link,
        imgUrl: data.imgUrl,
      });
    } catch (e) {
      console.warn('微信分享设置失败:', e);
    }
  },

  /**
   * 扫一扫
   * @param {function} callback - 扫码结果回调
   */
  scanQRCode: (callback) => {
    if (!isWeChat() || typeof window.wx === 'undefined') {
      if (callback) callback({ errMsg: 'not_wechat' });
      return;
    }

    window.wx.scanQRCode({
      needResult: 1,
      scanType: ['qrCode', 'barCode'],
      success: (res) => {
        if (callback) callback(res);
      },
      fail: (res) => {
        if (callback) callback({ errMsg: 'scan_failed', ...res });
      },
    });
  },

  /**
   * 获取当前 URL 中需要的签名信息
   * 在实际项目中，这些值应该由后端接口提供
   */
  getSignParams: async () => {
    // 实际项目中这里应该调用后端接口
    // return await fetch('/api/wechat/sign', { ... });
    return {
      appId: '', // 需填写微信公众平台的AppID
      timestamp: Math.floor(Date.now() / 1000),
      nonceStr: Math.random().toString(36).slice(2),
      signature: '',
    };
  },
};
