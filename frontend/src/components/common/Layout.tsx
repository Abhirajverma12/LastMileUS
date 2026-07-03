import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const NAV_ITEMS: Record<string, { label: string; path: string }[]> = {
  CUSTOMER: [
    { label: 'Dashboard', path: '/customer/dashboard' },
    { label: 'Orders', path: '/customer/orders' },
    { label: 'New Order', path: '/customer/orders/new' },
  ],
  AGENT: [
    { label: 'Dashboard', path: '/agent/dashboard' },
    { label: 'Orders', path: '/agent/orders' },
  ],
  ADMIN: [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'Orders', path: '/admin/orders' },
    { label: 'Zones', path: '/admin/zones' },
    { label: 'Rates', path: '/admin/rate-cards' },
    { label: 'Agents', path: '/admin/agents' },
  ],
};

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const items = NAV_ITEMS[user?.role || 'CUSTOMER'] || [];

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div className="layout">
      <header className="top-navbar">
        <div className="navbar-brand">
          <h2 className="navbar-logo">LastMileUS</h2>
          <span className="badge role-badge">{user?.role}</span>
        </div>
        
        <nav className="navbar-links">
          {items.map(item => (
            <NavLink key={item.path} to={item.path} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <span className="nav-text">{item.label}</span>
            </NavLink>
          ))}
        </nav>
        
        <div className="navbar-user">
          <div className="user-details hide-on-mobile">
            <p className="user-name">{user?.name || 'Admin User'}</p>
          </div>
          <button className="btn-logout" onClick={handleLogout}>Logout</button>
        </div>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
