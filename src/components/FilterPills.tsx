import React from 'react';
import { CategoryFilter } from '../types';

interface FilterPillsProps {
  selectedFilter: CategoryFilter;
  onSelectFilter: (filter: CategoryFilter) => void;
  language: 'EN' | 'ZH';
}

export const FilterPills: React.FC<FilterPillsProps> = ({
  selectedFilter,
  onSelectFilter,
  language,
}) => {
  const filters: { id: CategoryFilter; labelEn: string; labelZh: string }[] = [
    { id: 'all', labelEn: 'All', labelZh: '全部' },
    { id: 'k-drama', labelEn: 'K-Drama', labelZh: '韓劇' },
    { id: 'originals', labelEn: 'Viu Originals', labelZh: 'Viu 原創' },
    { id: 'romance-comedy', labelEn: 'Romance & Comedy', labelZh: '浪漫喜劇' },
    { id: 'thriller-crime', labelEn: 'Thriller & Crime', labelZh: '懸疑犯罪' },
    { id: 'variety-reality', labelEn: 'Variety & Reality', labelZh: '綜藝真人騷' },
    { id: 'japanese-anime', labelEn: 'Japanese Anime', labelZh: '日本動畫' },
    { id: 'hk-chinese', labelEn: 'Hong Kong & Chinese', labelZh: '港劇及陸劇' },
  ];

  return (
    <div className="w-full bg-[#0f0f12] py-4 border-b border-white/5">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-1">
          {filters.map((f) => {
            const isActive = selectedFilter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => onSelectFilter(f.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-200 active:scale-95 ${
                  isActive
                    ? 'bg-[#ffcc00] text-black shadow-[0_2px_12px_rgba(255,204,0,0.25)] font-bold'
                    : 'bg-[#18181f] text-zinc-300 hover:text-white hover:bg-[#22222b] border border-white/5'
                }`}
              >
                {language === 'EN' ? f.labelEn : f.labelZh}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
