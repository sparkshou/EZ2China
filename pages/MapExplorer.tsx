
import React, { useState } from 'react';
import { getRegions } from '../services/regions';
import { useApp } from '../context/AppContext';
import { translations } from '../utils/translations';
import { X, Plus, ArrowRight, Star, ShoppingBag, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const MapExplorer: React.FC = () => {
  const { language, addToPlan, customPlan, removeFromPlan } = useApp();
  const t = translations[language];
  const regions = getRegions();
  const navigate = useNavigate();

  const [activeRegionId, setActiveRegionId] = useState<string | null>(null);

  const activeRegion = regions.find(r => r.id === activeRegionId);

  return (
    <div className="relative w-full h-[calc(100vh-80px)] overflow-hidden bg-[#F0F4F8] flex flex-col">
      
      {/* Header Overlay */}
      <div className="absolute top-8 left-8 z-10 max-w-md">
        <h1 className="font-serif text-4xl font-bold text-gray-900 mb-2">{t.map_title}</h1>
        <p className="text-gray-500 text-lg">{t.map_subtitle}</p>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative flex items-center justify-center p-4">
        {/* Placeholder Map Visualization */}
        <div className="relative w-[1000px] h-[700px] bg-white rounded-[40px] shadow-2xl border border-white overflow-hidden transform scale-75 md:scale-90 lg:scale-100 transition-all">
          {/* Faint Grid Background */}
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          
          {/* Simplified China Map Silhouette (Using an Image for Prototype) */}
          <img 
             src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/China_blank_province_map.svg/1024px-China_blank_province_map.svg.png" 
             className="absolute inset-0 w-full h-full object-contain opacity-20 pointer-events-none"
             alt="China Map"
          />

          {/* Markers */}
          {regions.map(region => (
            <button
              key={region.id}
              onClick={() => setActiveRegionId(region.id)}
              className="absolute group focus:outline-none"
              style={{ left: `${region.x}%`, top: `${region.y}%` }}
            >
              {/* Ripple Effect */}
              <span className="absolute -inset-4 rounded-full bg-red-500 opacity-20 group-hover:animate-ping"></span>
              
              {/* Dot */}
              <div className={`w-4 h-4 rounded-full border-2 border-white shadow-lg transition-all transform group-hover:scale-125 ${activeRegionId === region.id ? 'bg-red-700 scale-125' : 'bg-red-500'}`}></div>
              
              {/* Label */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm border border-gray-100 group-hover:text-red-700 transition">
                {language === 'zh' ? region.name : region.name_en}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right Drawer (Cultural Details) */}
      <div className={`fixed top-20 right-0 h-[calc(100vh-80px)] w-full md:w-[450px] bg-white shadow-2xl transform transition-transform duration-500 z-30 flex flex-col ${activeRegionId ? 'translate-x-0' : 'translate-x-full'}`}>
        {activeRegion ? (
          <>
            <div className="h-64 relative">
              <img src={activeRegion.image} className="w-full h-full object-cover" alt={activeRegion.name} />
              <button 
                onClick={() => setActiveRegionId(null)}
                className="absolute top-4 right-4 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition backdrop-blur-sm"
              >
                <X size={20} />
              </button>
              <div className="absolute bottom-4 left-4">
                <span className="bg-red-700 text-white text-xs font-bold px-3 py-1 rounded-full mb-2 inline-block">
                  {language === 'zh' ? activeRegion.cultureTag : activeRegion.cultureTag_en}
                </span>
                <h2 className="text-3xl font-serif font-bold text-white shadow-sm">
                  {language === 'zh' ? activeRegion.name : activeRegion.name_en}
                </h2>
              </div>
            </div>

            <div className="p-8 flex-1 overflow-y-auto">
              <p className="text-gray-600 leading-relaxed text-lg mb-8">
                {language === 'zh' ? activeRegion.description : activeRegion.description_en}
              </p>

              {/* Action Buttons */}
              <div className="space-y-4">
                {/* 1. Add to Plan */}
                <button 
                  onClick={() => addToPlan(activeRegion)}
                  disabled={customPlan.some(r => r.id === activeRegion.id)}
                  className="w-full bg-white border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:border-gray-900 hover:text-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                   {customPlan.some(r => r.id === activeRegion.id) ? (
                     <><span className="text-green-600">✓</span> Added</>
                   ) : (
                     <><Plus size={18}/> {t.map_add_plan}</>
                   )}
                </button>

                {/* 2. Link to Tour or Wish */}
                {activeRegion.linkedTourIds.length > 0 ? (
                  <button 
                    onClick={() => navigate(`/tour/${activeRegion.linkedTourIds[0]}`)}
                    className="w-full bg-red-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-800 transition shadow-lg shadow-red-700/20"
                  >
                    {t.map_view_tour} <ArrowRight size={18}/>
                  </button>
                ) : (
                  <button 
                    onClick={() => navigate('/contact')}
                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg transition"
                  >
                    <Star size={18} fill="currentColor" className="text-white"/> {t.map_make_wish}
                  </button>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400 p-10 text-center">
            {t.map_title}
          </div>
        )}
      </div>

      {/* Bottom Floating Bar (Custom Plan) */}
      {customPlan.length > 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-4 rounded-full shadow-2xl flex items-center gap-6 z-40 animate-slide-up w-[90%] md:w-auto max-w-2xl">
          <div className="flex items-center gap-3">
            <div className="bg-red-600 p-2 rounded-full">
               <ShoppingBag size={20} />
            </div>
            <div className="hidden md:block">
              <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">{t.map_plan_bar}</p>
              <div className="flex gap-2 mt-1">
                {customPlan.map(region => (
                  <span key={region.id} className="text-sm font-bold flex items-center gap-1">
                    {language === 'zh' ? region.name : region.name_en}
                    <button onClick={() => removeFromPlan(region.id)} className="hover:text-red-400"><X size={10}/></button>
                  </span>
                ))}
              </div>
            </div>
            {/* Mobile simplified view */}
            <div className="md:hidden">
              <span className="font-bold">{customPlan.length} Destinations</span>
            </div>
          </div>

          <button 
            onClick={() => navigate('/contact')}
            className="bg-white text-gray-900 px-6 py-2 rounded-full font-bold text-sm hover:bg-gray-100 transition whitespace-nowrap"
          >
            {t.map_customize_btn}
          </button>
        </div>
      )}
    </div>
  );
};
