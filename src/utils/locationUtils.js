// 使用 ipapi.co 的免费 API 获取用户位置
export const getUserLocation = async () => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    return data.country_code; // 返回国家代码，如 'CN' 或 'US'
  } catch (error) {
    console.error('Error fetching location:', error);
    return 'US'; // 默认返回美国
  }
};

// 根据国家代码确定语言
export const getPreferredLanguage = (countryCode) => {
  // 中文地区列表
  const chineseRegions = ['CN', 'HK', 'TW', 'MO'];
  return chineseRegions.includes(countryCode) ? 'zh' : 'en';
}; 