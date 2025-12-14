import { useState, useRef, useEffect } from 'react';
import { User, PlatformConfig, SavedChannel } from '../App';
import { ChannelManager } from './ChannelManager';

const ChevronDownIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const InfoIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const LogOutIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const SettingsIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const EyeIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const EyeOffIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
  </svg>
);

interface UserMenuProps {
  user: User;
  onLogout: () => void;
  onSwitchAccount: () => void;
  onUserUpdate: (user: User) => void;
  articlesCount: number;
  platformConfig: PlatformConfig;
  onPlatformConfigSave: (config: PlatformConfig) => void;
  savedChannels: SavedChannel[];
  onSaveChannel: (channel: SavedChannel) => void;
  onRemoveChannel: (channelId: string) => void;
}

export function UserMenu({ 
  user, 
  onLogout, 
  onSwitchAccount, 
  onUserUpdate, 
  articlesCount, 
  platformConfig, 
  onPlatformConfigSave,
  savedChannels,
  onSaveChannel,
  onRemoveChannel
}: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [apiSettingsOpen, setApiSettingsOpen] = useState(false);
  const [bio, setBio] = useState(user.bio);
  const [telegramToken, setTelegramToken] = useState(platformConfig.telegramToken);
  const [vkToken, setVkToken] = useState(platformConfig.vkToken);
  const [showTelegramToken, setShowTelegramToken] = useState(false);
  const [showVkToken, setShowVkToken] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const daysActive = Math.floor((Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24));

  const handleSaveBio = () => {
    const updatedUser = { ...user, bio };
    onUserUpdate(updatedUser);
    setShowProfile(false);
  };

  const handleSaveSettings = () => {
    const updatedConfig = { ...platformConfig, telegramToken, vkToken };
    onPlatformConfigSave(updatedConfig);
    setShowSettings(false);
  };

  return (
    <>
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 transition-all group"
        >
          <img
            src={user.avatar}
            alt={user.username}
            className="w-10 h-10 rounded-full object-cover border-2 border-gradient-to-r from-red-500 to-orange-500 group-hover:scale-105 transition-transform"
          />
          <div className="text-left">
            <div className="text-sm text-slate-800">{user.username}</div>
            <div className="text-xs text-slate-500">{user.email}</div>
          </div>
          <ChevronDownIcon className={`text-slate-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-red-100 overflow-hidden z-50">
            {/* Убрали кнопку "Информация о сайте" - теперь она в MoreMenu */}
            
            <button
              onClick={() => {
                setShowProfile(true);
                setIsOpen(false);
              }}
              className="w-full px-4 py-3 text-left hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 transition-colors flex items-center gap-3"
            >
              <UserIcon className="text-orange-600" />
              <span className="text-slate-800">Информация о себе</span>
            </button>

            <button
              onClick={() => {
                setTelegramToken(platformConfig.telegramToken);
                setVkToken(platformConfig.vkToken);
                setShowSettings(true);
                setIsOpen(false);
              }}
              className="w-full px-4 py-3 text-left hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 transition-colors flex items-center gap-3"
            >
              <SettingsIcon className="text-red-600" />
              <span className="text-slate-800">Настройки</span>
            </button>

            <button
              onClick={() => {
                onLogout();
                setIsOpen(false);
              }}
              className="w-full px-4 py-3 text-left hover:bg-red-50 transition-colors flex items-center gap-3 border-t border-red-100"
            >
              <LogOutIcon className="text-red-600" />
              <span className="text-red-600">Выйти из аккаунта</span>
            </button>
          </div>
        )}
      </div>

      {/* Info Modal */}
      {showInfo && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-red-500 to-orange-500 p-6">
              <h2 className="text-2xl text-white">О проекте Яшка Новости</h2>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg text-slate-800 mb-3">О проекте</h3>
                <p className="text-slate-700 mb-3">
                  Яшка Новости — это интеллектуальный помощник для автоматизации публикаций в социальных сетях. Наше приложение использует искусственный интеллект для обработки новостных статей и адаптации контента под ваш уникальный стиль коммуникации.
                </p>
              </div>

              <div>
                <h3 className="text-lg text-slate-800 mb-3">Основные возможности</h3>
                <div className="space-y-2 text-slate-700">
                  <p>🤖 <strong>AI-обработка статей</strong> — извлечение ключевой информации из новостных источников</p>
                  <p>✨ <strong>Адаптация стиля</strong> — настройка тона, длины и формата текста под ваши предпочтения</p>
                  <p>📱 <strong>Мультиплатформенность</strong> — публикация в Telegram и Вконтакте одним кликом</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg text-slate-800 mb-3">Как это работает</h3>
                <div className="space-y-2 text-slate-700">
                  <p><strong>1.</strong> Вставьте ссылку на статью, которую хотите опубликовать</p>
                  <p><strong>2.</strong> Яшка Новости проанализирует контент и извлечет ключевую информацию</p>
                  <p><strong>3.</strong> Настройте стиль подачи: тон, длину текста, добавьте эмодзи и хэштеги</p>
                  <p><strong>4.</strong> Выберите платформы для публикации и укажите ID каналов</p>
                  <p><strong>5.</strong> Опубликуйте контент одним кликом!</p>
                </div>
              </div>

              <p className="text-xs text-slate-500 text-center pt-4">
                © 2025 Яшка Новости. Все права защищены.
              </p>

              <button
                onClick={() => setShowInfo(false)}
                className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white rounded-lg transition-all"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
            <div className="bg-gradient-to-r from-red-500 to-orange-500 p-6">
              <h2 className="text-2xl text-white">Информация о себе</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg">
                <img
                  src={user.avatar}
                  alt={user.username}
                  className="w-16 h-16 rounded-full object-cover border-2 border-red-500"
                />
                <div>
                  <div className="text-slate-800">{user.username}</div>
                  <div className="text-sm text-slate-600">{user.email}</div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-lg border border-red-200">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl text-red-600">{articlesCount}</div>
                    <div className="text-xs text-slate-600">Публикаций</div>
                  </div>
                  <div>
                    <div className="text-2xl text-orange-600">{daysActive}</div>
                    <div className="text-xs text-slate-600">Дней активности</div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-2">
                  О себе
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Расскажите о себе..."
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSaveBio}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white rounded-lg transition-all"
                >
                  Сохранить
                </button>
                <button
                  onClick={() => {
                    setBio(user.bio);
                    setShowProfile(false);
                  }}
                  className="flex-1 px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg transition-all"
                >
                  Отмена
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-red-500 to-orange-500 p-6">
              <h2 className="text-2xl text-white">Настройки</h2>
            </div>
            <div className="p-6 space-y-4">
              <ChannelManager
                savedChannels={savedChannels}
                onSaveChannel={onSaveChannel}
                onRemoveChannel={onRemoveChannel}
              />

              <div className="bg-white rounded-xl shadow-lg border border-red-100 overflow-hidden">
                <button
                  onClick={() => setApiSettingsOpen(!apiSettingsOpen)}
                  className="w-full p-4 flex items-center justify-between hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 transition-all"
                >
                  <span className="text-slate-800">Настройки API</span>
                  <ChevronDownIcon className={`text-slate-600 transition-transform ${apiSettingsOpen ? 'rotate-180' : ''}`} />
                </button>

                {apiSettingsOpen && (
                  <div className="p-6 pt-2 space-y-4">
                    <div>
                      <label className="block text-sm text-slate-700 mb-2">
                        Токен Telegram
                      </label>
                      <div className="relative">
                        <input
                          type={showTelegramToken ? 'text' : 'password'}
                          value={telegramToken}
                          onChange={(e) => setTelegramToken(e.target.value)}
                          placeholder="123456:ABC-DEF1234"
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                        <button
                          onClick={() => setShowTelegramToken(!showTelegramToken)}
                          className="absolute right-3 top-3 text-slate-500 hover:text-slate-700"
                        >
                          {showTelegramToken ? (
                            <EyeOffIcon className="w-5 h-5" />
                          ) : (
                            <EyeIcon className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-slate-700 mb-2">
                        Токен Вконтакте
                      </label>
                      <div className="relative">
                        <input
                          type={showVkToken ? 'text' : 'password'}
                          value={vkToken}
                          onChange={(e) => setVkToken(e.target.value)}
                          placeholder="vk1.a.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                        <button
                          onClick={() => setShowVkToken(!showVkToken)}
                          className="absolute right-3 top-3 text-slate-500 hover:text-slate-700"
                        >
                          {showVkToken ? (
                            <EyeOffIcon className="w-5 h-5" />
                          ) : (
                            <EyeIcon className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSaveSettings}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white rounded-lg transition-all"
                >
                  Сохранить
                </button>
                <button
                  onClick={() => {
                    setTelegramToken(platformConfig.telegramToken);
                    setVkToken(platformConfig.vkToken);
                    setShowSettings(false);
                  }}
                  className="flex-1 px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg transition-all"
                >
                  Отмена
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}