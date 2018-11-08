import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Amplify, { Auth } from 'aws-amplify';
import { ApolloProvider } from 'react-apollo';
import { withAuthenticator } from 'aws-amplify-react-native';
import AWSAppSyncClient from 'aws-appsync';
import { Rehydrated } from 'aws-appsync-react';
import AppSyncConfig from './app-sync-config';
import aws_exports from './aws-exports';

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
const Root = () => (
  <View style={styles.container}>
    <Text style={styles.welcome}>Welcome to Thea's React Native App!</Text>
    <Text style={styles.instructions}>You have successfully logged in</Text>
  </View>
);

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default App;
