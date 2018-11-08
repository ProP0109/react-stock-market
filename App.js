import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { Container, StyleProvider } from 'native-base'
import { Font, AppLoading } from 'expo'

import getTheme from './native-base-theme/components'
import platform from './native-base-theme/variables/platform'

import store from './store'
import Tabs from './components/Tabs'

export default class App extends Component {
  state = { loading: true }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf')
    })
    this.setState({ loading: false })
  }

  render() {
    if (this.state.loading) {
      return (
        <Container style={styles.container}>
          <AppLoading />
        </Container>
      )
    }
    return (
      <Provider store={store.store}>
        <PersistGate loading={null} persistor={store.persistor}>
          <StyleProvider style={getTheme(platform)}>
            <Container style={styles.container}>
              <Tabs />
            </Container>
          </StyleProvider>
        </PersistGate>
      </Provider>
    )
  }
}

const styles = {
  container: {
    backgroundColor: '#182129'
  }
}
