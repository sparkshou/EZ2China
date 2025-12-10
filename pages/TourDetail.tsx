import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTourById } from '../services/tours';
import { useApp } from '../context/AppContext';
import { translations } from '../utils/translations';
import { Tour, Booking } from '../types';
import { Users, CheckCircle, Clock, MapPin, Share2, Shield, Info, Crown, Calendar } from 'lucide-react';

type BookingMode = 'GROUP' | 'PRIVATE';

export const TourDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, addToWallet, addBooking, language } = useApp();
  const t = translations[language];
  
  const [tour, setTour] = useState<Tour | undefined>();
  
  // Booking State
  const [bookingMode, setBookingMode] = useState<BookingMode>('GROUP');
  const [participants, setParticipants] = useState(1);
  const [customDate, setCustomDate] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    if (id) {
      const t = getTourById(id);
      setTour(t);
    }
  }, [id]);

  if (!tour) return <div className="p-40 text-center text-gray-500">Loading...</div>;

  // Bilingual Data
  const title = language === 'en' ? tour.title_en : tour.title;
  const subtitle = language === 'en' ? tour.subtitle_en : tour.subtitle;
  const desc = language === 'en' ? tour.description_en : tour.description;
  const features = language === 'en' ? tour.features_en : tour.features;
  const itinerary = language === 'en' ? tour.itinerary_en : tour.itinerary;
  const location = language === 'en' ? tour.location_en : tour.location;

  // Logic: Pricing & Discounts
  const basePrice = bookingMode === 'GROUP' ? tour.price : tour.privatePrice;
  let discountRate = 0;
  let discountLabel = language === 'zh' ? "基础价格" : "Base Price";

  // Discounts only apply to Group Tours in this logic, or applied differently
  if (bookingMode === 'GROUP') {
    if (participants === 2) {
      discountRate = 0.05; 
      discountLabel = t.discount_couple;
    } else if (participants >= 3) {
      discountRate = 0.08; 
      discountLabel = t.discount_group;
    }
  }

  const finalPricePerPerson = basePrice * (1 - discountRate);
  const totalPrice = finalPricePerPerson * participants;
  
  // Logic: Rewards
  const estimatedCashback = totalPrice * tour.cashbackRate;
  const referrerCommission = totalPrice * tour.commissionRate;

  // Group Logic
  const progressPercent = Math.min((tour.currentGroupSize / tour.minGroupSize) * 100, 100);
  const isConfirmed = tour.currentGroupSize >= tour.minGroupSize;

  const handleBooking = () => {
    // For private tours, validate date
    if (bookingMode === 'PRIVATE' && !customDate) {
      alert(language === 'zh' ? "请选择出发日期" : "Please select a date");
      return;
    }

    const newBooking: Booking = {
      id: `bk_${Date.now()}`,
      tourId: tour.id,
      tourTitle: title,
      date: bookingMode === 'GROUP' ? tour.startDate : customDate,
      participants,
      totalPrice,
      type: bookingMode,
      status: 'PENDING'
    };
    
    // Simulate API call
    setTimeout(() => {
      addBooking(newBooking);
      addToWallet(estimatedCashback); 
      setIsBooked(true);
    }, 800);
  };

  if (isBooked) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center border border-gray-100">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.booked_success}</h2>
          <p className="text-gray-600 mb-8">
            {t.booked_desc.replace('{n}', participants.toString())}
          </p>
          
          <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 mb-8">
             <p className="text-yellow-800 text-sm font-medium">{t.wallet_reward}</p>
             <p className="text-2xl font-bold text-yellow-600 mt-1">¥ {estimatedCashback.toLocaleString()}</p>
          </div>

          <button onClick={() => navigate('/dashboard')} className="w-full bg-gray-900 text-white px-6 py-4 rounded-xl font-bold hover:bg-gray-800 transition">
            {t.btn_dashboard}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* LEFT: Content */}
        <div className="lg:col-span-2 space-y-10">
          {/* Header */}
          <div>
             <div className="flex gap-3 mb-4">
               <span className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-xs font-bold tracking-wide">{tour.category}</span>
               <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                 <Clock size={12}/> {tour.days} {t.days}
               </span>
               <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                 <MapPin size={12}/> {location}
               </span>
             </div>
             <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
               {title}
             </h1>
             <p className="text-xl text-gray-500 font-light">{subtitle}</p>
          </div>

          {/* Hero Image */}
          <div className="rounded-[32px] overflow-hidden h-[400px] shadow-lg relative">
            <img src={tour.image} alt={title} className="w-full h-full object-cover" />
             
             {/* Progress Overlay - ONLY FOR GROUP MODE */}
             {bookingMode === 'GROUP' && (
               <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 text-white">
                  <div className="flex justify-between items-end mb-2">
                     <div>
                        <p className="text-sm font-medium opacity-90 mb-1">{language === 'zh' ? '拼团进度' : 'Group Status'}</p>
                        <p className="font-bold text-lg flex items-center gap-2">
                           <Users className="text-yellow-400" size={20}/> 
                           {tour.currentGroupSize} / {tour.minGroupSize} {language === 'zh' ? '人启动' : 'to start'}
                        </p>
                     </div>
                     <div className="text-right">
                        {isConfirmed ? (
                          <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">{t.card_full}</span>
                        ) : (
                          <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                            {t.card_left.replace('{n}', (tour.minGroupSize - tour.currentGroupSize).toString())}
                          </span>
                        )}
                     </div>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2 backdrop-blur-sm">
                     <div 
                       className={`h-2 rounded-full transition-all duration-1000 ${isConfirmed ? 'bg-green-500' : 'bg-gradient-to-r from-yellow-400 to-red-600'}`} 
                       style={{ width: `${progressPercent}%` }}
                     ></div>
                  </div>
               </div>
             )}
             
             {/* Private Mode Overlay */}
             {bookingMode === 'PRIVATE' && (
               <div className="absolute top-6 right-6 bg-black/70 backdrop-blur-md text-white px-4 py-2 rounded-xl flex items-center gap-2 border border-white/20">
                  <Crown size={16} className="text-yellow-400"/>
                  <span className="font-bold text-sm">{language === 'zh' ? '尊享私家团' : 'Private VIP Tour'}</span>
               </div>
             )}
          </div>

          {/* Description */}
          <div>
            <h3 className="font-serif text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="w-1 h-8 bg-red-700 rounded-full block"></span>
              {t.detail_tab}
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg mb-8 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              {desc}
            </p>
            
            <h3 className="font-serif text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="w-1 h-8 bg-red-700 rounded-full block"></span>
              {t.highlight_tab}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
               {features.map((feat, i) => (
                 <div key={i} className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span className="font-medium text-gray-700">{feat}</span>
                 </div>
               ))}
            </div>

            <h3 className="font-serif text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="w-1 h-8 bg-red-700 rounded-full block"></span>
              {t.itinerary_tab}
            </h3>
            <div className="space-y-6 relative border-l-2 border-gray-100 ml-4 pl-8 pb-4">
              {itinerary.map((day) => (
                <div key={day.day} className="relative">
                  <div className="absolute -left-[41px] top-0 w-6 h-6 bg-red-100 border-2 border-red-600 rounded-full flex items-center justify-center text-[10px] font-bold text-red-700 z-10">
                    {day.day}
                  </div>
                  <h4 className="font-bold text-gray-900 text-lg mb-1">{day.title}</h4>
                  <p className="text-gray-500">{day.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Booking Widget (Sticky) */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 p-8">
            
            {/* Mode Switcher */}
            <div className="flex bg-gray-100 p-1 rounded-xl mb-6 relative">
               <button 
                 onClick={() => setBookingMode('GROUP')}
                 className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all z-10 ${bookingMode === 'GROUP' ? 'bg-white text-red-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
               >
                 {t.mode_group}
               </button>
               <button 
                 onClick={() => setBookingMode('PRIVATE')}
                 className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all z-10 flex items-center justify-center gap-1 ${bookingMode === 'PRIVATE' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
               >
                 <Crown size={12} className={bookingMode === 'PRIVATE' ? 'text-yellow-500' : ''} />
                 {t.mode_private}
               </button>
            </div>
            
            {/* Mode Benefit Banner */}
            <div className={`text-xs font-bold px-3 py-2 rounded-lg mb-6 flex items-center gap-2 ${bookingMode === 'GROUP' ? 'bg-red-50 text-red-700' : 'bg-gray-900 text-yellow-500'}`}>
                {bookingMode === 'GROUP' ? <Users size={14}/> : <Crown size={14}/>}
                {bookingMode === 'GROUP' ? t.group_benefits : t.private_benefits}
            </div>

            <div className="flex justify-between items-end mb-8">
              <div>
                <p className="text-gray-400 text-sm line-through">¥{tour.originalPrice.toLocaleString()}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-red-700">¥{basePrice.toLocaleString()}</span>
                  <span className="text-gray-500 text-sm">{t.price_per_person}</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                 <div className="flex text-yellow-400 text-sm">★★★★★</div>
                 <span className="text-xs text-gray-400">4.9 (128)</span>
              </div>
            </div>

            {/* Selector: Date */}
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-900 mb-2">{bookingMode === 'GROUP' ? t.fixed_date : t.select_date}</label>
              {bookingMode === 'GROUP' ? (
                <div className="bg-gray-50 border border-gray-200 text-gray-500 px-4 py-3 rounded-xl text-sm font-medium flex justify-between items-center cursor-not-allowed">
                   <span>{tour.startDate}</span>
                   <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">Fixed</span>
                </div>
              ) : (
                <div className="relative">
                  <input 
                    type="date" 
                    value={customDate}
                    onChange={(e) => setCustomDate(e.target.value)}
                    className="w-full bg-white border border-gray-300 text-gray-900 px-4 py-3 rounded-xl text-sm font-medium focus:ring-2 focus:ring-red-500 outline-none"
                  />
                  <Calendar className="absolute right-4 top-3 text-gray-400 pointer-events-none" size={18}/>
                </div>
              )}
            </div>

            {/* Selector: Participants */}
            <div className="mb-8">
              <label className="block text-sm font-bold text-gray-900 mb-3">{t.select_participants}</label>
              <div className="flex items-center justify-between bg-gray-50 rounded-xl p-1 border border-gray-200">
                <button 
                  onClick={() => setParticipants(Math.max(1, participants - 1))} 
                  className="w-12 h-12 flex items-center justify-center text-gray-500 hover:bg-white hover:shadow-sm rounded-lg transition"
                >
                  -
                </button>
                <div className="font-bold text-lg text-gray-900">{participants}</div>
                <button 
                  onClick={() => setParticipants(participants + 1)} 
                  className="w-12 h-12 flex items-center justify-center text-gray-500 hover:bg-white hover:shadow-sm rounded-lg transition"
                >
                  +
                </button>
              </div>
              
              {/* Dynamic Discount Alert - Group Only */}
              {bookingMode === 'GROUP' && participants > 1 && (
                <div className="mt-3 bg-green-50 text-green-700 text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-2 animate-pulse">
                   <CheckCircle size={14}/> {discountLabel}
                </div>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 mb-8">
              <div className="flex justify-between text-gray-500 text-sm">
                <span>{language === 'zh' ? '基础费用' : 'Base'} (x{participants})</span>
                <span>¥{(basePrice * participants).toLocaleString()}</span>
              </div>
              {discountRate > 0 && (
                <div className="flex justify-between text-green-600 text-sm font-bold">
                  <span>{language === 'zh' ? '折扣' : 'Discount'}</span>
                  <span>- ¥{((basePrice * participants) - totalPrice).toLocaleString()}</span>
                </div>
              )}
              <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                <span className="font-bold text-gray-900">{t.total_price}</span>
                <span className="text-2xl font-bold text-red-700">¥ {totalPrice.toLocaleString()}</span>
              </div>
            </div>

            {/* Wallet Benefit */}
            <div className="mb-8 p-4 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl text-white relative overflow-hidden">
               <div className="relative z-10">
                 <div className="flex items-center gap-2 mb-2 text-yellow-400 text-xs font-bold uppercase tracking-wider">
                   <Shield size={12}/> {language === 'zh' ? '会员尊享' : 'Member Benefit'}
                 </div>
                 <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs text-gray-400">{t.wallet_reward}</p>
                      <p className="text-lg font-bold">¥ {estimatedCashback.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-xs text-gray-400">{t.share_reward}</p>
                       <p className="text-lg font-bold">¥ {referrerCommission.toLocaleString()}</p>
                    </div>
                 </div>
               </div>
               {/* Decorative circles */}
               <div className="absolute -top-6 -right-6 w-20 h-20 bg-white/10 rounded-full"></div>
            </div>

            <button 
              onClick={handleBooking}
              className="w-full bg-red-700 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-800 transition shadow-lg hover:shadow-red-700/30 transform hover:-translate-y-0.5"
            >
              {t.book_now}
            </button>
            <p className="text-center text-xs text-gray-400 mt-4 flex justify-center gap-4">
               <span>{t.guarantee}</span>
            </p>
          </div>
          
          {/* Share Button */}
          <div className="mt-6 flex justify-center">
            <button className="text-gray-500 text-sm font-medium flex items-center gap-2 hover:text-red-700 transition">
              <Share2 size={16} /> {language === 'zh' ? `生成邀请海报 (赚 ¥${referrerCommission})` : `Share & Earn ¥${referrerCommission}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};