import axios from 'axios'

// ------------------------------------
// Constants
// ------------------------------------
export const SET_GENDERS = 'SET_GENDERS',
	FIRST_NAME_CHANGED = 'FIRST_NAME_CHANGED',
	LAST_NAME_CHANGED = 'LAST_NAME_CHANGED',
	EMAIL_CHANGED = 'EMAIL_CHANGED',
	LOGIN_CHANGED = 'LOGIN_CHANGED',
	GENDER_CHANGED = 'GENDER_CHANGED',
	BIRTH_DATE_CHANGED = 'BIRTH_DATE_CHANGED',
	PASSWORD_CHANGED = 'PASSWORD_CHANGED',
	REPEAT_PASSWORD_CHANGED = 'REPEAT_PASSWORD_CHANGED';

// ------------------------------------
// Actions
// ------------------------------------

export const setGendersInfo = (genders) => {
	return {
		type: SET_GENDERS,
		payload: genders
	}
}

export const loginChangeHandler = (e) => {
	return {
		type: LOGIN_CHANGED,
		payload: e.target.value
	}
}

export const firstNameChangeHandler = (e) => {
	return {
		type: FIRST_NAME_CHANGED,
		payload: e.target.value
	}
}

export const lastNameChangeHandler = (e) => {
	return {
		type: LAST_NAME_CHANGED,
		payload: e.target.value
	}
}

export const emailChangeHandler = (e) => {
	return {
		type: EMAIL_CHANGED,
		payload: e.target.value
	}
}

export const genderChangeHandler = (e) => {
	return {
		type: GENDER_CHANGED,
		payload: e.target.value
	}
}

export const birthChangeHandler = (e) => {
	return {
		type: BIRTH_DATE_CHANGED,
		payload: e.target.value
	}
}

export const passwordChangeHandler = (e) => {
	return {
		type: PASSWORD_CHANGED,
		payload: e.target.value
	}
}

export const repeatPasswordChangeHandler = (e) => {
	return {
		type: REPEAT_PASSWORD_CHANGED,
		payload: e.target.value
	}
}

// ------------------------------------
// Functions
// ------------------------------------

export const formSubmitHandler = (e) => {
	e.preventDefault();

	return (dispatch, getState) => {
		//dispatch(loginLoadingHandler(true));

		var data = getState().register;

		axios({
				method: 'Post',
				url: '/Account/Register',
				data: {
					FirstName: data.firstName,
					LastName: data.lastName,
					Gender: data.gender,
					BirthDate: data.birthDate,
					Account: {
						Login: data.login,
						Email: data.email,
						Password: data.password,
						RepeatPassword: data.repeatPassword
					}
				}
			})
			.then(function(response) {
				console.log(response);
				// dispatch(loginSuccessHandler());
				// axiosUtil.setBaererToken(response.data.token);
				//
				// const authInfo = {
				// 	access_token: response.data.token,
				// 	expires: response.data.expires
				// }
				//
				// dispatch(saveUserAuthInfo(authInfo, data.isRemember))
				// dispatch(fetchUserInfo())
				// dispatch(loginLoadingHandler(false));

				browserHistory.push('/');
			}).catch(function(error) {
				//dispatch(loginLoadingHandler(false));
			});
	}
}

export const actions = {
	firstNameChangeHandler,
	lastNameChangeHandler,
	emailChangeHandler,
	loginChangeHandler,
	genderChangeHandler,
	birthChangeHandler,
	passwordChangeHandler,
	repeatPasswordChangeHandler,
	formSubmitHandler
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
	[SET_GENDERS]: (state, action) => Object.assign({}, state, action.payload),
	[FIRST_NAME_CHANGED]: (state, action) => Object.assign({}, state, {
		firstName: action.payload
	}),
	[LAST_NAME_CHANGED]: (state, action) => Object.assign({}, state, {
		lastName: action.payload
	}),
	[EMAIL_CHANGED]: (state, action) => Object.assign({}, state, {
		email: action.payload
	}),
	[LOGIN_CHANGED]: (state, action) => Object.assign({}, state, {
		login: action.payload
	}),
	[GENDER_CHANGED]: (state, action) => Object.assign({}, state, {
		gender: action.payload
	}),
	[BIRTH_DATE_CHANGED]: (state, action) => Object.assign({}, state, {
		birthDate: action.payload
	}),
	[PASSWORD_CHANGED]: (state, action) => Object.assign({}, state, {
		password: action.payload
	}),
	[REPEAT_PASSWORD_CHANGED]: (state, action) => Object.assign({}, state, {
		repeatPassword: action.payload
	}),
}

const initialState = {
	genders: [],
	firstName: '',
	lastName: '',
	login: '',
	email: '',
	gender: '',
	birthDate: null,
	password: '',
	repeatPassword: ''
}

export default function accountReducer(state = initialState, action) {
	const handler = ACTION_HANDLERS[action.type]
	return handler ? handler(state, action) : state
}
