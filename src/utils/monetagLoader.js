export const showMonetagAd = () => {
    if (typeof window.show_9322228 === 'function') {
      window.show_9322228({
        type: 'inApp',
        inAppSettings: {
          frequency: 2,
          capping: 0.1,
          interval: 30,
          timeout: 5,
          everyPage: false
        }
      });
    }
  };