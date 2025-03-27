export type UserRole = 'holder' | 'issuer' | 'verifier';

export interface VerifiableCredential {
  id: string;
  type: string;
  issuer: string;
  issuanceDate: string;
  expirationDate: string;
  status: 'active' | 'revoked';
  claims: Record<string, any>;
}

export interface Transaction {
  id: string;
  type: 'issuance' | 'verification' | 'revocation';
  date: string;
  details: string;
  status: 'success' | 'pending' | 'failed';
}

export interface KYCDocument {
  id: string;
  type: string;
  status: 'pending' | 'verified' | 'rejected';
  uploadDate: string;
}
