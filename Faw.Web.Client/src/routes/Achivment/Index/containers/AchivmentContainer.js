import { connect } from 'react-redux'
import Achivment from '../components/Achivment'
import { actions } from '../modules/achivment'

const mapDispatchToProps = {
}
const mapStateToProps = (state) => ({
  achivments: state.achivment.achivments
})

export default connect(mapStateToProps, mapDispatchToProps)(Achivment)
