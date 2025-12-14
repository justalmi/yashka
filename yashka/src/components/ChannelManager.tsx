import { useState } from 'react';
import { SavedChannel } from '../App';

const PlusIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const TrashIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

interface ChannelManagerProps {
  savedChannels: SavedChannel[];
  onSaveChannel: (channel: SavedChannel) => void;
  onRemoveChannel: (channelId: string) => void;
}

export function ChannelManager({ savedChannels, onSaveChannel, onRemoveChannel }: ChannelManagerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [platform, setPlatform] = useState<'telegram' | 'vk'>('telegram');
  const [channelId, setChannelId] = useState('');

  const handleAddChannel = () => {
    if (!channelId.trim()) {
      alert('Введите ID канала!');
      return;
    }

    // Валидация
    if (platform === 'telegram') {
      if (!channelId.startsWith('@') && !/^-?\d+$/.test(channelId)) {
        alert('Некорректный формат ID для Telegram! ID должен начинаться с @ или быть числом.');
        return;
      }
    } else if (platform === 'vk') {
      if (!/^[a-zA-Z0-9_-]+$/.test(channelId)) {
        alert('Некорректный формат ID для Вконтакте! ID должен содержать только буквы, цифры, дефис или подчеркивание.');
        return;
      }
    }

    // Автоматическая генерация названия на основе ID
    const generatedName = platform === 'telegram' 
      ? `Telegram: ${channelId}`
      : `VK: ${channelId}`;

    const newChannel: SavedChannel = {
      id: Date.now().toString(),
      platform,
      channelId,
      name: generatedName
    };

    onSaveChannel(newChannel);
    setChannelId('');
  };

  const telegramChannels = savedChannels.filter(c => c.platform === 'telegram');
  const vkChannels = savedChannels.filter(c => c.platform === 'vk');

  return (
    <div className="bg-white rounded-xl shadow-lg border border-red-100 overflow-hidden mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 transition-all"
      >
        <span className="text-slate-800">Настройки каналов</span>
        <ChevronDownIcon className={`text-slate-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="p-6 pt-2 space-y-4">
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-slate-700 mb-2">Платформа</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPlatform('telegram')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    platform === 'telegram'
                      ? 'border-red-500 bg-gradient-to-r from-red-50 to-orange-50'
                      : 'border-slate-200 hover:border-red-300'
                  }`}
                >
                  Telegram
                </button>
                <button
                  onClick={() => setPlatform('vk')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    platform === 'vk'
                      ? 'border-orange-500 bg-gradient-to-r from-orange-50 to-red-50'
                      : 'border-slate-200 hover:border-orange-300'
                  }`}
                >
                  Вконтакте
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-700 mb-2">ID канала</label>
              <input
                type="text"
                value={channelId}
                onChange={(e) => setChannelId(e.target.value)}
                placeholder={platform === 'telegram' ? '@channel_name или -100123456789' : 'club123456 или mygroup'}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <button
              onClick={handleAddChannel}
              className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white rounded-lg transition-all hover:shadow-lg flex items-center justify-center gap-2"
            >
              <PlusIcon />
              Добавить канал
            </button>
          </div>

          {savedChannels.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-red-100">
              <h4 className="text-sm text-slate-700">Сохраненные каналы</h4>
              
              {telegramChannels.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs text-slate-500 uppercase tracking-wider">Telegram</div>
                  {telegramChannels.map(channel => (
                    <div
                      key={channel.id}
                      className="flex items-center justify-between p-3 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-100"
                    >
                      <div>
                        <div className="text-sm text-slate-800">{channel.name}</div>
                        <div className="text-xs text-slate-600">{channel.channelId}</div>
                      </div>
                      <button
                        onClick={() => onRemoveChannel(channel.id)}
                        className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                      >
                        <TrashIcon className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {vkChannels.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs text-slate-500 uppercase tracking-wider">Вконтакте</div>
                  {vkChannels.map(channel => (
                    <div
                      key={channel.id}
                      className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-100"
                    >
                      <div>
                        <div className="text-sm text-slate-800">{channel.name}</div>
                        <div className="text-xs text-slate-600">{channel.channelId}</div>
                      </div>
                      <button
                        onClick={() => onRemoveChannel(channel.id)}
                        className="p-2 hover:bg-orange-100 rounded-lg transition-colors"
                      >
                        <TrashIcon className="w-4 h-4 text-orange-600" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}