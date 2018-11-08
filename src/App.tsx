import React from 'react';
import Amplify, { Auth } from 'aws-amplify';
import { ApolloProvider } from 'react-apollo';
import { withAuthenticator } from 'aws-amplify-react-native';
import AWSAppSyncClient from 'aws-appsync';
import { Rehydrated } from 'aws-appsync-react';
import AppSyncConfig from './app-sync-config';
import aws_exports from './aws-exports';
import Root from './components/Root';

Amplify.configure(aws_exports);

const awsClient = new AWSAppSyncClient({
  url: AppSyncConfig.graphqlEndpoint,
  region: AppSyncConfig.region,
  auth: {
    type: AppSyncConfig.authenticationType,
    jwtToken: async () =>
      (await Auth.currentSession()).getIdToken().getJwtToken(),
  },
});

const RootWithAuth = withAuthenticator(Root);

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={awsClient}>
        <Rehydrated>
          <RootWithAuth />
        </Rehydrated>
      </ApolloProvider>
    );
  }
}

export default App;
