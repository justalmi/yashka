import { useState, useEffect } from 'react';
import { ProcessedArticle, PlatformConfig, User, SavedChannel } from '../App';
import { StyleSettings } from './StyleSettings';
import { ChannelManager } from './ChannelManager';
import { LandingPage } from './LandingPage';

const LinkIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
  </svg>
);

const Loader2Icon = () => (
  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const SparklesIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l3.057-.626L9 5l3-3m0 0l3 3 3-3m3 3l-3.057.626L15 5l-3 3m0 0l-3-3-3 3m-3 3l3.057-.626L9 5l3 3m0 0l3 3 3-3m3 3l-3.057.626L15 5l-3 3" />
  </svg>
);

const TelegramIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.015-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.009-1.252-.242-1.865-.442-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.141.121.099.155.232.171.325.016.093.036.305.02.471z"/>
  </svg>
);

const VKIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.35 14.46h-1.34c-.45 0-.58-.36-1.38-1.16-.7-.7-1-.79-1.18-.79-.24 0-.31.07-.31.41v1.06c0 .29-.09.46-1.07.46-1.58 0-3.33-.96-4.56-2.75-1.84-2.61-2.34-4.57-2.34-4.97 0-.18.07-.35.41-.35h1.34c.31 0 .42.14.54.47.61 1.77 1.63 3.32 2.05 3.32.16 0 .23-.07.23-.48v-1.86c-.05-.8-.47-.87-.47-1.15 0-.14.12-.28.31-.28h2.1c.26 0 .35.14.35.44v2.52c0 .26.12.35.19.35.16 0 .29-.09.58-.38 1.08-1.21 1.85-3.08 1.85-3.08.1-.21.24-.35.55-.35h1.34c.38 0 .47.2.38.47-.15.7-1.68 3.15-1.68 3.15-.13.21-.18.3 0 .53.13.18.56.55.85.89.53.58 1.08 1.16 1.21 1.53.14.38-.08.57-.45.57z"/>
  </svg>
);

const CopyIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

interface ArticleProcessorProps {
  user: User | null;
  onArticlePublished: (article: ProcessedArticle) => void;
  selectedArticle: ProcessedArticle | null;
  platformConfig: PlatformConfig;
  onAuthRequired: () => void;
  savedChannels: SavedChannel[];
  showLanding: boolean;
  onStartWork: () => void;
  onResetArticle?: () => void;
}

export function ArticleProcessor({
  user,
  onArticlePublished,
  selectedArticle,
  platformConfig,
  onAuthRequired,
  savedChannels,
  showLanding,
  onStartWork,
  onResetArticle
}: ArticleProcessorProps) {
  const [url, setUrl] = useState('');
  const [processing, setProcessing] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<ProcessedArticle | null>(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState({
    telegram: false,
    vk: false
  });
  const [telegramId, setTelegramId] = useState('');
  const [vkId, setVkId] = useState('');
  const [localText, setLocalText] = useState('');
  const [currentStyle, setCurrentStyle] = useState<'formal' | 'casual' | 'professional' | 'creative'>('formal');
  const [textLength, setTextLength] = useState<'short' | 'medium' | 'long'>('medium');
  const [includeSource, setIncludeSource] = useState(false);
  const [useHashtags, setUseHashtags] = useState(false);
  const [useEmojis, setUseEmojis] = useState(false);
  const [additionalInstructions, setAdditionalInstructions] = useState('');
  const [warning, setWarning] = useState('');
  const [selectedTelegramChannel, setSelectedTelegramChannel] = useState<string>('');
  const [selectedVkChannel, setSelectedVkChannel] = useState<string>('');
  const [publishOpen, setPublishOpen] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [urlError, setUrlError] = useState('');
  const [copiedOriginal, setCopiedOriginal] = useState(false);
  const [copiedProcessed, setCopiedProcessed] = useState(false);
  const [scheduledPublish, setScheduledPublish] = useState<'none' | '1h' | '3h' | '8h' | '12h' | 'custom'>('none');
  const [customSchedule, setCustomSchedule] = useState({
    date: new Date().toISOString().split('T')[0],
    time: '12:00'
  });
  const [showCustomSchedule, setShowCustomSchedule] = useState(false);
  const [editingTitle, setEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [showManualInput, setShowManualInput] = useState(false);
  const [manualTitle, setManualTitle] = useState('');
  const [manualText, setManualText] = useState('');
  const [lastSavedText, setLastSavedText] = useState('');

  useEffect(() => {
    if (selectedArticle) {
      setCurrentArticle(selectedArticle);
      setLocalText(selectedArticle.processedText);
      setSelectedPlatforms(selectedArticle.platforms);
      setCurrentStyle(selectedArticle.style);
      setTextLength(selectedArticle.textLength);
      setTelegramId(selectedArticle.publishedTo.telegramId || '');
      setVkId(selectedArticle.publishedTo.vkId || '');
      setEditedTitle(selectedArticle.title);
    } else {
      // Когда selectedArticle становится null, сбрасываем currentArticle
      setCurrentArticle(null);
      setLocalText('');
    }
  }, [selectedArticle]);

  const validateTelegramId = (id: string): boolean => {
    if (!id) return false;
    // Telegram ID должен начинаться с @ или быть числом
    return id.startsWith('@') || /^-?\d+$/.test(id);
  };

  const validateVkId = (id: string): boolean => {
    if (!id) return false;
    // VK ID может быть ислом, строкой или начинаться с club/public
    return /^[a-zA-Z0-9_-]+$/.test(id);
  };

  const validateUrl = (url: string): boolean => {
    if (!url) return false;
    // Проверка на корректный URL формат
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const copyToClipboard = async (text: string): Promise<boolean> => {
    try {
      // Попытка использовать современный Clipboard API
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (err) {
      // Если Clipboard API не работает, используем fallback
    }
    
    // Fallback метод для старых браузеров или когда API заблокирован
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    } catch (err) {
      console.error('Failed to copy text:', err);
      return false;
    }
  };

  const handleCopyOriginal = async () => {
    if (!currentArticle) return;
    const success = await copyToClipboard(currentArticle.originalText);
    if (success) {
      setCopiedOriginal(true);
      setTimeout(() => setCopiedOriginal(false), 2000);
    }
  };

  const handleCopyProcessed = async () => {
    const success = await copyToClipboard(localText);
    if (success) {
      setCopiedProcessed(true);
      setTimeout(() => setCopiedProcessed(false), 2000);
    }
  };

  // Удаляем автосохранение при изменении текста - сохраняем только при действиях пользователя

  const handleManualProcess = async () => {
    if (!user) {
      onAuthRequired();
      return;
    }

    if (!manualTitle.trim() || !manualText.trim()) {
      setUrlError('Введите заголовок и текст статьи.');
      return;
    }

    setProcessing(true);
    setWarning('');
    setUrlError('');
    
    // Симуляция обработки
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const processedText = generateProcessedText('formal', 'medium', manualText);

    const article: ProcessedArticle = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId: user.id,
      url: '',
      title: manualTitle,
      originalText: manualText,
      processedText: processedText,
      style: 'formal',
      textLength: 'medium',
      date: new Date(),
      platforms: { telegram: false, vk: false },
      publishedTo: {}
    };

    setCurrentArticle(article);
    setLocalText(processedText);
    setLastSavedText(processedText);
    setCurrentStyle('formal');
    setTextLength('medium');
    setManualTitle('');
    setManualText('');
    setUrlError('');
    setEditedTitle(manualTitle);
    setShowManualInput(false);
    
    // Сохраняем статью в историю сразу после обработки
    onArticlePublished(article);
    setProcessing(false);
  };

  const handleProcess = async () => {
    if (!user) {
      onAuthRequired();
      return;
    }

    if (!validateUrl(url)) {
      setUrlError('Введите корректную ссылку на статью.');
      return;
    }

    setProcessing(true);
    setWarning('');
    setUrlError('');
    
    // Симуляция обработки статьи AI
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const originalText = 'OpenAI объявила о выпуске новой модели GPT-5, которая демонстрирует значительные улучшения в области обработки естественного языка и логического мышления. Новая модель показывает прирост производительности на 40% по сравнению с предыдущей версией. Разработчики отмечают расширенные возможности понимания контекста и решения сложных задач. Модель поддерживает более 100 языков и имеет улучшенные способности к генерации креативного контента. Технологическое сообщество уже активно обсуждает перспективы применения новой модели в различных областях, от медицины до юриспруденции. Релиз запланирован на второй квартал 2024 года.';
    const processedText = generateProcessedText('formal', 'medium', originalText);

    const article: ProcessedArticle = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId: user.id,
      url,
      title: 'OpenAI представила GPT-5',
      originalText: originalText,
      processedText: processedText,
      style: 'formal',
      textLength: 'medium',
      date: new Date(),
      platforms: { telegram: false, vk: false },
      publishedTo: {}
    };

    setCurrentArticle(article);
    setLocalText(processedText);
    setLastSavedText(processedText);
    setCurrentStyle('formal');
    setTextLength('medium');
    setUrl('');
    setUrlError('');
    setEditedTitle(article.title);
    
    // Сохраняем статью в историю сразу после обработки
    onArticlePublished(article);
    setProcessing(false);
  };

  const handleReprocess = async () => {
    if (!currentArticle) return;

    setProcessing(true);
    setWarning('');
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newProcessedText = generateProcessedText(currentStyle, textLength, currentArticle.originalText);
    setLocalText(newProcessedText);
    
    // Создаем новую версию статьи с обновленным текстом и сохраняем в историю
    const updatedArticle: ProcessedArticle = {
      ...currentArticle,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // Новый ID для новой записи
      processedText: newProcessedText,
      style: currentStyle,
      textLength: textLength,
      date: new Date()
    };
    
    setCurrentArticle(updatedArticle);
    
    // Сохраняем новую версию в историю
    onArticlePublished(updatedArticle);
    
    setProcessing(false);
  };

  const generateProcessedText = (style: 'formal' | 'casual' | 'professional' | 'creative', length: 'short' | 'medium' | 'long', originalText?: string): string => {
    const baseText = originalText || (currentArticle ? currentArticle.originalText : '');
    
    const styles = {
      formal: generateFormalText(baseText, length),
      casual: generateCasualText(baseText, length),
      professional: generateProfessionalText(baseText, length),
      creative: generateCreativeText(baseText, length)
    };

    return styles[style];
  };

  const generateFormalText = (text: string, length: 'short' | 'medium' | 'long'): string => {
    const shortText = `🔔 ОФИЦИАЛЬНОЕ СООБЩЕНИЕ\n\nКомпания OpenAI объявила о выпуске новой языковой модели GPT-5, демонстрирующей значительные улучшения в области обработки естественного языка.\n\nКЛЮЧЕВЫЕ ХАРАКТЕРИСТИКИ:\n• Повышение производительности на 40%\n• Расширенное понимание контекста\n• Поддержка более 100 языков`;

    const mediumText = `🔔 ОФИЦИАЛЬНОЕ СООБЩЕНИЕ\n\nКомпания OpenAI объявила о выпуске новой языковой модели GPT-5, демонстрирующей значительные улучшения в области обработки естественного языка и искусственного интеллекта.\n\nКЛЮЧЕВЫЕ ХАРАКТЕРИСТИКИ:\n• Повышение производительности логического мышления на 40% в сравнении с предыдущей версией\n• Расширенные возможности контекстного анализа и понимания сложных запросов\n• Улучшенная способность к решению комплексных многоступенчатых задач\n• Расширенная поддержка более 100 языков с высокой точностью перевода\n\nСогласно заявлениям представителей компании, данная разработка представляет собой существенный прогресс в сфере искусственного интеллекта и открывает новые горизонты для применения технологии.\n\nРЕАКЦИЯ ЭКСПЕРТНОГО СООБЩЕСТВА:\nТехнологическое сообщество отреагировало на анонс исключительно положительно. Ведущие специалисты отрасли характеризуют GPT-5 как "следующий эволюционный шаг в развитии искусственного интеллекта".`;

    const longText = mediumText + `\n\nТЕХНОЛОГИЧЕСКИЕ ДОСТИЖЕНИЯ:\nМодель демонстрирует беспрецедентные возможности в области творческой генерации контента, глубокого анализа информации и работы со специализированными областями знаний, включая медицину, юриспруденцию и научные исследования.\n\nКОММЕРЧЕСКАЯ ДОСТУПНОСТЬ:\nЗапланированный релиз коммерческой версии: второй квартал 2024 года\nЦеновая политика будет объявлена дополнительно, однако компания заверяет о конкурентоспособности тарифов.\n\nOpenAI также анонсировала разработку специализированных отраслевых версий модели, адаптированных под конкретные бизнес-потребности различных индустрий.`;

    return length === 'short' ? shortText : length === 'medium' ? mediumText : longText;
  };

  const generateCasualText = (text: string, length: 'short' | 'medium' | 'long'): string => {
    const shortText = `Эй, новость дня! 🚀\n\nOpenAI выкатили GPT-5, и это просто бомба! Новая модель умеет делать то, что раньше казалось невозможным.\n\n✨ Логика стала круче на 40%\n✨ Понимает контекст как никогда\n✨ Говорит на 100+ языках`;

    const mediumText = `Эй, новость дня! 🚀\n\nOpenAI выкатили GPT-5, и это просто бомба! Новая модель умеет делать то, что раньше казалось невозможным. Представьте - искусственный интеллект, который реально понимает, что вы от него хотите!\n\nЧто нового? 🎯\n✨ Логика стала круче на 40% - это ж сколько!\n✨ Понимает контекст как никогда рьше\n✨ Справляется даже с суперсложными задачами\n✨ Говорит на 100+ языках - вот это да!\n\nРазработчики и учёные уже в восторге - все обсуждают, что это реально меняет игру в AI. Причём не просто чуть-чуть, а прямо кардинально!\n\nФишки, которые зацепили всех:\n🎨 Креативность на новом уровне - пишет, рисует, придумывает\n🔬 Разбирается в медицине, праве, науке - как настоящий эксперт`;

    const longText = mediumText + `\n\nКороче, реакция от сообщества - просто огонь! 🔥\nВсе уже начали тестить, что-то придумывать, экспериментировать. Кто-то называет это "следующим шагом эволюции ИИ" - и похоже, что не зря!\n\nКогда выйдет? 📅\nЖдём во втором квартале 2024 года. Цену пока держат в секрете, но обещают, что будет адекватно.\n\nКстати, OpenAI говорят, что сделают специальные версии для разных направлений бизнеса. То есть можно будет одобрать именно под свои задачи - это же круто!\n\nВ общем, это прям событие года в мире технологий! Следите за обновлениями, будет интересно 😉`;

    return length === 'short' ? shortText : length === 'medium' ? mediumText : longText;
  };

  const generateProfessionalText = (text: string, length: 'short' | 'medium' | 'long'): string => {
    const shortText = `📊 АНАЛИТИЧЕСКАЯ СВОДКА: ЗАПУСК GPT-5\n\nOpenAI анонсировала релиз GPT-5 - новейшей генерации языковых моделей с существенными технологическими усовершенствованиями.\n\nТЕХНИЧЕСКИЕ ПОКАЗАТЕЛИ:\n→ Прирост эффективности: +40%\n→ Углублённый контекстный анализ\n→ Поддержка 100+ языков`;

    const mediumText = `📊 АНАЛИТИЧЕСКАЯ СВОДКА: ЗАПУСК GPT-5\n\nOpenAI анонсировала релиз GPT-5 - новейшей генерации языковых моделей с существенными технологическими усовершенствованиями в области обработки естественного языка и машинного обучения.\n\nТЕХНИЧЕСКИЕ ПОКАЗАТЕЛИ:\n→ Прирост эффективности логических операций: +40%\n→ Углублённый контекстный анализ с расширенным окном понимания\n→ Расширенный функционал решения многоуровневых задач\n→ Поддержка 100+ языков с высокой точностью обработки\n\nРЫНОЧНЫЕ ПЕРСПЕКТИВЫ:\nЭкспертное сообщество признаё данный продукт потенциальным катализатором трансформации AI-индустрии. Технология уже привлекла внимание ведущих специалистов глобального рынка.\n\nФУНКЦИОНАЛЬНЫЕ ВОЗМОЖНОСТИ:\n• Генерация креативного контента с высокой степенью уникальности\n• Специализированная работа в вертикальных доменах (медицина, юриспруденция, R&D)`;

    const longText = mediumText + `\n\nГРАФИК ВЫВОДА НА РЫНОК:\nКоммерческий запуск: Q2 2024\nЦеновая политика: в разработке, жидается конкурентное позиционирование\n\nСТРАТЕГИЧЕСКИЕ ИНИЦИАТИВЫ:\nOpenAI разрабатывает линейку специализированных решений для различных индустриальных сегментов, что позволит максимально адаптировать технологию под специфические бизнес-требования клиентов.\n\nРЕАКЦИЯ ПРОФЕССИОНАЛЬНОГО СООБЩЕСТВА:\nИндустрия демонстрирует высокий уровень заинтересованности в новом продукте. Характеристика "эволюционный прорыв в AI" от ведущих экспертов отражает значимость данного релиза для дальнейшего развития отрасли.\n\nРЕКОМЕНДАЦИИ:\nРекомендуется к мониторингу профессионалам отрасли, технологическим директорам и специалистам по цифровой трансформации.`;

    return length === 'short' ? shortText : length === 'medium' ? mediumText : longText;
  };

  const generateCreativeText = (text: string, length: 'short' | 'medium' | 'long'): string => {
    const shortText = `✨ РЕВОЛЮЦИЯ УЖЕ ЗДЕСЬ! ✨\n\nПредставьте: искусственный интеллект, который думает почти как человек, но быстрее, точнее и никогда не устаёт. Это GPT-5!\n\n🌟 МАГИЯ ТЕХНОЛОГИИ:\n🧠 Логика взлетела на 40%!\n💡 Понимает нюансы и тонкости\n🌈 Говорит на сотне языков`;

    const mediumText = `✨ РЕВОЛЮЦИЯ УЖЕ ЗДЕСЬ! ✨\n\nПредставьте: искусственный интеллект, который думает почти как человек, но быстрее, точнее и никогда не устаёт. Это не страницы фантастического романа - это GPT-5, и он уже реальность! 🎯\n\n🌟 МАГИЯ НОВОЙ ТЕХНОЛОГИИ:\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n🧠 Логическое мышление взлетело на 40%! Да-да, почти в полтора раза умнее!\n💡 Понимает нюансы и тонкости, словно читает между строк вашего сознания\n🎨 Креативность встречается с точностью - получается чистая магия\n Говорит на сотне языков так, будто родился в каждой стране\n\nМир AI замер в ожидании. Эксперты называют это "переломным моментом". И знаете что? Они абсолютно правы!\n\n🎪 ЧТО ОН УМЕЕТ ТАКОГО КРУТОГО?\n🎭 Создаёт контент, от которого мурашки по коже\n🔬 Разбирается в медицине, праве, науке как профессор с тремя дипломами`;

    const longText = mediumText + `\n\n💫 РЕАКЦИЯ МИРА:\nПредставьте себе: тысячи разработчиков по всему миру одновременно воскликнули "ВАУ!" когда увидели, на что способна эта штука. Технологическое сообщество просто взорвалось от восторга!\n\n⏰ КОГДА ЖДАТЬ ЧУДА?\nВесна-лето 2024 станут особенными! Именно тогда GPT-5 станет доступен всем желающим.\n\n🎁 ЦЕНА ВОЛШЕБСТВА?\nПока это тайна, покрытая мраком интриги... Но компания обещает, что ожидание того стоит! Цены будут чеснми и конкурентными.\n\n🎨 ОСОБЕННОСТИ ДЛЯ БИЗНЕСА:\nOpenAI готовит специальные версии для разных отраслей! Медицина? Есть! Юриспруденция? Пожалуйста! Наука? Разумеется!\n\nБудущее уже стучится в дверь. Более того - оно уже на пороге! Вы готовы впустить его? 🚀`;

    return length === 'short' ? shortText : length === 'medium' ? mediumText : longText;
  };

  const handlePublish = () => {
    if (!currentArticle) return;

    const isTelegramValid = selectedPlatforms.telegram ? validateTelegramId(telegramId) : true;
    const isVkValid = selectedPlatforms.vk ? validateVkId(vkId) : true;

    if (!selectedPlatforms.telegram && !selectedPlatforms.vk) {
      setValidationError('Выберите хотя бы одну платформу для публикации!');
      return;
    }

    if (!isTelegramValid) {
      setValidationError('Некорректный формат ID для Telegram! ID должен начинаться с @ или быть числом.');
      return;
    }

    if (!isVkValid) {
      setValidationError('Некорректный формат ID для Вконтакте! ID должен содержать только буквы, цифры, дефис или подчеркивание.');
      return;
    }

    if (selectedPlatforms.telegram && !telegramId) {
      setValidationError('Введите ID канала для Telegram!');
      return;
    }

    if (selectedPlatforms.vk && !vkId) {
      setValidationError('Введите ID сообщества для Вконтакте!');
      return;
    }

    const publishedArticle: ProcessedArticle = {
      ...currentArticle,
      title: editedTitle,
      processedText: localText,
      style: currentStyle,
      textLength: textLength,
      platforms: selectedPlatforms,
      publishedTo: {
        ...(selectedPlatforms.telegram && { telegramId }),
        ...(selectedPlatforms.vk && { vkId })
      },
      date: new Date()
    };

    onArticlePublished(publishedArticle);
    
    // Сбрасываем состояние и возвращаемся на страницу добавления ссылки
    setCurrentArticle(null);
    setLocalText('');
    setSelectedPlatforms({ telegram: false, vk: false });
    setTelegramId('');
    setVkId('');
    setWarning('');
    setValidationError('');
    setEditedTitle('');
    
    alert('Статья успешно опубликована!');
  };

  const getTimeUntilScheduled = (): string => {
    if (scheduledPublish === 'none') return '';
    
    const now = new Date();
    let scheduledTime: Date;
    
    if (scheduledPublish === 'custom') {
      const [year, month, day] = customSchedule.date.split('-').map(Number);
      const [hours, minutes] = customSchedule.time.split(':').map(Number);
      scheduledTime = new Date(year, month - 1, day, hours, minutes);
    } else {
      scheduledTime = new Date(now);
      const hours = scheduledPublish === '1h' ? 1 :
                   scheduledPublish === '3h' ? 3 :
                   scheduledPublish === '8h' ? 8 : 12;
      scheduledTime.setHours(scheduledTime.getHours() + hours);
    }
    
    const diffMs = scheduledTime.getTime() - now.getTime();
    
    if (diffMs < 0) return 'выбранное время уже прошло';
    
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    const parts: string[] = [];
    if (days > 0) parts.push(`${days} ${days === 1 ? 'день' : days < 5 ? 'дня' : 'дней'}`);
    if (hours > 0) parts.push(`${hours} ${hours === 1 ? 'час' : hours < 5 ? 'часа' : 'часов'}`);
    if (minutes > 0) parts.push(`${minutes} ${minutes === 1 ? 'минуту' : minutes < 5 ? 'минуты' : 'минут'}`);
    
    return parts.join(' ') || 'менее минуты';
  };

  // Показываем лендинг только для неавторизованных пользователей
  if (!user) {
    return (
      <LandingPage onAuthRequired={onAuthRequired} isAuthenticated={false} />
    );
  }

  // Для авторизованных пользователей НИКОГДА не показываем лендинг
  // Всегда показываем интерфейс добавления ссылки
  return (
    <div className="min-h-full max-w-4xl mx-auto p-8">
      {!currentArticle && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-red-100">
          <label className="block text-sm text-slate-700 mb-2">
            Ссылка на статью
          </label>
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleProcess()}
                placeholder="https://example.com/article"
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <button
              onClick={handleProcess}
              disabled={processing || !url.trim()}
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 disabled:from-slate-300 disabled:to-slate-300 text-white rounded-lg transition-all hover:shadow-lg disabled:cursor-not-allowed flex items-center gap-2"
            >
              {processing ? (
                <>
                  <Loader2Icon className="w-5 h-5 animate-spin" />
                  Обработка...
                </>
              ) : (
                'Обработать'
              )}
            </button>
          </div>
          {urlError && (
            <p className="text-sm text-red-500 mt-2">{urlError}</p>
          )}
          
          {/* Кнопка для переключения на ручной ввод */}
          <div className="mt-3 text-center">
            <button
              onClick={() => setShowManualInput(!showManualInput)}
              className="text-sm text-slate-600 hover:text-red-600 transition-colors underline"
            >
              {showManualInput ? 'Вернуться к вводу ссылки' : 'Или введите текст вручную'}
            </button>
          </div>

          {/* Форма ручного ввода */}
          {showManualInput && (
            <div className="mt-4 pt-4 border-t border-slate-200 space-y-3">
              <div>
                <label className="block text-sm text-slate-700 mb-2">
                  Заголовок статьи
                </label>
                <input
                  type="text"
                  value={manualTitle}
                  onChange={(e) => setManualTitle(e.target.value)}
                  placeholder="Введите заголовок"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-700 mb-2">
                  Текст статьи
                </label>
                <textarea
                  value={manualText}
                  onChange={(e) => setManualText(e.target.value)}
                  placeholder="Вставьте или введите текст статьи..."
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 min-h-40 resize-y"
                />
              </div>
              <button
                onClick={handleManualProcess}
                disabled={processing || !manualTitle.trim() || !manualText.trim()}
                className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 disabled:from-slate-300 disabled:to-slate-300 text-white rounded-lg transition-all hover:shadow-lg disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {processing ? (
                  <>
                    <Loader2Icon className="w-5 h-5 animate-spin" />
                    Обработка...
                  </>
                ) : (
                  'Обработать текст'
                )}
              </button>
            </div>
          )}
          
          {/* Раздел "Как это работает" */}
          <div className="mt-4 border-t border-slate-200 pt-4">
            <button
              onClick={() => setShowHowItWorks(!showHowItWorks)}
              className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 transition-colors"
            >
              <ChevronDownIcon className={`transition-transform ${showHowItWorks ? 'rotate-180' : ''}`} />
              Как это работает?
            </button>
            
            {showHowItWorks && (
              <div className="mt-4 space-y-4 text-sm text-slate-700">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white flex items-center justify-center">1</div>
                  <div>
                    <h4 className="text-slate-800 mb-1">Вставьте ссылку или введит текст вручную</h4>
                    <p className="text-slate-600">Скопируйте ссылку на статью из любого источника и вставьте в поле выше, либо используйте ручной ввод для собственного текста</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white flex items-center justify-center">2</div>
                  <div>
                    <h4 className="text-slate-800 mb-1">Обработка нейросетью</h4>
                    <p className="text-slate-600">ИИ извлечет основную информацию и адаптирует текст под выбранный стиль (формальный, неформальный, профессиональный или креативный)</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white flex items-center justify-center">3</div>
                  <div>
                    <h4 className="text-slate-800 mb-1">Настройте стиль и редактируйте</h4>
                    <p className="text-slate-600">Выберите тон публикации, длину текста и дополнительные опции. Отредактируйте текст вручную - все изменения автоматически сохраняются в истории</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white flex items-center justify-center">4</div>
                  <div>
                    <h4 className="text-slate-800 mb-1">Опубликуйте</h4>
                    <p className="text-slate-600">Выберите платформы и каналы для публикации готового материала</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {currentArticle && (
        <>
          {warning && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-orange-800">⚠️ {warning}</p>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-red-100">
            {editingTitle ? (
              <div className="mb-4">
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className="flex-1 text-2xl p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <button
                    onClick={() => {
                      setEditingTitle(false);
                      setCurrentArticle(prev => prev ? { ...prev, title: editedTitle } : null);
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg transition-all hover:shadow-md whitespace-nowrap"
                  >
                    Сохранить
                  </button>
                </div>
              </div>
            ) : (
              <h2 
                className="text-2xl text-slate-800 mb-4 cursor-pointer hover:text-red-600 transition-colors" 
                onClick={() => setEditingTitle(true)}
              >
                {currentArticle.title}
              </h2>
            )}
            
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm text-slate-600">Исходный текст ({currentArticle.originalText.length} символов):</h3>
                <button
                  onClick={handleCopyOriginal}
                  className="flex items-center gap-1.5 text-sm transition-colors"
                >
                  {copiedOriginal ? (
                    <>
                      <CheckIcon className="w-3.5 h-3.5 text-green-600" />
                      <span className="text-green-600">Скопировано</span>
                    </>
                  ) : (
                    <>
                      <CopyIcon className="w-3.5 h-3.5 text-slate-500" />
                      <span className="text-slate-500 hover:text-slate-700">Скопировать</span>
                    </>
                  )}
                </button>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg text-slate-700 text-sm max-h-60 overflow-y-auto border border-slate-200">
                {currentArticle.originalText}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm text-slate-600">Обработанный текст ({localText.length} символов):</h3>
                <button
                  onClick={handleCopyProcessed}
                  className="flex items-center gap-1.5 text-sm transition-colors"
                >
                  {copiedProcessed ? (
                    <>
                      <CheckIcon className="w-3.5 h-3.5 text-green-600" />
                      <span className="text-green-600">Скопировано</span>
                    </>
                  ) : (
                    <>
                      <CopyIcon className="w-3.5 h-3.5 text-slate-500" />
                      <span className="text-slate-500 hover:text-slate-700">Скопировать</span>
                    </>
                  )}
                </button>
              </div>
              <textarea
                value={localText}
                onChange={(e) => setLocalText(e.target.value)}
                className="w-full p-4 bg-gradient-to-br from-red-50 to-orange-50 rounded-lg text-slate-800 min-h-60 max-h-96 overflow-y-auto border border-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
              />
            </div>
          </div>

          <StyleSettings
            currentStyle={currentStyle}
            textLength={textLength}
            includeSource={includeSource}
            useHashtags={useHashtags}
            useEmojis={useEmojis}
            additionalInstructions={additionalInstructions}
            onStyleChange={setCurrentStyle}
            onTextLengthChange={setTextLength}
            onIncludeSourceChange={setIncludeSource}
            onUseHashtagsChange={setUseHashtags}
            onUseEmojisChange={setUseEmojis}
            onAdditionalInstructionsChange={setAdditionalInstructions}
            onReprocess={handleReprocess}
            processing={processing}
          />

          <div className="bg-white rounded-xl shadow-lg border border-red-100 overflow-hidden mb-6">
            <button
              onClick={() => setPublishOpen(!publishOpen)}
              className="w-full p-4 flex items-center justify-between hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 transition-all"
            >
              <div className="flex items-center gap-2">
                <SparklesIcon className="w-5 h-5 text-red-500" />
                <span className="text-slate-800">Опубликовать</span>
              </div>
              <ChevronDownIcon className={`text-slate-600 transition-transform ${publishOpen ? 'rotate-180' : ''}`} />
            </button>

            {publishOpen && (
              <div className="p-6 pt-2">
                <h3 className="text-sm text-slate-700 mb-4">Выбор платформ</h3>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <button
                      onClick={() => setSelectedPlatforms(prev => ({ ...prev, telegram: !prev.telegram }))}
                      className={`w-full px-6 py-4 rounded-lg border-2 transition-all transform active:scale-95 flex items-center gap-3 justify-center ${
                        selectedPlatforms.telegram
                          ? 'border-[#229ED9] bg-[#229ED9] shadow-lg shadow-blue-200'
                          : 'border-slate-300 bg-white hover:border-[#229ED9] hover:shadow-md'
                      }`}
                    >
                      <TelegramIcon className={selectedPlatforms.telegram ? 'text-white' : 'text-[#229ED9]'} />
                      <div className={`text-lg ${selectedPlatforms.telegram ? 'text-white' : 'text-slate-800'}`}>Telegram</div>
                    </button>
                    {selectedPlatforms.telegram && (
                      <div className="mt-2">
                        {savedChannels.filter(c => c.platform === 'telegram').length > 0 && (
                          <select
                            value={selectedTelegramChannel}
                            onChange={(e) => {
                              setSelectedTelegramChannel(e.target.value);
                              const channel = savedChannels.find(c => c.id === e.target.value);
                              if (channel) {
                                setTelegramId(channel.channelId);
                              }
                            }}
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#229ED9] mb-2"
                          >
                            <option value="">-- Выберите сохраненный канал --</option>
                            {savedChannels
                              .filter(c => c.platform === 'telegram')
                              .map(channel => (
                                <option key={channel.id} value={channel.id}>
                                  {channel.name} ({channel.channelId})
                                </option>
                              ))}
                          </select>
                        )}
                        <input
                          type="text"
                          value={telegramId}
                          onChange={(e) => {
                            setTelegramId(e.target.value);
                            setSelectedTelegramChannel('');
                          }}
                          placeholder="@channel_name или -100123456789"
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#229ED9]"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <button
                      onClick={() => setSelectedPlatforms(prev => ({ ...prev, vk: !prev.vk }))}
                      className={`w-full px-6 py-4 rounded-lg border-2 transition-all transform active:scale-95 flex items-center gap-3 justify-center ${
                        selectedPlatforms.vk
                          ? 'border-[#0077FF] bg-[#0077FF] shadow-lg shadow-blue-200'
                          : 'border-slate-300 bg-white hover:border-[#0077FF] hover:shadow-md'
                      }`}
                    >
                      <VKIcon className={selectedPlatforms.vk ? 'text-white' : 'text-[#0077FF]'} />
                      <div className={`text-lg ${selectedPlatforms.vk ? 'text-white' : 'text-slate-800'}`}>Вконтакте</div>
                    </button>
                    {selectedPlatforms.vk && (
                      <div className="mt-2">
                        {savedChannels.filter(c => c.platform === 'vk').length > 0 && (
                          <select
                            value={selectedVkChannel}
                            onChange={(e) => {
                              setSelectedVkChannel(e.target.value);
                              const channel = savedChannels.find(c => c.id === e.target.value);
                              if (channel) {
                                setVkId(channel.channelId);
                              }
                            }}
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0077FF] mb-2"
                          >
                            <option value="">-- Выберите сохраненное сообщество --</option>
                            {savedChannels
                              .filter(c => c.platform === 'vk')
                              .map(channel => (
                                <option key={channel.id} value={channel.id}>
                                  {channel.name} ({channel.channelId})
                                </option>
                              ))}
                          </select>
                        )}
                        <input
                          type="text"
                          value={vkId}
                          onChange={(e) => {
                            setVkId(e.target.value);
                            setSelectedVkChannel('');
                          }}
                          placeholder="club123456 или mygroup"
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0077FF]"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Отложенная публикация */}
                <div className="mb-6">
                  <label className="block text-sm text-slate-700 mb-3">Отложенная публикация</label>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                    <button
                      onClick={() => setScheduledPublish('none')}
                      className={`px-3 py-2 rounded-lg text-sm transition-all ${
                        scheduledPublish === 'none'
                          ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-md'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      Нет
                    </button>
                    <button
                      onClick={() => setScheduledPublish('1h')}
                      className={`px-3 py-2 rounded-lg text-sm transition-all ${
                        scheduledPublish === '1h'
                          ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-md'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      1 час
                    </button>
                    <button
                      onClick={() => setScheduledPublish('3h')}
                      className={`px-3 py-2 rounded-lg text-sm transition-all ${
                        scheduledPublish === '3h'
                          ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-md'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      3 часа
                    </button>
                    <button
                      onClick={() => setScheduledPublish('8h')}
                      className={`px-3 py-2 rounded-lg text-sm transition-all ${
                        scheduledPublish === '8h'
                          ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-md'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      8 часов
                    </button>
                    <button
                      onClick={() => setScheduledPublish('12h')}
                      className={`px-3 py-2 rounded-lg text-sm transition-all ${
                        scheduledPublish === '12h'
                          ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-md'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      12 часов
                    </button>
                    <button
                      onClick={() => setScheduledPublish('custom')}
                      className={`px-3 py-2 rounded-lg text-sm transition-all ${
                        scheduledPublish === 'custom'
                          ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-md'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      Другое
                    </button>
                  </div>
                  {scheduledPublish !== 'none' && (
                    <p className="text-xs text-slate-500 mt-2">
                      Публикация запланирована через {getTimeUntilScheduled()}
                    </p>
                  )}
                  {scheduledPublish === 'custom' && (
                    <div className="mt-2">
                      <div className="flex items-center gap-2">
                        <label className="text-sm text-slate-700">Дата:</label>
                        <input
                          type="date"
                          value={customSchedule.date}
                          onChange={(e) => setCustomSchedule(prev => ({ ...prev, date: e.target.value }))}
                          className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <label className="text-sm text-slate-700">Время:</label>
                        <input
                          type="time"
                          value={customSchedule.time}
                          onChange={(e) => setCustomSchedule(prev => ({ ...prev, time: e.target.value }))}
                          className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {validationError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                    <p className="text-sm text-red-700">{validationError}</p>
                  </div>
                )}

                <button
                  onClick={handlePublish}
                  className="w-full px-6 py-4 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white rounded-lg transition-all hover:shadow-xl transform active:scale-98"
                >
                  Опубликовать
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}