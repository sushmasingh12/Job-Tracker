import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout as logoutAction } from '../../auth/store/authSlice';
import { logout as logoutService } from '../../auth/services/authService';

const menuItems = [
  { id: 'profile', label: 'Profile Settings', icon: 'fa-solid fa-user' },
  { id: 'account', label: 'Account Settings', icon: 'fa-solid fa-lock' },
  { id: 'notifications', label: 'Notification Settings', icon: 'fa-solid fa-bell' },
  { id: 'privacy', label: 'Privacy & Data', icon: 'fa-solid fa-shield-halved' },
];

const SettingsSidebar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await logoutService();
    dispatch(logoutAction());
    navigate('/');
  };

  return (
    <div className="w-full lg:w-72 lg:sticky lg:top-6 self-start bg-white dark:bg-neutral-800 rounded-2xl shadow-sm border border-neutral-border dark:border-neutral-700 overflow-hidden">
      <div className="p-6 border-b border-neutral-border dark:border-neutral-700">
        <h2 className="text-xl font-bold text-neutral-text dark:text-white">Settings</h2>
        <p className="text-sm text-neutral-muted mt-1">Manage your account preferences</p>
      </div>

      <nav className="p-2">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'text-neutral-muted hover:bg-neutral-background-light dark:hover:bg-neutral-700 hover:text-neutral-text dark:hover:text-white'
              }`}
            >
              <i
                className={`${item.icon} w-5 h-5 text-lg transition-colors ${
                  isActive
                    ? 'text-primary'
                    : 'text-neutral-muted group-hover:text-neutral-text dark:group-hover:text-white'
                }`}
              />
              <span className="text-[14px]">{item.label}</span>

              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-neutral-border dark:border-neutral-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 p-2 bg-red-700 text-white rounded-xl transition-all duration-200  hover:bg-red-50  hover:text-red-500 dark:hover:bg-red-500/10 font-semibold"
        >
          <i className="fa-solid fa-arrow-right-from-bracket" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default SettingsSidebar;