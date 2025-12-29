
export enum UserRole {
  TENANT = 'TENANT',
  LANDLORD = 'LANDLORD',
  SERVICE_PROVIDER = 'SERVICE_PROVIDER',
  ADMIN = 'ADMIN'
}

export enum ApplicationStatus {
  PENDING = 'PENDING',
  REVIEWING = 'REVIEWING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED'
}

export enum MaintenanceStatus {
  OPEN = 'OPEN',
  ASSIGNED = 'ASSIGNED',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  verified: boolean;
  phone?: string;
}

export interface Property {
  id: string;
  landlordId: string;
  title: string;
  description: string;
  address: string;
  city: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  amenities: string[];
  images: string[];
  lat: number;
  lng: number;
  isAvailable: boolean;
  rating: number;
}

export interface MaintenanceRequest {
  id: string;
  propertyId: string;
  tenantId: string;
  providerId?: string;
  title: string;
  description: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  status: MaintenanceStatus;
  createdAt: string;
}

export interface ServiceProvider {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewsCount: number;
  description: string;
  hourlyRate: number;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Application {
  id: string;
  propertyId: string;
  tenantId: string;
  status: ApplicationStatus;
  message: string;
  submittedAt: string;
}
