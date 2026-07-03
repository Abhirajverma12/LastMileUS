import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Transport3D from '../components/common/Transport3D';
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
            <div className="badge-outline" style={{ color: '#c084fc', borderColor: 'rgba(192, 132, 252, 0.3)', marginBottom: '1.5rem', display: 'inline-block', padding: '0.35rem 1.25rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '1.5px', background: 'rgba(192, 132, 252, 0.05)' }}>
              ✦ GLOBAL LOGISTICS HUB
            </div>
            <h1 className="landing-headline" style={{ 
              fontWeight: 900, 
              lineHeight: 1.1,
              background: 'var(--accent-gradient)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 4px 20px rgba(168, 85, 247, 0.3))'
            }}>
              Enterprise Transport<br />& Fleet Management
            </h1>
            <p className="landing-sub-headline" style={{ color: '#a1a1aa', lineHeight: 1.6, marginTop: '1.5rem' }}>
              Empower your supply chain with our state-of-the-art dispatch platform. Accelerate delivery speeds, optimize import/export routes, and gain real-time visibility across your entire global operations network.
            </p>
            <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
               <Link to={user ? getDashboardLink() : '/login'} className="btn" style={{ 
                 background: 'var(--accent-gradient)', 
                 color: '#fff', 
                 borderRadius: '8px', 
                 padding: '1rem 2.5rem', 
                 fontSize: '1.1rem', 
                 fontWeight: 800,
                 boxShadow: '0 10px 25px rgba(168, 85, 247, 0.4)',
                 border: 'none',
                 transition: 'all 0.3s ease',
                 width: '100%',
                 textAlign: 'center',
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'center'
               }}>
                 {user ? 'Launch Hub →' : 'Start Managing Operations →'}
               </Link>
            </div>
          </div>

          <div className="landing-visual-col">
            <div className="visual-container" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', perspective: '1000px' }}>
               
               {/* Background Glow */}
               <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '100%', background: 'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)', animation: 'pulse-glow 6s infinite alternate', zIndex: 0 }}></div>
               
               {/* 3D Transport Model */}
               <div style={{ width: '100%', height: '100%', position: 'relative', zIndex: 10 }}>
                 <Transport3D />
               </div>
               
            </div>
          </div>
        </div>

        {/* Bottom Features Section */}
        <div className="landing-features-section">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', marginBottom: '1rem' }}>Engineered for Scale</h2>
            <p style={{ color: '#a1a1aa', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
              Designed to handle thousands of concurrent import, export, and transit workflows effortlessly.
            </p>
          </div>
          
          <div className="feature-cards-grid">
            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} glareEnable glareMaxOpacity={0.05}>
              <div className="feature-card-solid">
                <div className="feature-icon-solid">🗺️</div>
                <h3 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '1rem' }}>Algorithmic Route Optimization</h3>
                <p style={{ color: '#a1a1aa', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Instantly computes the most efficient transit paths based on real-time traffic data, regional topology, and vehicle proximity to minimize overhead.
                </p>
              </div>
            </Tilt>

            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} glareEnable glareMaxOpacity={0.05}>
              <div className="feature-card-solid">
                <div className="feature-icon-solid">🤖</div>
                <h3 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '1rem' }}>Automated Fleet Dispatch</h3>
                <p style={{ color: '#a1a1aa', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Eliminate manual oversight. Our engine autonomously pairs high-priority consignments with the optimal agents for maximum fulfillment speed.
                </p>
              </div>
            </Tilt>

            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} glareEnable glareMaxOpacity={0.05}>
              <div className="feature-card-solid">
                <div className="feature-icon-solid">🛡️</div>
                <h3 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '1rem' }}>Cryptographic Audit Trails</h3>
                <p style={{ color: '#a1a1aa', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Every cargo scan, transit update, and proof-of-delivery is securely logged via an append-only architecture, ensuring absolute transparency.
                </p>
              </div>
            </Tilt>
          </div>
        </div>

        <div style={{ textAlign: 'center', padding: '4rem 0', color: '#52525b', fontSize: '0.85rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          © 2026 LastMileUS Global Logistics. All rights reserved.
        </div>
      </div>
    </div>
  );
}
