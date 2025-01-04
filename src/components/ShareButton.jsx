import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { getUserInfo } from '../utils/cookieUtils';
import { isWorkingDay, getWorkdaysInMonth } from '../utils/holidayUtils';

function ShareButton() {
  const { t, i18n } = useTranslation();
  const [showToast, setShowToast] = useState(false);

  // 计算当前收入
  const calculateEarnings = useCallback(() => {
    const userInfo = getUserInfo();
    const now = new Date();
    const locale = i18n.language;

    // 解析工作时间
    const [startHour, startMinute] = userInfo.workStartTime.split(':').map(Number);
    const [endHour, endMinute] = userInfo.workEndTime.split(':').map(Number);
    
    // 计算每日工作分钟数
    const workMinutesPerDay = (endHour * 60 + endMinute) - (startHour * 60 + startMinute);
    const workdaysInMonth = getWorkdaysInMonth(now.getFullYear(), now.getMonth(), locale);
    const dailySalary = userInfo.monthlySalary / workdaysInMonth;
    const minuteRate = dailySalary / workMinutesPerDay;

    // 计算今日收入
    let todayEarnings = 0;
    if (isWorkingDay(now, locale)) {
      const workStart = new Date(now);
      workStart.setHours(startHour, startMinute, 0);
      const workEnd = new Date(now);
      workEnd.setHours(endHour, endMinute, 0);

      if (now >= workStart && now <= workEnd) {
        const workedMinutes = Math.floor((now - workStart) / (1000 * 60));
        todayEarnings = Math.max(0, workedMinutes * minuteRate);
      } else if (now > workEnd) {
        todayEarnings = dailySalary;
      }
    }

    // 计算本月收入
    let monthEarnings = 0;
    for (let day = 1; day <= now.getDate(); day++) {
      const date = new Date(now.getFullYear(), now.getMonth(), day);
      if (isWorkingDay(date, locale)) {
        monthEarnings += day === now.getDate() ? todayEarnings : dailySalary;
      }
    }

    // 计算今年收入
    let yearEarnings = 0;
    for (let month = 0; month < now.getMonth(); month++) {
      const monthDays = getWorkdaysInMonth(now.getFullYear(), month, locale);
      yearEarnings += monthDays * (userInfo.monthlySalary / workdaysInMonth);
    }
    yearEarnings += monthEarnings;

    return {
      today: todayEarnings.toFixed(2),
      month: monthEarnings.toFixed(2),
      year: yearEarnings.toFixed(2)
    };
  }, [i18n.language]);

  // 生成分享内容
  const generateShareContent = useCallback(() => {
    const userInfo = getUserInfo();
    const isHidden = userInfo.hideAllMoney;
    const earnings = calculateEarnings();

    const formatMoney = (amount) => isHidden ? '****' : amount;
    
    return `
📊 ${t('app_name')} - ${t('dashboard.title')}

💰 ${t('dashboard.monthly_salary')}: ¥${isHidden ? '****' : userInfo.monthlySalary}
💵 ${t('dashboard.today_earnings')}: ¥${formatMoney(earnings.today)}
💴 ${t('dashboard.month_earnings')}: ¥${formatMoney(earnings.month)}
💶 ${t('dashboard.year_earnings')}: ¥${formatMoney(earnings.year)}

🌐 ${window.location.origin}
✨ ${t('share.invitation')}
    `.trim();
  }, [t, calculateEarnings]);

  // 复制到剪贴板
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateShareContent());
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  // Web Share API分享
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: t('app_name'),
          text: generateShareContent(),
          url: window.location.origin
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('分享失败:', err);
        }
      }
    } else {
      copyToClipboard();
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleShare}
        className="w-full bg-white rounded-lg p-4 shadow-md hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
      >
        <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
          <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
        </svg>
        <span>{t('share.share_friends')}</span>
      </button>

      {showToast && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-4 py-2 bg-green-500 text-white rounded-lg shadow-lg text-sm whitespace-nowrap">
          {t('share.copy_success')}
        </div>
      )}
    </div>
  );
}

export default ShareButton; 