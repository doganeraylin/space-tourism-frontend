  import { useQuery } from '@apollo/client';
  import React from 'react';
  import Head from 'next/head';
  import { destinationList } from '../graphql/queries'
  import Button from '@mui/material/Button';

  function Destinations() {
    <Head>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
    </Head>
    const { loading, error, data } = useQuery(destinationList
    );

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data) return null;

    interface IDestination {
      id: number;
      attributes: {
        name: string;
        distance: number;
      }
    }

    return (
      <ul>
        <Button variant="contained">Hello World</Button>
        {data.destinations.data.map((destination: IDestination) => (
          <li key={destination.id}>{destination.attributes.name}</li>
        ))}
      </ul>
    );
}

export default Destinations