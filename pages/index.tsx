import React from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar/Navbar';
import Home from '../components/Home/Home'

function HomePage() {
  <Head>
    <meta name="viewport" content="initial-scale=1, width=device-width" />
  </Head>
  return (
    <>
      <Navbar/>
      <Home />
    </>   
  );
}
export default HomePage