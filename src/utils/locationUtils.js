// 使用 ipapi.co 的免费 API 获取用户位置
export const getUserLocation = async () => {
  try {
    // 添加超时处理
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5秒超时

    const response = await fetch('https://ipapi.co/json/', {
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error('Location API failed');
    }

    const data = await response.json();
    return data.country_code;
  } catch (error) {
    console.error('Error fetching location:', error);
    return 'US'; // 默认返回美国
  }
};

// 根据国家代码确定语言
export const getPreferredLanguage = (countryCode) => {
  const chineseRegions = ['CN', 'HK', 'TW', 'MO'];
  return chineseRegions.includes(countryCode) ? 'zh' : 'en';
}; 