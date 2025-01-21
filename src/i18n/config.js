import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getUserLocation, getPreferredLanguage } from '../utils/locationUtils';

// 语言包配置
// en: 英文(默认)
// zh: 中文
const resources = {
  en: {
    translation: {
      "app_name": "Earnings Tracker",
      "dashboard": {
        "title": "Dashboard",
        "current_time": "Current Time",
        "join_date": "Join Date",
        "monthly_salary": "Monthly Salary",
        "next_shift": "Time Until Next Shift",
        "today_earnings": "Today's Earnings",
        "month_earnings": "This Month's Earnings",
        "year_earnings": "This Year's Earnings"
      },
      "time": {
        "days": "Days",
        "hours": "Hours",
        "minutes": "Minutes",
        "seconds": "Seconds"
      },
      "share": {
        "share_friends": "Share with friends",
        "more_options": "More sharing options",
        "invitation": "Come calculate your earnings with me!"
      },
      "login": {
        "title": "Login",
        "username": "Username",
        "password": "Password",
        "submit": "Login",
        "invalid_credentials": "Invalid username or password",
        "error": "Login failed. Please try again."
      },
      "logout": "Logout",
      "next_shift_time": "Next Shift Time",
      "share": {
        "share_friends": "Share with Friends",
        "more_options": "More Options",
        "copy_success": "Link copied to clipboard",
        "share_failed": "Share failed"
      },
      "settings": {
        "title": "Settings",
        "monthly_salary": "Monthly Salary",
        "work_start_time": "Work Start Time",
        "work_end_time": "Work End Time",
        "join_date": "Join Date",
        "save": "Save",
        "cancel": "Cancel"
      },
      "privacy": {
        "title": "Privacy Policy",
        "meta_description": "Privacy Policy for Earnings Tracker - Learn how we protect your data",
        "data_collection": {
          "title": "Data Collection",
          "content": "We collect minimal personal information necessary for the app's functionality. This includes your work schedule and salary information, which is stored locally on your device."
        },
        "data_usage": {
          "title": "How We Use Your Data",
          "content": "Your data is used solely for calculating your earnings and providing personalized work time tracking. We do not share your information with third parties."
        },
        "data_protection": {
          "title": "Data Protection",
          "content": "Your data is stored locally on your device and is not transmitted to our servers. We implement industry-standard security measures to protect your information."
        },
        "user_rights": {
          "title": "Your Rights",
          "content": "You have full control over your data. You can view, modify, or delete your information at any time through the app settings."
        },
        "contact": {
          "title": "Contact Us",
          "content": "If you have any questions about our privacy policy or data practices, please contact us at support@paytimer24.com"
        },
        "last_updated": "Last Updated"
      }
    }
  },
  zh: {
    translation: {
      "app_name": "牛马时钟",
      "dashboard": {
        "title": "仪表盘",
        "current_time": "当前时间",
        "join_date": "入职时间",
        "monthly_salary": "月薪",
        "next_shift": "距离下次上班还有",
        "today_earnings": "今日打工已赚",
        "month_earnings": "本月打工已赚",
        "year_earnings": "今年打工已赚"
      },
      "time": {
        "days": "天",
        "hours": "时",
        "minutes": "分",
        "seconds": "秒"
      },
      "share": {
        "share_friends": "分享给好友",
        "more_options": "更多分享",
        "invitation": "快来和我一起计算摸鱼收入吧！"
      },
      "login": {
        "title": "登录",
        "username": "用户名",
        "password": "密码",
        "submit": "登录",
        "invalid_credentials": "用户名或密码错误",
        "error": "登录失败，请重试"
      },
      "logout": "退出登录",
      "next_shift_time": "下次上班时间",
      "share": {
        "share_friends": "分享给好友",
        "more_options": "更多分享",
        "copy_success": "链接已复制到剪贴板",
        "share_failed": "分享失败"
      },
      "settings": {
        "title": "设置",
        "monthly_salary": "月薪",
        "work_start_time": "上班时间",
        "work_end_time": "下班时间",
        "join_date": "入职日期",
        "save": "保存",
        "cancel": "取消"
      }
    }
  }
};

// 首先同步初始化 i18n，使用默认语言
i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('preferred_language') || 'en', // 优先使用存储的语言偏好
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
});

// 然后异步获取位置并更新语言
const initLanguage = async () => {
  try {
    // 如果已经有语言偏好，就不再请求位置
    if (!localStorage.getItem('preferred_language')) {
      const countryCode = await getUserLocation();
      const defaultLanguage = getPreferredLanguage(countryCode);
      await i18n.changeLanguage(defaultLanguage);
      localStorage.setItem('preferred_language', defaultLanguage);
    }
  } catch (error) {
    console.error('Error initializing language:', error);
  }
};

initLanguage();

export default i18n;