import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Hero3D from '../components/common/Hero3D';
import Tilt from 'react-parallax-tilt';

export default function LandingPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (!user) return '/login';
    if (user.role === 'ADMIN') return '/admin/dashboard';
    if (user.role === 'AGENT') return '/agent/dashboard';
    return '/customer/dashboard';
  };

  return (
    <div className="landing-layout">
      {/* Navbar */}
      <nav className="landing-navbar">
        <div className="landing-logo" style={{ color: '#818cf8', textShadow: 'none', gap: '0.2rem' }}>
          <span style={{ color: '#818cf8' }}>LastMile</span><span style={{ color: '#fff' }}>US</span>
        </div>
        <div className="landing-nav-links" style={{ gap: '2rem' }}>
          {user ? (
            <>
              <span style={{ color: '#a1a1aa', fontSize: '0.9rem' }}>Welcome, {user.name}</span>
              <Link to={getDashboardLink()} className="btn" style={{ background: '#818cf8', color: '#000', borderRadius: '4px', padding: '0.5rem 1.25rem', fontWeight: 700 }}>Go to Dashboard</Link>
              <button onClick={handleLogout} className="btn btn-outline" style={{ border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '4px', padding: '0.5rem 1.25rem' }}>Sign Out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn" style={{ background: '#818cf8', color: '#000', borderRadius: '4px', padding: '0.5rem 1.25rem', fontWeight: 700 }}>Sign In</Link>
              <Link to="/register" className="btn btn-outline" style={{ border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '4px', padding: '0.5rem 1.25rem' }}>Create Account</Link>
            </>
          )}
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="landing-content">
        
        {/* Top Split Section */}
        <div className="landing-top-section">
          <div className="landing-text-col">
            <div className="badge-outline" style={{ color: '#a855f7', borderColor: 'rgba(168, 85, 247, 0.3)', marginBottom: '1.5rem', display: 'inline-block', padding: '0.25rem 1rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '1px' }}>
              SMART LOGISTICS
            </div>
            <h1 className="landing-headline">
              Next-Gen Last-Mile<br />Delivery Tracking
            </h1>
            <p className="landing-sub-headline">
              An intelligent, automated last-mile logistics platform for LastMileUS. Experience instant zone-based rate calculation, proximity-optimized agent auto-assignment, and an immutable, fully auditable timeline history for every delivery attempt.
            </p>
            <div style={{ marginTop: '2rem' }}>
               <Link to={user ? getDashboardLink() : '/login'} className="btn" style={{ background: '#818cf8', color: '#000', borderRadius: '8px', padding: '0.85rem 2rem', fontSize: '1rem', fontWeight: 700 }}>
                 {user ? 'Go to Dashboard' : 'Get Started'}
               </Link>
            </div>
          </div>

          <div className="landing-visual-col">
            <div className="visual-container" style={{ position: 'relative', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <div style={{
                 width: '300px', height: '300px',
                 borderRadius: '50%',
                 background: 'radial-gradient(circle at 30% 30%, #818cf8, #a855f7, #0f172a)',
                 boxShadow: '0 0 80px rgba(168, 85, 247, 0.4), inset -20px -20px 40px rgba(0,0,0,0.5)',
                 animation: 'float 6s infinite ease-in-out'
               }}></div>
               <div style={{
                 position: 'absolute', width: '400px', height: '400px',
                 borderRadius: '50%', border: '1px solid rgba(168, 85, 247, 0.2)',
                 animation: 'pulse-glow 4s infinite alternate'
               }}></div>
            </div>
          </div>
        </div>

        {/* Bottom Features Section */}
        <div className="landing-features-section">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', marginBottom: '1rem' }}>Built for Modern Operations</h2>
            <p style={{ color: '#a1a1aa', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
              Our core engines automate and verify logistics processes from order placement to final delivery.
            </p>
          </div>
          
          <div className="feature-cards-grid">
            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} glareEnable glareMaxOpacity={0.05}>
              <div className="feature-card-solid">
                <div className="feature-icon-solid">💰</div>
                <h3 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '1rem' }}>Dynamic Pricing Engine</h3>
                <p style={{ color: '#a1a1aa', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Calculates live shipping quotes based on actual vs volumetric weight, pickup/drop zones, B2B/B2C profiles, and COD surcharges with zero hardcoding.
                </p>
              </div>
            </Tilt>

            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} glareEnable glareMaxOpacity={0.05}>
              <div className="feature-card-solid">
                <div className="feature-icon-solid">⚡</div>
                <h3 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '1rem' }}>Intelligent Auto-Assignment</h3>
                <p style={{ color: '#a1a1aa', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Uses geo-distance calculations to instantly match orders with the closest available delivery agent in the pickup zone.
                </p>
              </div>
            </Tilt>

            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} glareEnable glareMaxOpacity={0.05}>
              <div className="feature-card-solid">
                <div className="feature-icon-solid">🔒</div>
                <h3 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '1rem' }}>Immutable Tracking Timeline</h3>
                <p style={{ color: '#a1a1aa', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Every single package status update is logged with a secure timestamp and actor role, rendering a transparent audit timeline.
                </p>
              </div>
            </Tilt>
          </div>
        </div>

        <div style={{ textAlign: 'center', padding: '4rem 0', color: '#52525b', fontSize: '0.85rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          © 2026 LastMileUS. All rights reserved. Built for ultra-fast logistics.
        </div>
      </div>
    </div>
  );
}
