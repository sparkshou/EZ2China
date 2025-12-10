import React from 'react';
import { useApp } from '../context/AppContext';
import { Wallet, Gift, Clock, CreditCard, Copy, ChevronRight } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { user } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
      <h1 className="font-serif text-3xl font-bold text-gray-900 mb-8">个人中心</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Card 1: Wallet - Premium Dark Gold */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="text-gray-300 font-medium flex items-center gap-2 text-sm uppercase tracking-wide"><Wallet size={16}/> 账户余额</h3>
            <div className="text-4xl font-bold mt-3 font-mono">¥ {user.walletBalance.toLocaleString()}</div>
            <p className="text-xs text-gray-400 mt-6">可直接用于下次报名抵扣</p>
          </div>
          <div className="absolute right-[-20px] bottom-[-30px] opacity-10 group-hover:opacity-20 transition duration-500">
            <Wallet size={150} />
          </div>
        </div>

        {/* Card 2: Referrals - Red Accent */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative group hover:shadow-lg transition">
          <h3 className="text-gray-500 font-medium flex items-center gap-2 mb-4 text-sm uppercase tracking-wide"><Gift size={16} className="text-red-500" /> 邀请返利</h3>
          <p className="text-sm text-gray-600 mb-6 leading-relaxed">
            分享您的专属邀请码。好友报名立减 ¥200，您获得 3% 现金奖励。
          </p>
          <div className="bg-gray-50 rounded-xl p-4 flex justify-between items-center border border-gray-100 group-hover:border-red-100 transition">
            <code className="text-xl font-bold text-gray-800 tracking-wider">{user.referralCode}</code>
            <button className="text-red-700 hover:text-red-900 text-sm font-bold flex items-center gap-1">
              <Copy size={14} /> 复制
            </button>
          </div>
        </div>

        {/* Card 3: Membership Status - Gold */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition">
          <h3 className="text-gray-500 font-medium flex items-center gap-2 mb-4 text-sm uppercase tracking-wide"><CreditCard size={16} className="text-yellow-500" /> 会员等级</h3>
          <div className="flex items-baseline gap-2">
             <div className="text-2xl font-bold text-gray-900">黄金会员</div>
             <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full font-bold">LV.2</span>
          </div>
          
          <div className="w-full bg-gray-100 rounded-full h-2 mt-6 mb-2">
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-2 rounded-full w-3/4"></div>
          </div>
          <p className="text-xs text-gray-400">再完成 1 次出行即可升级白金会员 (享8%返现)</p>
        </div>
      </div>

      {/* Bookings */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-serif text-2xl font-bold text-gray-900">我的订单</h2>
        <button className="text-sm text-gray-500 hover:text-red-700 flex items-center gap-1">
          查看全部 <ChevronRight size={14}/>
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {user.bookings.length === 0 ? (
          <div className="p-16 text-center text-gray-400 bg-gray-50/50">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
               <Clock size={24} className="opacity-50"/>
            </div>
            暂无订单，开启您的第一次探索吧！
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {user.bookings.map((booking) => (
              <div key={booking.id} className="p-6 hover:bg-gray-50 transition flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="w-12 h-12 bg-red-50 text-red-700 rounded-xl flex items-center justify-center font-bold text-lg">
                       {booking.tourTitle.substring(0,1)}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-lg">{booking.tourTitle}</div>
                      <div className="text-xs text-gray-500 flex gap-2">
                        <span>{new Date(booking.date).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{booking.participants} 人出行</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                     <span className="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full font-bold">
                      {booking.status === 'PENDING' ? '待出行' : booking.status}
                    </span>
                    <span className="font-bold text-gray-900 text-xl">
                      ¥ {booking.totalPrice.toLocaleString()}
                    </span>
                  </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};