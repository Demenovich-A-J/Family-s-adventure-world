import { setGendersInfo } from './Register/modules/register'
import axios from 'axios'


export const loadGendersOnEnter = (store) => (nextState, replace) => {
	axios({
		method: 'Get',
		url: '/Account/FetchGendersInfo',
	}).then(function(response) {
		store.dispatch(setGendersInfo(response.data))
	})
}
