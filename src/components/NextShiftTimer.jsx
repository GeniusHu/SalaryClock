import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function NextShiftTimer({ userInfo }) {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [nextWorkTime, setNextWorkTime] = useState(null);

  useEffect(() => {
    const calculateNextWorkDay = () => {
      const now = new Date();
      let nextDate = new Date(now);
      const [startHour, startMinute] = userInfo.workStartTime.split(':').map(Number);
      
      // 如果当前时间已经过了今天的上班时间，从明天开始算
      if (now.getHours() > startHour || (now.getHours() === startHour && now.getMinutes() >= startMinute)) {
        nextDate.setDate(nextDate.getDate() + 1);
      }

      // 找到下一个工作日
      while (!userInfo.workDays.includes(nextDate.getDay())) {
        nextDate.setDate(nextDate.getDate() + 1);
      }

      // 设置具体上班时间
      nextDate.setHours(startHour, startMinute, 0, 0);
      return nextDate;
    };

    const updateTimer = () => {
      const now = new Date();
      const next = nextWorkTime || calculateNextWorkDay();
      if (!nextWorkTime) {
        setNextWorkTime(next);
      }

      const diff = next - now;
      if (diff <= 0) {
        // 如果时间到了，重新计算下一个工作日
        const newNext = calculateNextWorkDay();
        setNextWorkTime(newNext);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, [userInfo, nextWorkTime]);

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-xl font-bold mb-4">{t('dashboard.next_shift')}</h2>
      <div className="flex justify-between items-center">
        <TimeBlock value={timeLeft.days} label={t('time.days')} />
        <TimeBlock value={timeLeft.hours} label={t('time.hours')} />
        <TimeBlock value={timeLeft.minutes} label={t('time.minutes')} />
        <TimeBlock value={timeLeft.seconds} label={t('time.seconds')} />
      </div>
      {nextWorkTime && (
        <p className="mt-4 text-gray-600 text-center">
          {t('next_shift_time')}: {nextWorkTime.toLocaleString()}
        </p>
      )}
    </div>
  );
}

function TimeBlock({ value, label }) {
  return (
    <div className="text-center px-4 py-2 bg-primary rounded-lg">
      <div className="text-2xl font-bold">{String(value).padStart(2, '0')}</div>
      <div className="text-sm">{label}</div>
    </div>
  );
}

export default NextShiftTimer; 