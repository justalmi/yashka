import { ProcessedArticle } from '../App';
import { useState } from 'react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  articles: ProcessedArticle[];
  onSelectArticle: (article: ProcessedArticle) => void;
  onAddNewClick: () => void;
  isAuthenticated: boolean;
  onLoginClick: () => void;
}

const ChevronLeftIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const XIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const MenuIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const PlusIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const LogInIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

export function Sidebar({
  isOpen,
  onToggle,
  articles,
  onSelectArticle,
  onAddNewClick,
  isAuthenticated,
  onLoginClick
}: SidebarProps) {
  const [collapsedDates, setCollapsedDates] = useState<Set<string>>(new Set());
  const [collapsedUrls, setCollapsedUrls] = useState<Set<string>>(new Set());

  const toggleDate = (date: string) => {
    setCollapsedDates(prev => {
      const newSet = new Set(prev);
      if (newSet.has(date)) {
        newSet.delete(date);
      } else {
        newSet.add(date);
      }
      return newSet;
    });
  };

  const toggleUrl = (dateUrlKey: string) => {
    setCollapsedUrls(prev => {
      const newSet = new Set(prev);
      if (newSet.has(dateUrlKey)) {
        newSet.delete(dateUrlKey);
      } else {
        newSet.add(dateUrlKey);
      }
      return newSet;
    });
  };

  // Группировка по дате и URL
  const groupedArticles = articles.reduce((acc, article) => {
    const dateKey = new Date(article.date).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    
    if (!acc[dateKey]) {
      acc[dateKey] = {};
    }
    
    // Группируем по URL (или "Без ссылки" для ручного ввода)
    const urlKey = article.url || 'manual_input';
    
    if (!acc[dateKey][urlKey]) {
      acc[dateKey][urlKey] = [];
    }
    
    acc[dateKey][urlKey].push(article);
    return acc;
  }, {} as Record<string, Record<string, ProcessedArticle[]>>);

  return (
    <div
      className={`absolute left-0 top-0 bottom-0 bg-white shadow-xl transition-all duration-300 flex flex-col border-r border-red-100 z-10 ${
        isOpen ? 'w-80' : 'w-0'
      }`}
    >
      {isOpen && (
        <>
          <div className="p-4 border-b border-red-100 bg-gradient-to-r from-red-50 to-orange-50 flex items-center justify-between">
            <h2 className="text-slate-800">История взаимодействий</h2>
            <button
              onClick={onToggle}
              className="p-1.5 rounded-lg hover:bg-red-100 transition-colors"
              aria-label="Закрыть историю"
            >
              <XIcon />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-white to-red-50/30">
            {!isAuthenticated ? (
              <div className="text-center text-slate-400 text-sm py-8">
                Публикаций пока нет
              </div>
            ) : (
              <>
                {Object.entries(groupedArticles).map(([date, urlGroups]) => (
                  <div key={date} className="border border-red-100 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleDate(date)}
                      className="w-full text-left px-3 py-2 bg-gradient-to-r from-red-50 to-orange-50 hover:from-red-100 hover:to-orange-100 transition-all flex items-center justify-between"
                    >
                      <div className="text-xs text-slate-700 uppercase tracking-wider">
                        {date}
                      </div>
                      <ChevronDownIcon className={`text-slate-600 transition-transform ${collapsedDates.has(date) ? '-rotate-90' : ''}`} />
                    </button>
                    {!collapsedDates.has(date) && (
                      <div className="p-2 space-y-3">
                        {Object.entries(urlGroups).map(([urlKey, urlArticles]) => {
                          const dateUrlKey = `${date}-${urlKey}`;
                          return (
                            <div key={urlKey} className="space-y-2">
                              {/* Показываем URL как подзаголовок с возможностью сворачивания */}
                              {(urlArticles.length > 1 || urlKey !== 'manual_input') && (
                                <button
                                  onClick={() => toggleUrl(dateUrlKey)}
                                  className="w-full text-left text-xs text-slate-600 px-2 py-1.5 bg-slate-100 hover:bg-slate-200 rounded flex items-center justify-between transition-colors"
                                >
                                  <span className="truncate">
                                    {urlKey === 'manual_input' ? '✍️ Ручной ввод' : `🔗 ${urlKey.substring(0, 35)}${urlKey.length > 35 ? '...' : ''}`}
                                  </span>
                                  <ChevronDownIcon className={`flex-shrink-0 ml-2 transition-transform ${collapsedUrls.has(dateUrlKey) ? '-rotate-90' : ''}`} />
                                </button>
                              )}
                              {!collapsedUrls.has(dateUrlKey) && urlArticles.map(article => (
                                <button
                                  key={article.id}
                                  onClick={() => onSelectArticle(article)}
                                  className="w-full text-left p-3 rounded-lg bg-gradient-to-r from-red-50 to-orange-50 hover:from-red-100 hover:to-orange-100 transition-all hover:shadow-md group border border-red-100"
                                >
                                  <div className="text-sm text-slate-800 line-clamp-2 group-hover:text-red-600 mb-2">
                                    {article.title}
                                  </div>
                                  <div className="space-y-1">
                                    {article.platforms.telegram && article.publishedTo.telegramId && (
                                      <div className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded flex items-center justify-between">
                                        <span>Telegram</span>
                                        <span className="text-xs text-red-600">{article.publishedTo.telegramId}</span>
                                      </div>
                                    )}
                                    {article.platforms.vk && article.publishedTo.vkId && (
                                      <div className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded flex items-center justify-between">
                                        <span>Вконтакте</span>
                                        <span className="text-xs text-orange-600">{article.publishedTo.vkId}</span>
                                      </div>
                                    )}
                                  </div>
                                </button>
                              ))}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
                {articles.length === 0 && (
                  <div className="text-center text-slate-400 text-sm mt-8">
                    Публикаций пока нет
                  </div>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}