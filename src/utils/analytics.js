// 发送页面浏览事件
export const trackPageView = (path) => {
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'page_view',
      page_path: path
    });
  }
};

// 发送事件
export const trackEvent = (category, action, label = null, value = null) => {
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'custom_event',
      event_category: category,
      event_action: action,
      event_label: label,
      event_value: value
    });
  }
}; 