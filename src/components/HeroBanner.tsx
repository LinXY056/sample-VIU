import React, { useState } from 'react';
import { Play, Plus, Check, Share2, Volume2, VolumeX, Info } from 'lucide-react';
import { Show } from '../types';

interface HeroBannerProps {
  show: Show;
  onPlayEpisode: (show: Show, episodeNumber?: number) => void;
  onToggleWatchlist: (show: Show) => void;
  isInWatchlist: boolean;
  onShowDetails: (show: Show) => void;
  onShare: (show: Show) => void;
  language: 'EN' | 'ZH';
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  show,
  onPlayEpisode,
  onToggleWatchlist,
  isInWatchlist,
  onShowDetails,
  onShare,
  language,
}) => {
  const [isMuted, setIsMuted] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);

  const featuredDramas = [
    {
      title: 'SHADOWS OF',
      highlight: 'THE CITY',
      korean: '도시의 그림자 · SHADOWS OF THE CITY',
      cast: 'Starring Kim Soo-hyun, Park Shin-hye, Lee Sung-min',
      synopsis:
        'An elite undercover detective and an unyielding high-ranking prosecutor uncover a labyrinth of high-level state corruption that threatens to plunge modern Seoul into irreversible darkness.',
      tags: ['Action', 'Crime', 'Thriller'],
      episodes: 16,
      rating: '16+',
    },
    {
      title: 'CHERRY BLOSSOM',
      highlight: 'ROMANCE',
      korean: '봄날의 설레임 · CHERRY BLOSSOM ROMANCE',
      cast: 'Starring Song Kang, Han So-hee, Cha Woo-min',
      synopsis:
        'Two childhood sweethearts reunite after ten years under the blooming cherry trees of Jinhae, untangling forgotten promises and enduring romantic devotion.',
      tags: ['Romance', 'Drama', 'Youth'],
      episodes: 16,
      rating: 'PG13',
    },
    {
      title: 'MIDNIGHT',
      highlight: 'DETECTIVE',
      korean: '심야 탐정 · MIDNIGHT DETECTIVE',
      cast: 'Starring Lee Je-hoon, Wi Ha-joon, Kim Tae-ri',
      synopsis:
        'A rogue former intelligence officer prowls the rain-soaked back alleys of Seoul solving high-stakes corporate underworld conspiracies.',
      tags: ['Action', 'Suspense', 'Noir'],
      episodes: 12,
      rating: '16+',
    },
  ];

  const currentDrama = featuredDramas[activeSlide];

  return (
    <section className="relative w-full min-h-[620px] md:min-h-[720px] lg:min-h-[780px] flex items-center overflow-hidden bg-[#0f0f12]">
      {/* Background Cinematic Key Art */}
      <div className="absolute inset-0 z-0">
        <img
          src={show.backdrop}
          alt={show.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-top scale-105 filter brightness-[0.75] contrast-[1.1] transition-transform duration-1000 ease-out"
        />
        {/* Subtle decorative Seoul neon glow overlay matching the screenshot */}
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#0f0f12]/40 to-[#0f0f12]" />

        {/* Cinematic Scrim: Dark gradient on left for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f12] via-[#0f0f12]/80 to-transparent w-full md:w-[68%]" />

        {/* Bottom fade into section content */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f12] via-[#0f0f12]/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0f0f12] to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 w-full pt-16 pb-20 md:pb-28">
        <div className="max-w-2xl lg:max-w-3xl space-y-4">
          {/* Badges Row */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#ffcc00] text-black font-extrabold text-[10px] tracking-wider uppercase shadow-sm">
              ★ VIU ORIGINAL
            </span>
            <span className="px-2.5 py-1 rounded bg-black/40 text-zinc-200 border border-white/20 text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md">
              SIMULCAST WITH KOREA
            </span>
            <span className="px-1.5 py-0.5 rounded bg-black/40 text-zinc-300 border border-white/20 text-[10px] font-bold">
              {currentDrama.rating}
            </span>
            <span className="text-zinc-300 font-medium text-xs">
              {currentDrama.tags.join(' • ')}
            </span>
            <span className="text-zinc-500">•</span>
            <span className="text-zinc-300 font-medium text-xs">
              {currentDrama.episodes} Episodes
            </span>
          </div>

          {/* Korean & Subtitle Line */}
          <p className="text-xs md:text-sm tracking-wide text-zinc-400 font-medium font-sans">
            {currentDrama.korean}
          </p>

          {/* Big Hero Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-black tracking-tight leading-[1.05] text-white uppercase drop-shadow-md">
            {currentDrama.title}{' '}
            <span className="text-[#ffcc00] drop-shadow-[0_2px_12px_rgba(255,204,0,0.35)]">
              {currentDrama.highlight}
            </span>
          </h1>

          {/* Starring Cast */}
          <p className="text-sm md:text-[15px] font-medium text-zinc-300">
            {currentDrama.cast}
          </p>

          {/* Synopsis */}
          <p className="text-sm md:text-[15px] text-zinc-400 leading-relaxed max-w-xl font-normal line-clamp-3">
            {currentDrama.synopsis}
          </p>

          {/* Action Buttons Row */}
          <div className="pt-3 flex flex-wrap items-center gap-3 md:gap-4">
            {/* Watch Episode 1 Button */}
            <button
              onClick={() => onPlayEpisode(show, 1)}
              className="flex items-center gap-2.5 px-6 md:px-7 py-3 rounded-full bg-[#ffcc00] hover:bg-[#f5b300] text-black font-extrabold text-sm md:text-base transition-all transform hover:scale-[1.03] active:scale-95 shadow-[0_4px_20px_rgba(255,204,0,0.35)]"
            >
              <Play className="w-5 h-5 fill-black" />
              <span>
                {language === 'EN' ? 'Watch Episode 1' : '觀看第 1 集'}
              </span>
            </button>

            {/* Watchlist Button */}
            <button
              onClick={() => onToggleWatchlist(show)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full border text-sm font-semibold transition-all backdrop-blur-md active:scale-95 ${
                isInWatchlist
                  ? 'bg-[#ffcc00]/20 border-[#ffcc00] text-[#ffcc00]'
                  : 'bg-white/10 hover:bg-white/20 border-white/20 text-white'
              }`}
            >
              {isInWatchlist ? (
                <>
                  <Check className="w-4 h-4 text-[#ffcc00]" />
                  <span>{language === 'EN' ? 'In Watchlist' : '已收藏'}</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>{language === 'EN' ? 'Watchlist' : '加入清單'}</span>
                </>
              )}
            </button>

            {/* Details Button */}
            <button
              onClick={() => onShowDetails(show)}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors"
              title="Show Details & Episodes"
              aria-label="Show Details"
            >
              <Info className="w-4 h-4" />
            </button>

            {/* Share Button */}
            <button
              onClick={() => onShare(show)}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors"
              title="Share Show"
              aria-label="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Sound Mute Toggle */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors"
              title={isMuted ? 'Unmute Audio Preview' : 'Mute'}
              aria-label="Audio Toggle"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#ffcc00]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Carousel Dots on Bottom Right */}
      <div className="absolute bottom-10 right-6 md:right-12 z-20 flex items-center gap-2">
        {featuredDramas.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`transition-all duration-300 rounded-full ${
              activeSlide === index
                ? 'w-6 h-2 bg-[#ffcc00] shadow-[0_0_8px_#ffcc00]'
                : 'w-2 h-2 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  );
};
