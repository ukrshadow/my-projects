import { Area } from '@ant-design/plots'
import styles from './styles.module.scss'
import { CONFIG } from '../../utility/configGraph'
import PropTypes from 'prop-types'

const Graph = ({ currentTemp, allTemps }) => {
  let data = allTemps

  //reverse array whet current language is HE
  if (document.documentElement.dir === 'rtl') {
    data = [...data].reverse()
  }
  const areaColor = () => {
    if (currentTemp > 0) {
      return {
        fill: 'l(270) 1:#FFA25B   0:#FFF4F4',
      }
    } else {
      return {
        fill: 'l(270) 1:#5B8CFF   0:#FFF4F4',
      }
    }
  }
  return (
    <div className={styles.graph}>
      <Area {...CONFIG} data={data} areaStyle={areaColor} />
    </div>
  )
}

Graph.propTypes = {
  currentTemp: PropTypes.number,
  allTemps: PropTypes.array,
}

export default Graph
