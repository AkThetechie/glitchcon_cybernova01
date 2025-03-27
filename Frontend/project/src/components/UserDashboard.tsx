import React, { useEffect, useState } from 'react';
import { QrCode, Clock, Shield, Share2, AlertCircle, UserPlus } from 'lucide-react';
import type { VerifiableCredential, Transaction } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export function UserDashboard() {
  const [credentials, setCredentials] = useState<VerifiableCredential[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [did, setDid] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [registering, setRegistering] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userAddress) return;
        
        const [identityRes, credentialRes, transactionRes] = await Promise.all([
          fetch(`${API_URL}/identity/${userAddress}`),
          fetch(`${API_URL}/credentials/${userAddress}`),
          fetch(`${API_URL}/transactions/${userAddress}`),
        ]);

        if (!identityRes.ok || !credentialRes.ok || !transactionRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const identityData = await identityRes.json();
        setDid(identityData.did);
        
        const credentialsData = await credentialRes.json();
        setCredentials(credentialsData);

        const transactionsData = await transactionRes.json();
        setTransactions(transactionsData);
      } catch (err) {
        setError('Error fetching data. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userAddress]);

  const handleRegister = async () => {
    setRegistering(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ did, userAddress }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      alert('Identity registered successfully!');
      setDid('');
      setUserAddress('');
    } catch (err) {
      setError('Error registering identity. Please try again.');
    } finally {
      setRegistering(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4 flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Identity Registration */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <UserPlus className="w-6 h-6 mr-2 text-indigo-600" />
            Register Identity
          </h2>
          <input
            type="text"
            placeholder="User Address (Ganache)"
            value={userAddress}
            onChange={(e) => setUserAddress(e.target.value)}
            className="border p-2 rounded w-full mb-2"
          />
          <input
            type="text"
            placeholder="DID (Auto-fetched)"
            value={did}
            readOnly
            className="border p-2 rounded w-full mb-4 bg-gray-100"
          />
          <button
            onClick={handleRegister}
            disabled={registering}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition w-full"
          >
            {registering ? 'Registering...' : 'Register'}
          </button>
        </div>

        {/* Credentials Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Shield className="w-6 h-6 mr-2 text-indigo-600" />
            My Credentials
          </h2>

          {loading ? (
            <p className="text-gray-500">Loading credentials...</p>
          ) : credentials.length === 0 ? (
            <p className="text-gray-500">No credentials found.</p>
          ) : (
            <div className="space-y-4">
              {credentials.map((credential) => (
                <div key={credential.id} className="border rounded-lg p-4 hover:border-indigo-500 transition">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{credential.type}</h3>
                      <p className="text-sm text-gray-600">Issued by: {credential.issuer}</p>
                      <p className="text-sm text-gray-600">Valid until: {credential.expirationDate}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                        <QrCode className="w-5 h-5 text-indigo-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                        <Share2 className="w-5 h-5 text-indigo-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
