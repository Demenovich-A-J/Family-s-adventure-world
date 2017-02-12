import React from 'react'

import {
	connect
} from 'react-redux'

import Register from '../components/Register'

const mapDispatchToProps = {
}

const mapStateToProps = (state) => ({
	genders: state.register.genders
})

export default connect(mapStateToProps, mapDispatchToProps)(Register)
