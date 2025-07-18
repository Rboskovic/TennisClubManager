import { Home, Calendar, DollarSign, BarChart, Settings, LogOut, MessageSquare } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const navItems = [
  { id: 'dashboard', label: 'Pregled', icon: Home, path: '/' },
  { id: 'courts', label: 'Upravljanje Terenima', icon: Calendar, path: '/courts' },
  { id: 'chat', label: 'Chat', icon: MessageSquare, path: '/chat' },
  { id: 'pricing', label: 'Cjenovnik', icon: DollarSign, path: '/pricing' },
  { id: 'analytics', label: 'Analitika', icon: BarChart, path: '/analytics' },
  { id: 'settings', label: 'Postavke', icon: Settings, path: '/settings' },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="w-64 bg-white shadow-lg flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">🎾</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Tennis Klub</h1>
            <p className="text-sm text-gray-500">Manager</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                  {item.id === 'chat' && (
                    <span className="ml-auto bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                      BETA
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Odjavi se</span>
        </button>
      </div>
    </div>
  );
}
