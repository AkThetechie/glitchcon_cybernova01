import React from 'react';
import { Upload, Key, FileCheck, AlertCircle } from 'lucide-react';
import type { KYCDocument, VerifiableCredential } from '../types';

const mockDocuments: KYCDocument[] = [
  {
    id: 'doc-1',
    type: 'Passport',
    status: 'verified',
    uploadDate: '2024-03-15'
  }
];

const mockIssuedCredentials: VerifiableCredential[] = [
  {
    id: 'vc-1',
    type: 'KYCCredential',
    issuer: 'TrustBank',
    issuanceDate: '2024-03-15',
    expirationDate: '2025-03-15',
    status: 'active',
    claims: {
      name: 'John Doe',
      age: 25,
      nationality: 'US'
    }
  }
];

export function IssuerPortal() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Document Upload Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Upload className="w-6 h-6 mr-2 text-indigo-600" />
            Document Verification
          </h2>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input
              type="file"
              className="hidden"
              id="document-upload"
            />
            <label
              htmlFor="document-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <Upload className="w-12 h-12 text-gray-400 mb-2" />
              <span className="text-sm text-gray-600">
                Drop files here or click to upload
              </span>
            </label>
          </div>

          <div className="mt-6 space-y-4">
            {mockDocuments.map((document) => (
              <div
                key={document.id}
                className="border rounded-lg p-4"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{document.type}</h3>
                    <p className="text-sm text-gray-600">
                      Uploaded: {document.uploadDate}
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                    {document.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Issued Credentials Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Key className="w-6 h-6 mr-2 text-indigo-600" />
            Issued Credentials
          </h2>
          
          <div className="space-y-4">
            {mockIssuedCredentials.map((credential) => (
              <div
                key={credential.id}
                className="border rounded-lg p-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{credential.type}</h3>
                    <p className="text-sm text-gray-600">
                      Issued: {credential.issuanceDate}
                    </p>
                    <p className="text-sm text-gray-600">
                      Expires: {credential.expirationDate}
                    </p>
                  </div>
                  <button className="text-red-600 hover:text-red-800 transition">
                    <AlertCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}