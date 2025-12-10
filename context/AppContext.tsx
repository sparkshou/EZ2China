
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Booking, Region } from '../types';

export type Language = 'zh' | 'en';

interface AppContextType {
  user: User;
  language: Language;
  setLanguage: (lang: Language) => void;
  addToWallet: (amount: number) => void;
  addBooking: (booking: Booking) => void;
  isCartOpen: boolean;
  setCartOpen: (isOpen: boolean) => void;
  isChatOpen: boolean;
  setChatOpen: (isOpen: boolean) => void;
  
  // Custom Plan Logic
  customPlan: Region[];
  addToPlan: (region: Region) => void;
  removeFromPlan: (regionId: string) => void;
  clearPlan: () => void;
}

const defaultUser: User = {
  id: 'u_12345',
  name: 'Alex Chen',
  avatar: 'https://picsum.photos/100/100',
  walletBalance: 0,
  referralCode: 'ALEX888',
  isMember: true,
  bookings: []
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(defaultUser);
  const [language, setLanguage] = useState<Language>('zh');
  const [isCartOpen, setCartOpen] = useState(false);
  const [isChatOpen, setChatOpen] = useState(false);
  const [customPlan, setCustomPlan] = useState<Region[]>([]);

  const addToWallet = (amount: number) => {
    setUser(prev => ({ ...prev, walletBalance: prev.walletBalance + amount }));
  };

  const addBooking = (booking: Booking) => {
    setUser(prev => ({ ...prev, bookings: [...prev.bookings, booking] }));
  };

  const addToPlan = (region: Region) => {
    if (!customPlan.find(r => r.id === region.id)) {
      setCustomPlan([...customPlan, region]);
    }
  };

  const removeFromPlan = (regionId: string) => {
    setCustomPlan(prev => prev.filter(r => r.id !== regionId));
  };

  const clearPlan = () => setCustomPlan([]);

  return (
    <AppContext.Provider value={{ 
      user, 
      language, 
      setLanguage, 
      addToWallet, 
      addBooking, 
      isCartOpen, 
      setCartOpen, 
      isChatOpen, 
      setChatOpen,
      customPlan,
      addToPlan,
      removeFromPlan,
      clearPlan
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
