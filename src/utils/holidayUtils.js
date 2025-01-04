// 中国节假日数据 (2024年示例)
const CN_HOLIDAYS_2024 = {
  // 元旦
  '2024-01-01': { isHoliday: true },
  // 春节
  '2024-02-10': { isHoliday: true },
  '2024-02-11': { isHoliday: true },
  '2024-02-12': { isHoliday: true },
  '2024-02-13': { isHoliday: true },
  '2024-02-14': { isHoliday: true },
  '2024-02-15': { isHoliday: true },
  '2024-02-16': { isHoliday: true },
  // 清明节
  '2024-04-04': { isHoliday: true },
  '2024-04-05': { isHoliday: true },
  '2024-04-06': { isHoliday: true },
  // 劳动节
  '2024-05-01': { isHoliday: true },
  '2024-05-02': { isHoliday: true },
  '2024-05-03': { isHoliday: true },
  // 端午节
  '2024-06-10': { isHoliday: true },
  // 中秋节
  '2024-09-15': { isHoliday: true },
  '2024-09-16': { isHoliday: true },
  '2024-09-17': { isHoliday: true },
  // 国庆节
  '2024-10-01': { isHoliday: true },
  '2024-10-02': { isHoliday: true },
  '2024-10-03': { isHoliday: true },
  '2024-10-04': { isHoliday: true },
  '2024-10-05': { isHoliday: true },
  '2024-10-06': { isHoliday: true },
  '2024-10-07': { isHoliday: true },
};

// 美国节假日数据 (2024年示例)
const US_HOLIDAYS_2024 = {
  // New Year's Day
  '2024-01-01': { isHoliday: true },
  // Martin Luther King Jr. Day
  '2024-01-15': { isHoliday: true },
  // Presidents Day
  '2024-02-19': { isHoliday: true },
  // Memorial Day
  '2024-05-27': { isHoliday: true },
  // Juneteenth
  '2024-06-19': { isHoliday: true },
  // Independence Day
  '2024-07-04': { isHoliday: true },
  // Labor Day
  '2024-09-02': { isHoliday: true },
  // Columbus Day
  '2024-10-14': { isHoliday: true },
  // Veterans Day
  '2024-11-11': { isHoliday: true },
  // Thanksgiving Day
  '2024-11-28': { isHoliday: true },
  // Christmas Day
  '2024-12-25': { isHoliday: true },
};

export function isWorkingDay(date, locale = 'en') {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const dateString = `${year}-${month}-${day}`;

  // 判断是否为周末
  const isWeekend = date.getDay() === 0 || date.getDay() === 6;

  // 根据语言选择节假日数据
  const holidays = locale === 'zh' ? CN_HOLIDAYS_2024 : US_HOLIDAYS_2024;

  // 判断是否为节假日
  const isHoliday = holidays[dateString]?.isHoliday || false;

  return !isWeekend && !isHoliday;
}

export function getWorkdaysInMonth(year, month, locale = 'en') {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  let workdays = 0;

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    if (isWorkingDay(date, locale)) {
      workdays++;
    }
  }

  return workdays;
} 