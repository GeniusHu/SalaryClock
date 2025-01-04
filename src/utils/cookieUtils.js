import Cookies from 'js-cookie';

// Cookie相关的工具函数
const TOKEN_KEY = 'earnings_tracker_token';
const USER_INFO_KEY = 'earnings_tracker_user';

// 检查并初始化用户信息
export const initUserInfo = () => {
  if (!getToken()) {
    // 设置默认token
    setToken('default-token');
    
    // 设置默认用户信息
    const defaultUserInfo = {
      joinDate: '2024-01-01',
      monthlySalary: 16666,
      workStartTime: '09:00',
      workEndTime: '18:00',
      workDays: [1, 2, 3, 4, 5], // 1-5 代表周一到周五
      breakTime: 60, // 午休时间(分钟)
      hideAllMoney: false, // 添加全局金额显示控制
    };
    setUserInfo(defaultUserInfo);
    return defaultUserInfo;
  }
  return getUserInfo();
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
  Cookies.set(USER_INFO_KEY, JSON.stringify(userInfo), { expires: 365 });
};

// 获取用户信息
export const getUserInfo = () => {
  const userInfo = Cookies.get(USER_INFO_KEY);
  return userInfo ? JSON.parse(userInfo) : null;
}; 