
import React from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../utils/translations';
import { Check, Star, Crown, HeartHandshake, ShieldCheck, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Services: React.FC = () => {
  const { language } = useApp();
  const t = translations[language];
  const navigate = useNavigate();

  return (
    <div className="pb-20">
      {/* Hero */}
      <div className="bg-gray-900 text-white py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1542640244-7e672d6bd4e8?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover opacity-20" alt="Concierge" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
           <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">{t.svc_title}</h1>
           <p className="text-xl text-gray-400 max-w-2xl mx-auto">{t.svc_subtitle}</p>
        </div>
      </div>

      {/* Tiers Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Tier 1: Free (Welcome) */}
          <div className="bg-white rounded-[32px] p-8 shadow-xl flex flex-col border-2 border-green-500 relative overflow-hidden transform hover:-translate-y-2 transition duration-300">
             <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-4 py-1 rounded-bl-xl">POPULAR</div>
             <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                <Smartphone size={32} />
             </div>
             <h3 className="font-serif text-2xl font-bold text-gray-900 mb-2">{t.svc_tier1_name}</h3>
             <div className="text-3xl font-bold text-green-600 mb-6">{t.svc_tier1_price}</div>
             <p className="text-gray-500 text-sm mb-8 flex-1">{t.svc_tier1_desc}</p>
             
             <ul className="space-y-4 mb-8">
               {[t.svc_tier1_feat1, t.svc_tier1_feat2, t.svc_tier1_feat3, t.svc_tier1_feat4].map((feat, i) => (
                 <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                    <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                    <span>{feat}</span>
                 </li>
               ))}
             </ul>

             <button 
               onClick={() => navigate('/dashboard')}
               className="w-full bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 transition shadow-lg shadow-green-600/20"
             >
               {t.svc_tier1_btn}
             </button>
          </div>

          {/* Tier 2: Paid (Guide) */}
          <div className="bg-white rounded-[32px] p-8 shadow-xl flex flex-col border border-gray-100 transform hover:-translate-y-2 transition duration-300">
             <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-6">
                <HeartHandshake size={32} />
             </div>
             <h3 className="font-serif text-2xl font-bold text-gray-900 mb-2">{t.svc_tier2_name}</h3>
             <div className="text-3xl font-bold text-gray-900 mb-6">{t.svc_tier2_price}</div>
             <p className="text-gray-500 text-sm mb-8 flex-1">{t.svc_tier2_desc}</p>
             
             <ul className="space-y-4 mb-8">
               {[t.svc_tier2_feat1, t.svc_tier2_feat2, t.svc_tier2_feat3, t.svc_tier2_feat4].map((feat, i) => (
                 <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                    <Check size={16} className="text-red-500 mt-0.5 shrink-0" />
                    <span>{feat}</span>
                 </li>
               ))}
             </ul>

             <button 
                onClick={() => navigate('/contact')}
                className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition"
             >
               {t.svc_tier2_btn}
             </button>
          </div>

          {/* Tier 3: Premium (Butler) */}
          <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white rounded-[32px] p-8 shadow-2xl flex flex-col border border-gray-700 transform hover:-translate-y-2 transition duration-300 relative">
             <div className="absolute top-6 right-8">
               <Crown size={24} className="text-yellow-400" />
             </div>
             <div className="w-16 h-16 bg-white/10 text-yellow-400 rounded-full flex items-center justify-center mb-6 backdrop-blur">
                <ShieldCheck size={32} />
             </div>
             <h3 className="font-serif text-2xl font-bold text-white mb-2">{t.svc_tier3_name}</h3>
             <div className="text-3xl font-bold text-yellow-400 mb-6">{t.svc_tier3_price}</div>
             <p className="text-gray-400 text-sm mb-8 flex-1">{t.svc_tier3_desc}</p>
             
             <ul className="space-y-4 mb-8">
               {[t.svc_tier3_feat1, t.svc_tier3_feat2, t.svc_tier3_feat3, t.svc_tier3_feat4].map((feat, i) => (
                 <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                    <Check size={16} className="text-yellow-400 mt-0.5 shrink-0" />
                    <span>{feat}</span>
                 </li>
               ))}
             </ul>

             <button 
               onClick={() => navigate('/contact')}
               className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-yellow-500/20 transition"
             >
               {t.svc_tier3_btn}
             </button>
          </div>

        </div>
      </div>

      {/* Footer Note */}
      <div className="max-w-3xl mx-auto mt-16 px-4 text-center">
        <p className="text-gray-400 text-sm">
          {language === 'zh' 
           ? '注：所有地接人员均经过严格背景审查与培训。免费服务需至少提前48小时预约。' 
           : 'Note: All ground staff are strictly vetted and trained. Free service requires reservation at least 48 hours in advance.'}
        </p>
      </div>
    </div>
  );
};
