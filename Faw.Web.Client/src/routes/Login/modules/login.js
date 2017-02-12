import assign from 'lodash/assign'

// ------------------------------------
// Constants
// ------------------------------------
export const SET_LOGIN_LOADING = 'SET_LOGIN_LOADING',
			 LOGIN_SUCCESS = 'LOGIN_SUCCESS',
			 LOGIN_FAILED = 'LOGIN_FAILED',
			 LOGIN_CHANGED = 'LOGIN_CHANGED',
			 PASSWORD_CHANGED = 'PASSWORD_CHANGED';


// ------------------------------------
// Actions
// ------------------------------------


export const loginChangeHandler = (e) => {
	return {
		type: LOGIN_CHANGED,
		payload: e.target.value
	}
}

export const passwordChangeHandler = (e) => {
	return {
		type: PASSWORD_CHANGED,
		payload: e.target.value
	}
}

export const loginLoadingHandler = (loading) => {
	return{
		type: SET_LOGIN_LOADING,
		payload: loading
	}
}

export const formSubmitHandler = (e) => {
	e.preventDefault();

	return (dispatch, getState) => {
		dispatch(loginLoadingHandler(true));

		return new Promise((resolve) => {
			setTimeout(() => {
				dispatch(loginLoadingHandler(false))
				resolve()
			}, 800)
		})
	}
}

export const actions = {
	loginChangeHandler,
	passwordChangeHandler,
	formSubmitHandler
}


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
	[LOGIN_CHANGED]: (state, action) => Object.assign({}, state, { login: action.payload }),
	[PASSWORD_CHANGED]: (state, action) => Object.assign({}, state, { password: action.payload }),
	[SET_LOGIN_LOADING]: (state, action) => Object.assign({}, state, { loading: action.payload })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
	loading: false,
	valid: true
}

export default function loginReducer(state = initialState, action) {
	const handler = ACTION_HANDLERS[action.type]

	return handler ? handler(state, action) : state
}
