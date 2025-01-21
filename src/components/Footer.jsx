import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-white shadow-md mt-8">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap justify-center items-center space-x-4 text-sm text-gray-600">
          <Link to="/privacy" className="hover:text-primary transition-colors">
            {t('privacy.title')}
          </Link>
          <span>•</span>
          <Link to="/about" className="hover:text-primary transition-colors">
            {t('about.title')}
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;