import React, { useState, useEffect } from 'react'

import { connect } from 'react-redux'
import { Switch } from 'react-router-dom'

// class ReactRouterDataSwitchInternal extends React.Component {
// 	constructor(props) {
// 		super(props)

// 		this.state = {}
// 	}

// 	componentWillReceiveProps() {
// 		if (this.state.loading || IS_SERVER) {
// 			return
// 		}

// 		this.setState({ loading: true })

// 		this.fetchData()
// 			.catch(err => {
// 				console.log(err)
// 			})
// 			.then(() => {
// 				this.setState({ loading: false })
// 			})
// 	}

// 	async fetchData() {
// 		const result = await fetch(
// 			'/api/react-router-data?url=' + encodeURIComponent(location.pathname)
// 		)
// 		const data = await result.json()

// 		this.props.dispatch({
// 			type: 'UPDATE_STORE',
// 			payload: data
// 		})
// 	}

// 	render() {
// 		if (IS_SERVER) {
// 			return <Switch>{this.props.children}</Switch>
// 		} else {
// 			if (this.state.loading) {
// 				return (
// 					<section className="section">
// 						<h1 className="section__title">Loading</h1>
// 					</section>
// 				)
// 			}

// 			return <Switch>{this.props.children}</Switch>
// 		}
// 	}
// }

const ReactRouterDataSwitchInternal = props => {
	const [isLoading, setLoading] = useState(false)

	const fetchData = async () => {
		const result = await fetch(
			'/api/react-router-data?url=' + encodeURIComponent(location.pathname)
		)
		const data = await result.json()

		props.dispatch({
			type: 'UPDATE_STORE',
			payload: data
		})
	}

	if (isLoading || IS_SERVER) {
		if (IS_SERVER) {
			return <Switch>{props.children}</Switch>
		} else {
			if (isLoading) {
				fetchData()
					.catch(err => {
						console.log(err)
					})
					.then(() => {
						setLoading(false)
					})

				return (
					<section className="section">
						<h1 className="section__title">Loading</h1>
					</section>
				)
			}

			// setLoading(true)

			return <Switch>{props.children}</Switch>
		}
	}

	fetchData()
		.catch(err => {
			console.log(err)
		})
		.then(() => {
			setLoading(false)
		})

	return <Switch>{props.children}</Switch>
}

export const ReactRouterDataSwitch = connect()(ReactRouterDataSwitchInternal)
