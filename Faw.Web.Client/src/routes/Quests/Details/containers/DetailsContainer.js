import { connect } from 'react-redux'
import Details from '../components/Details'
import { actions } from '../modules/details'

const mapDispatchToProps = {
}
const mapStateToProps = (state) => ({
  quest: state.questDetails.quest,
  questDetailsLoading: state.questDetails.questDetailsLoading,
  isUserQuest: state.questDetails.isUserQuest
})

export default connect(mapStateToProps, mapDispatchToProps)(Details)
