import Home from './components/Home'
import requireAuthorization from '../../infrastructure/requireAuthorization'

// Sync route definition
export default {
  component : requireAuthorization(Home)
}
