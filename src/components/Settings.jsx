import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { setUserInfo, getUserInfo } from '../utils/cookieUtils';
import { trackEvent } from '../utils/analytics';

function Settings({ isOpen, onClose, onUpdate }) {
  const { t } = useTranslation();
  const userInfo = getUserInfo();
  const [formData, setFormData] = useState({
    monthlySalary: userInfo.monthlySalary,
    workStartTime: userInfo.workStartTime,
    workEndTime: userInfo.workEndTime,
    joinDate: userInfo.joinDate,
    workDays: userInfo.workDays || [1, 2, 3, 4, 5],
    hideAllMoney: userInfo.hideAllMoney || false,
  });

  const weekdays = [
    { value: 1, label: '周一' },
    { value: 2, label: '周二' },
    { value: 3, label: '周三' },
    { value: 4, label: '周四' },
    { value: 5, label: '周五' },
    { value: 6, label: '周六' },
    { value: 0, label: '周日' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserInfo({
      ...userInfo,
      ...formData
    });
    
    trackEvent('Settings', 'update', 'user_settings_updated');
    
    onUpdate();
    onClose();
  };

  const handleWorkDayToggle = (day) => {
    setFormData(prev => ({
      ...prev,
      workDays: prev.workDays.includes(day)
        ? prev.workDays.filter(d => d !== day)
        : [...prev.workDays, day].sort()
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{t('settings.title')}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('settings.monthly_salary')}
            </label>
            <input
              type="number"
              name="monthlySalary"
              value={formData.monthlySalary}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('settings.work_start_time')}
              </label>
              <input
                type="time"
                name="workStartTime"
                value={formData.workStartTime}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('settings.work_end_time')}
              </label>
              <input
                type="time"
                name="workEndTime"
                value={formData.workEndTime}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('settings.join_date')}
            </label>
            <input
              type="date"
              name="joinDate"
              value={formData.joinDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              工作日
            </label>
            <div className="flex flex-wrap gap-2">
              {weekdays.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleWorkDayToggle(value)}
                  className={`px-3 py-1 rounded-full ${
                    formData.workDays.includes(value)
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between py-2 border-t">
            <span className="text-sm font-medium text-gray-700">隐藏所有金额</span>
            <button
              type="button"
              onClick={() => setFormData(prev => ({
                ...prev,
                hideAllMoney: !prev.hideAllMoney
              }))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                formData.hideAllMoney ? 'bg-primary' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  formData.hideAllMoney ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              {t('settings.cancel')}
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
            >
              {t('settings.save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Settings; 