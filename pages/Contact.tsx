
import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../utils/translations';
import { Send, MapPin } from 'lucide-react';

export const Contact: React.FC = () => {
  const { language, customPlan, clearPlan } = useApp();
  const t = translations[language];

  const [submitted, setSubmitted] = useState(false);
  
  // Pre-fill destinations from Custom Plan
  const [destinations, setDestinations] = useState('');

  useEffect(() => {
    if (customPlan.length > 0) {
      const names = customPlan.map(r => language === 'zh' ? r.name : r.name_en).join(', ');
      setDestinations(names);
    }
  }, [customPlan, language]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    clearPlan();
  };

  if (submitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
         <div className="text-center max-w-lg">
           <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
             <Send size={40} />
           </div>
           <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.contact_success}</h2>
           <p className="text-gray-500">
             {language === 'zh' 
               ? '我们的旅行顾问已收到您的需求单，正在为您规划路线。' 
               : 'Our travel consultants have received your request and are planning your route.'}
           </p>
         </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.contact_title}</h1>
          <p className="text-gray-600 text-lg">{t.contact_subtitle}</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">{t.contact_form_name}</label>
                <input required type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-200 outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">{t.contact_form_contact}</label>
                <input required type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-200 outline-none transition" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                 <MapPin size={16} className="text-red-700"/> {t.contact_form_dest}
              </label>
              <input 
                type="text" 
                value={destinations}
                onChange={(e) => setDestinations(e.target.value)}
                placeholder="Beijing, Xi'an..."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-200 outline-none transition font-medium text-gray-800" 
              />
              {customPlan.length > 0 && (
                <p className="text-xs text-green-600 mt-2 font-medium">✓ Auto-filled from your map selection</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">{t.contact_form_desc}</label>
              <textarea 
                rows={4} 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-200 outline-none transition"
                placeholder="..."
              ></textarea>
            </div>

            <button type="submit" className="w-full bg-red-700 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-800 transition shadow-lg shadow-red-700/20">
              {t.contact_submit}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
