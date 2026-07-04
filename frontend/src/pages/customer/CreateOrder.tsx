import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../api/client';
import { ApiResponse, ChargeBreakdown } from '../../types';

const PRESET_ADDRESSES = [
  "Central Hub, Block A, Connaught Place, New Delhi (North Zone)",
  "South Warehouse, 4th Block, Koramangala, Bangalore (South Zone)",
];

const PRESET_PACKAGES = [
  { label: 'Small Box', length: '10', breadth: '10', height: '10', weight: '1' },
  { label: 'Medium Box', length: '20', breadth: '20', height: '20', weight: '5' },
  { label: 'Large Box', length: '50', breadth: '50', height: '50', weight: '15' },
];

export default function CreateOrder() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isAdmin = user?.role === 'ADMIN';
  const [form, setForm] = useState({
    pickupAddress: '', pickupArea: '', pickupPincode: '',
    dropAddress: '', dropArea: '', dropPincode: '',
    length: '', breadth: '', height: '', actualWeight: '',
    orderType: 'B2C', paymentType: 'PREPAID', customerId: '',
  });
  const [charges, setCharges] = useState<ChargeBreakdown | null>(null);
  const [loading, setLoading] = useState(false);
  const [calcLoading, setCalcLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [areas, setAreas] = useState<any[]>([]);

  useEffect(() => {
    api.get<ApiResponse<any[]>>('/areas')
      .then(res => setAreas(res.data || []))
      .catch(err => console.error('Failed to load areas:', err));
  }, []);

  const update = (key: string, val: string) => {
    setForm(f => ({ ...f, [key]: val }));
    setCharges(null); // Reset charges on form change
  };

  const calculateCharges = async () => {
    setError('');
    setCalcLoading(true);
    try {
      const res = await api.post<ApiResponse<ChargeBreakdown>>('/orders/calculate', {
        pickupArea: form.pickupArea, pickupPincode: form.pickupPincode,
        dropArea: form.dropArea, dropPincode: form.dropPincode,
        length: parseFloat(form.length), breadth: parseFloat(form.breadth),
        height: parseFloat(form.height), actualWeight: parseFloat(form.actualWeight),
        orderType: form.orderType, paymentType: form.paymentType,
      });
      setCharges(res.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setCalcLoading(false);
    }
  };

  const confirmOrder = async () => {
    setError('');
    setLoading(true);
    try {
      const body: any = {
        pickupAddress: form.pickupAddress, pickupArea: form.pickupArea, pickupPincode: form.pickupPincode,
        dropAddress: form.dropAddress, dropArea: form.dropArea, dropPincode: form.dropPincode,
        length: parseFloat(form.length), breadth: parseFloat(form.breadth),
        height: parseFloat(form.height), actualWeight: parseFloat(form.actualWeight),
        orderType: form.orderType, paymentType: form.paymentType,
      };
      if (isAdmin && form.customerId) body.customerId = form.customerId;

      const res = await api.post<ApiResponse<any>>('/orders', body);
      setSuccess(`Order created! Tracking ID: ${res.data.trackingId}`);
      setTimeout(() => navigate(isAdmin ? `/admin/orders/${res.data.id}` : `/customer/orders/${res.data.id}`), 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const canCalculate = form.pickupArea && form.pickupPincode && form.dropArea && form.dropPincode &&
    form.length && form.breadth && form.height && form.actualWeight;

  if (charges) {
    return (
      <div className="page">
        <div className="page-header">
          <h1>Review & Confirm Order</h1>
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="glass-card" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>Order Summary</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
            <div>
              <h4 style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>Pickup Details</h4>
              <p style={{ color: '#a1a1aa' }}>{form.pickupAddress}</p>
              <p style={{ color: '#a1a1aa' }}>{form.pickupArea} - {form.pickupPincode}</p>
            </div>
            <div>
              <h4 style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>Drop Details</h4>
              <p style={{ color: '#a1a1aa' }}>{form.dropAddress}</p>
              <p style={{ color: '#a1a1aa' }}>{form.dropArea} - {form.dropPincode}</p>
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>💰 Charge Breakdown</h3>
            <div className="charge-grid" style={{ gridTemplateColumns: '1fr', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px dashed rgba(255,255,255,0.1)' }}>
                <span>Route Zone</span>
                <span className="badge badge-outline">{charges.zoneType.replace('_', ' ')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px dashed rgba(255,255,255,0.1)' }}>
                <span>Billable Weight</span>
                <span><strong>{charges.billableWeight} kg</strong></span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px dashed rgba(255,255,255,0.1)' }}>
                <span>Base Charge</span>
                <span>₹{charges.baseCharge.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px dashed rgba(255,255,255,0.1)' }}>
                <span>Weight Charge</span>
                <span>₹{charges.weightCharge.toFixed(2)}</span>
              </div>
              {charges.codSurcharge > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px dashed rgba(255,255,255,0.1)' }}>
                  <span>COD Surcharge</span>
                  <span>₹{charges.codSurcharge.toFixed(2)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '1rem', marginTop: '0.5rem', fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--accent-primary)' }}>
                <span>Total Payable Amount</span>
                <span>₹{charges.totalCharge.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn btn-secondary" onClick={() => setCharges(null)} disabled={loading} style={{ flex: 1 }}>
              Back to Edit
            </button>
            <button className="btn btn-primary" onClick={confirmOrder} disabled={loading} style={{ flex: 2 }}>
              {loading ? 'Creating Order...' : '✅ Confirm & Create Order'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-header"><h1>{isAdmin ? 'Create Order (Admin)' : 'Create New Order'}</h1></div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div style={{ background: 'rgba(255,200,0,0.05)', border: '1px solid rgba(255,200,0,0.2)', padding: '1rem 1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
        <p style={{ color: '#fff', marginBottom: '0.5rem', fontSize: '1rem' }}><strong>📍 Sample addresses (from seed data)</strong></p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
          <div>
            <span style={{ color: '#fff' }}>Central Hub, Block A, Connaught Place, New Delhi (North Zone)</span>
          </div>
          <div>
            <span style={{ color: '#fff' }}>South Warehouse, 4th Block, Koramangala, Bangalore (South Zone)</span>
          </div>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', marginTop: '0.75rem', fontStyle: 'italic' }}>
          💡 Tip: Selecting these addresses from the dropdown will automatically fill the Area and Pincode!
        </p>
      </div>


      <div className="form-grid">
        <div className="form-section glass-card">
          <h3>📍 Pickup Details</h3>
          <div className="form-group">
            <label>Select Pickup Address</label>
            <select 
              value={PRESET_ADDRESSES.includes(form.pickupAddress) ? form.pickupAddress : (form.pickupAddress === '' ? '' : 'Custom')}
              onChange={e => {
                const val = e.target.value;
                if (val !== 'Custom') {
                  update('pickupAddress', val);
                  const matchedArea = areas.find(a => val.includes(a.name));
                  if (matchedArea) {
                    // Have to use setForm directly because multiple update() calls in same tick might overwrite state
                    setForm(f => ({ ...f, pickupAddress: val, pickupArea: matchedArea.name, pickupPincode: matchedArea.pincode }));
                    setCharges(null);
                  }
                } else {
                  setForm(f => ({ ...f, pickupAddress: ' ', pickupArea: '', pickupPincode: '' }));
                  setCharges(null);
                }
              }}
              required
            >
              <option value="" disabled>-- Choose a predefined address --</option>
              {PRESET_ADDRESSES.map(addr => <option key={addr} value={addr}>{addr}</option>)}
              <option value="Custom">Custom Address...</option>
            </select>
            {(!PRESET_ADDRESSES.includes(form.pickupAddress) && form.pickupAddress !== '') ? (
              <input 
                style={{ marginTop: '0.5rem' }}
                value={form.pickupAddress.trim()} 
                onChange={e => update('pickupAddress', e.target.value)} 
                placeholder="Type full custom pickup address" 
                required 
              />
            ) : null}
          </div>
          <div className="form-row">
            <div className="form-group" style={{ flex: 2 }}>
              <label>Select Pickup Area</label>
              <select 
                value={form.pickupArea} 
                onChange={e => {
                  const area = areas.find(a => a.name === e.target.value);
                  update('pickupArea', area?.name || '');
                  update('pickupPincode', area?.pincode || '');
                }} 
                required
              >
                <option value="" disabled>-- Choose a predefined zone --</option>
                {areas.map(a => (
                  <option key={a.id} value={a.name}>{a.name} - {a.pincode}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Pincode (Auto-filled)</label>
              <input value={form.pickupPincode} readOnly style={{ opacity: 0.7, cursor: 'not-allowed' }} />
            </div>
          </div>
        </div>

        <div className="form-section glass-card">
          <h3>📍 Drop Details</h3>
          <div className="form-group">
            <label>Select Drop Address</label>
            <select 
              value={PRESET_ADDRESSES.includes(form.dropAddress) ? form.dropAddress : (form.dropAddress === '' ? '' : 'Custom')}
              onChange={e => {
                const val = e.target.value;
                if (val !== 'Custom') {
                  update('dropAddress', val);
                  const matchedArea = areas.find(a => val.includes(a.name));
                  if (matchedArea) {
                    setForm(f => ({ ...f, dropAddress: val, dropArea: matchedArea.name, dropPincode: matchedArea.pincode }));
                    setCharges(null);
                  }
                } else {
                  setForm(f => ({ ...f, dropAddress: ' ', dropArea: '', dropPincode: '' }));
                  setCharges(null);
                }
              }}
              required
            >
              <option value="" disabled>-- Choose a predefined address --</option>
              {PRESET_ADDRESSES.map(addr => <option key={addr} value={addr}>{addr}</option>)}
              <option value="Custom">Custom Address...</option>
            </select>
            {(!PRESET_ADDRESSES.includes(form.dropAddress) && form.dropAddress !== '') ? (
              <input 
                style={{ marginTop: '0.5rem' }}
                value={form.dropAddress.trim()} 
                onChange={e => update('dropAddress', e.target.value)} 
                placeholder="Type full custom drop address" 
                required 
              />
            ) : null}
          </div>
          <div className="form-row">
            <div className="form-group" style={{ flex: 2 }}>
              <label>Select Drop Area</label>
              <select 
                value={form.dropArea} 
                onChange={e => {
                  const area = areas.find(a => a.name === e.target.value);
                  update('dropArea', area?.name || '');
                  update('dropPincode', area?.pincode || '');
                }} 
                required
              >
                <option value="" disabled>-- Choose a predefined zone --</option>
                {areas.map(a => (
                  <option key={a.id} value={a.name}>{a.name} - {a.pincode}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Pincode (Auto-filled)</label>
              <input value={form.dropPincode} readOnly style={{ opacity: 0.7, cursor: 'not-allowed' }} />
            </div>
          </div>
        </div>

        <div className="form-section glass-card">
          <h3>📐 Package Dimensions (cm) & Weight (kg)</h3>
          
          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label>Select Package Preset</label>
            <select onChange={e => {
              const pkg = PRESET_PACKAGES.find(p => p.label === e.target.value);
              if (pkg) {
                update('length', pkg.length);
                update('breadth', pkg.breadth);
                update('height', pkg.height);
                update('actualWeight', pkg.weight);
              } else if (e.target.value === 'Custom') {
                update('length', '');
                update('breadth', '');
                update('height', '');
                update('actualWeight', '');
              }
            }}>
              <option value="">-- Choose preset size --</option>
              {PRESET_PACKAGES.map(p => <option key={p.label} value={p.label}>{p.label} ({p.weight}kg)</option>)}
              <option value="Custom">Custom Size...</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group"><label>Length</label><input type="number" value={form.length} onChange={e => update('length', e.target.value)} placeholder="cm" min="0.1" step="0.1" required /></div>
            <div className="form-group"><label>Breadth</label><input type="number" value={form.breadth} onChange={e => update('breadth', e.target.value)} placeholder="cm" min="0.1" step="0.1" required /></div>
            <div className="form-group"><label>Height</label><input type="number" value={form.height} onChange={e => update('height', e.target.value)} placeholder="cm" min="0.1" step="0.1" required /></div>
            <div className="form-group"><label>Actual Weight</label><input type="number" value={form.actualWeight} onChange={e => update('actualWeight', e.target.value)} placeholder="kg" min="0.1" step="0.1" required /></div>
          </div>
        </div>

        <div className="form-section glass-card">
          <h3>⚙️ Order Configuration</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Order Type</label>
              <div className="radio-group">
                {['B2B', 'B2C'].map(t => (
                  <label key={t} className={`radio-card ${form.orderType === t ? 'active' : ''}`}>
                    <input type="radio" name="orderType" value={t} checked={form.orderType === t} onChange={e => update('orderType', e.target.value)} />
                    <span>{t}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label>Payment Type</label>
              <div className="radio-group">
                {['PREPAID', 'COD'].map(t => (
                  <label key={t} className={`radio-card ${form.paymentType === t ? 'active' : ''}`}>
                    <input type="radio" name="paymentType" value={t} checked={form.paymentType === t} onChange={e => update('paymentType', e.target.value)} />
                    <span>{t}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          {isAdmin && (
            <div className="form-group">
              <label>Customer ID (Admin: order on behalf)</label>
              <input value={form.customerId} onChange={e => update('customerId', e.target.value)} placeholder="Customer UUID" />
            </div>
          )}
        </div>
      </div>

      <div className="action-bar">
        <button className="btn btn-secondary" onClick={calculateCharges} disabled={!canCalculate || calcLoading}>
          {calcLoading ? 'Calculating...' : '💰 Calculate Charges'}
        </button>
      </div>
    </div>
  );
}
