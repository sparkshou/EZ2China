
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getTours } from '../services/tours';
import { Tour, TourCategory } from '../types';
import { useApp } from '../context/AppContext';
import { translations } from '../utils/translations';
import { Search, ArrowRight, Zap } from 'lucide-react';

export const Home: React.FC = () => {
  const { language } = useApp();
  const t = translations[language];
  
  const [tours, setTours] = useState<Tour[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter = searchParams.get('cat') as TourCategory | null;

  useEffect(() => {
    const allTours = getTours();
    if (categoryFilter) {
      setTours(allTours.filter(t => t.category === categoryFilter));
    } else {
      setTours(allTours);
    }
  }, [categoryFilter]);

  return (
    <div className="pb-20">
      {/* 1. HERO SECTION */}
      <div className="relative pt-12 pb-16 lg:pt-32 lg:pb-28 overflow-hidden px-4">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
            <img src="https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover opacity-10" alt="Background" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#F9FAFB]"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
            {/* Optimized Typography for Chinese & English */}
            <h1 className={`font-serif font-bold text-gray-900 mb-6 transition-all duration-300
              ${language === 'zh' 
                ? 'text-4xl md:text-6xl leading-[1.4] tracking-widest' 
                : 'text-4xl md:text-6xl leading-tight tracking-tight'}
            `}>
                {t.hero_title}<br/>
                <span className="text-red-700 inline-block mt-2 md:mt-0">{t.hero_title_highlight}</span>
            </h1>
            
            <p className={`text-gray-600 mb-10 max-w-2xl mx-auto px-4
               ${language === 'zh' ? 'text-base md:text-lg leading-relaxed tracking-wide' : 'text-lg'}
            `}>
                {t.hero_subtitle}
            </p>
            
            {/* Search Bar Capsule - Responsive: Stack on mobile, Row on desktop */}
            <div className="bg-white p-2 rounded-3xl md:rounded-full shadow-xl flex flex-col md:flex-row items-center max-w-2xl mx-auto border border-gray-100 transform transition hover:scale-[1.01] duration-300">
                <div className="w-full md:w-auto pl-4 pr-4 py-3 md:py-0 text-gray-400 flex items-center justify-center md:justify-start">
                    <Search className="w-5 h-5" />
                </div>
                <input 
                  type="text" 
                  placeholder={t.search_placeholder} 
                  className="w-full py-2 md:py-3 text-center md:text-left text-base md:text-lg outline-none text-gray-700 placeholder-gray-400 bg-transparent border-b md:border-b-0 border-gray-100 mb-2 md:mb-0" 
                />
                <button className="w-full md:w-auto bg-red-700 text-white rounded-2xl md:rounded-full px-8 py-3 font-bold text-sm tracking-wide shadow-lg hover:bg-red-800 transition whitespace-nowrap">
                    {t.ai_plan_btn}
                </button>
            </div>
            
            {/* Quick Filter Capsules - Horizontal scroll on mobile */}
            <div className="mt-8 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:pb-0 scrollbar-hide">
              <div className="flex justify-start md:justify-center gap-3 min-w-max">
                  {[
                    { id: 'ALL', label: t.cat_all },
                    { id: TourCategory.STUDY, label: t.cat_study },
                    { id: TourCategory.BUSINESS, label: t.cat_business },
                    { id: TourCategory.TOURISM, label: t.cat_tourism }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        if (cat.id === 'ALL') setSearchParams({});
                        else setSearchParams({ cat: cat.id as string });
                      }}
                      className={`px-5 py-2.5 rounded-full border text-sm font-medium transition cursor-pointer whitespace-nowrap ${
                        (categoryFilter === cat.id) || (!categoryFilter && cat.id === 'ALL')
                        ? 'bg-red-50 border-red-200 text-red-700'
                        : 'bg-white border-gray-100 text-gray-600 hover:bg-gray-50'
                      } shadow-sm`}
                    >
                      {cat.label}
                    </button>
                  ))}
              </div>
            </div>
        </div>
      </div>

      {/* 2. TOURS GRID (Lovable Cards) */}
      <div id="tours" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-2">
            <div>
                <h2 className={`font-serif text-2xl md:text-3xl font-bold text-gray-900 ${language === 'zh' ? 'tracking-wide' : ''}`}>
                  {t.section_hot}
                </h2>
                <p className="text-gray-500 mt-2 text-sm md:text-base">{t.section_hot_desc}</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {tours.map(tour => {
             const progress = Math.min((tour.currentGroupSize / tour.minGroupSize) * 100, 100);
             const isFull = tour.currentGroupSize >= tour.minGroupSize;
             const displayTitle = language === 'en' ? tour.title_en : tour.title;
             const displaySubtitle = language === 'en' ? tour.subtitle_en : tour.subtitle;

             return (
              <Link to={`/tour/${tour.id}`} key={tour.id} className="bg-white rounded-[24px] border border-gray-100 overflow-hidden flex flex-col h-full relative group hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] hover:border-red-100 transition-all duration-300">
                {/* Image Area */}
                <div className="h-56 md:h-60 overflow-hidden relative">
                  <img src={tour.image} alt={displayTitle} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                  
                  {/* Floating Tags */}
                  <div className="absolute top-4 left-4 flex gap-2">
                     <span className="bg-white/90 backdrop-blur text-gray-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                       {tour.category === TourCategory.STUDY && t.card_study}
                       {tour.category === TourCategory.BUSINESS && t.card_business}
                       {tour.category === TourCategory.TOURISM && t.card_tourism}
                     </span>
                  </div>
                  
                  {/* Urgency Badge */}
                  {!isFull && (
                    <div className="absolute top-4 right-4 bg-red-600/90 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                      <Zap size={12} fill="currentColor" /> 
                      {t.card_left.replace('{n}', (tour.minGroupSize - tour.currentGroupSize).toString())}
                    </div>
                  )}
                  {isFull && (
                    <div className="absolute top-4 right-4 bg-green-600/90 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                      {t.card_full}
                    </div>
                  )}
                </div>

                {/* Content Area */}
                <div className="p-5 md:p-6 flex-1 flex flex-col">
                    <h3 className={`font-serif text-lg md:text-xl font-bold text-gray-900 mb-2 leading-tight group-hover:text-red-700 transition-colors ${language === 'zh' ? 'tracking-wide' : ''}`}>
                      {displayTitle}
                    </h3>
                    <p className="text-gray-500 text-sm mb-6 line-clamp-2">
                      {displaySubtitle}
                    </p>
                    
                    {/* Progress Bar */}
                    <div className="mb-6">
                        <div className="flex justify-between text-xs mb-1.5 font-medium">
                            <span className="text-gray-500">{t.card_current.replace('{n}', tour.currentGroupSize.toString())}</span>
                            <span className={isFull ? "text-green-600" : "text-red-600"}>
                              {t.card_target.replace('{n}', tour.minGroupSize.toString())}
                            </span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-1000 ${isFull ? 'bg-green-500' : 'bg-gradient-to-r from-yellow-400 to-red-600'}`} 
                              style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Footer / Pricing */}
                    <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
                        <div>
                            <span className="text-xs text-gray-400 block line-through">¥ {tour.originalPrice.toLocaleString()}</span>
                            <span className="text-lg font-bold text-gray-900">¥ {tour.price.toLocaleString()}</span>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-red-700 group-hover:text-white transition-colors duration-300">
                           <ArrowRight size={18} />
                        </div>
                    </div>
                </div>
              </Link>
             );
          })}
        </div>
      </div>
      
      {/* 3. Membership Benefit Banner (Simulated Trans for now) */}
      <div className="bg-gray-900 py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className={`font-serif text-2xl md:text-3xl font-bold mb-12 ${language === 'zh' ? 'tracking-widest' : ''}`}>
              {language === 'zh' ? '为什么成为我们的会员？' : 'Why Become a Member?'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-8 border border-gray-700 rounded-3xl bg-gray-800/50 hover:bg-gray-800 transition">
                    <div className="text-4xl mb-4">💰</div>
                    <h4 className="text-xl font-bold mb-2">{language === 'zh' ? '消费返现' : 'Cashback'}</h4>
                    <p className="text-gray-400 text-sm">{language === 'zh' ? '每次报名成功，均可获得 3%-5% 的现金返利至账户余额，无门槛使用。' : 'Earn 3%-5% cashback to your wallet on every booking.'}</p>
                </div>
                <div className="p-8 border border-gray-700 rounded-3xl bg-gray-800/50 hover:bg-gray-800 transition relative overflow-hidden group">
                    <div className="absolute -right-12 top-4 bg-red-600 text-xs font-bold py-1 w-40 text-center rotate-45 shadow-lg group-hover:scale-110 transition">HOT</div>
                    <div className="text-4xl mb-4">🤝</div>
                    <h4 className="text-xl font-bold mb-2">{language === 'zh' ? '邀请裂变' : 'Referral Rewards'}</h4>
                    <p className="text-gray-400 text-sm">{language === 'zh' ? '生成您的专属海报，邀请好友报名。您得佣金，好友得优惠，双赢模式。' : 'Invite friends. You get commission, they get a discount.'}</p>
                </div>
                <div className="p-8 border border-gray-700 rounded-3xl bg-gray-800/50 hover:bg-gray-800 transition">
                    <div className="text-4xl mb-4">👨‍👩‍👧‍👦</div>
                    <h4 className="text-xl font-bold mb-2">{language === 'zh' ? '团购折扣' : 'Group Discount'}</h4>
                    <p className="text-gray-400 text-sm">{language === 'zh' ? '自动阶梯定价。2人同行95折，3人同行92折。系统自动计算，无需砍价。' : 'Automatic tiered pricing. 5% off for 2 people, 8% off for 3+ people.'}</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
