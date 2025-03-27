import React, { useState } from 'react';
import { CheckCircle, XCircle, RefreshCw, Shield, Loader } from 'lucide-react';

export function VerifierInterface() {
  const [loading, setLoading] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'verified' | 'revoked' | 'pending' | null>(null);

  // Simulated verification process
  const handleVerify = () => {
    setLoading(true);
    setVerificationStatus('pending');

    setTimeout(() => {
      const result = Math.random() > 0.5 ? 'verified' : 'revoked';
      setVerificationStatus(result);
      setLoading(false);
    }, 2000); // Simulating API delay
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <Shield className="w-6 h-6 mr-2 text-indigo-600" />
          Verify Credentials
        </h2>

        <div className="space-y-6">
          {/* Verification Request Form */}
          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Request Verification</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Required Credentials
                </label>
                <select className="w-full border rounded-lg p-2">
                  <option>KYC Verification</option>
                  <option>Age Verification</option>
                  <option>Identity Verification</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Verification Method
                </label>
                <div className="flex space-x-4">
                  <button 
                    onClick={handleVerify}
                    className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50"
                    disabled={loading}
                  >
                    {loading ? <Loader className="w-5 h-5 animate-spin mr-2" /> : <RefreshCw className="w-5 h-5 mr-2" />}
                    Verify Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Verification Status Display */}
          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Verification Status</h3>
            
            <div className="space-y-4">
              {/* Credential Authenticity */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Credential Authenticity</p>
                  <p className="text-sm text-gray-600">Verifying digital signature...</p>
                </div>
                {verificationStatus === 'verified' ? (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                ) : (
                  <RefreshCw className="w-6 h-6 text-blue-600 animate-spin" />
                )}
              </div>

              {/* Revocation Status */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Revocation Status</p>
                  <p className="text-sm text-gray-600">Checking blockchain...</p>
                </div>
                {verificationStatus === 'revoked' ? (
                  <XCircle className="w-6 h-6 text-red-600" />
                ) : (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                )}
              </div>

              {/* ZKP Validation */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">ZKP Validation</p>
                  <p className="text-sm text-gray-600">Waiting for proof...</p>
                </div>
                {verificationStatus === 'verified' ? (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                ) : (
                  <XCircle className="w-6 h-6 text-gray-400" />
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
