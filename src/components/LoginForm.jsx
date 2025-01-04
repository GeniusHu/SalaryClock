import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { setToken, setUserInfo } from '../utils/cookieUtils';

// LoginForm组件: 用户登录表单
// 功能:
// 1. 用户名密码输入
// 2. 表单验证
// 3. 登录状态保存
function LoginForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');

  // 处理输入变化
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 处理表单提交
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // 这里应该是实际的API调用
      // 现在用模拟数据
      if (formData.username === 'demo' && formData.password === 'demo') {
        const mockUserData = {
          id: 1,
          username: 'demo',
          joinDate: '2024-01-01',
          monthlySalary: 16666
        };
        
        setToken('mock-token');
        setUserInfo(mockUserData);
        navigate('/');
      } else {
        setError(t('login.invalid_credentials'));
      }
    } catch (err) {
      setError(t('login.error'));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">{t('login.title')}</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-gray-700 mb-2">{t('login.username')}</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">{t('login.password')}</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            {t('login.submit')}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm; 