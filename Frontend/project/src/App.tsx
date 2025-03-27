import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { UserDashboard } from './components/UserDashboard';
import { IssuerPortal } from './components/IssuerPortal';
import { VerifierInterface } from './components/VerifierInterface';
import { fetchUserData } from './utils/api';
import type { UserRole } from './types';

function App() {
    const [role, setRole] = useState<UserRole>('holder');
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        async function getUserData() {
            const data = await fetchUserData();
            setUserData(data);
        }
        getUserData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navigation role={role} setRole={setRole} />
            <main className="py-8">
                {role === 'holder' && <UserDashboard userData={userData} />}
                {role === 'issuer' && <IssuerPortal />}
                {role === 'verifier' && <VerifierInterface />}
            </main>
        </div>
    );
}

export default App;
