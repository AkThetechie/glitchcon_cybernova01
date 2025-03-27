# User Dashboard - Decentralized Identity

## Overview
This project is a decentralized identity management system with a user dashboard that allows individuals to register their identity, view credentials, and track transaction history. It is built using React for the frontend and Node.js with Express for the backend.

## Features
- **Identity Registration:** Users can register their decentralized identity (DID) and link it with a user address.
- **Credential Management:** View a list of issued verifiable credentials.
- **Transaction History:** Track past transactions.
- **Error Handling:** Displays appropriate messages when data retrieval or registration fails.

## Tech Stack
- **Frontend:** React, Tailwind CSS, Lucide Icons
- **Backend:** Node.js, Express
- **Database:** TBD (Could be MongoDB, PostgreSQL, or any other storage system for verifiable credentials)
- **Blockchain:** Ethereum test accounts (Ganache or similar) for managing decentralized identities

## Installation & Setup
### Prerequisites
- Node.js (latest LTS version recommended)
- npm or yarn

### Steps
1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd <project-directory>
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the backend server:
   ```sh
   node src/backend/api.js
   ```
   The server runs on `http://localhost:5000`

4. Start the frontend:
   ```sh
   npm run dev
   ```
   The frontend will be available at `http://localhost:3000`

## API Endpoints
### Register Identity
**POST** `/register`
- **Request Body:**
  ```json
  {
    "did": "did:example:1234567890",
    "userAddress": "0x406E0c68Cea65B48F2f7c593B98C5d337096c0F2"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Identity registered successfully!"
  }
  ```

### Fetch Credentials
**GET** `/credentials`
- **Response:**
  ```json
  [
    {
      "id": "cred-001",
      "type": "Proof of Identity",
      "issuer": "Gov Agency",
      "expirationDate": "2026-12-31"
    }
  ]
  ```

### Fetch Transactions
**GET** `/transactions`
- **Response:**
  ```json
  [
    {
      "id": "tx-001",
      "details": "Verified Credential Issued",
      "date": "2025-03-27",
      "status": "success"
    }
  ]
  ```

## Sample Data
### Available Accounts (Ethereum Test Accounts)
```
(0) 0x406E0c68Cea65B48F2f7c593B98C5d337096c0F2 (1000 ETH)
(1) 0x86762f228600FB64D1be52A9FA35941438902090 (1000 ETH)
...
```
### Private Keys
```
(0) 0x73c90913d27351e23d19aa69077f2f3bc61d04a281ab1a6d914951ee2ed94029
...
```

## Notes
- Ensure the backend is running before starting the frontend.
- Update the API_URL in the frontend `.env` file if the backend runs on a different host.
- The system is designed to integrate with blockchain-based identity verification solutions.

## Future Enhancements
- Integration with smart contracts for on-chain identity management.
- Decentralized storage for credentials.
- Enhanced security mechanisms for identity verification.

## License
This project is licensed under the MIT License.

