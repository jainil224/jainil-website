'use client'; // Error components must be Client Components

import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an external error reporting service
    console.error(error);
  }, [error]);

  return (
    <div style={{ padding: '50px', background: 'white', color: 'black', minHeight: '100vh', fontFamily: 'monospace' }}>
      <h2>Something went wrong!</h2>
      <div style={{ background: '#f8d7da', padding: '20px', borderRadius: '8px', color: '#721c24', marginBottom: '20px' }}>
        <strong>Error Message:</strong> {error.message}
        <br/><br/>
        <strong>Stack Trace:</strong>
        <pre style={{ whiteSpace: 'pre-wrap', fontSize: '12px', marginTop: '10px' }}>
          {error.stack}
        </pre>
      </div>
      <button
        onClick={() => reset()}
        style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        Try again
      </button>
    </div>
  );
}
