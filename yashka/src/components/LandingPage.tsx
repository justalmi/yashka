interface LandingPageProps {
  onAuthRequired: () => void;
  isAuthenticated?: boolean;
}

const SparklesIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const RocketIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const HashtagIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
  </svg>
);

const TrendingUpIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
  </svg>
);

export function LandingPage({ onAuthRequired, isAuthenticated }: LandingPageProps) {
  const features = [
    {
      icon: <SparklesIcon />,
      title: "AI-обработка статей",
      description: "Извлечение ключевой информации из новостных источников"
    },
    {
      icon: <RocketIcon />,
      title: "Адаптация стиля",
      description: "Настройка тона, длины и формата текста под ваши предпочтения"
    },
    {
      icon: <HashtagIcon />,
      title: "Мультиплатформенность",
      description: "Публикация в Telegram и Вконтакте одним кликом"
    }
  ];

  const steps = [
    "Вставьте ссылку на статью, которую хотите опубликовать",
    "Яшка Новости проанализирует контент и извлечет ключевую информацию",
    "Настройте стиль подачи: тон, длину текста, добавьте эмодзи и хэштеги",
    "Выберите платформы для публикации и укажите ID каналов",
    "Опубликуйте контент одним кликом!"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-red-50 overflow-y-auto">
      {/* Hero Section */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl mb-6 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                Яшка Новости
              </h1>
              <p className="text-xl text-slate-700 mb-4">
                Интеллектуальный помощник для автоматизации публикаций в социальных сетях
              </p>
              <p className="text-slate-600 mb-8">
                Наше приложение использует искусственный интеллект для обработки новостных статей и адаптации контента под ваш уникальный стиль коммуникации.
              </p>
              <button
                onClick={onAuthRequired}
                className="group px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white rounded-xl transition-all hover:shadow-2xl transform hover:scale-105 flex items-center gap-3"
              >
                <span className="text-lg">Начать работу</span>
                <ArrowRightIcon className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1683721003111-070bcc053d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMG1hcmtldGluZ3xlbnwxfHx8fDE3NjU1ODc4NDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Яшка AI Platform"
                  className="w-full h-96 object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-4 border-2 border-red-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                    <SparklesIcon className="text-white" />
                  </div>
                  <div>
                    <div className="text-2xl bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">AI-Powered</div>
                    <div className="text-xs text-slate-600">Умная обработка контента</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-slate-800 mb-4">Основные возможности</h2>
            <p className="text-slate-600">Все что нужно для эффективного управления публикациями</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg border border-red-100 hover:shadow-2xl transition-all hover:scale-105 hover:border-red-300"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center mb-4 text-white">
                  {feature.icon}
                </div>
                <h3 className="text-lg text-slate-800 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-8 text-white shadow-2xl">
            <h2 className="text-3xl mb-6 text-center">Гибкие настройки</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <CheckCircleIcon className="flex-shrink-0 mt-1" />
                <div>
                  <div className="text-lg mb-1">Контроль над стилем</div>
                  <div className="text-sm text-white/80">Выбирайте между формальным, неформальным, профессиональным и креативным стилем</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircleIcon className="flex-shrink-0 mt-1" />
                <div>
                  <div className="text-lg mb-1">Длина текста</div>
                  <div className="text-sm text-white/80">Короткие посты до 500 символов, средние до 2000 или длинные до 5000</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircleIcon className="flex-shrink-0 mt-1" />
                <div>
                  <div className="text-lg mb-1">Эмодзи и хэштеги</div>
                  <div className="text-sm text-white/80">Автоматическое добавление эмодзи и релевантных хэштегов</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircleIcon className="flex-shrink-0 mt-1" />
                <div>
                  <div className="text-lg mb-1">Ручное редактирование</div>
                  <div className="text-sm text-white/80">Возможность доработки AI-сгенерированного текста вручную</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      {!isAuthenticated && (
        <div className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl text-slate-800 mb-6">Готовы начать?</h2>
            <p className="text-xl text-slate-600 mb-8">
              Присоединяйтесь к Яшка Новости и автоматизируйте публикации в социальных сетях уже сегодня
            </p>
            <button
              onClick={onAuthRequired}
              className="group px-12 py-5 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white rounded-xl transition-all hover:shadow-2xl transform hover:scale-105 flex items-center gap-3 mx-auto text-xl"
            >
              <ClockIcon />
              <span>Создать аккаунт бесплатно</span>
              <ArrowRightIcon className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}