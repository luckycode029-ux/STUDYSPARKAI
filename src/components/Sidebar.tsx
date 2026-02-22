import React from 'react';
import { 
  LayoutDashboard, 
  BookMarked, 
  PlusCircle, 
  UserCircle, 
  LogOut, 
  Sparkles,
  X
} from 'lucide-react';
import { Logo } from './Logo';

interface SidebarProps {
  activeItem: string;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (item: string) => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeItem, isOpen, onClose, onNavigate, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'kits', label: 'My Study Kits', icon: BookMarked },
    { id: 'create', label: 'Create New', icon: PlusCircle },
    { id: 'profile', label: 'Profile', icon: UserCircle },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-brand-bg/80 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      <aside className={`fixed inset-y-0 left-0 w-72 glass-panel border-r border-white/5 flex flex-col h-screen z-50 transition-transform duration-300 lg:translate-x-0 lg:static ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-10">
            <Logo size="sm" />
            <button 
              onClick={onClose}
              className="lg:hidden p-2 text-text-secondary hover:bg-white/5 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    onClose();
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all ${
                    isActive 
                      ? 'spark-gradient text-white shadow-lg shadow-brand-blue/20 glow-primary' 
                      : 'text-text-secondary hover:bg-white/5 hover:text-text-primary'
                  }`}
                >
                  <Icon size={20} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-white/5">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold text-text-secondary hover:bg-white/5 hover:text-brand-coral transition-all"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};
