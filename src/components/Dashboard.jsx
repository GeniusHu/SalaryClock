import React from 'react';
import { useTranslation } from 'react-i18next';
import MoneyDisplay from './MoneyDisplay';
import ShareButton from './ShareButton';

function Dashboard() {
  const { t } = useTranslation();
  // ... 其他代码

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 左侧面板 */}
        <div className="space-y-6">
          {/* 用户信息和当前时间 */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h1 className="text-2xl font-bold mb-4 flex items-center">
              <span>{t('app_name')}</span>
              <span className="ml-2 text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                摸鱼中...
              </span>
            </h1>
            <p className="text-xl mb-4">{currentTime.toLocaleString()}</p>
            <div className="space-y-2">
              <p className="text-gray-600">
                {t('dashboard.join_date')}: {userInfo.joinDate}
              </p>
              <div className="flex items-center text-gray-600">
                <span className="mr-2">{t('dashboard.monthly_salary')}:</span>
                <MoneyDisplay 
                  amount={userInfo.monthlySalary} 
                  size="md" 
                  data-monthly-salary
                />
              </div>
            </div>
          </div>

          {/* 下次上班倒计时 */}
          <NextShiftTimer userInfo={userInfo} />
        </div>

        {/* 右侧面板 */}
        <div className="space-y-6">
          {/* 收入展示 */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-medium text-gray-600 mb-4">
              {t('dashboard.today_earnings')}
            </h3>
            <MoneyDisplay 
              amount={earnings.today} 
              size="lg" 
              data-today-earnings
            />
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-medium text-gray-600 mb-4">
              {t('dashboard.month_earnings')}
            </h3>
            <MoneyDisplay 
              amount={earnings.month} 
              size="lg" 
              data-month-earnings
            />
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-medium text-gray-600 mb-4">
              {t('dashboard.year_earnings')}
            </h3>
            <MoneyDisplay 
              amount={earnings.year} 
              size="lg" 
              data-year-earnings
            />
          </div>

          {/* 分享按钮 */}
          <ShareButton />
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 