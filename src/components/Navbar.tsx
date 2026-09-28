import React, { useState } from 'react';
import { Search, Bell, Crown, User, Menu, X, Check, Bookmark } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenSearch: () => void;
  onOpenVipModal: () => void;
  onOpenWatchlist: () => void;
  isVip: boolean;
  language: 'EN' | 'ZH';
  onToggleLanguage: () => void;
  watchlistCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  onOpenSearch,
  onOpenVipModal,
  onOpenWatchlist,
  isVip,
  language,
  onToggleLanguage,
  watchlistCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navLinks = [
    { id: 'home', labelEn: 'Home', labelZh: '首頁' },
    { id: 'k-drama', labelEn: 'Korean Drama', labelZh: '韓劇' },
    { id: 'variety', labelEn: 'Variety Shows', labelZh: '綜藝' },
    { id: 'anime', labelEn: 'Anime', labelZh: '日本動畫' },
    { id: 'originals', labelEn: 'Viu Originals', labelZh: 'Viu 原創' },
    { id: 'movies', labelEn: 'Movies', labelZh: '電影' },
    { id: 'asian-dramas', labelEn: 'Asian Dramas', labelZh: '亞洲劇集' },
  ];

  const notifications = [
    { id: 1, title: 'Shadows of the City Ep 14 is now live!', time: '10m ago', unread: true },
    { id: 2, title: 'Simulcast Premiere: Flex X Cop finale releases tonight at 22:00', time: '2h ago', unread: true },
    { id: 3, title: 'Your 7-day VIP access trial is available', time: '1d ago', unread: false },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0f0f12]/90 backdrop-blur-xl border-b border-white/5 transition-all">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 h-16 md:h-18 flex items-center justify-between gap-4">
        {/* Left: Viu Logo */}
        <div className="flex items-center gap-8">
          <button
            onClick={() => onSelectTab('home')}
            className="flex items-center gap-1.5 focus:outline-none group text-left"
          >
            <span className="text-3xl md:text-[34px] font-black tracking-tight text-[#ffcc00] font-sans transition-transform group-hover:scale-105">
              Viu
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-[15px] font-medium text-zinc-300">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onSelectTab(link.id)}
                  className={`relative py-5 transition-colors whitespace-nowrap ${
                    isActive ? 'text-white font-semibold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {language === 'EN' ? link.labelEn : link.labelZh}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#ffcc00] rounded-full shadow-[0_0_8px_#ffcc00]" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Zone: Controls */}
        <div className="flex items-center gap-2.5 md:gap-4">
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="p-2 text-zinc-300 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            title="Search Dramas, Shows, Cast"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Language Switcher */}
          <button
            onClick={onToggleLanguage}
            className="hidden sm:flex items-center text-xs font-semibold px-2.5 py-1.5 rounded-md text-zinc-300 hover:text-white hover:bg-white/10 border border-white/10 transition-colors"
            title="Toggle Language"
          >
            <span className={language === 'EN' ? 'text-[#ffcc00] font-bold' : 'text-zinc-400'}>EN</span>
            <span className="mx-1 text-zinc-600">/</span>
            <span className={language === 'ZH' ? 'text-[#ffcc00] font-bold' : 'text-zinc-400'}>中文</span>
          </button>

          {/* Watchlist Quick Button */}
          <button
            onClick={onOpenWatchlist}
            className="relative p-2 text-zinc-300 hover:text-white hover:bg-white/10 rounded-full transition-colors hidden sm:block"
            title="My Watchlist"
            aria-label="Watchlist"
          >
            <Bookmark className="w-5 h-5" />
            {watchlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#ffcc00] text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                {watchlistCount}
              </span>
            )}
          </button>

          {/* Upgrade to VIP button */}
          <button
            onClick={onOpenVipModal}
            className={`flex items-center gap-1.5 px-3.5 md:px-4 py-2 rounded-full text-xs md:text-sm font-bold transition-all shadow-md active:scale-95 ${
              isVip
                ? 'bg-gradient-to-r from-amber-500 to-[#ffcc00] text-black hover:brightness-110 shadow-amber-500/20'
                : 'bg-[#ffcc00] hover:bg-[#f5b300] text-[#0f0f12] shadow-[#ffcc00]/25'
            }`}
          >
            <Crown className="w-3.5 h-3.5 fill-black" />
            <span className="whitespace-nowrap">
              {isVip
                ? (language === 'EN' ? 'VIP Active' : 'VIP 會員中')
                : (language === 'EN' ? 'Upgrade to VIP' : '升級為 VIP')}
            </span>
          </button>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => {
                setNotificationsOpen(!notificationsOpen);
                setProfileOpen(false);
              }}
              className="relative p-2 text-zinc-300 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              title="Notifications"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ffcc00] rounded-full ring-2 ring-[#0f0f12]" />
            </button>

            {/* Notification Popover */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-3 w-80 bg-[#18181f] border border-white/10 rounded-xl shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-sm font-bold text-white">Notifications</span>
                  <span className="text-[11px] text-[#ffcc00] font-medium">Mark all read</span>
                </div>
                <div className="divide-y divide-white/5 max-h-72 overflow-y-auto custom-scrollbar mt-2">
                  {notifications.map((item) => (
                    <div key={item.id} className="py-2.5 text-left group cursor-pointer hover:bg-white/5 rounded px-2 -mx-2">
                      <p className="text-xs text-zinc-200 group-hover:text-[#ffcc00] transition-colors leading-relaxed">
                        {item.title}
                      </p>
                      <span className="text-[10px] text-zinc-500 mt-1 block">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile Avatar */}
          <div className="relative">
            <button
              onClick={() => {
                setProfileOpen(!profileOpen);
                setNotificationsOpen(false);
              }}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-amber-600 to-yellow-400 text-black font-bold text-xs ring-2 ring-white/10 hover:ring-[#ffcc00] transition-all"
              aria-label="User Profile"
            >
              VIP
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-[#18181f] border border-white/10 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 text-left">
                <div className="px-3 py-2 border-b border-white/10">
                  <p className="text-xs font-semibold text-white">Singapore Premium</p>
                  <p className="text-[11px] text-zinc-400">linxinyu09072002@gmail.com</p>
                  <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded bg-[#ffcc00]/20 text-[#ffcc00] font-bold">
                    {isVip ? 'VIP Member · 4K UHD' : 'Free Tier'}
                  </span>
                </div>
                <div className="py-1">
                  <button
                    onClick={() => {
                      onOpenWatchlist();
                      setProfileOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-zinc-300 hover:text-white hover:bg-white/5 rounded flex items-center justify-between"
                  >
                    <span>My Watchlist</span>
                    <span className="text-[#ffcc00] font-semibold">{watchlistCount}</span>
                  </button>
                  <button
                    onClick={() => {
                      onOpenVipModal();
                      setProfileOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-zinc-300 hover:text-white hover:bg-white/5 rounded"
                  >
                    Manage Subscription
                  </button>
                  <button
                    onClick={() => {
                      onToggleLanguage();
                      setProfileOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-zinc-300 hover:text-white hover:bg-white/5 rounded"
                  >
                    Language: {language === 'EN' ? 'English' : '繁體中文'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-300 hover:text-white rounded-lg hover:bg-white/10"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#18181f] border-b border-white/10 px-6 py-4 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onSelectTab(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === link.id
                    ? 'bg-[#ffcc00] text-black font-bold'
                    : 'text-zinc-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {language === 'EN' ? link.labelEn : link.labelZh}
              </button>
            ))}
          </nav>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => {
                onOpenWatchlist();
                setMobileMenuOpen(false);
              }}
              className="text-xs text-zinc-300 hover:text-white flex items-center gap-1.5"
            >
              <Bookmark className="w-4 h-4 text-[#ffcc00]" />
              <span>Watchlist ({watchlistCount})</span>
            </button>
            <button
              onClick={onToggleLanguage}
              className="text-xs font-semibold text-[#ffcc00] px-2.5 py-1 bg-white/5 rounded"
            >
              Switch to {language === 'EN' ? '中文' : 'EN'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
