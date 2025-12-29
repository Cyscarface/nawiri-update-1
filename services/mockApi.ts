
import { 
  User, UserRole, Property, MaintenanceRequest, 
  ServiceProvider, Message, Application, 
  ApplicationStatus, MaintenanceStatus 
} from '../types';

// Initial Mock Data
const MOCK_USERS: User[] = [
  { id: 'u1', name: 'John Doe', email: 'john@example.com', role: UserRole.TENANT, verified: true, avatar: 'https://picsum.photos/seed/u1/200' },
  { id: 'u2', name: 'Jane Smith', email: 'jane@example.com', role: UserRole.LANDLORD, verified: true, avatar: 'https://picsum.photos/seed/u2/200' },
  { id: 'u3', name: 'Pro Plumber', email: 'plumber@example.com', role: UserRole.SERVICE_PROVIDER, verified: true, avatar: 'https://picsum.photos/seed/u3/200' },
  { id: 'u4', name: 'Site Admin', email: 'admin@homesync.com', role: UserRole.ADMIN, verified: true, avatar: 'https://picsum.photos/seed/u4/200' },
];

const MOCK_PROPERTIES: Property[] = [
  {
    id: 'p1',
    landlordId: 'u2',
    title: 'Modern Downtown Loft',
    description: 'Beautiful 2-bedroom loft in the heart of the city. Features floor-to-ceiling windows and high-end finishes.',
    address: '123 Main St',
    city: 'San Francisco',
    price: 2500,
    bedrooms: 2,
    bathrooms: 1,
    sqft: 1200,
    amenities: ['Gym', 'Parking', 'Pet Friendly', 'AC'],
    images: ['https://picsum.photos/seed/p1/800/600', 'https://picsum.photos/seed/p1-2/800/600'],
    lat: 37.7749,
    lng: -122.4194,
    isAvailable: true,
    rating: 4.8
  },
  {
    id: 'p2',
    landlordId: 'u2',
    title: 'Sunny Suburban Home',
    description: 'Spacious family home with a large backyard. Perfect for kids and pets.',
    address: '456 Oak Lane',
    city: 'San Francisco',
    price: 3200,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 2000,
    amenities: ['Backyard', 'Garage', 'Fireplace'],
    images: ['https://picsum.photos/seed/p2/800/600'],
    lat: 37.7849,
    lng: -122.4294,
    isAvailable: true,
    rating: 4.5
  },
  {
    id: 'p3',
    landlordId: 'u2',
    title: 'Cozy Studio Apartment',
    description: 'Affordable and cute studio in a quiet neighborhood. Near public transport.',
    address: '789 Pine Way',
    city: 'Oakland',
    price: 1500,
    bedrooms: 0,
    bathrooms: 1,
    sqft: 500,
    amenities: ['Laundry', 'Near Metro'],
    images: ['https://picsum.photos/seed/p3/800/600'],
    lat: 37.8044,
    lng: -122.2712,
    isAvailable: true,
    rating: 4.2
  }
];

const MOCK_APPLICATIONS: Application[] = [];
const MOCK_MESSAGES: Message[] = [];
const MOCK_MAINTENANCE: MaintenanceRequest[] = [];

// Simulation Logic
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
    getByLandlord: async (landlordId: string): Promise<Property[]> => {
      return MOCK_PROPERTIES.filter(p => p.landlordId === landlordId);
    }
  },
  applications: {
    create: async (app: Partial<Application>): Promise<Application> => {
      const newApp: Application = {
        id: `a${Date.now()}`,
        propertyId: app.propertyId!,
        tenantId: app.tenantId!,
        status: ApplicationStatus.PENDING,
        message: app.message || '',
        submittedAt: new Date().toISOString()
      };
      MOCK_APPLICATIONS.push(newApp);
      return newApp;
    },
    getByUser: async (userId: string): Promise<Application[]> => {
      return MOCK_APPLICATIONS.filter(a => a.tenantId === userId);
    },
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
    },
    getByProperty: async (propertyId: string): Promise<MaintenanceRequest[]> => {
      return MOCK_MAINTENANCE.filter(m => m.propertyId === propertyId);
    }
  },
  messages: {
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
    },
    getThread: async (user1: string, user2: string): Promise<Message[]> => {
      return MOCK_MESSAGES.filter(m => 
        (m.senderId === user1 && m.receiverId === user2) || 
        (m.senderId === user2 && m.receiverId === user1)
      ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    }
  }
};
