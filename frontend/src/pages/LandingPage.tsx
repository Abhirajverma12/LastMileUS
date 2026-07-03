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
            <div className="badge-outline" style={{ color: '#c084fc', borderColor: 'rgba(192, 132, 252, 0.3)', marginBottom: '1.5rem', display: 'inline-block', padding: '0.35rem 1.25rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '1.5px', background: 'rgba(192, 132, 252, 0.05)' }}>
              ✦ SMART LOGISTICS
            </div>
            <h1 className="landing-headline" style={{ 
              fontSize: '4.5rem', 
              fontWeight: 900, 
              lineHeight: 1.1,
              background: 'var(--accent-gradient)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 4px 20px rgba(168, 85, 247, 0.3))'
            }}>
              Next-Gen Last-Mile<br />Delivery Tracking
            </h1>
            <p className="landing-sub-headline" style={{ fontSize: '1.25rem', color: '#a1a1aa', maxWidth: '90%', lineHeight: 1.6, marginTop: '1.5rem' }}>
              An intelligent, automated logistics platform. Experience instant zone-based rate calculation, proximity-optimized agent auto-assignment, and an immutable, fully auditable timeline history for every delivery attempt.
            </p>
            <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1.5rem' }}>
               <Link to={user ? getDashboardLink() : '/login'} className="btn" style={{ 
                 background: 'var(--accent-gradient)', 
                 color: '#fff', 
                 borderRadius: '8px', 
                 padding: '1rem 2.5rem', 
                 fontSize: '1.1rem', 
                 fontWeight: 800,
                 boxShadow: '0 10px 25px rgba(168, 85, 247, 0.4)',
                 border: 'none',
                 transition: 'all 0.3s ease'
               }}>
                 {user ? 'Go to Dashboard →' : 'Get Started Now →'}
               </Link>
            </div>
          </div>

          <div className="landing-visual-col">
            <div className="visual-container" style={{ position: 'relative', height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', perspective: '1000px' }}>
               
               {/* Background Glow */}
               <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 60%)', animation: 'pulse-glow 6s infinite alternate', zIndex: 0 }}></div>
               
               {/* Floating Dashboard Card 1 (Top Right) */}
               <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15} scale={1.05} style={{ position: 'absolute', zIndex: 10, right: '5%', top: '10%' }}>
                 <div style={{ width: '280px', background: 'rgba(15,15,20,0.7)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '1.5rem', boxShadow: '0 20px 40px rgba(0,0,0,0.6)' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                     <span style={{ color: '#a1a1aa', fontSize: '0.85rem', fontWeight: 600 }}>Active Agents</span>
                     <span style={{ color: '#10b981', fontSize: '0.85rem', fontWeight: 700 }}>● Live</span>
                   </div>
                   <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#fff' }}>124</div>
                   <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', marginTop: '1rem', overflow: 'hidden' }}>
                     <div style={{ width: '75%', height: '100%', background: 'linear-gradient(90deg, #6366f1, #c084fc)' }}></div>
                   </div>
                 </div>
               </Tilt>

               {/* Floating Dashboard Card 2 (Bottom Left) */}
               <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15} scale={1.05} style={{ position: 'absolute', zIndex: 15, left: '0%', bottom: '15%' }}>
                 <div style={{ width: '340px', background: 'rgba(20,20,28,0.85)', backdropFilter: 'blur(30px)', border: '1px solid rgba(168,85,247,0.3)', borderRadius: '20px', padding: '1.75rem', boxShadow: '0 30px 60px rgba(0,0,0,0.8), 0 0 30px rgba(168,85,247,0.15)' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                     <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(168,85,247,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', border: '1px solid rgba(168,85,247,0.3)' }}>📦</div>
                     <div>
                        <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.2rem' }}>Order #TRK-982</div>
                        <div style={{ color: '#a1a1aa', fontSize: '0.85rem' }}>Auto-assigned (0.2km away)</div>
                     </div>
                   </div>
                   <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem' }}>
                      <div style={{ flex: 1, height: '40px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}></div>
                      <div style={{ flex: 2, height: '40px', background: 'rgba(168,85,247,0.1)', borderRadius: '8px', border: '1px solid rgba(168,85,247,0.2)' }}></div>
                   </div>
                 </div>
               </Tilt>

               {/* Central Abstract Ring */}
               <div style={{ position: 'absolute', zIndex: 5, width: '300px', height: '300px', borderRadius: '50%', border: '2px dashed rgba(99, 102, 241, 0.3)', animation: 'spin 20s linear infinite' }}></div>
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
