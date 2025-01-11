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
      }
    }
  },
  zh: {
    translation: {
      "app_name": "薪时计",
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

// 初始化函数
const initI18n = async () => {
  try {
    const countryCode = await getUserLocation();
    const defaultLanguage = getPreferredLanguage(countryCode);

    i18n
      .use(initReactI18next)
      .init({
        resources,
        lng: defaultLanguage,
        fallbackLng: 'en',
        interpolation: {
          escapeValue: false
        }
      });
  } catch (error) {
    console.error('Error initializing i18n:', error);
    // 出错时使用默认配置
    i18n
      .use(initReactI18next)
      .init({
        resources,
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
          escapeValue: false
        }
      });
  }
};

// 执行初始化
initI18n();

export default i18n; 