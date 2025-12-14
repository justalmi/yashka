import { useState } from 'react';

const SparklesIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const Loader2Icon = () => (
  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

interface StyleSettingsProps {
  currentStyle: 'formal' | 'casual' | 'professional' | 'creative';
  textLength: 'short' | 'medium' | 'long';
  includeSource: boolean;
  useHashtags: boolean;
  useEmojis: boolean;
  additionalInstructions: string;
  onStyleChange: (style: 'formal' | 'casual' | 'professional' | 'creative') => void;
  onTextLengthChange: (length: 'short' | 'medium' | 'long') => void;
  onIncludeSourceChange: (include: boolean) => void;
  onUseHashtagsChange: (use: boolean) => void;
  onUseEmojisChange: (use: boolean) => void;
  onAdditionalInstructionsChange: (instructions: string) => void;
  onReprocess: () => void;
  processing: boolean;
}

const styles = [
  { value: 'formal' as const, label: 'Формальный', description: 'Официальный деловой стиль' },
  { value: 'casual' as const, label: 'Неформальный', description: 'Легкий разговорный стиль' },
  { value: 'professional' as const, label: 'Профессиональный', description: 'Экспертный стиль' },
  { value: 'creative' as const, label: 'Креативный', description: 'Яркий творческий стиль' }
];

const lengths = [
  { value: 'short' as const, label: 'Короткая', description: 'До 500 символов' },
  { value: 'medium' as const, label: 'Средняя', description: '500-2000 символов' },
  { value: 'long' as const, label: 'Длинная', description: '2000-5000 символов' }
];

const ChevronDownIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

export function StyleSettings({
  currentStyle,
  textLength,
  includeSource,
  useHashtags,
  useEmojis,
  additionalInstructions,
  onStyleChange,
  onTextLengthChange,
  onIncludeSourceChange,
  onUseHashtagsChange,
  onUseEmojisChange,
  onAdditionalInstructionsChange,
  onReprocess,
  processing
}: StyleSettingsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-red-100 overflow-hidden mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 transition-all"
      >
        <div className="flex items-center gap-2">
          <SparklesIcon className="w-5 h-5 text-red-500" />
          <span className="text-slate-800">Настройки стиля</span>
        </div>
        <ChevronDownIcon className={`text-slate-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="p-6 pt-2 space-y-4">
          <div>
            <label className="block text-sm text-slate-700 mb-2">Стиль текста</label>
            <div className="grid grid-cols-2 gap-3">
              {styles.map(style => (
                <button
                  key={style.value}
                  onClick={() => onStyleChange(style.value)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    currentStyle === style.value
                      ? 'border-red-500 bg-gradient-to-r from-red-50 to-orange-50 shadow-md'
                      : 'border-slate-200 bg-white hover:border-red-300 hover:shadow-sm'
                  }`}
                >
                  <div className="text-sm text-slate-800">{style.label}</div>
                  <div className="text-xs text-slate-500 mt-1">{style.description}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm text-slate-700 mb-2">Длина текста</label>
            <div className="grid grid-cols-3 gap-3">
              {lengths.map(length => (
                <button
                  key={length.value}
                  onClick={() => onTextLengthChange(length.value)}
                  className={`p-3 rounded-lg border-2 text-left transition-all ${
                    textLength === length.value
                      ? 'border-orange-500 bg-gradient-to-r from-orange-50 to-red-50 shadow-md'
                      : 'border-slate-200 bg-white hover:border-orange-300 hover:shadow-sm'
                  }`}
                >
                  <div className="text-sm text-slate-800">{length.label}</div>
                  <div className="text-xs text-slate-500 mt-1">{length.description}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <label className="flex items-center gap-2 cursor-pointer p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
              <input
                type="checkbox"
                checked={includeSource}
                onChange={(e) => onIncludeSourceChange(e.target.checked)}
                className="w-4 h-4 text-red-600 border-slate-300 rounded focus:ring-red-500"
              />
              <span className="text-sm text-slate-700">Всегда указывать источник</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
              <input
                type="checkbox"
                checked={useHashtags}
                onChange={(e) => onUseHashtagsChange(e.target.checked)}
                className="w-4 h-4 text-red-600 border-slate-300 rounded focus:ring-red-500"
              />
              <span className="text-sm text-slate-700">Использовать хештеги</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
              <input
                type="checkbox"
                checked={useEmojis}
                onChange={(e) => onUseEmojisChange(e.target.checked)}
                className="w-4 h-4 text-red-600 border-slate-300 rounded focus:ring-red-500"
              />
              <span className="text-sm text-slate-700">Использовать эмодзи</span>
            </label>
          </div>

          <div>
            <label className="block text-sm text-slate-700 mb-2">Дополнительные инструкции для AI</label>
            <textarea
              value={additionalInstructions}
              onChange={(e) => onAdditionalInstructionsChange(e.target.value)}
              placeholder="Например: Добавь больше эмоциональности, используй простые предложения"
              rows={3}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none text-sm"
            />
          </div>

          <button
            onClick={onReprocess}
            disabled={processing}
            className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 disabled:from-slate-300 disabled:to-slate-300 text-white rounded-lg transition-all hover:shadow-lg flex items-center justify-center gap-2 disabled:cursor-not-allowed"
          >
            {processing ? (
              <>
                <Loader2Icon className="w-5 h-5 animate-spin" />
                Преобразование...
              </>
            ) : (
              <>
                <SparklesIcon className="w-5 h-5" />
                Преобразовать статью
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}