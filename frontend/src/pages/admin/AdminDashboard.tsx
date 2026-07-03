import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/client';
import { ApiResponse, PaginatedData, Order } from '../../types';

const STATUS_COLORS: Record<string, string> = {
  PENDING: '#f6ad55', PICKED_UP: '#4299e1', IN_TRANSIT: '#9f7aea',
  OUT_FOR_DELIVERY: '#48bb78', DELIVERED: '#38a169', FAILED: '#fc8181',
};

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [filters, setFilters] = useState({ status: '', orderType: '', paymentType: '', search: '' });
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const fetchOrders = async (page = 1) => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: '20' });
    if (filters.status) params.set('status', filters.status);
    if (filters.orderType) params.set('orderType', filters.orderType);
    if (filters.paymentType) params.set('paymentType', filters.paymentType);
    if (filters.search) params.set('search', filters.search);

    try {
      const res = await api.get<ApiResponse<PaginatedData>>(`/orders?${params}`);
      setOrders(res.data.orders);
      setPagination(res.data.pagination);
    } catch { }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchOrders(); }, [filters]);

  const autoAssign = async (orderId: string) => {
    setActionLoading(orderId);
    try {
      await api.post(`/orders/${orderId}/auto-assign`, {});
      setMsg('Agent assigned!');
      fetchOrders(pagination.page);
    } catch (err: any) { setMsg(err.message); }
    finally { setActionLoading(''); }
  };

  // Stats from current view
  const statusCounts = orders.reduce((acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="page">
      {msg && <div className="alert alert-success">{msg}</div>}
      <div className="page-header">
        <h1>Admin Dashboard</h1>
        <button className="btn btn-primary" onClick={() => navigate('/admin/orders/new')}>+ New Order</button>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card glass-card">
          <p className="stat-label">📈 Total (Page)</p>
          <p className="stat-value" style={{ color: '#818cf8' }}>{pagination.total}</p>
        </div>
        {Object.entries(STATUS_COLORS).map(([status, color]) => (
          <div key={status} className="stat-card glass-card">
            <p className="stat-label">{status.replace(/_/g, ' ')}</p>
            <p className="stat-value" style={{ color }}>{statusCounts[status] || 0}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="filter-bar glass-card">
        <input placeholder="🔍 Search tracking ID or address..." value={filters.search}
          onChange={e => setFilters(f => ({ ...f, search: e.target.value }))} />
        <select value={filters.status} onChange={e => setFilters(f => ({ ...f, status: e.target.value }))}>
          <option value="">All Statuses</option>
          {Object.keys(STATUS_COLORS).map(s => <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>)}
        </select>
        <select value={filters.orderType} onChange={e => setFilters(f => ({ ...f, orderType: e.target.value }))}>
          <option value="">All Types</option><option value="B2B">B2B</option><option value="B2C">B2C</option>
        </select>
        <select value={filters.paymentType} onChange={e => setFilters(f => ({ ...f, paymentType: e.target.value }))}>
          <option value="">All Payments</option><option value="PREPAID">Prepaid</option><option value="COD">COD</option>
        </select>
      </div>

      {/* Orders Table */}
      {loading ? <div className="loading-screen"><div className="spinner" /></div> : (
        <div className="table-wrapper glass-card">
          <table>
            <thead>
              <tr><th>Tracking ID</th><th>Customer</th><th>Route</th><th>Type</th><th>Total</th><th>Agent</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id}>
                  <td><strong className="clickable" onClick={() => navigate(`/admin/orders/${o.id}`)}>{o.trackingId}</strong></td>
                  <td>{o.customer?.name || 'N/A'}</td>
                  <td>{o.pickupArea} → {o.dropArea}</td>
                  <td><span className="badge badge-outline">{o.orderType}/{o.paymentType}</span></td>
                  <td>₹{Number(o.totalCharge).toFixed(2)}</td>
                  <td>{o.agent?.user?.name || <span className="text-muted">Unassigned</span>}</td>
                  <td><span className="badge" style={{ background: (STATUS_COLORS[o.status] || '#666') + '22', color: STATUS_COLORS[o.status] }}>{o.status.replace(/_/g, ' ')}</span></td>
                  <td>
                    <div className="btn-group">
                      <button className="btn btn-xs btn-outline" onClick={() => navigate(`/admin/orders/${o.id}`)}>View</button>
                      {!o.agentId && <button className="btn btn-xs btn-primary" onClick={() => autoAssign(o.id)} disabled={actionLoading === o.id}>Assign</button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="pagination">
          <button className="btn btn-sm btn-outline" disabled={pagination.page <= 1} onClick={() => fetchOrders(pagination.page - 1)}>← Prev</button>
          <span>Page {pagination.page} of {pagination.totalPages}</span>
          <button className="btn btn-sm btn-outline" disabled={pagination.page >= pagination.totalPages} onClick={() => fetchOrders(pagination.page + 1)}>Next →</button>
        </div>
      )}
    </div>
  );
}
