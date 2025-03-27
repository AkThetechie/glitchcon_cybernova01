import React from 'react';
import { Shield, Building2, CheckCircle } from 'lucide-react';
import { UserRole } from '../types';

interface NavigationProps {
  role: UserRole;
  setRole: (role: UserRole) => void;
}

export function Navigation({ role, setRole }: NavigationProps) {
  return (
    <nav className="bg-indigo-600 text-white p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Shield className="w-8 h-8" />
          <span className="text-xl font-bold">TrustChain Verify</span>
        </div>
        
        <div className="flex space-x-4">
          <button
            onClick={() => setRole('holder')}
            className={`px-4 py-2 rounded-lg transition ${
              role === 'holder'
                ? 'bg-white text-indigo-600'
                : 'hover:bg-indigo-500'
            }`}
          >
            User Dashboard
          </button>
          <button
            onClick={() => setRole('issuer')}
            className={`px-4 py-2 rounded-lg transition ${
              role === 'issuer'
                ? 'bg-white text-indigo-600'
                : 'hover:bg-indigo-500'
            }`}
          >
            Issuer Portal
          </button>
          <button
            onClick={() => setRole('verifier')}
            className={`px-4 py-2 rounded-lg transition ${
              role === 'verifier'
                ? 'bg-white text-indigo-600'
                : 'hover:bg-indigo-500'
            }`}
          >
            Verifier Interface
          </button>
        </div>
      </div>
    </nav>
  );
}