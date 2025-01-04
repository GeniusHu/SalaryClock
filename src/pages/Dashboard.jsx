import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { initUserInfo, getUserInfo } from '../utils/cookieUtils';
import EarningsDisplay from '../components/EarningsDisplay';
import NextShiftTimer from '../components/NextShiftTimer';
import ShareButton from '../components/ShareButton';
import MoneyDisplay from '../components/MoneyDisplay';

// Dashboard组件: 主页面
// 功能:
// 1. 显示用户信息和当前时间
// 2. 显示下次上班倒计时
// 3. 显示收入统计
function Dashboard() {
  const { t } = useTranslation();
  const [userInfo, setUserInfo] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // 初始化和更新用户信息
  const updateUserInfo = () => {
    const info = getUserInfo() || initUserInfo();
    setUserInfo(info);
  };

  useEffect(() => {
    updateUserInfo();

    // 更新当前时间
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>{t('dashboard.title')} - {t('app_name')}</title>
        <meta name="description" content="Track your earnings, work time, and next shift with our earnings calculator." />
      </Helmet>

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
                  <MoneyDisplay amount={userInfo.monthlySalary} size="md" />
                </div>
              </div>
            </div>

            {/* 下次上班倒计时 */}
            <NextShiftTimer userInfo={userInfo} />
          </div>

          {/* 右侧面板 */}
          <div className="space-y-6">
            {/* 收入展示 */}
            <EarningsDisplay key={JSON.stringify(userInfo)} userInfo={userInfo} />

            {/* 金钱小贴士 */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zm0 16a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
                摸鱼小贴士
              </h3>
              <div className="space-y-2 text-gray-600">
                <p>• 工作再累，也要记得喝水休息</p>
                <p>• 合理安排时间，提高工作效率</p>
                <p>• 适度摸鱼，保持心情愉悦</p>
              </div>
            </div>

            {/* 分享按钮 */}
            <ShareButton />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard; 