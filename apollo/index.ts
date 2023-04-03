import { ApolloClient, InMemoryCache, NormalizedCacheObject} from '@apollo/client';
import merge from 'deepmerge';
import isEqual from 'lodash-es/isEqual';

const DESTINATIONS_API = 'http://localhost:1337/graphql';
let apolloClient: ApolloClient<NormalizedCacheObject> | null;

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    uri: DESTINATIONS_API,
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState?: any) {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    const existingCache = _apolloClient.cache.extract();

    const data = merge(initialState, existingCache, {
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    });
    _apolloClient.cache.restore(data);
  }

  if (typeof window === 'undefined') {
    return _apolloClient;
  }

  if (!apolloClient) {
    apolloClient = _apolloClient;
  }

  return _apolloClient;
}

export function addApolloState(
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: any
) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}