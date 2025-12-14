import { useState } from 'react';
import { User } from '../App';

const XIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
  onGuestLogin?: () => void;
}

export function AuthModal({ isOpen, onClose, onLogin, onGuestLogin }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  if (!isOpen) return null;

  const validatePassword = (pwd: string): string | null => {
    if (pwd.length < 6) {
      return 'Пароль должен содержать минимум 6 символов';
    }
    if (!/[a-zA-Z]/.test(pwd)) {
      return 'Пароль должен содержать латинские буквы';
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd)) {
      return 'Пароль должен содержать специальные символы';
    }
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (mode === 'register') {
      if (!username.trim()) {
        newErrors.username = 'Введите имя пользователя!';
      }
      
      const passwordError = validatePassword(password);
      if (passwordError) {
        newErrors.password = passwordError;
      }
      
      if (password !== confirmPassword) {
        newErrors.confirmPassword = 'Пароли не совпадают!';
      }
    }

    if (!email.trim()) {
      newErrors.email = 'Введите электронную почту!';
    }
    
    if (!password.trim()) {
      newErrors.password = 'Введите пароль!';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    // Simulate authentication
    const user: User = {
      id: mode === 'register' ? Date.now().toString() : email,
      username: mode === 'register' ? username : email.split('@')[0],
      email,
      bio: '',
      avatar: 'https://images.unsplash.com/photo-1732224207073-fd179b617cfe?w=200',
      createdAt: new Date()
    };

    // Save to localStorage for persistence
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (mode === 'register') {
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
    }

    onLogin(user);
    resetForm();
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setUsername('');
    setConfirmPassword('');
    setErrors({});
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        <div className="bg-gradient-to-r from-red-500 to-orange-500 p-6 flex items-center justify-between">
          <h2 className="text-2xl text-white">
            {mode === 'login' ? 'Вход' : 'Регистрация'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/20 transition-colors"
          >
            <XIcon className="w-5 h-5 text-white" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-sm text-slate-700 mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (errors.username) {
                    setErrors(prev => ({ ...prev, username: '' }));
                  }
                }}
                placeholder="Ваше имя пользователя"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                  errors.username ? 'border-red-500' : 'border-slate-300'
                }`}
                required
              />
              {errors.username && (
                <p className="text-xs text-red-600 mt-1">{errors.username}</p>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm text-slate-700 mb-2">
              Электронная почта
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) {
                  setErrors(prev => ({ ...prev, email: '' }));
                }
              }}
              placeholder="example@email.com"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                errors.email ? 'border-red-500' : 'border-slate-300'
              }`}
              required
            />
            {errors.email && (
              <p className="text-xs text-red-600 mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-slate-700 mb-2">
              Пароль
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) {
                  setErrors(prev => ({ ...prev, password: '' }));
                }
              }}
              placeholder="••••••••"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                errors.password ? 'border-red-500' : 'border-slate-300'
              }`}
              required
            />
            {errors.password && (
              <p className="text-xs text-red-600 mt-1">{errors.password}</p>
            )}
          </div>

          {mode === 'register' && (
            <div>
              <label className="block text-sm text-slate-700 mb-2">
                Повторите пароль
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword) {
                    setErrors(prev => ({ ...prev, confirmPassword: '' }));
                  }
                }}
                placeholder="••••••••"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                  errors.confirmPassword ? 'border-red-500' : 'border-slate-300'
                }`}
                required
              />
              {errors.confirmPassword && (
                <p className="text-xs text-red-600 mt-1">{errors.confirmPassword}</p>
              )}
            </div>
          )}

          <button
            type="submit"
            className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white rounded-lg transition-all hover:shadow-lg transform active:scale-98"
          >
            {mode === 'login' ? 'Авторизоваться' : 'Зарегистрироваться'}
          </button>

          {onGuestLogin && (
            <div className="text-center">
              <button
                type="button"
                onClick={onGuestLogin}
                className="text-sm text-red-600 hover:text-red-700 hover:underline"
              >
                Войти как гость
              </button>
            </div>
          )}

          <div className="text-center">
            <button
              type="button"
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              className="text-sm text-red-600 hover:text-red-700 hover:underline"
            >
              {mode === 'login' ? 'Не зарегистрированы?' : 'Уже есть аккаунт?'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}