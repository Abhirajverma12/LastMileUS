export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'CUSTOMER' | 'AGENT' | 'ADMIN';
  agent?: DeliveryAgent;
}

export interface DeliveryAgent {
  id: string;
  userId: string;
  zoneId?: string;
  status: 'AVAILABLE' | 'BUSY' | 'OFFLINE';
  currentArea?: string;
  user?: { name: string; email: string; phone?: string };
  zone?: { id: string; name: string };
}

export interface Zone {
  id: string;
  name: string;
  description?: string;
  _count?: { areas: number; agents: number };
}

export interface Area {
  id: string;
  name: string;
  pincode: string;
  zoneId: string;
  zone?: { id: string; name: string };
}

export interface RateCard {
  id: string;
  orderType: 'B2B' | 'B2C';
  zoneType: 'INTRA_ZONE' | 'INTER_ZONE';
  baseRate: number;
  perKgRate: number;
  codSurcharge: number;
}

export interface ChargeBreakdown {
  pickupZoneId: string;
  pickupZoneName: string;
  dropZoneId: string;
  dropZoneName: string;
  zoneType: string;
  volumetricWeight: number;
  billableWeight: number;
  baseCharge: number;
  weightCharge: number;
  codSurcharge: number;
  totalCharge: number;
}

export interface Order {
  id: string;
  trackingId: string;
  customerId: string;
  agentId?: string;
  pickupAddress: string;
  pickupArea: string;
  pickupPincode: string;
  dropAddress: string;
  dropArea: string;
  dropPincode: string;
  packageLength: number;
  packageBreadth: number;
  packageHeight: number;
  actualWeight: number;
  volumetricWeight: number;
  billableWeight: number;
  orderType: 'B2B' | 'B2C';
  paymentType: 'PREPAID' | 'COD';
  baseCharge: number;
  weightCharge: number;
  codSurcharge: number;
  totalCharge: number;
  status: OrderStatus;
  scheduledDate?: string;
  attemptCount: number;
  createdAt: string;
  customer?: { id: string; name: string; email: string; phone?: string };
  agent?: DeliveryAgent;
  pickupZone?: { name: string };
  dropZone?: { name: string };
  trackingHistory?: TrackingEntry[];
}

export type OrderStatus = 'PENDING' | 'PICKED_UP' | 'IN_TRANSIT' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'FAILED';

export interface TrackingEntry {
  id: string;
  orderId: string;
  status: OrderStatus;
  notes?: string;
  createdAt: string;
  user?: { name: string; role: string };
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedData {
  orders: Order[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
}
