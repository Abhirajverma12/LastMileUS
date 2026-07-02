import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/client';
import { ApiResponse, PaginatedData, Order } from '../../types';

const STATUS_COLORS: Record<string, string> = {
  PENDING: '#f6ad55', PICKED_UP: '#4299e1', IN_TRANSIT: '#9f7aea',
  OUT_FOR_DELIVERY: '#48bb78', DELIVERED: '#38a169', FAILED: '#fc8181',
};

export default function CustomerDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get<ApiResponse<PaginatedData>>('/orders?limit=50')
      .then(res => setOrders(res.data.orders))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'PENDING').length,
    inTransit: orders.filter(o => ['PICKED_UP', 'IN_TRANSIT', 'OUT_FOR_DELIVERY'].includes(o.status)).length,
    delivered: orders.filter(o => o.status === 'DELIVERED').length,
    failed: orders.filter(o => o.status === 'FAILED').length,
  };

  if (loading) return <div className="loading-screen"><div className="spinner" /></div>;

  return (
    <div className="page">
      <div className="page-header">
        <h1>My Dashboard</h1>
        <button className="btn btn-primary" onClick={() => navigate('/customer/orders/new')}>+ New Order</button>
      </div>

      <div className="stats-grid">
        {[
          { label: 'Total Orders', value: stats.total, color: '#667eea' },
          { label: 'Pending', value: stats.pending, color: '#f6ad55' },
          { label: 'In Transit', value: stats.inTransit, color: '#9f7aea' },
          { label: 'Delivered', value: stats.delivered, color: '#38a169' },
          { label: 'Failed', value: stats.failed, color: '#fc8181' },
        ].map(s => (
          <div key={s.label} className="stat-card glass-card">
            <p className="stat-label">{s.label}</p>
            <p className="stat-value" style={{ color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="section">
        <h2>Recent Orders</h2>
        {orders.length === 0 ? (
          <div className="empty-state glass-card">
            <p>No orders yet. Create your first order!</p>
            <button className="btn btn-primary" onClick={() => navigate('/customer/orders/new')}>Create Order</button>
          </div>
        ) : (
          <div className="table-wrapper glass-card">
            <table>
              <thead>
                <tr>
                  <th>Tracking ID</th><th>From → To</th><th>Type</th><th>Payment</th><th>Total</th><th>Status</th><th>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o.id} onClick={() => navigate(`/customer/orders/${o.id}`)} className="clickable-row">
                    <td><strong>{o.trackingId}</strong></td>
                    <td>{o.pickupArea} → {o.dropArea}</td>
                    <td><span className="badge badge-outline">{o.orderType}</span></td>
                    <td><span className="badge badge-outline">{o.paymentType}</span></td>
                    <td>₹{Number(o.totalCharge).toFixed(2)}</td>
                    <td><span className="badge" style={{ background: (STATUS_COLORS[o.status] || '#666') + '22', color: STATUS_COLORS[o.status] }}>{o.status.replace(/_/g, ' ')}</span></td>
                    <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
