import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ArticleProcessor } from './components/ArticleProcessor';
import { AuthModal } from './components/AuthModal';
import { UserMenu } from './components/UserMenu';
import { Footer } from './components/Footer';
import logo from 'figma:asset/f8899166cc824de4610695743e6c7ea4716684f7.png';

export interface User {
  id: string;
  username: string;
  email: string;
  bio: string;
  avatar: string;
  createdAt: Date;
}

export interface ProcessedArticle {
  id: string;
  userId: string;
  url: string;
  title: string;
  originalText: string;
  processedText: string;
  style: 'formal' | 'casual' | 'professional' | 'creative';
  textLength: 'short' | 'medium' | 'long';
  date: Date;
  platforms: {
    telegram: boolean;
    vk: boolean;
  };
  publishedTo: {
    telegramId?: string;
    vkId?: string;
  };
}

export interface PlatformConfig {
  telegramToken: string;
  vkToken: string;
}

export interface SavedChannel {
  id: string;
  platform: 'telegram' | 'vk';
  channelId: string;
  name: string;
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [articles, setArticles] = useState<ProcessedArticle[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<ProcessedArticle | null>(null);
  const [showLanding, setShowLanding] = useState(true);
  const [platformConfig, setPlatformConfig] = useState<PlatformConfig>(() => {
    const saved = localStorage.getItem('platformConfig');
    return saved ? JSON.parse(saved) : { telegramToken: '', vkToken: '' };
  });
  const [savedChannels, setSavedChannels] = useState<SavedChannel[]>(() => {
    const saved = localStorage.getItem('savedChannels');
    return saved ? JSON.parse(saved) : [];
  });

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      parsedUser.createdAt = new Date(parsedUser.createdAt);
      setUser(parsedUser);
      setShowLanding(false); // При загрузке авторизованного пользователя сразу показываем форму добавления
    }
  }, []);

  // Load articles for current user
  useEffect(() => {
    if (user) {
      const savedArticles = localStorage.getItem(`articles_${user.id}`);
      if (savedArticles) {
        const parsed = JSON.parse(savedArticles);
        const articlesWithDates = parsed.map((a: any) => ({
          ...a,
          date: new Date(a.date)
        }));
        setArticles(articlesWithDates);
      } else {
        setArticles([]);
      }
    } else {
      setArticles([]);
    }
  }, [user]);

  // Save articles when they change
  useEffect(() => {
    if (user) {
      localStorage.setItem(`articles_${user.id}`, JSON.stringify(articles));
    }
  }, [articles, user]);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
    setAuthModalOpen(false);
    setShowLanding(false);
  };

  const handleGuestLogin = () => {
    // Создаем гостевого пользователя
    const guestUser: User = {
      id: 'guest_' + Date.now(),
      username: 'Гость',
      email: 'guest@example.com',
      bio: 'Гостевой аккаунт',
      avatar: 'https://images.unsplash.com/photo-1732224207073-fd179b617cfe?w=200',
      createdAt: new Date()
    };
    
    setUser(guestUser);
    localStorage.setItem('currentUser', JSON.stringify(guestUser));
    setAuthModalOpen(false);
    setShowLanding(false);
  };

  const handleLogout = () => {
    setUser(null);
    setArticles([]);
    setSelectedArticle(null);
    localStorage.removeItem('currentUser');
    setShowLanding(true); // При выходе показываем лендинг
  };

  const handleSwitchAccount = () => {
    setUser(null);
    setArticles([]);
    setSelectedArticle(null);
    localStorage.removeItem('currentUser');
    // Очистка API настроек при смене аккаунта
    setPlatformConfig({ telegramToken: '', vkToken: '' });
    localStorage.removeItem('platformConfig');
    setShowLanding(false); // При смене аккаунта открываем страницу добавления ссылки
    setAuthModalOpen(true);
  };

  const handleUserUpdate = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    // Update user in users list
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const index = users.findIndex((u: User) => u.id === updatedUser.id);
    if (index !== -1) {
      users[index] = updatedUser;
      localStorage.setItem('users', JSON.stringify(users));
    }
  };

  const handleArticlePublished = (article: ProcessedArticle) => {
    if (user) {
      const articleWithUser = { ...article, userId: user.id };
      setArticles(prev => [articleWithUser, ...prev]);
      // Устанавливаем обработанную статью как выбранную
      setSelectedArticle(articleWithUser);
    }
  };

  const handleSelectArticle = (article: ProcessedArticle) => {
    setSelectedArticle(article);
    setShowLanding(false);
  };

  const handleBackToAdd = () => {
    // При нажатии на "+" сохраняем текущую статью если она есть
    // (она уже будет в истории из-за сохранения при обработке)
    setSelectedArticle(null);
    setShowLanding(false);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogoClick = () => {
    // Всегда переход на главную страницу (добавление ссылки)
    setShowLanding(false);
    setSelectedArticle(null);
    handleScrollToTop();
  };

  const handleStartWork = () => {
    // Переход с лендинга к рабочему интерфейсу
    if (user) {
      setShowLanding(false);
    } else {
      setAuthModalOpen(true);
    }
  };

  const handlePlatformConfigSave = (config: PlatformConfig) => {
    setPlatformConfig(config);
    localStorage.setItem('platformConfig', JSON.stringify(config));
  };

  const handleSaveChannel = (channel: SavedChannel) => {
    const updatedChannels = [...savedChannels, channel];
    setSavedChannels(updatedChannels);
    localStorage.setItem('savedChannels', JSON.stringify(updatedChannels));
  };

  const handleRemoveChannel = (channelId: string) => {
    const updatedChannels = savedChannels.filter(c => c.id !== channelId);
    setSavedChannels(updatedChannels);
    localStorage.setItem('savedChannels', JSON.stringify(updatedChannels));
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-red-50 via-orange-50 to-red-50">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        articles={articles}
        onSelectArticle={handleSelectArticle}
        onAddNewClick={handleBackToAdd}
        isAuthenticated={!!user}
        onLoginClick={() => setAuthModalOpen(true)}
      />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-white border-b border-red-100 shadow-sm px-6 py-4 flex justify-between items-center">
          {/* Левая часть: Бургер-меню + Логотип */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 transition-all"
              aria-label="Открыть историю"
            >
              <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <button
              onClick={handleLogoClick}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <img className="h-12 object-contain" src={logo} alt="Яшка Новости" />
            </button>
          </div>

          {/* Центр: Кнопка Главная */}
          <div className="absolute left-1/2 -translate-x-1/2">
            {user && (
              <button
                onClick={handleBackToAdd}
                className="text-slate-700 hover:text-red-600 transition-colors underline"
              >
                Главная
              </button>
            )}
          </div>

          {/* Пользовательское меню справа */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <UserMenu 
                  user={user} 
                  onLogout={handleLogout} 
                  onSwitchAccount={handleSwitchAccount}
                  onUserUpdate={handleUserUpdate}
                  articlesCount={articles.length}
                  platformConfig={platformConfig}
                  onPlatformConfigSave={handlePlatformConfigSave}
                  savedChannels={savedChannels}
                  onSaveChannel={handleSaveChannel}
                  onRemoveChannel={handleRemoveChannel}
                />
              </>
            ) : (
              <>
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-slate-300 flex items-center justify-center">
                    <svg className="w-6 h-6 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <span className="text-slate-700">Войти</span>
                </button>
              </>
            )}
          </div>
        </div>
        
        <div className="flex-1 overflow-auto">
          <ArticleProcessor
            user={user}
            onArticlePublished={handleArticlePublished}
            selectedArticle={selectedArticle}
            platformConfig={platformConfig}
            onAuthRequired={() => setAuthModalOpen(true)}
            savedChannels={savedChannels}
            showLanding={showLanding}
            onStartWork={handleStartWork}
          />
          {!selectedArticle && <Footer />}
        </div>
      </main>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLogin={handleLogin}
        onGuestLogin={handleGuestLogin}
      />
    </div>
  );
}