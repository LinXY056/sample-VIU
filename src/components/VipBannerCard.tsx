import React from 'react';
import { Crown, Sparkles, Check } from 'lucide-react';

interface VipBannerCardProps {
  onOpenVipModal: () => void;
  isVip: boolean;
  language: 'EN' | 'ZH';
}

export const VipBannerCard: React.FC<VipBannerCardProps> = ({
  onOpenVipModal,
  isVip,
  language,
}) => {
  return (
    <section className="py-10 md:py-14">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#18181f] via-[#1a1a24] to-[#18181f] border border-[#ffcc00]/30 p-6 md:p-10 shadow-2xl">
          {/* Ambient Glow */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#ffcc00]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#ffcc00]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 md:gap-8">
            {/* Left Content */}
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-[#ffcc00] fill-[#ffcc00]" />
                <span className="text-xs font-black tracking-widest text-[#ffcc00] uppercase font-sans">
                  {language === 'EN' ? 'VIU SINGAPORE VIP SPECIAL' : 'VIU 新加坡 VIP 特惠'}
                </span>
              </div>

              <p className="text-base md:text-lg text-zinc-200 leading-relaxed font-medium">
                {language === 'EN'
                  ? 'Unlimited offline downloads, TV casting, express 8-hour simulcasts, and simultaneous viewing on 3 screens. Cancel anytime.'
                  : '無限離線下載、電視投放、8小時內極速同步上線、支援 3 部裝置同時觀看。隨時可取消。'}
              </p>

              {/* Price Display */}
              <div className="flex items-baseline gap-2 pt-1">
                <span className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#ffcc00] tracking-tight">
                  S$8.98
                </span>
                <span className="text-xs md:text-sm text-zinc-400">
                  {language === 'EN'
                    ? '/ month (includes 7-day free trial)'
                    : '/ 每月（享 7 天免費試用）'}
                </span>
              </div>
            </div>

            {/* Right Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <button
                onClick={onOpenVipModal}
                className="px-7 py-3.5 rounded-full bg-[#ffcc00] hover:bg-[#f5b300] text-black font-extrabold text-sm md:text-base transition-all transform hover:scale-105 active:scale-95 shadow-[0_4px_24px_rgba(255,204,0,0.35)] flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 fill-black" />
                <span>
                  {isVip
                    ? (language === 'EN' ? 'VIP Active · Manage' : 'VIP 方案管理')
                    : (language === 'EN' ? 'Start 7-Day Free Trial' : '開始 7 天免費試用')}
                </span>
              </button>

              <button
                onClick={onOpenVipModal}
                className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/20 transition-all flex items-center justify-center"
              >
                {language === 'EN' ? 'See All Plans' : '查看所有方案'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
