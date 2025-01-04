import LoginForm from '../components/LoginForm';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

function Login() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('login.title')} - {t('app_name')}</title>
        <meta name="description" content="Login to track your earnings and work time" />
      </Helmet>
      <LoginForm />
    </>
  );
}

export default Login; 