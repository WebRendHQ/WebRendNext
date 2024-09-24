import React from 'react';
import dynamic from 'next/dynamic';

const MacbookThreeScene = dynamic(() => import('./ui-functions/MacbookThreeScene'), { ssr: false });

export default function MacbookSection() {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <MacbookThreeScene />
    </div>
  );
}