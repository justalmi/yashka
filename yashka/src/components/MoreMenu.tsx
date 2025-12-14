import { useState, useRef, useEffect } from 'react';

const MoreVerticalIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
  </svg>
);

const InfoIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ShieldIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const FileTextIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

export function MoreMenu() {
  const [isOpen, setIsOpen] = useState(false);
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

  const handleItemClick = (action: string) => {
    console.log(`${action} clicked`);
    setIsOpen(false);
    // Здесь можно добавить логику для открытия модальных окон
  };

  const [showInfo, setShowInfo] = useState(false);

  const handleInfoClick = () => {
    setShowInfo(true);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 transition-all"
        aria-label="Дополнительное меню"
      >
        <MoreVerticalIcon className="text-slate-700" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-red-100 py-2 z-50">
          <button
            onClick={handleInfoClick}
            className="w-full px-4 py-3 text-left hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 transition-all flex items-center gap-3 text-slate-700"
          >
            <InfoIcon />
            <span>Информация о сайте</span>
          </button>

          <button
            onClick={() => handleItemClick('privacy')}
            className="w-full px-4 py-3 text-left hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 transition-all flex items-center gap-3 text-slate-700"
          >
            <ShieldIcon />
            <span>Политика конфиденциальности</span>
          </button>

          <button
            onClick={() => handleItemClick('terms')}
            className="w-full px-4 py-3 text-left hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 transition-all flex items-center gap-3 text-slate-700"
          >
            <FileTextIcon />
            <span>Условия использования</span>
          </button>
        </div>
      )}

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
    </div>
  );
}