import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Play, TrendingUp, Film } from 'lucide-react';
import { ALL_SHOWS } from '../data/mockShows';
import { Show } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlayShow: (show: Show) => void;
  onShowDetails: (show: Show) => void;
  language: 'EN' | 'ZH';
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onPlayShow,
  onShowDetails,
  language,
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const trendingTags = [
    'Shadows of the City',
    'Queen of Tears',
    'Park Shin-hye',
    'Running Man',
    'Kim Soo-hyun',
    'Flex X Cop',
    'Taxi Driver',
    'Doctor Slump',
  ];

  const filteredShows = query.trim()
    ? ALL_SHOWS.filter((show) => {
        const q = query.toLowerCase();
        return (
          show.title.toLowerCase().includes(q) ||
          show.koreanTitle?.toLowerCase().includes(q) ||
          show.genres.some((g) => g.toLowerCase().includes(q)) ||
          show.starring.some((s) => s.toLowerCase().includes(q)) ||
          show.synopsis.toLowerCase().includes(q)
        );
      })
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-3 md:p-8 pt-12 md:pt-16 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div
        className="relative w-full max-w-3xl bg-[#14141a] border border-white/10 rounded-2xl shadow-2xl p-5 md:p-6 text-left max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Bar */}
        <div className="relative flex items-center pb-4 border-b border-white/10">
          <Search className="w-5 h-5 text-zinc-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              language === 'EN'
                ? 'Search title, actor, genre (e.g. Shadows of the City, Kim Soo-hyun)'
                : '搜尋劇名、演員或類型（例如：都市的影子、金秀賢、浪漫）'
            }
            className="w-full bg-transparent text-white text-base md:text-lg focus:outline-none placeholder-zinc-500"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-zinc-400 hover:text-white mr-2"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Trending Chips if query is empty */}
        {!query && (
          <div className="py-6 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-wider">
              <TrendingUp className="w-4 h-4 text-[#ffcc00]" />
              <span>{language === 'EN' ? 'Trending Searches in Singapore' : '新加坡熱門搜尋'}</span>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {trendingTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-zinc-300 hover:text-white transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results List */}
        {query && (
          <div className="flex-1 overflow-y-auto custom-scrollbar pt-4 space-y-3">
            <p className="text-xs text-zinc-400">
              {filteredShows.length}{' '}
              {language === 'EN' ? 'results found for' : '個搜尋結果：'}{' '}
              <span className="text-[#ffcc00] font-semibold">"{query}"</span>
            </p>

            {filteredShows.length === 0 ? (
              <div className="py-12 text-center text-zinc-500 space-y-2">
                <Film className="w-8 h-8 mx-auto opacity-40" />
                <p className="text-sm">
                  {language === 'EN'
                    ? 'No matching dramas found. Try searching for "Crime", "Romance", or "Lee Je-hoon".'
                    : '未找到相關劇集，嘗試搜尋「犯罪」、「浪漫」或「李帝勳」。'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredShows.map((show) => (
                  <div
                    key={show.id}
                    onClick={() => {
                      onShowDetails(show);
                      onClose();
                    }}
                    className="flex gap-3 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 cursor-pointer transition-all group"
                  >
                    <div className="relative w-20 aspect-[2/3] rounded-lg overflow-hidden bg-black shrink-0">
                      <img
                        src={show.poster}
                        alt={show.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex items-center gap-1.5">
                          {show.isOriginal && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#ffcc00] text-black font-extrabold uppercase">
                              ORIGINAL
                            </span>
                          )}
                          <span className="text-[10px] text-zinc-400 font-semibold">{show.rating}</span>
                        </div>
                        <h4 className="text-sm font-bold text-white leading-tight truncate group-hover:text-[#ffcc00] transition-colors mt-1">
                          {show.title}
                        </h4>
                        <p className="text-[11px] text-zinc-400 mt-0.5 truncate">
                          {show.starring.slice(0, 2).join(', ')}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 pt-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onPlayShow(show);
                            onClose();
                          }}
                          className="px-2.5 py-1 rounded bg-[#ffcc00] text-black text-xs font-bold flex items-center gap-1 hover:bg-[#f5b300]"
                        >
                          <Play className="w-3 h-3 fill-black" />
                          <span>Play</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
