import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

function Privacy() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('privacy.title')} - {t('app_name')}</title>
        <meta name="description" content={t('privacy.meta_description')} />
      </Helmet>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h1 className="text-2xl font-bold mb-6">{t('privacy.title')}</h1>
          <div className="space-y-6 text-gray-600">
            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-800">{t('privacy.data_collection.title')}</h2>
              <p>{t('privacy.data_collection.content')}</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-800">{t('privacy.data_usage.title')}</h2>
              <p>{t('privacy.data_usage.content')}</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-800">{t('privacy.data_protection.title')}</h2>
              <p>{t('privacy.data_protection.content')}</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-800">{t('privacy.user_rights.title')}</h2>
              <p>{t('privacy.user_rights.content')}</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-800">{t('privacy.contact.title')}</h2>
              <p>{t('privacy.contact.content')}</p>
            </section>

            <footer className="mt-8 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                {t('privacy.last_updated')}: 2024-01-22
              </p>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}

export default Privacy;