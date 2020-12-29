import ApolloClient from 'apollo-boost';

const createApolloClient = (authStorage) => {
  return new ApolloClient({
    request: async (operation) => {
      try {
        const token = await authStorage.getToken();
        operation.setContext({
          headers: {
            authorization: token ? `Bearer ${token}` : ''
          }
        });
      } catch (e) {
        console.log(e);
      }
    },
    uri: 'http://192.168.100.40:4000/graphql',
  });
};

export default createApolloClient;