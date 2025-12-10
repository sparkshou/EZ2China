
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Phone, MapPin, Globe, Menu, X, ChevronRight } from 'lucide-react';
import { translations } from '../utils/translations';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, setChatOpen, language, setLanguage } = useApp();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const t = translations[language];

  const isActive = (path: string) => location.pathname === path ? 'text-red-700 font-bold' : 'text-gray-500 hover:text-red-700 font-medium';
  // Special style for the Map Link
  const isMapActive = location.pathname === '/map';

  const toggleLanguage = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh');
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB] font-sans">
      
      {/* Main Nav - Glass Effect */}
      <nav className="glass-nav fixed w-full z-40 top-0 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2 group z-50 relative" onClick={closeMobileMenu}>
                <span className="font-serif text-2xl text-gray-900 font-bold tracking-wider">
                  {language === 'zh' ? '华夏游学' : 'SinoVoyage'}<span className="text-red-700 group-hover:scale-110 inline-block transition">.</span>
                </span>
              </Link>
              
              {/* Desktop Nav */}
              <div className="hidden md:flex ml-16 space-x-6 items-center">
                <Link to="/" className={isActive('/')}>{t.nav_home}</Link>
                
                {/* NEW MAP LINK - HIGHLIGHTED */}
                <Link 
                  to="/map" 
                  className={`px-4 py-2 rounded-full transition-all flex items-center gap-2 ${isMapActive ? 'bg-red-700 text-white shadow-md' : 'bg-red-50 text-red-700 hover:bg-red-100'}`}
                >
                  <span className="font-bold text-sm">{t.nav_map}</span>
                </Link>

                <Link to="/services" className={isActive('/services')}>{t.nav_services}</Link>
                <Link to="/?cat=STUDY" className={isActive('/?cat=STUDY')}>{t.nav_study}</Link>
                <Link to="/?cat=TOURISM" className={isActive('/?cat=TOURISM')}>{t.nav_tourism}</Link>
                <Link to="/?cat=BUSINESS" className={isActive('/?cat=BUSINESS')}>{t.nav_business}</Link>
              </div>
            </div>
            
            {/* Right Side: Wallet, Lang & Profile */}
            <div className="flex items-center gap-4 md:space-x-6">
              
              {/* Language Switch - Visible on Mobile too */}
              <button 
                onClick={toggleLanguage}
                className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-red-700 transition px-2 py-1 rounded-md hover:bg-gray-100"
              >
                <Globe size={16} />
                <span>{language === 'zh' ? 'EN' : '中文'}</span>
              </button>

              <div className="hidden md:flex flex-col items-end cursor-pointer" title="Wallet Balance">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider">{t.nav_wallet}</span>
                <span className="text-sm font-bold text-yellow-600 flex items-center gap-1">
                  ¥ {user.walletBalance.toLocaleString()}
                </span>
              </div>
              
              <Link to="/dashboard" className="hidden md:block h-10 w-10 rounded-full bg-gray-100 overflow-hidden border-2 border-white shadow-sm hover:ring-2 hover:ring-red-100 transition">
                 <img src={user.avatar} alt="User" className="w-full h-full object-cover" />
              </Link>

              {/* Mobile Menu Toggle */}
              <button 
                className="md:hidden p-2 text-gray-600 hover:text-gray-900"
                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white shadow-xl border-t border-gray-100 px-4 py-6 flex flex-col space-y-4 animate-in slide-in-from-top-5 duration-200">
             <Link to="/" onClick={closeMobileMenu} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 text-gray-900 font-bold">
               {t.nav_home} <ChevronRight size={16} className="text-gray-300"/>
             </Link>
             <Link to="/map" onClick={closeMobileMenu} className="flex items-center justify-between p-3 rounded-xl bg-red-50 text-red-700 font-bold">
               {t.nav_map} <ChevronRight size={16} className="text-red-300"/>
             </Link>
             <Link to="/services" onClick={closeMobileMenu} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 text-gray-900 font-bold">
               {t.nav_services} <ChevronRight size={16} className="text-gray-300"/>
             </Link>
             <div className="border-t border-gray-100 my-2 pt-2">
               <p className="text-xs text-gray-400 px-3 mb-2 font-medium">CATEGORIES</p>
               <Link to="/?cat=STUDY" onClick={closeMobileMenu} className="block px-3 py-2 text-sm font-medium text-gray-600 hover:text-red-700">{t.nav_study}</Link>
               <Link to="/?cat=TOURISM" onClick={closeMobileMenu} className="block px-3 py-2 text-sm font-medium text-gray-600 hover:text-red-700">{t.nav_tourism}</Link>
               <Link to="/?cat=BUSINESS" onClick={closeMobileMenu} className="block px-3 py-2 text-sm font-medium text-gray-600 hover:text-red-700">{t.nav_business}</Link>
             </div>
             <div className="border-t border-gray-100 pt-4 flex items-center justify-between px-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                    <img src={user.avatar} alt="User" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">{user.name}</div>
                    <div className="text-xs text-yellow-600 font-bold">¥ {user.walletBalance.toLocaleString()}</div>
                  </div>
                </div>
                <Link to="/dashboard" onClick={closeMobileMenu} className="text-xs bg-gray-900 text-white px-3 py-2 rounded-lg font-bold">
                  My Profile
                </Link>
             </div>
          </div>
        )}
      </nav>

      {/* Content Spacer for fixed header */}
      <div className="h-20"></div>

      {/* Main Content */}
      <main className="flex-grow w-full overflow-x-hidden">
        {children}
      </main>

      {/* Footer - Dark & Premium */}
      <footer className="bg-gray-900 text-gray-300 py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="font-serif text-2xl text-white font-bold mb-6">{language === 'zh' ? '华夏游学.' : 'SinoVoyage.'}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              {t.footer_desc}
            </p>
          </div>
          <div className="grid grid-cols-2 md:block gap-4">
            <div>
              <h4 className="text-white font-bold mb-6">{language === 'zh' ? '探索' : 'Explore'}</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/map" className="hover:text-red-500 transition">{t.nav_map}</Link></li>
                <li><Link to="/services" className="hover:text-red-500 transition">{t.nav_services}</Link></li>
                <li><Link to="/?cat=STUDY" className="hover:text-red-500 transition">{t.nav_study}</Link></li>
              </ul>
            </div>
            <div className="md:hidden">
               <h4 className="text-white font-bold mb-6">{t.footer_contact}</h4>
               <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2"><Phone size={14}/> 400-123-4567</li>
               </ul>
            </div>
          </div>
          <div className="hidden md:block">
            <h4 className="text-white font-bold mb-6">{t.footer_contact}</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2"><Phone size={14}/> 400-123-4567</li>
              <li className="flex items-center gap-2"><MapPin size={14}/> {language === 'zh' ? '中国上海市' : 'Shanghai, China'}</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">{t.footer_service}</h4>
             <button 
                className="w-full bg-red-700 text-white px-6 py-3 rounded-lg text-sm font-bold hover:bg-red-800 transition shadow-lg shadow-red-900/20" 
                onClick={() => setChatOpen(true)}
             >
                {t.ai_summon}
             </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
