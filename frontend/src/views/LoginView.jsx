import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, Users, Eye as EyeIcon } from 'lucide-react';

export const LoginView = () => {
  const { setIsAuthenticated, switchRole } = useApp();

  const [username, setUsername] = useState('ashmit.baraik');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsAuthenticated(true);
  };

  const handleQuickPersona = (role) => {
    switchRole(role);
    setIsAuthenticated(true);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '460px',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '40px 36px',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
          border: '1px solid #e2e8f0'
        }}
      >
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: '#0b1329',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              boxShadow: '0 4px 14px rgba(11, 19, 41, 0.25)',
              border: '2px solid rgba(245, 158, 11, 0.5)',
              overflow: 'hidden'
            }}
          >
            <img
              src="/aicte-logo.png"
              alt="AICTE Logo"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>
          <div
            style={{
              fontSize: '32px',
              fontWeight: 800,
              letterSpacing: '-0.5px',
              color: '#0f172a'
            }}
          >
            AICTE <span style={{ color: '#1e56d0' }}>OneView</span>
          </div>
          <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
            Integrated Complaint Monitoring & Overlap Prevention System
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <div className="form-group" style={{ marginBottom: '18px' }}>
            <label className="form-label" style={{ color: '#1e293b', fontWeight: 600 }}>
              Email / Username
            </label>
            <div style={{ position: 'relative' }}>
              <User
                size={17}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#94a3b8'
                }}
              />
              <input
                type="text"
                className="form-control"
                style={{ paddingLeft: '38px', height: '42px' }}
                placeholder="Enter your email or username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '18px' }}>
            <label className="form-label" style={{ color: '#1e293b', fontWeight: 600 }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock
                size={17}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#94a3b8'
                }}
              />
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                style={{ paddingLeft: '38px', paddingRight: '38px', height: '42px' }}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#94a3b8'
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Remember me & Forgot Password */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '22px',
              fontSize: '12.5px'
            }}
          >
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#475569' }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ accentColor: '#1e56d0', width: '15px', height: '15px' }}
              />
              Remember me
            </label>
            <a href="#forgot" onClick={(e) => e.preventDefault()} style={{ color: '#1e56d0', textDecoration: 'none', fontWeight: 500 }}>
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary"
            style={{
              width: '100%',
              height: '44px',
              fontSize: '14px',
              fontWeight: 600,
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(30, 86, 208, 0.25)'
            }}
          >
            Login <ArrowRight size={16} />
          </button>
        </form>

        {/* OR Divider */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            margin: '26px 0',
            color: '#94a3b8',
            fontSize: '12px'
          }}
        >
          <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }}></div>
          <span style={{ padding: '0 12px', fontWeight: 600 }}>OR</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }}></div>
        </div>

        {/* Quick Role Selectors from Screenshot 1 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
          <div
            onClick={() => handleQuickPersona('Admin')}
            style={{
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '12px 8px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              backgroundColor: '#ffffff'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#1e56d0')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#e2e8f0')}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#eff6ff',
                color: '#1e56d0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 6px'
              }}
            >
              <ShieldCheck size={16} />
            </div>
            <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#0f172a' }}>Admin</div>
            <div style={{ fontSize: '9.5px', color: '#64748b' }}>(AICTE)</div>
          </div>

          <div
            onClick={() => handleQuickPersona('Bureau Officer')}
            style={{
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '12px 8px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              backgroundColor: '#ffffff'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#1e56d0')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#e2e8f0')}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#ecfdf5',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 6px'
              }}
            >
              <Users size={16} />
            </div>
            <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#0f172a' }}>Bureau/Cell</div>
            <div style={{ fontSize: '9.5px', color: '#64748b' }}>(RB/PGRC)</div>
          </div>

          <div
            onClick={() => handleQuickPersona('Senior Management')}
            style={{
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '12px 8px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              backgroundColor: '#ffffff'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#1e56d0')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#e2e8f0')}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#f3e8ff',
                color: '#7c3aed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 6px'
              }}
            >
              <EyeIcon size={16} />
            </div>
            <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#0f172a' }}>Sr. Management</div>
            <div style={{ fontSize: '9.5px', color: '#64748b' }}>(View Only)</div>
          </div>
        </div>
      </div>
    </div>
  );
};
