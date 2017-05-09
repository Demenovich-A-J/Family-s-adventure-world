import { connect } from 'react-redux'
import AchivmentDetails from '../components/AchivmentDetails'
import { actions } from '../modules/achivmentDetails'

const mapDispatchToProps = {
  submitAchivmentInfo: actions.submitAchivmentInfo
}
const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(AchivmentDetails)
