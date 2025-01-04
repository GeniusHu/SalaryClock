import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

function About() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('about.title')} - {t('app_name')}</title>
        <meta name="description" content="About Earnings Tracker - Track your work time and earnings" />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h1 className="text-2xl font-bold mb-4">{t('about.title')}</h1>
          <div className="space-y-4">
            <p>{t('about.description')}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default About; 