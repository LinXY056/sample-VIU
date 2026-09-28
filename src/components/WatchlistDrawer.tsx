import React from 'react';
import { X, Play, Trash2, Bookmark } from 'lucide-react';
import { Show } from '../types';

interface WatchlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  shows: Show[];
  onPlayShow: (show: Show) => void;
  onRemoveItem: (showId: string) => void;
  language: 'EN' | 'ZH';
}

export const WatchlistDrawer: React.FC<WatchlistDrawerProps> = ({
  isOpen,
  onClose,
  shows,
  onPlayShow,
  onRemoveItem,
  language,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div
        className="w-full max-w-md bg-[#14141a] border-l border-white/10 h-full flex flex-col p-6 text-left shadow-2xl animate-in slide-in-from-right"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-[#ffcc00] fill-[#ffcc00]" />
            <h2 className="text-lg font-bold text-white">
              {language === 'EN' ? 'My Watchlist' : '我的收藏清單'} ({shows.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close watchlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar py-4 space-y-3">
          {shows.length === 0 ? (
            <div className="py-16 text-center text-zinc-500 space-y-3">
              <Bookmark className="w-12 h-12 mx-auto text-zinc-600" />
              <p className="text-sm font-medium">
                {language === 'EN'
                  ? 'Your watchlist is empty. Add titles by clicking "+ Watchlist" on any show!'
                  : '你的收藏清單目前是空的。點選任一劇集的「+ 加入清單」即可收藏！'}
              </p>
            </div>
          ) : (
            shows.map((show) => (
              <div
                key={show.id}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all group"
              >
                <div className="relative w-16 aspect-[2/3] rounded-lg overflow-hidden bg-black shrink-0">
                  <img
                    src={show.poster}
                    alt={show.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-white truncate group-hover:text-[#ffcc00] transition-colors">
                    {show.title}
                  </h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5 truncate">
                    {show.genres.join(' · ')}
                  </p>
                  <p className="text-[10px] text-zinc-500 mt-1">
                    {show.episodesCount} Episodes · {show.releaseYear}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => {
                      onPlayShow(show);
                      onClose();
                    }}
                    className="p-2 rounded-full bg-[#ffcc00] text-black hover:bg-[#f5b300] transition-colors"
                    title="Play Show"
                    aria-label={`Play ${show.title}`}
                  >
                    <Play className="w-3.5 h-3.5 fill-black ml-0.5" />
                  </button>
                  <button
                    onClick={() => onRemoveItem(show.id)}
                    className="p-2 text-zinc-400 hover:text-red-400 rounded-full hover:bg-white/5 transition-colors"
                    title="Remove from watchlist"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
