import React, { Component } from 'react'
import { Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { format, subDays } from 'date-fns'
import { VictoryGroup, VictoryAxis, VictoryLine, VictoryTheme } from 'victory-native'

class Chart extends Component {
  convertXaxis = x => -x + 30

  positiveOrNegativeOverTime = (x, y) =>
    x > y ? { ...styles.chart.line, ...styles.negative } : { ...styles.chart.line, ...styles.positive }

  render() {
    const { chart } = this.props.stock.data
    const { width } = Dimensions.get('window')

    return (
      <VictoryGroup height={250} width={width + 36} style={styles.chart} theme={VictoryTheme.material}>
        <VictoryLine
          animate={{
            duration: 1000,
            onLoad: { duration: 500 }
          }}
          data={chart}
          style={this.positiveOrNegativeOverTime(chart[0].close, chart[chart.length - 1].close)}
          y="close"
        />
        <VictoryAxis
          crossAxis
          fixLabelOverlap={true}
          style={styles.chart}
          tickFormat={t => format(subDays(new Date(), this.convertXaxis(t)), 'MMM D')}
        />
        <VictoryAxis dependentAxis fixLabelOverlap={true} style={styles.chart.grid} />
      </VictoryGroup>
    )
  }
}

const styles = {
  positive: {
    data: {
      stroke: '#0f9d58'
    }
  },
  negative: {
    data: {
      stroke: '#d23f31'
    }
  },
  chart: {
    grid: {
      stroke: '#14171d'
    },
    line: {
      labels: {
        fill: 'transparent'
      }
    },
    parent: {
      marginLeft: -22
    }
  }
}

const mapStateToProps = state => {
  return {
    stock: state.stock,
    symbols: state.symbols
  }
}

export default connect(mapStateToProps)(Chart)
