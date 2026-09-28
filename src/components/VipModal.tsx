import React, { useState } from 'react';
import { X, Crown, Check, Sparkles, ShieldCheck, Zap, Download, Tv, Film } from 'lucide-react';
import { VIP_PLANS } from '../data/mockShows';
import { VIPPlan } from '../types';

interface VipModalProps {
  isOpen: boolean;
  onClose: () => void;
  onActivateVip: (plan: VIPPlan) => void;
  isVip: boolean;
  language: 'EN' | 'ZH';
}

export const VipModal: React.FC<VipModalProps> = ({
  isOpen,
  onClose,
  onActivateVip,
  isVip,
  language,
}) => {
  if (!isOpen) return null;

  const [selectedPlanId, setSelectedPlanId] = useState<string>('monthly');

  const selectedPlan = VIP_PLANS.find((p) => p.id === selectedPlanId) || VIP_PLANS[0];

  const featuresList = [
    { icon: Zap, titleEn: '8-Hour Fast-Track Simulcast', titleZh: '8 小時極速同步播映' },
    { icon: Film, titleEn: 'Full 4K Ultra HD & Dolby Atmos', titleZh: '4K 超高清與杜比全景聲' },
    { icon: ShieldCheck, titleEn: '100% Ad-Free Streaming', titleZh: '無廣告純淨暢快體驗' },
    { icon: Tv, titleEn: 'Stream on 3 Devices Simultaneously', titleZh: '3 部裝置同步觀看與電視投屏' },
    { icon: Download, titleEn: 'Unlimited Offline Downloads', titleZh: '無限次離線下載' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div
        className="relative w-full max-w-2xl bg-[#14141a] border border-[#ffcc00]/40 rounded-2xl overflow-hidden shadow-2xl p-6 md:p-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#ffcc00]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffcc00]/20 border border-[#ffcc00]/40 text-[#ffcc00] text-xs font-black uppercase tracking-wider">
            <Crown className="w-4 h-4 fill-[#ffcc00]" />
            <span>{language === 'EN' ? 'Viu Singapore VIP' : 'Viu 新加坡 VIP 會員'}</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            {language === 'EN' ? 'Unlock Unlimited Asian Entertainment' : '開啟極致亞洲影視娛樂'}
          </h2>
          <p className="text-xs md:text-sm text-zinc-400 max-w-md mx-auto">
            {language === 'EN'
              ? 'Watch the latest Korean dramas, exclusive originals, and movies without ads.'
              : '同步暢看最新韓劇、獨家原創劇集與亞洲熱播綜藝，無廣告打擾。'}
          </p>
        </div>

        {/* Plan Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          {VIP_PLANS.map((plan) => {
            const isSelected = selectedPlanId === plan.id;
            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlanId(plan.id)}
                className={`relative p-4 rounded-xl border cursor-pointer transition-all duration-200 text-left flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#ffcc00]/10 border-[#ffcc00] shadow-[0_0_15px_rgba(255,204,0,0.2)]'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                {plan.discountBadge && (
                  <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-[#ffcc00] text-black">
                    {plan.discountBadge}
                  </span>
                )}

                <div>
                  <h4 className="text-xs font-bold text-zinc-300">{plan.name}</h4>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="text-xl font-extrabold text-white">{plan.price}</span>
                  </div>
                  <p className="text-[10px] text-zinc-400 mt-0.5">{plan.billingText}</p>
                </div>

                <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] text-zinc-300 font-medium">Auto-renew</span>
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      isSelected ? 'border-[#ffcc00] bg-[#ffcc00]' : 'border-zinc-500'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 text-black stroke-[3]" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature Privileges */}
        <div className="bg-black/40 rounded-xl p-4 mb-6 border border-white/5 space-y-2.5">
          <p className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
            {language === 'EN' ? 'Included With Every VIP Pass' : 'VIP 會員尊屬權益'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300">
            {featuresList.map((f, idx) => {
              const Icon = f.icon;
              return (
                <div key={idx} className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-[#ffcc00] shrink-0" />
                  <span>{language === 'EN' ? f.titleEn : f.titleZh}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        <div className="space-y-3">
          <button
            onClick={() => onActivateVip(selectedPlan)}
            className="w-full py-3.5 rounded-full bg-[#ffcc00] hover:bg-[#f5b300] text-black font-extrabold text-sm md:text-base transition-all transform hover:scale-[1.01] active:scale-95 shadow-[0_4px_24px_rgba(255,204,0,0.35)] flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 fill-black" />
            <span>
              {isVip
                ? (language === 'EN' ? `Extend Subscription (${selectedPlan.name})` : `續訂 VIP 方案 (${selectedPlan.name})`)
                : (language === 'EN' ? 'Start 7-Day Free Trial (Then S$8.98/mo)' : '立即開始 7 天免費試用')}
            </span>
          </button>

          <p className="text-[11px] text-center text-zinc-500">
            {language === 'EN'
              ? 'Cancel anytime before trial ends. Supported via Credit/Debit, PayNow, and Singtel Carrier Billing.'
              : '試用期內隨時可免費取消。支援信用卡、PayNow 及新電信電信代收服務。'}
          </p>
        </div>
      </div>
    </div>
  );
};
