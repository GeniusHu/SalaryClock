import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import MoneyDisplay from './MoneyDisplay'; // MoneyDisplay 组件
import { isWorkingDay, getWorkdaysInMonth } from '../utils/holidayUtils'; // 提供的逻辑

function EarningsDisplay({ userInfo }) {
  const { t, i18n } = useTranslation();
  const [earnings, setEarnings] = useState({
    today: '0.00',
    month: '0.00',
    year: '0.00',
  });


  // 核心计算逻辑
  const calculateEarnings = useCallback(() => {
    try {
      const now = new Date();
      const locale = i18n.language;

      // 用户工作时间和工资
      const [startHour, startMinute] = userInfo.workStartTime.split(':').map(Number);
      const [endHour, endMinute] = userInfo.workEndTime.split(':').map(Number);
      const workMinutesPerDay = (endHour * 60 + endMinute) - (startHour * 60 + startMinute);
      const workdaysInMonth = getWorkdaysInMonth(now.getFullYear(), now.getMonth(), locale);
      const dailySalary = userInfo.monthlySalary / workdaysInMonth;
      const minuteRate = dailySalary / workMinutesPerDay;

      // 今日收入计算
      const workStart = new Date(now);
      workStart.setHours(startHour, startMinute, 0);
      const workEnd = new Date(now);
      workEnd.setHours(endHour, endMinute, 0);

      let todayEarnings = 0;
      if (isWorkingDay(now, locale)) {
        if (now >= workStart && now <= workEnd) {
          const workedMinutes = Math.floor((now - workStart) / (1000 * 60));
          todayEarnings = workedMinutes * minuteRate;
        } else if (now > workEnd) {
          todayEarnings = dailySalary;
        }
      }

      // 本月收入计算
      let monthEarnings = 0;
      for (let day = 1; day <= now.getDate(); day++) {
        const date = new Date(now.getFullYear(), now.getMonth(), day);
        if (isWorkingDay(date, locale)) {
          monthEarnings += day === now.getDate() ? todayEarnings : dailySalary;
        }
      }

      // 今年收入计算
      let yearEarnings = 0;
      for (let month = 0; month < 12; month++) {
        if (month < now.getMonth()) {
          yearEarnings += getWorkdaysInMonth(now.getFullYear(), month, locale) * dailySalary;
        } else if (month === now.getMonth()) {
          yearEarnings += monthEarnings;
        }
      }

      setEarnings({
        today: todayEarnings.toFixed(2),
        month: monthEarnings.toFixed(2),
        year: yearEarnings.toFixed(2),
      });
    } catch (error) {
      console.error('计算收入时出错:', error);
    }
  }, [userInfo, i18n.language]);

  // 定时更新
  useEffect(() => {
    calculateEarnings();
    const timer = setInterval(calculateEarnings, 60000);
    return () => clearInterval(timer);
  }, [calculateEarnings]);

  return (
      <div className="space-y-4">
        {/* 今日收入 */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-medium text-gray-600 mb-4">
            {t('dashboard.today_earnings')}
          </h3>
          <MoneyDisplay amount={earnings.today} size="lg" />
        </div>

        {/* 本月收入 */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-medium text-gray-600 mb-4">
            {t('dashboard.month_earnings')}
          </h3>
          <MoneyDisplay amount={earnings.month} size="lg" />
        </div>

        {/* 今年收入 */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-medium text-gray-600 mb-4">
            {t('dashboard.year_earnings')}
          </h3>
          <MoneyDisplay amount={earnings.year} size="lg" />
        </div>
      </div>
  );
}

export default EarningsDisplay;