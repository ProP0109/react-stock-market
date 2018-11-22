import React, { Component } from 'react'
import { RefreshControl, StyleSheet } from 'react-native'
import { Content, Icon, Text, View } from 'native-base'
import { connect } from 'react-redux'

import { Colors } from '../../constants'
import { getSectors } from '../../store/actions/'
import { upOrDownSymbol, formatPercentage, positiveOrNegative } from '../../helpers/priceFormat'
import { sectorIcons } from '../../helpers/sectorIcons'

class Sectors extends Component {
  onRefresh = () => this.props.getSectors()

  componentDidMount = () => this.props.getSectors()

  render() {
    const { data, loading } = this.props.sectors

    return (
      <Content refreshControl={<RefreshControl refreshing={loading} onRefresh={this.onRefresh} />}>
        <View style={styles.container}>
          {data.map((sector, index) => {
            const icon = sectorIcons(sector.name)

            return (
              <View key={index} style={styles.sector}>
                <Icon name={icon.name} style={{ fontSize: 48, height: 48, color: Colors.BLUE3 }} type={icon.type} />
                <Text style={[styles.performance, positiveOrNegative(sector.performance)]}>
                  {formatPercentage(sector.performance)}%{upOrDownSymbol(sector.performance)}
                </Text>
                <Text style={styles.name}>{sector.name}</Text>
              </View>
            )
          })}
        </View>
      </Content>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 8
  },
  sector: {
    alignItems: 'center',
    flexDirection: 'column',
    paddingHorizontal: 4,
    paddingVertical: 16,
    width: '33.33%'
  },
  performance: {
    fontSize: 13,
    marginTop: 8
  },
  name: {
    fontSize: 13,
    marginTop: 4,
    maxWidth: 110,
    textAlign: 'center',
  }
})

const mapStateToProps = state => ({
  sectors: state.sectors
})

const mapDispatchToProps = {
  getSectors
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sectors)
