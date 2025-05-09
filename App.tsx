import React, {useEffect} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import {
  CometChatConversations,
  CometChatLocalize,
  CometChatUIKit,
} from '@cometchat/chat-uikit-react-native';

const App = () => {
  const [isInitialized, setIsInitialized] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  useEffect(() => {
    CometChatUIKit.init({
      appId: 'xyz',
      authKey: 'xyz',
      region: 'us',
    })
      .then(() => {
        CometChatLocalize.setLocale('en');
        setIsInitialized(true);
      })
      .catch(() => {
        return null;
      });
  }, []);
  function login({uid}: {uid: string}) {
    CometChatUIKit.login({uid})
      .then(user => {
        console.log('Login successful:', user);
        setIsLoggedIn(true);
      })
      .catch(error => {
        console.error('Login failed:', error);
      });
  }
  return (
    <View style={styles.container}>
      {isInitialized && isLoggedIn && (
        <CometChatConversations onItemPress={item => console.log(item)} />
      )}
      {!isLoggedIn && (
        <>
          <View style={styles.button}>
            <Button
              title="Login 1"
              onPress={() => login({uid: 'cometchat-uid-1'})}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Login 2"
              onPress={() => login({uid: 'cometchat-uid-2'})}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Login 3"
              onPress={() => login({uid: 'cometchat-uid-3'})}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Login 4"
              onPress={() => login({uid: 'cometchat-uid-4'})}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Login 5"
              onPress={() => login({uid: 'cometchat-uid-5'})}
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    margin: 10,
  },
});

export default App;
