import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserAddress {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
}

export interface UserRewardItem {
  id: string;
  title: string;
  code: string;
  value: string;
  expiry: string;
  type: 'discount' | 'cashback' | 'gift';
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  rewardPoints: number; // e.g. 1 point = ₹1
  walletCashback: number;
  vipTier: 'Silver Member' | 'Gold VIP' | 'Black Diamond';
  address: UserAddress;
  rewards: UserRewardItem[];
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => boolean;
  signup: (name: string, email: string, pass: string, phone: string) => boolean;
  loginDemoUser: () => void;
  logout: () => void;
  updateAddress: (address: UserAddress) => void;
  addReward: (reward: UserRewardItem, pointsToAdd?: number) => void;
  useRewardCredits: (amount: number) => boolean;
  isAuthModalOpen: boolean;
  openAuthModal: (mode?: 'login' | 'signup') => void;
  closeAuthModal: () => void;
  authMode: 'login' | 'signup';
  setAuthMode: (mode: 'login' | 'signup') => void;
}

const DEFAULT_ADDRESS: UserAddress = {
  fullName: 'Aria Montgomery',
  phone: '+91 98765 43210',
  street: 'Apartment 4B, The Oberoi Enclave, Bandra West',
  city: 'Mumbai',
  state: 'Maharashtra',
  pincode: '400050',
  landmark: 'Near Turner Road Promenade'
};

const DEFAULT_DEMO_USER: UserProfile = {
  name: 'Aria Montgomery',
  email: 'aria.luxe@sho-pro.fashion',
  phone: '+91 98765 43210',
  rewardPoints: 450,
  walletCashback: 250,
  vipTier: 'Gold VIP',
  address: DEFAULT_ADDRESS,
  rewards: [
    {
      id: 'rew-welcome',
      title: 'Welcome VIP Credit',
      code: 'PRO-WELCOME-20',
      value: '20% OFF',
      expiry: '30 Days',
      type: 'discount'
    }
  ]
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('sho_pro_user');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    // Default to logged-in demo user for instant smooth experience, but user can log out/switch anytime
    return DEFAULT_DEMO_USER;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  useEffect(() => {
    if (user) {
      localStorage.setItem('sho_pro_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('sho_pro_user');
    }
  }, [user]);

  const login = (email: string) => {
    const newUser: UserProfile = {
      name: email.split('@')[0].replace('.', ' ').replace(/^./, str => str.toUpperCase()) || 'Fashion Enthusiast',
      email,
      phone: '+91 98111 22334',
      rewardPoints: 200,
      walletCashback: 100,
      vipTier: 'Silver Member',
      address: DEFAULT_ADDRESS,
      rewards: [
        {
          id: 'rew-sign',
          title: 'Sho-Pro Club Bonus',
          code: 'PRO-BONUS-15',
          value: '15% OFF',
          expiry: '45 Days',
          type: 'discount'
        }
      ]
    };
    setUser(newUser);
    setIsAuthModalOpen(false);
    return true;
  };

  const signup = (name: string, email: string, _pass: string, phone: string) => {
    const newUser: UserProfile = {
      name,
      email,
      phone: phone || '+91 98000 12345',
      rewardPoints: 300,
      walletCashback: 150,
      vipTier: 'Silver Member',
      address: {
        fullName: name,
        phone: phone || '+91 98000 12345',
        street: '7th Avenue, Koregaon Park',
        city: 'Pune',
        state: 'Maharashtra',
        pincode: '411001'
      },
      rewards: [
        {
          id: 'rew-new',
          title: 'First-Drop Privileged Pass',
          code: 'PRO-NEWBIE-25',
          value: '25% OFF',
          expiry: '60 Days',
          type: 'discount'
        }
      ]
    };
    setUser(newUser);
    setIsAuthModalOpen(false);
    return true;
  };

  const loginDemoUser = () => {
    setUser(DEFAULT_DEMO_USER);
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
  };

  const updateAddress = (address: UserAddress) => {
    if (!user) return;
    setUser(prev => prev ? { ...prev, address } : null);
  };

  const addReward = (reward: UserRewardItem, pointsToAdd = 100) => {
    if (!user) {
      // Auto create anonymous guest with rewards
      setUser({
        ...DEFAULT_DEMO_USER,
        rewards: [reward, ...DEFAULT_DEMO_USER.rewards],
        rewardPoints: DEFAULT_DEMO_USER.rewardPoints + pointsToAdd
      });
      return;
    }
    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        rewardPoints: prev.rewardPoints + pointsToAdd,
        rewards: [reward, ...prev.rewards]
      };
    });
  };

  const useRewardCredits = (amount: number): boolean => {
    if (!user || user.rewardPoints < amount) return false;
    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        rewardPoints: Math.max(0, prev.rewardPoints - amount)
      };
    });
    return true;
  };

  const openAuthModal = (mode: 'login' | 'signup' = 'login') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        loginDemoUser,
        logout,
        updateAddress,
        addReward,
        useRewardCredits,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        authMode,
        setAuthMode
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
