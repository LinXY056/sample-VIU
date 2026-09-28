import React from 'react';
import { Youtube, Globe, Share2 } from 'lucide-react';

interface FooterProps {
  language: 'EN' | 'ZH';
  onToggleLanguage: () => void;
  onSelectCategory: (cat: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onToggleLanguage,
  onSelectCategory,
}) => {
  return (
    <footer className="w-full bg-[#09090c] border-t border-white/5 pt-12 pb-14 text-zinc-400">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-3xl font-black text-[#ffcc00] tracking-tight block">
              Viu
            </span>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
              {language === 'EN'
                ? 'Premium Asian entertainment, blockbuster Korean dramas, exclusive Viu Originals, variety shows, and animation tailored for Singapore.'
                : '專為新加坡打造的頂級亞洲娛樂平台，收錄熱門韓劇、獨家 Viu 原創、人氣綜藝及熱血動畫。'}
            </p>

            {/* Region / Language pill */}
            <div className="pt-2">
              <button
                onClick={onToggleLanguage}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-[#ffcc00]" />
                <span className="font-semibold text-white">SINGAPORE (SG)</span>
                <span className="text-zinc-500">|</span>
                <span>{language === 'EN' ? 'English • 简体中文' : '繁體中文 • English'}</span>
              </button>
            </div>
          </div>

          {/* Explore Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {language === 'EN' ? 'Explore' : '探索劇集'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectCategory('k-drama')}
                  className="hover:text-[#ffcc00] transition-colors"
                >
                  {language === 'EN' ? 'Korean Dramas' : '韓劇專區'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('originals')}
                  className="hover:text-[#ffcc00] transition-colors"
                >
                  {language === 'EN' ? 'Viu Originals' : 'Viu 原創劇'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('asian-dramas')}
                  className="hover:text-[#ffcc00] transition-colors"
                >
                  {language === 'EN' ? 'Asian Dramas' : '亞洲熱播劇'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('anime')}
                  className="hover:text-[#ffcc00] transition-colors"
                >
                  {language === 'EN' ? 'Anime' : '日本熱門動畫'}
                </button>
              </li>
            </ul>
          </div>

          {/* Support Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {language === 'EN' ? 'Support' : '客戶支援'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  {language === 'EN' ? 'FAQ & Help Center' : '常見問題與說明'}
                </a>
              </li>
              <li>
                <a href="#devices" className="hover:text-white transition-colors">
                  {language === 'EN' ? 'Supported Devices' : '支援裝置一覽'}
                </a>
              </li>
              <li>
                <a href="#voucher" className="hover:text-white transition-colors">
                  {language === 'EN' ? 'Redeem Voucher' : '兌換禮券序號'}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  {language === 'EN' ? 'Contact Us' : '聯絡客服團隊'}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {language === 'EN' ? 'Legal' : '條款及政策'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#terms" className="hover:text-white transition-colors">
                  {language === 'EN' ? 'Terms & Conditions' : '服務條款'}
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-white transition-colors">
                  {language === 'EN' ? 'Privacy Policy' : '隱私權政策'}
                </a>
              </li>
              <li>
                <a href="#data" className="hover:text-white transition-colors">
                  {language === 'EN' ? 'Personal Data Policy' : '個人資料使用政策'}
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  {language === 'EN' ? 'About Viu' : '關於 Viu'}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© 2025 PCCW OTT (Singapore) Pte. Ltd. All Rights Reserved.</p>
          <div className="flex items-center gap-4 text-zinc-400">
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#ffcc00] transition-colors p-1"
              aria-label="YouTube"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="hover:text-[#ffcc00] transition-colors p-1"
              aria-label="Website"
            >
              <Globe className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="hover:text-[#ffcc00] transition-colors p-1"
              aria-label="Share"
            >
              <Share2 className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
