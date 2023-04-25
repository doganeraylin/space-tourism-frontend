import "bootstrap/dist/css/bootstrap.min.css"
import "../styles/globals.css";
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client';
import useApollo from '../hooks/useApollo';
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  const client = useApollo(pageProps);
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
