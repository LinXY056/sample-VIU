import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { FilterPills } from './components/FilterPills';
import { Top10Section } from './components/Top10Section';
import { ContinueWatchingSection } from './components/ContinueWatchingSection';
import { SimulcastSection } from './components/SimulcastSection';
import { ViuOriginalsSection } from './components/ViuOriginalsSection';
import { VarietySection } from './components/VarietySection';
import { VipBannerCard } from './components/VipBannerCard';
import { Footer } from './components/Footer';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { ShowDetailModal } from './components/ShowDetailModal';
import { VipModal } from './components/VipModal';
import { SearchModal } from './components/SearchModal';
import { WatchlistDrawer } from './components/WatchlistDrawer';
import { Toast } from './components/Toast';

import {
  HERO_SHOW,
  TOP_10_SINGAPORE,
  CONTINUE_WATCHING,
  EXPRESS_SIMULCASTS,
  VIU_ORIGINALS,
  VARIETY_SHOWS,
  ALL_SHOWS,
} from './data/mockShows';
import { Show, CategoryFilter, VIPPlan } from './types';

export default function App() {
  const [activeNavTab, setActiveNavTab] = useState<string>('home');
  const [selectedFilter, setSelectedFilter] = useState<CategoryFilter>('all');
  const [isVip, setIsVip] = useState<boolean>(false);
  const [language, setLanguage] = useState<'EN' | 'ZH'>('EN');

  // Watchlist state initialized with a couple of favorites
  const [watchlist, setWatchlist] = useState<Show[]>([
    HERO_SHOW,
    TOP_10_SINGAPORE[2], // Queen of Tears
  ]);

  // Continue Watching collection state
  const [continueWatchingList, setContinueWatchingList] = useState<Show[]>(CONTINUE_WATCHING);

  // Active interactive modals
  const [playingShow, setPlayingShow] = useState<Show | null>(null);
  const [playingEpisodeNum, setPlayingEpisodeNum] = useState<number>(1);
  const [detailShow, setDetailShow] = useState<Show | null>(null);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [vipModalOpen, setVipModalOpen] = useState<boolean>(false);
  const [watchlistOpen, setWatchlistOpen] = useState<boolean>(false);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  // Actions
  const handleToggleWatchlist = (show: Show) => {
    const exists = watchlist.some((s) => s.id === show.id);
    if (exists) {
      setWatchlist((prev) => prev.filter((s) => s.id !== show.id));
      showToast(
        language === 'EN'
          ? `Removed "${show.title}" from your watchlist`
          : `已將《${show.title}》從收藏清單移除`,
      );
    } else {
      setWatchlist((prev) => [show, ...prev]);
      showToast(
        language === 'EN'
          ? `Added "${show.title}" to your watchlist`
          : `已將《${show.title}》加入收藏清單`,
      );
    }
  };

  const handlePlayShow = (show: Show, episodeNumber?: number) => {
    const epNum = episodeNumber || show.continueWatching?.episodeNumber || 1;
    setPlayingShow(show);
    setPlayingEpisodeNum(epNum);
  };

  const handleShare = (show: Show) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }
    showToast(
      language === 'EN'
        ? `Link to "${show.title}" copied to clipboard!`
        : `《${show.title}》分享連結已複製到剪貼簿！`,
    );
  };

  const handleActivateVip = (plan: VIPPlan) => {
    setIsVip(true);
    setVipModalOpen(false);
    showToast(
      language === 'EN'
        ? `VIP Trial activated! Enjoy 4K streaming and 8-hour simulcasts.`
        : `VIP 會員已開通！立即享受 4K 超高清與同步極速播映。`,
    );
  };

  const handleRemoveContinueWatching = (showId: string) => {
    setContinueWatchingList((prev) => prev.filter((s) => s.id !== showId));
    showToast(language === 'EN' ? 'Item removed from Continue Watching' : '已從繼續觀看列表移除');
  };

  const isShowInWatchlist = (showId: string) => watchlist.some((s) => s.id === showId);

  // Filter shows based on active filter chip or nav tab
  const getFilteredCollection = () => {
    if (selectedFilter === 'k-drama' || activeNavTab === 'k-drama') {
      return ALL_SHOWS.filter((s) => s.sectionCategory === 'k-drama');
    }
    if (selectedFilter === 'originals' || activeNavTab === 'originals') {
      return VIU_ORIGINALS;
    }
    if (selectedFilter === 'variety-reality' || activeNavTab === 'variety') {
      return VARIETY_SHOWS;
    }
    if (selectedFilter === 'romance-comedy') {
      return ALL_SHOWS.filter((s) => s.genres.some((g) => g.toLowerCase().includes('romance') || g.toLowerCase().includes('com')));
    }
    if (selectedFilter === 'thriller-crime') {
      return ALL_SHOWS.filter((s) => s.genres.some((g) => g.toLowerCase().includes('crime') || g.toLowerCase().includes('action') || g.toLowerCase().includes('suspense')));
    }
    return null;
  };

  const customFilterList = getFilteredCollection();

  return (
    <div className="min-h-screen bg-[#0f0f12] text-[#e4e1e6] flex flex-col font-sans selection:bg-[#ffcc00] selection:text-black">
      {/* Sticky Glass Navbar */}
      <Navbar
        activeTab={activeNavTab}
        onSelectTab={(tab) => {
          setActiveNavTab(tab);
          if (tab === 'home') setSelectedFilter('all');
          else if (tab === 'k-drama') setSelectedFilter('k-drama');
          else if (tab === 'variety') setSelectedFilter('variety-reality');
          else if (tab === 'originals') setSelectedFilter('originals');
        }}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenVipModal={() => setVipModalOpen(true)}
        onOpenWatchlist={() => setWatchlistOpen(true)}
        isVip={isVip}
        language={language}
        onToggleLanguage={() => setLanguage((prev) => (prev === 'EN' ? 'ZH' : 'EN'))}
        watchlistCount={watchlist.length}
      />

      {/* Main Streaming Experience */}
      <main className="flex-1 w-full pb-10">
        {/* Hero Banner (Always visible in Home) */}
        {activeNavTab === 'home' && selectedFilter === 'all' && (
          <HeroBanner
            show={HERO_SHOW}
            onPlayEpisode={handlePlayShow}
            onToggleWatchlist={handleToggleWatchlist}
            isInWatchlist={isShowInWatchlist(HERO_SHOW.id)}
            onShowDetails={setDetailShow}
            onShare={handleShare}
            language={language}
          />
        )}

        {/* Filter Pills */}
        <FilterPills
          selectedFilter={selectedFilter}
          onSelectFilter={(f) => {
            setSelectedFilter(f);
            if (f === 'all') setActiveNavTab('home');
          }}
          language={language}
        />

        {/* If user filtered by a specific category, show the filtered grid view */}
        {customFilterList ? (
          <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 py-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#ffcc00] rounded-full inline-block" />
                <h2 className="text-2xl font-bold text-white capitalize">
                  {selectedFilter.replace('-', ' ')}
                </h2>
              </div>
              <button
                onClick={() => {
                  setSelectedFilter('all');
                  setActiveNavTab('home');
                }}
                className="text-xs font-semibold text-[#ffcc00] hover:underline"
              >
                {language === 'EN' ? '← Back to All Shows' : '← 返回所有分類'}
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-5">
              {customFilterList.map((show) => (
                <div
                  key={show.id}
                  onClick={() => setDetailShow(show)}
                  className="group cursor-pointer text-left"
                >
                  <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-[#18181f] border border-white/10 group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={show.poster}
                      alt={show.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                    <div className="absolute bottom-2.5 left-2.5 right-2.5">
                      <span className="text-[10px] text-zinc-300 font-semibold block">
                        {show.latestEpisode || `${show.episodesCount} Episodes`}
                      </span>
                      <h3 className="text-xs md:text-sm font-bold text-white truncate group-hover:text-[#ffcc00] transition-colors">
                        {show.title}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Default Rich Home Feed matching exact layout of Image 1.jpeg */
          <div className="space-y-2">
            {/* Top 10 in Singapore Today */}
            <Top10Section
              shows={TOP_10_SINGAPORE}
              onPlayShow={handlePlayShow}
              onShowDetails={setDetailShow}
              language={language}
            />

            {/* Continue Watching Section */}
            <ContinueWatchingSection
              shows={continueWatchingList}
              onPlayEpisode={handlePlayShow}
              onShowDetails={setDetailShow}
              onRemoveItem={handleRemoveContinueWatching}
              language={language}
            />

            {/* Express Singapore Premiere Simulcast Row */}
            <SimulcastSection
              shows={EXPRESS_SIMULCASTS}
              onPlayShow={handlePlayShow}
              onShowDetails={setDetailShow}
              language={language}
            />

            {/* Viu Originals & Exclusives Row */}
            <ViuOriginalsSection
              shows={VIU_ORIGINALS}
              onPlayShow={handlePlayShow}
              onShowDetails={setDetailShow}
              language={language}
            />

            {/* Variety & Reality Section */}
            <VarietySection
              shows={VARIETY_SHOWS}
              onPlayShow={handlePlayShow}
              onShowDetails={setDetailShow}
              language={language}
            />

            {/* Viu Singapore VIP Special Promotional Banner */}
            <VipBannerCard
              onOpenVipModal={() => setVipModalOpen(true)}
              isVip={isVip}
              language={language}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        language={language}
        onToggleLanguage={() => setLanguage((prev) => (prev === 'EN' ? 'ZH' : 'EN'))}
        onSelectCategory={(cat) => {
          setActiveNavTab(cat);
          window.scrollTo({ top: 400, behavior: 'smooth' });
        }}
      />

      {/* Modals & Drawers */}
      {/* 1. Video Player Modal */}
      {playingShow && (
        <VideoPlayerModal
          show={playingShow}
          initialEpisodeNumber={playingEpisodeNum}
          onClose={() => setPlayingShow(null)}
          language={language}
          isVip={isVip}
          onOpenVipModal={() => {
            setPlayingShow(null);
            setVipModalOpen(true);
          }}
        />
      )}

      {/* 2. Show Details Modal */}
      {detailShow && (
        <ShowDetailModal
          show={detailShow}
          onClose={() => setDetailShow(null)}
          onPlayEpisode={(show, epNum) => {
            setDetailShow(null);
            handlePlayShow(show, epNum);
          }}
          onToggleWatchlist={handleToggleWatchlist}
          isInWatchlist={isShowInWatchlist(detailShow.id)}
          onShare={handleShare}
          language={language}
        />
      )}

      {/* 3. VIP Subscription Modal */}
      <VipModal
        isOpen={vipModalOpen}
        onClose={() => setVipModalOpen(false)}
        onActivateVip={handleActivateVip}
        isVip={isVip}
        language={language}
      />

      {/* 4. Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onPlayShow={(show) => handlePlayShow(show, 1)}
        onShowDetails={setDetailShow}
        language={language}
      />

      {/* 5. Watchlist Drawer */}
      <WatchlistDrawer
        isOpen={watchlistOpen}
        onClose={() => setWatchlistOpen(false)}
        shows={watchlist}
        onPlayShow={(show) => handlePlayShow(show, 1)}
        onRemoveItem={(id) => {
          setWatchlist((prev) => prev.filter((s) => s.id !== id));
          showToast(language === 'EN' ? 'Removed from Watchlist' : '已從收藏清單移除');
        }}
        language={language}
      />

      {/* Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
