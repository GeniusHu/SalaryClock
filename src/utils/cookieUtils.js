import Cookies from 'js-cookie';

// Cookie相关的工具函数
const TOKEN_KEY = 'earnings_tracker_token';
const USER_INFO_KEY = 'earnings_tracker_user';

// 默认用户信息
const DEFAULT_USER_INFO = {
  monthlySalary: 10000,  // 默认月薪10000
  workStartTime: '09:00',
  workEndTime: '18:00',
  joinDate: '2024-01-01',  // 默认今年1月1日
  workDays: [1, 2, 3, 4, 5],  // 周一到周五
  hideAllMoney: false
};

// 检查并初始化用户信息
export const initUserInfo = () => {
  const userInfo = getUserInfo();
  if (!userInfo) {
    setUserInfo(DEFAULT_USER_INFO);
    return DEFAULT_USER_INFO;
  }
  return userInfo;
};

// 设置登录token
export const setToken = (token) => {
  Cookies.set(TOKEN_KEY, token, { expires: 365 }); // 设置为一年过期
};

// 获取token
export const getToken = () => {
  return Cookies.get(TOKEN_KEY);
};

// 移除token
export const removeToken = () => {
  Cookies.remove(TOKEN_KEY);
  Cookies.remove(USER_INFO_KEY);
};

// 设置用户信息
export const setUserInfo = (userInfo) => {
  try {
    localStorage.setItem('earnings_tracker_user', JSON.stringify(userInfo));
    window.dispatchEvent(new Event('storage'));
  } catch (error) {
    console.error('Error setting user info:', error);
  }
};

// 获取用户信息
export const getUserInfo = () => {
  try {
    const userInfo = localStorage.getItem('earnings_tracker_user');
    return userInfo ? JSON.parse(userInfo) : DEFAULT_USER_INFO;  // 如果没有用户信息，返回默认值
  } catch (error) {
    console.error('Error getting user info:', error);
    return DEFAULT_USER_INFO;  // 出错时也返回默认值
  }
}; 