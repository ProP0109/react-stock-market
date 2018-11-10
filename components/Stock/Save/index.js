import React, { Component } from 'react'
import { StatusBar } from 'react-native'
import { Icon, Fab, Toast, View } from 'native-base'
import { connect } from 'react-redux'

import { BLUE0, BLUE3, TEXT_NORMAL } from '../../../constants'
import { toggleFavorite } from '../../../store/actions/'

class Save extends Component {
  isFavorite = symbol => this.props.favorites.symbols.filter(favorite => favorite === symbol).length

  onPress = quote => {
    this.props.toggleFavorite(quote.symbol)

    const text = this.isFavorite(quote.symbol) ? 'removed from' : 'added to'

    Toast.show({
      text: `${quote.symbol} ${text} favorites.`,
      textStyle: styles.toast.text,
      position: 'top',
      style: styles.toast.self
    })
  }

  render() {
    const { quote } = this.props.stock.data

    return (
      <View>
        {!this.props.autoSuggest && (
          <Fab
            style={this.isFavorite(quote.symbol) ? styles.favorite : styles.notFavorite}
            position="bottomRight"
            onPress={() => this.onPress(quote)}
          >
            <Icon ios="ios-heart" android="md-heart" style={styles.icon} />
          </Fab>
        )}
      </View>
    )
  }
}

const styles = {
  favorite: {
    backgroundColor: '#b257c5'
  },
  notFavorite: {
    backgroundColor: BLUE3
  },
  icon: {
    color: '#fff'
  },
  toast: {
    self: {
      backgroundColor: BLUE0,
      borderRadius: 6,
      marginTop: 16 + StatusBar.currentHeight || 0,
      marginRight: 16,
      marginLeft: 16,
      minHeight: 0,
      paddingTop: 16,
      paddingBottom: 16
    },
    text: {
      color: TEXT_NORMAL,
      fontSize: 13,
      textAlign: 'center'
    }
  }
}

const mapStateToProps = state => {
  return {
    autoSuggest: state.autoSuggest,
    favorites: state.favorites,
    stock: state.stock,
    symbol: state.symbol
  }
}

const mapDispatchToProps = {
  toggleFavorite
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Save)
