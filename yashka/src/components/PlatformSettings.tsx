import { PlatformConfig } from '../App';
import { useState } from 'react';

interface PlatformSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  config: PlatformConfig;
  onConfigChange: (config: PlatformConfig) => void;
}

const XIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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

export function PlatformSettings({
  isOpen,
  onClose,
  config,
  onConfigChange
}: PlatformSettingsProps) {
  const [telegramToken, setTelegramToken] = useState(config.telegramToken);
  const [vkToken, setVkToken] = useState(config.vkToken);
  const [showTelegramToken, setShowTelegramToken] = useState(false);
  const [showVkToken, setShowVkToken] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onConfigChange({ telegramToken, vkToken });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        <div className="bg-gradient-to-r from-red-500 to-orange-500 p-6 flex items-center justify-between">
          <h2 className="text-2xl text-white">Настройки API</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/20 transition-colors"
          >
            <XIcon />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm text-slate-700 mb-2">
              API Token Telegram Bot
            </label>
            <div className="relative">
              <input
                type={showTelegramToken ? "text" : "password"}
                value={telegramToken}
                onChange={(e) => setTelegramToken(e.target.value)}
                placeholder="123456:ABC-DEF1234"
                className="w-full px-4 py-3 pr-12 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button
                type="button"
                onClick={() => setShowTelegramToken(!showTelegramToken)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showTelegramToken ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Получите токен у @BotFather в Telegram
            </p>
          </div>

          <div>
            <label className="block text-sm text-slate-700 mb-2">
              API Token Вконтакте
            </label>
            <div className="relative">
              <input
                type={showVkToken ? "text" : "password"}
                value={vkToken}
                onChange={(e) => setVkToken(e.target.value)}
                placeholder="vk1.a.XXXXXXXXXXXXXXXXXXXX"
                className="w-full px-4 py-3 pr-12 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="button"
                onClick={() => setShowVkToken(!showVkToken)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showVkToken ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Создайте приложение VK и получите токен доступа
            </p>
          </div>

          <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-slate-700">
              💡 <strong>Важно:</strong> API токены необходимы для автоматической публикации постов. Токены хранятся локально в вашем браузере.
            </p>
          </div>
        </div>

        <div className="p-6 border-t border-slate-200">
          <button
            onClick={handleSave}
            className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white rounded-lg transition-all hover:shadow-lg"
          >
            Сохранить настройки
          </button>
        </div>
      </div>
    </div>
  );
}