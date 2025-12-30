
import { 
  User, UserRole, Property, MaintenanceRequest, 
  ServiceProvider, Message, Application, Payment,
  ApplicationStatus, MaintenanceStatus, PaymentStatus
} from '../types';

// Initial Mock Data
const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Alex Johnson', email: 'alex.j@prestige.com', role: UserRole.TENANT, verified: true, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' },
  { id: 'u2', name: 'Jane Smith', email: 'jane@example.com', role: UserRole.LANDLORD, verified: true, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane' },
  { id: 'u3', name: 'Master Fixer', email: 'plumber@example.com', role: UserRole.SERVICE_PROVIDER, verified: true, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Master' },
  { id: 'u4', name: 'Site Admin', email: 'admin@nawiri360.com', role: UserRole.ADMIN, verified: true, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin' },
];

const MOCK_PROPERTIES: Property[] = [
  {
    id: 'p1',
    landlordId: 'u2',
    title: 'Modern Downtown Loft',
    description: 'Beautiful 2-bedroom loft in the heart of the city.',
    address: '123 Main St',
    city: 'San Francisco',
    price: 2500,
    bedrooms: 2,
    bathrooms: 1,
    sqft: 1200,
    amenities: ['Gym', 'Parking', 'Pet Friendly', 'AC'],
    images: ['https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800'],
    lat: 37.7749,
    lng: -122.4194,
    isAvailable: true,
    rating: 4.8
  },
  {
    id: 'p2',
    landlordId: 'u2',
    title: 'Glass Penthouse Suite',
    description: 'Luxury living with panoramic views.',
    address: '456 Sky Rise',
    city: 'San Francisco',
    price: 5200,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 2400,
    amenities: ['Private Pool', 'Concierge', 'Wine Cellar'],
    images: ['https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?auto=format&fit=crop&q=80&w=800'],
    lat: 37.7849,
    lng: -122.4294,
    isAvailable: true,
    rating: 4.9
  }
];

const MOCK_SERVICE_PROVIDERS: ServiceProvider[] = [
  { id: 'sp1', name: 'Elite Cleaners', category: 'Cleaning', rating: 4.9, reviewsCount: 128, hourlyRate: 45, description: 'Premium residential deep cleaning experts.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elite' },
  { id: 'sp2', name: 'Secure Guard Co', category: 'Security', rating: 4.8, reviewsCount: 85, hourlyRate: 60, description: 'Elite residential and asset protection.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Guard' },
  { id: 'sp3', name: 'Volt Masters', category: 'Electrical', rating: 4.7, reviewsCount: 210, hourlyRate: 75, description: 'Certified master electricians for smart homes.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Volt' },
  { id: 'sp4', name: 'Rapid Plumbing', category: 'Plumbing', rating: 4.6, reviewsCount: 340, hourlyRate: 55, description: '24/7 emergency plumbing response.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Plumbing' }
];

const MOCK_PAYMENTS: Payment[] = [
  { id: 'pay1', userId: 'u1', amount: 2500, type: 'Rent', status: PaymentStatus.COMPLETED, date: '2024-02-01', propertyId: 'p1' },
  { id: 'pay2', userId: 'u1', amount: 2500, type: 'Rent', status: PaymentStatus.COMPLETED, date: '2024-01-01', propertyId: 'p1' },
  { id: 'pay3', userId: 'u1', amount: 150, type: 'Service Fee', status: PaymentStatus.COMPLETED, date: '2024-02-15' }
];

const MOCK_MESSAGES: Message[] = [
  { id: 'm1', senderId: 'u2', receiverId: 'u1', content: 'Hello Alex, the move-in documents are ready for your review.', timestamp: '2024-02-20T10:00:00Z', read: true, senderName: 'Jane Smith' },
  { id: 'm2', senderId: 'u1', receiverId: 'u2', content: 'Thank you Jane, I will sign them by tonight.', timestamp: '2024-02-20T10:30:00Z', read: true, senderName: 'Alex Johnson' }
];

const MOCK_APPLICATIONS: Application[] = [];
const MOCK_MAINTENANCE: MaintenanceRequest[] = [];

export const api = {
  auth: {
    login: async (email: string): Promise<User> => {
      const user = MOCK_USERS.find(u => u.email === email);
      if (!user) throw new Error('User not found');
      return user;
    }
  },
  properties: {
    list: async (filters?: any): Promise<Property[]> => {
      let filtered = [...MOCK_PROPERTIES];
      if (filters?.city) filtered = filtered.filter(p => p.city === filters.city);
      if (filters?.minPrice) filtered = filtered.filter(p => p.price >= filters.minPrice);
      if (filters?.maxPrice) filtered = filtered.filter(p => p.price <= filters.maxPrice);
      return filtered;
    },
    getById: async (id: string): Promise<Property | undefined> => {
      return MOCK_PROPERTIES.find(p => p.id === id);
    },
    // Fix for missing getByLandlord method used in Dashboard.tsx
    getByLandlord: async (landlordId: string): Promise<Property[]> => {
      return MOCK_PROPERTIES.filter(p => p.landlordId === landlordId);
    }
  },
  services: {
    list: async (): Promise<ServiceProvider[]> => {
      return MOCK_SERVICE_PROVIDERS;
    }
  },
  payments: {
    getByUser: async (userId: string): Promise<Payment[]> => {
      return MOCK_PAYMENTS.filter(p => p.userId === userId);
    },
    create: async (payment: Partial<Payment>): Promise<Payment> => {
      const newPayment: Payment = {
        id: `pay${Date.now()}`,
        userId: payment.userId!,
        amount: payment.amount!,
        type: payment.type!,
        status: PaymentStatus.PENDING,
        date: new Date().toISOString().split('T')[0],
        propertyId: payment.propertyId
      };
      MOCK_PAYMENTS.push(newPayment);
      return newPayment;
    }
  },
  messages: {
    getThread: async (user1: string, user2: string): Promise<Message[]> => {
      return MOCK_MESSAGES.filter(m => 
        (m.senderId === user1 && m.receiverId === user2) || 
        (m.senderId === user2 && m.receiverId === user1)
      ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    },
    send: async (msg: Partial<Message>): Promise<Message> => {
      const newMsg: Message = {
        id: `msg${Date.now()}`,
        senderId: msg.senderId!,
        receiverId: msg.receiverId!,
        content: msg.content!,
        timestamp: new Date().toISOString(),
        read: false
      };
      MOCK_MESSAGES.push(newMsg);
      return newMsg;
    }
  },
  applications: {
    getByUser: async (userId: string): Promise<Application[]> => {
      return MOCK_APPLICATIONS.filter(a => a.tenantId === userId);
    },
    // Fix for missing getByProperty method used in Dashboard.tsx
    getByProperty: async (propertyId: string): Promise<Application[]> => {
      return MOCK_APPLICATIONS.filter(a => a.propertyId === propertyId);
    }
  },
  maintenance: {
    create: async (req: Partial<MaintenanceRequest>): Promise<MaintenanceRequest> => {
      const newReq: MaintenanceRequest = {
        id: `m${Date.now()}`,
        propertyId: req.propertyId!,
        tenantId: req.tenantId!,
        title: req.title!,
        description: req.description!,
        priority: req.priority || 'MEDIUM',
        status: MaintenanceStatus.OPEN,
        createdAt: new Date().toISOString()
      };
      MOCK_MAINTENANCE.push(newReq);
      return newReq;
    }
  }
};
