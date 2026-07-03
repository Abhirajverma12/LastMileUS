import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../api/client';
import { ApiResponse, Order } from '../../types';
import TrackingTimeline from '../../components/common/TrackingTimeline';

const STATUS_COLORS: Record<string, string> = {
  PENDING: '#f6ad55', PICKED_UP: '#4299e1', IN_TRANSIT: '#eab308',
  OUT_FOR_DELIVERY: '#48bb78', DELIVERED: '#38a169', FAILED: '#fc8181',
};

export default function OrderDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const fetchOrder = () => {
    api.get<ApiResponse<Order>>(`/orders/${id}`)
      .then(res => setOrder(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchOrder(); }, [id]);

  const reschedule = async () => {
    if (!rescheduleDate) return;
    setActionLoading(true);
    try {
      await api.post(`/orders/${id}/reschedule`, { scheduledDate: rescheduleDate });
      setMsg('Order rescheduled successfully!');
      fetchOrder();
    } catch (err: any) { setError(err.message); }
    finally { setActionLoading(false); }
  };

  const updateStatus = async (status: string, notes?: string) => {
    setActionLoading(true);
    try {
      await api.patch(`/orders/${id}/status`, { status, notes });
      setMsg('Status updated!');
      fetchOrder();
    } catch (err: any) { setError(err.message); }
    finally { setActionLoading(false); }
  };

  const autoAssign = async () => {
    setActionLoading(true);
    try {
      await api.post(`/orders/${id}/auto-assign`, {});
      setMsg('Agent assigned!');
      fetchOrder();
    } catch (err: any) { setError(err.message); }
    finally { setActionLoading(false); }
  };

  if (loading) return <div className="loading-screen"><div className="spinner" /></div>;
  if (!order) return <div className="page"><div className="alert alert-error">{error || 'Order not found'}</div></div>;

  const statusColor = STATUS_COLORS[order.status] || '#666';
  const isAgent = user?.role === 'AGENT';
  const isAdmin = user?.role === 'ADMIN';
  const isCustomer = user?.role === 'CUSTOMER';

  // Valid next statuses for agents
  const NEXT_STATUS: Record<string, string[]> = {
    PENDING: ['PICKED_UP'], PICKED_UP: ['IN_TRANSIT'], IN_TRANSIT: ['OUT_FOR_DELIVERY'],
    OUT_FOR_DELIVERY: ['DELIVERED', 'FAILED'],
  };

  return (
    <div className="page">
      {msg && <div className="alert alert-success">{msg}</div>}
      {error && <div className="alert alert-error">{error}</div>}

      <div className="page-header">
        <div>
          <h1>Order {order.trackingId}</h1>
          <span className="badge badge-lg" style={{ background: statusColor + '22', color: statusColor }}>
            {order.status.replace(/_/g, ' ')}
          </span>
        </div>
        {isAdmin && !order.agentId && (
          <button className="btn btn-primary" onClick={autoAssign} disabled={actionLoading}>🤖 Auto-Assign Agent</button>
        )}
      </div>

      <div className="detail-grid">
        <div className="detail-card glass-card">
          <h3>📍 Addresses</h3>
          <div className="detail-row"><span>Pickup:</span><span>{order.pickupAddress} ({order.pickupArea}, {order.pickupPincode})</span></div>
          <div className="detail-row"><span>Drop:</span><span>{order.dropAddress} ({order.dropArea}, {order.dropPincode})</span></div>
          <div className="detail-row"><span>Zones:</span><span>{order.pickupZone?.name || 'N/A'} → {order.dropZone?.name || 'N/A'}</span></div>
        </div>

        <div className="detail-card glass-card">
          <h3>📐 Package & Charges</h3>
          <div className="detail-row"><span>Dimensions:</span><span>{Number(order.packageLength)}×{Number(order.packageBreadth)}×{Number(order.packageHeight)} cm</span></div>
          <div className="detail-row"><span>Weight:</span><span>Actual: {Number(order.actualWeight)}kg | Volumetric: {Number(order.volumetricWeight)}kg | Billable: {Number(order.billableWeight)}kg</span></div>
          <div className="detail-row"><span>Type:</span><span>{order.orderType} / {order.paymentType}</span></div>
          <div className="detail-row"><span>Charges:</span><span>Base ₹{Number(order.baseCharge)} + Weight ₹{Number(order.weightCharge)} + COD ₹{Number(order.codSurcharge)}</span></div>
          <div className="detail-row total"><span>Total:</span><span>₹{Number(order.totalCharge).toFixed(2)}</span></div>
        </div>

        {order.agent && (
          <div className="detail-card glass-card">
            <h3>🚚 Agent</h3>
            <div className="detail-row"><span>Name:</span><span>{order.agent.user?.name}</span></div>
            <div className="detail-row"><span>Email:</span><span>{order.agent.user?.email}</span></div>
            <div className="detail-row"><span>Phone:</span><span>{order.agent.user?.phone || 'N/A'}</span></div>
          </div>
        )}

        {/* Agent actions */}
        {isAgent && NEXT_STATUS[order.status] && (
          <div className="detail-card glass-card">
            <h3>⚡ Update Status</h3>
            <div className="btn-group">
              {NEXT_STATUS[order.status]?.map(s => (
                <button key={s} className="btn btn-primary" onClick={() => updateStatus(s)} disabled={actionLoading}>
                  → {s.replace(/_/g, ' ')}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Admin status override */}
        {isAdmin && (
          <div className="detail-card glass-card">
            <h3>🔧 Admin Actions</h3>
            <div className="btn-group">
              {['PICKED_UP', 'IN_TRANSIT', 'OUT_FOR_DELIVERY', 'DELIVERED', 'FAILED'].map(s => (
                <button key={s} className="btn btn-sm btn-outline" onClick={() => updateStatus(s)} disabled={actionLoading || order.status === s}>
                  → {s.replace(/_/g, ' ')}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Customer reschedule */}
        {isCustomer && order.status === 'FAILED' && (
          <div className="detail-card glass-card">
            <h3>🔄 Reschedule Delivery</h3>
            <p>Attempt #{order.attemptCount} failed. Choose a new date:</p>
            <div className="form-row">
              <input type="date" value={rescheduleDate} onChange={e => setRescheduleDate(e.target.value)} min={new Date().toISOString().split('T')[0]} />
              <button className="btn btn-primary" onClick={reschedule} disabled={!rescheduleDate || actionLoading}>
                {actionLoading ? 'Rescheduling...' : 'Reschedule'}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="section">
        <h2>📋 Tracking Timeline</h2>
        {order.trackingHistory && order.trackingHistory.length > 0 ? (
          <TrackingTimeline entries={order.trackingHistory} />
        ) : (
          <p className="text-muted">No tracking entries yet.</p>
        )}
      </div>
    </div>
  );
}
