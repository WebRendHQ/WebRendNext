import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';

const Work: NextPage = () => {
  return (
    <div>
      <Head>
        <title>WORK</title>
        <meta name="description" content="A 3D scene rendered using Spline." />
      </Head>

      {/* Fixed div that contains the Spline scene */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -1, // Ensures it is in the background
        }}
      >
        {/* Spline Embed */}
        <iframe
          src="https://my.spline.design/untitled-dfe71ceebc92e679032b4d2f23f0fed2/" // Replace with your actual Spline 3D scene URL
          width="100%"
          height="100%"
          style={{
            border: 'none',
            overflow: 'hidden',
          }}
          allow="fullscreen"
        ></iframe>
      </div>

      {/* Optional content overlaying the 3D scene */}
      <div style={{ zIndex: 1, position: 'relative', textAlign: 'center', padding: '20px' }}>
        <h1 style={{ color: '#fff' }}>Welcome to My 3D Work Scene</h1>
        <p style={{ color: '#fff' }}>This is a 3D interactive scene rendered using Spline.</p>
      </div>
    </div>
  );
};

export default Work;
