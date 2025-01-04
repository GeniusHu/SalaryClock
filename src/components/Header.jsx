import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Settings from './Settings';

function Header({ onSettingsUpdate }) {
  const { t, i18n } = useTranslation();
  const [showSettings, setShowSettings] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'zh' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <>
      <header className="bg-primary shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            {t('app_name')}
          </Link>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              title={t('settings.title')}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>

            <button
              onClick={toggleLanguage}
              className="px-4 py-2 rounded-lg bg-white shadow hover:bg-gray-100 transition-colors"
            >
              {i18n.language === 'en' ? '中文' : 'English'}
            </button>
          </div>
        </div>
      </header>

      <Settings 
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        onUpdate={() => {
          onSettingsUpdate();
          setShowSettings(false);
        }}
      />
    </>
  );
}

export default Header; 