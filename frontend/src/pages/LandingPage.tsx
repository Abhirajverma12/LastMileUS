import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
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
    <div className="landing-layout" style={{ background: '#0a0a0c', minHeight: '100vh', overflowX: 'hidden', fontFamily: '"Inter", sans-serif' }}>
      {/* Navbar */}
      <nav className="landing-navbar" style={{ 
        position: 'absolute', 
        top: 0, 
        width: '100%', 
        padding: '1.5rem 4rem', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        zIndex: 50,
        background: 'rgba(10, 10, 12, 0.8)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div className="landing-logo" style={{ fontSize: '1.5rem', fontWeight: 900, display: 'flex', gap: '0.2rem' }}>
          <span style={{ color: 'var(--accent-primary)' }}>LastMile</span><span style={{ color: '#fff' }}>US</span>
        </div>
        <div className="landing-nav-links" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {user ? (
            <>
              <span style={{ color: '#a1a1aa', fontSize: '0.9rem' }}>Welcome, {user.name}</span>
              <Link to={getDashboardLink()} className="btn" style={{ background: 'var(--accent-primary)', color: '#000', borderRadius: '6px', padding: '0.6rem 1.5rem', fontWeight: 700 }}>Go to Dashboard</Link>
              <button onClick={handleLogout} className="btn btn-outline" style={{ border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px', padding: '0.6rem 1.5rem' }}>Sign Out</button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ color: '#fff', fontWeight: 600, textDecoration: 'none' }}>Log In</Link>
              <Link to="/register" className="btn" style={{ background: 'var(--accent-primary)', color: '#000', borderRadius: '6px', padding: '0.6rem 1.5rem', fontWeight: 700 }}>Get Started</Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="landing-hero" style={{ 
        textAlign: 'center', 
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {/* Background Gradients */}
        <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)', width: '800px', height: '500px', background: 'radial-gradient(ellipse, rgba(234, 179, 8, 0.15) 0%, transparent 70%)', zIndex: 0 }}></div>
        
        <div className="badge-outline" style={{ position: 'relative', zIndex: 1, color: 'var(--accent-primary)', borderColor: 'rgba(234, 179, 8, 0.3)', marginBottom: '2rem', display: 'inline-block', padding: '0.4rem 1.5rem', borderRadius: '999px', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1px', background: 'rgba(234, 179, 8, 0.1)' }}>
          ✦ THE FUTURE OF GLOBAL LOGISTICS
        </div>
        
        <h1 style={{ 
          position: 'relative', zIndex: 1,
          fontSize: '4.5rem', 
          fontWeight: 900, 
          lineHeight: 1.1,
          maxWidth: '1000px',
          marginBottom: '2rem',
          color: '#fff',
          letterSpacing: '-1px'
        }}>
          Intelligent routing for <br />
          <span style={{ 
            background: 'linear-gradient(to right, #eab308, #f59e0b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>modern delivery fleets.</span>
        </h1>
        
        <p style={{ position: 'relative', zIndex: 1, color: '#a1a1aa', fontSize: '1.25rem', maxWidth: '700px', lineHeight: 1.6, marginBottom: '3rem' }}>
          LastMileUS orchestrates your entire supply chain. Automate dispatch, track agents in real-time, and delight your customers with predictable delivery windows.
        </p>
        
        <div className="hero-buttons" style={{ position: 'relative', zIndex: 1, display: 'flex', gap: '1.5rem' }}>
           <Link to={user ? getDashboardLink() : '/register'} className="btn" style={{ 
             background: 'var(--accent-primary)', 
             color: '#000', 
             borderRadius: '8px', 
             padding: '1rem 2.5rem', 
             fontSize: '1.1rem', 
             fontWeight: 700,
             boxShadow: '0 10px 25px rgba(234, 179, 8, 0.3)',
             border: 'none',
             transition: 'transform 0.2s ease'
           }}>
             {user ? 'Launch Hub →' : 'Start Free Trial →'}
           </Link>
           <Link to="#features" className="btn btn-outline" style={{ 
             background: 'rgba(255,255,255,0.03)', 
             color: '#fff', 
             borderRadius: '8px', 
             padding: '1rem 2.5rem', 
             fontSize: '1.1rem', 
             fontWeight: 600,
             border: '1px solid rgba(255,255,255,0.1)'
           }}>
             Explore Platform
           </Link>
        </div>

        {/* Dashboard Mockup Showcase */}
        <div style={{ marginTop: '5rem', position: 'relative', zIndex: 10, width: '100%', maxWidth: '1100px', perspective: '1000px' }}>
          <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} transitionSpeed={2000}>
            <div style={{ 
              background: '#141419', 
              borderRadius: '16px', 
              border: '1px solid rgba(255,255,255,0.1)', 
              padding: '1rem',
              boxShadow: '0 30px 60px -15px rgba(0,0,0,1), 0 0 40px rgba(234,179,8,0.15)'
            }}>
              {/* Fake UI Header */}
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', paddingLeft: '0.5rem' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#eab308' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#22c55e' }}></div>
              </div>
              {/* Fake UI Body */}
              <div className="mock-ui-grid" style={{ height: '500px' }}>
                <div className="mock-sidebar" style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '8px', padding: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                  {/* Fake Profile */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 'bold', fontSize: '0.8rem' }}>LM</div>
                    <div>
                      <div style={{ width: '80px', height: '8px', background: 'rgba(255,255,255,0.4)', borderRadius: '4px', marginBottom: '4px' }}></div>
                      <div style={{ width: '50px', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}></div>
                    </div>
                  </div>
                  {/* Fake Menu Items */}
                  <div style={{ height: '24px', width: '90%', background: 'rgba(234,179,8,0.15)', borderRadius: '6px', borderLeft: '3px solid var(--accent-primary)', display: 'flex', alignItems: 'center', paddingLeft: '0.5rem' }}>
                    <div style={{ width: '60%', height: '8px', background: 'var(--accent-primary)', borderRadius: '4px' }}></div>
                  </div>
                  <div style={{ height: '24px', width: '80%', background: 'rgba(255,255,255,0.03)', borderRadius: '6px', display: 'flex', alignItems: 'center', paddingLeft: '0.8rem' }}>
                    <div style={{ width: '50%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}></div>
                  </div>
                  <div style={{ height: '24px', width: '85%', background: 'rgba(255,255,255,0.03)', borderRadius: '6px', display: 'flex', alignItems: 'center', paddingLeft: '0.8rem' }}>
                    <div style={{ width: '70%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}></div>
                  </div>
                  <div style={{ height: '24px', width: '75%', background: 'rgba(255,255,255,0.03)', borderRadius: '6px', display: 'flex', alignItems: 'center', paddingLeft: '0.8rem' }}>
                    <div style={{ width: '40%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}></div>
                  </div>
                  
                  {/* Fake System Status */}
                  <div style={{ marginTop: 'auto', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e' }}></div>
                      <div style={{ width: '60%', height: '8px', background: '#22c55e', borderRadius: '4px' }}></div>
                    </div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {/* Top Metric Cards */}
                  <div className="mock-top-metrics" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                    
                    {/* Card 1: Active Agents */}
                    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '1.2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(234,179,8,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                        </div>
                        <span style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold' }}>+12%</span>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.85rem', color: '#a1a1aa', marginTop: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Active Agents</div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fff' }}>1,248</div>
                      </div>
                    </div>

                    {/* Card 2: Deliveries Today */}
                    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '1.2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                        </div>
                        <span style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold' }}>+8%</span>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.85rem', color: '#a1a1aa', marginTop: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Completed Today</div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fff' }}>4,920</div>
                      </div>
                    </div>

                    {/* Card 3: Avg Success Rate */}
                    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '1.2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(236,72,153,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f472b6" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                        </div>
                        <span style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold' }}>Optimal</span>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.85rem', color: '#a1a1aa', marginTop: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Success Rate</div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fff' }}>99.2%</div>
                      </div>
                    </div>
                  </div>
                  <div className="mock-map-container" style={{ flex: 1, background: '#0a0a0c', borderRadius: '12px', position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', boxShadow: 'inset 0 0 40px rgba(0,0,0,0.8)' }}>
                     <style>
                       {`
                         @keyframes mapDash {
                           to { stroke-dashoffset: -24; }
                         }
                         @keyframes mapPulse {
                           0% { transform: scale(1); opacity: 0.8; }
                           100% { transform: scale(2.5); opacity: 0; }
                         }
                       `}
                     </style>
                     
                     {/* Elegant Dot Matrix Background */}
                     <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '20px 20px', opacity: 0.5 }}></div>
                     
                     {/* Glowing Ambient Core */}
                     <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '80%', background: 'radial-gradient(circle, rgba(234,179,8,0.12) 0%, transparent 60%)', filter: 'blur(30px)' }}></div>

                     {/* Fake Route Lines */}
                     <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                       <defs>
                         <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                           <stop offset="0%" stopColor="rgba(234,179,8,0)" />
                           <stop offset="40%" stopColor="var(--accent-primary)" />
                           <stop offset="100%" stopColor="#f59e0b" />
                         </linearGradient>
                         <filter id="mapGlow">
                           <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
                           <feMerge>
                             <feMergeNode in="coloredBlur"/>
                             <feMergeNode in="SourceGraphic"/>
                           </feMerge>
                         </filter>
                       </defs>
                       
                       {/* Background Subtle Routes */}
                       <path d="M50,100 C200,50 300,250 500,200 S700,300 850,100" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="3" />
                       <path d="M-50,300 C150,350 250,150 400,200 S600,50 750,150" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="3" />

                       {/* Main Active Route */}
                       <path d="M100,300 C250,120 400,380 650,200" fill="none" stroke="url(#routeGrad)" strokeWidth="5" strokeDasharray="12,12" style={{ animation: 'mapDash 1.5s linear infinite' }} filter="url(#mapGlow)" />
                       
                       {/* Origin Node */}
                       <circle cx="100" cy="300" r="7" fill="#fff" />
                       <circle cx="100" cy="300" r="14" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />

                       {/* Destination Node with Pulse */}
                       <g style={{ transformOrigin: '650px 200px' }}>
                         <circle cx="650" cy="200" r="9" fill="var(--accent-primary)" filter="url(#mapGlow)" />
                         <circle cx="650" cy="200" r="24" fill="none" stroke="var(--accent-primary)" strokeWidth="3" style={{ animation: 'mapPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
                         <circle cx="650" cy="200" r="16" fill="none" stroke="var(--accent-primary)" strokeWidth="1" style={{ animation: 'mapPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite 1s' }} />
                       </g>
                       
                       {/* Moving Vehicle Node */}
                       <circle cx="430" cy="265" r="6" fill="#fff" filter="url(#mapGlow)" />
                     </svg>

                     {/* Floating UI Pill over the map */}
                     <div className="mock-floating-pill" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(10,10,12,0.85)', border: '1px solid rgba(234,179,8,0.5)', borderRadius: '999px', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.6rem', backdropFilter: 'blur(8px)', boxShadow: '0 10px 20px rgba(0,0,0,0.5), 0 0 15px rgba(234,179,8,0.2)' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#eab308', boxShadow: '0 0 10px #eab308' }}></div>
                        <span style={{ color: '#fff', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.5px' }}>AGENT IN TRANSIT</span>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </Tilt>
        </div>
      </section>

      {/* Metrics Banner */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)', padding: '4rem 2rem' }}>
        <div className="metrics-grid" style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>1M+</div>
            <div style={{ color: '#a1a1aa', fontWeight: 600 }}>Deliveries Tracked</div>
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>99.9%</div>
            <div style={{ color: '#a1a1aa', fontWeight: 600 }}>System Uptime</div>
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>15k+</div>
            <div style={{ color: '#a1a1aa', fontWeight: 600 }}>Active Agents</div>
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>45</div>
            <div style={{ color: '#a1a1aa', fontWeight: 600 }}>Countries Served</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ padding: '8rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 900, color: '#fff', marginBottom: '1.5rem' }}>Engineered for <span style={{ color: 'var(--accent-primary)' }}>Scale</span></h2>
          <p style={{ color: '#a1a1aa', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
            Designed to handle thousands of concurrent import, export, and transit workflows effortlessly with military-grade precision.
          </p>
        </div>
        
        <div className="features-grid" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Feature 1 */}
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '3rem 2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', transition: 'transform 0.3s ease, border-color 0.3s ease' }} onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--accent-primary)'} onMouseOut={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>🗺️</div>
            <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '1rem', fontWeight: 800 }}>Algorithmic Routing</h3>
            <p style={{ color: '#a1a1aa', lineHeight: 1.6 }}>Instantly computes the most efficient transit paths based on real-time traffic data, regional topology, and vehicle proximity to minimize overhead.</p>
          </div>
          {/* Feature 2 */}
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '3rem 2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', transition: 'transform 0.3s ease, border-color 0.3s ease' }} onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--accent-primary)'} onMouseOut={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>🤖</div>
            <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '1rem', fontWeight: 800 }}>Automated Dispatch</h3>
            <p style={{ color: '#a1a1aa', lineHeight: 1.6 }}>Eliminate manual oversight. Our engine autonomously pairs high-priority consignments with the optimal agents for maximum fulfillment speed.</p>
          </div>
          {/* Feature 3 */}
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '3rem 2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', transition: 'transform 0.3s ease, border-color 0.3s ease' }} onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--accent-primary)'} onMouseOut={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>🛡️</div>
            <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '1rem', fontWeight: 800 }}>Cryptographic Logs</h3>
            <p style={{ color: '#a1a1aa', lineHeight: 1.6 }}>Every cargo scan, transit update, and proof-of-delivery is securely logged via an append-only architecture, ensuring absolute transparency.</p>
          </div>
        </div>
      </section>

      {/* How it Works Workflow */}
      <section style={{ padding: '6rem 2rem', background: 'linear-gradient(to bottom, rgba(234,179,8,0.05), transparent)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: 900, color: '#fff', marginBottom: '1.5rem' }}>How it Works</h2>
          </div>
          <div className="workflow-grid" style={{ position: 'relative' }}>
            {/* Connecting Line */}
            <div style={{ position: 'absolute', top: '3rem', left: '10%', right: '10%', height: '2px', background: 'rgba(255,255,255,0.1)', zIndex: 0 }}></div>
            
            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
              <div style={{ width: '6rem', height: '6rem', borderRadius: '50%', background: '#141419', border: '2px solid var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto 2rem', color: 'var(--accent-primary)' }}>1</div>
              <h3 style={{ color: '#fff', fontSize: '1.3rem', marginBottom: '1rem' }}>Ingest & Route</h3>
              <p style={{ color: '#a1a1aa', lineHeight: 1.6 }}>Orders flow into the system and are automatically assigned the most efficient delivery paths.</p>
            </div>
            
            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
              <div style={{ width: '6rem', height: '6rem', borderRadius: '50%', background: '#141419', border: '2px solid var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto 2rem', color: 'var(--accent-primary)' }}>2</div>
              <h3 style={{ color: '#fff', fontSize: '1.3rem', marginBottom: '1rem' }}>Smart Dispatch</h3>
              <p style={{ color: '#a1a1aa', lineHeight: 1.6 }}>Agents are pinged via the mobile dashboard to accept and fulfill the delivery orders.</p>
            </div>

            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
              <div style={{ width: '6rem', height: '6rem', borderRadius: '50%', background: '#141419', border: '2px solid var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto 2rem', color: 'var(--accent-primary)' }}>3</div>
              <h3 style={{ color: '#fff', fontSize: '1.3rem', marginBottom: '1rem' }}>Track & Deliver</h3>
              <p style={{ color: '#a1a1aa', lineHeight: 1.6 }}>Customers view live GPS tracking while agents securely upload proof of delivery.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '8rem 2rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.2), rgba(20,20,25,1))', padding: '5rem 3rem', borderRadius: '24px', border: '1px solid rgba(234, 179, 8, 0.3)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 900, color: '#fff', marginBottom: '1.5rem' }}>Ready to optimize your fleet?</h2>
          <p style={{ color: '#a1a1aa', fontSize: '1.2rem', marginBottom: '3rem' }}>Join the thousands of logistics companies utilizing LastMileUS to revolutionize their supply chains.</p>
          <Link to="/register" className="btn" style={{ 
             background: 'var(--accent-primary)', 
             color: '#000', 
             borderRadius: '8px', 
             padding: '1.2rem 3rem', 
             fontSize: '1.2rem', 
             fontWeight: 800,
             display: 'inline-block'
           }}>
             Create Free Account
           </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '4rem 2rem 2rem', background: '#050505' }}>
        <div className="footer-grid" style={{ maxWidth: '1200px', margin: '0 auto', marginBottom: '4rem' }}>
          <div>
            <div className="landing-logo" style={{ fontSize: '1.5rem', fontWeight: 900, display: 'flex', gap: '0.2rem', marginBottom: '1.5rem' }}>
              <span style={{ color: 'var(--accent-primary)' }}>LastMile</span><span style={{ color: '#fff' }}>US</span>
            </div>
            <p style={{ color: '#71717a', lineHeight: 1.6 }}>The premier intelligent routing and fleet management platform for modern logistics.</p>
          </div>
          <div>
            <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: '1.5rem' }}>Platform</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li><Link to="#" style={{ color: '#71717a', textDecoration: 'none' }}>Dispatch</Link></li>
              <li><Link to="#" style={{ color: '#71717a', textDecoration: 'none' }}>Routing</Link></li>
              <li><Link to="#" style={{ color: '#71717a', textDecoration: 'none' }}>Tracking</Link></li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: '1.5rem' }}>Company</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li><Link to="#" style={{ color: '#71717a', textDecoration: 'none' }}>About</Link></li>
              <li><Link to="#" style={{ color: '#71717a', textDecoration: 'none' }}>Careers</Link></li>
              <li><Link to="#" style={{ color: '#71717a', textDecoration: 'none' }}>Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: '1.5rem' }}>Legal</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li><Link to="#" style={{ color: '#71717a', textDecoration: 'none' }}>Privacy</Link></li>
              <li><Link to="#" style={{ color: '#71717a', textDecoration: 'none' }}>Terms</Link></li>
            </ul>
          </div>
        </div>
        <div style={{ textAlign: 'center', color: '#52525b', fontSize: '0.9rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          © 2026 LastMileUS Global Logistics. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
