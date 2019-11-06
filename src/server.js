import * as React from 'react'

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { StaticRouter } from 'react-router'
import { renderToString } from 'react-dom/server'
import { render } from 'app'
import { Router } from 'express'

import { reactRouterLoadData } from 'data/reactRouterLoadData'

import pageTemplate from 'pageTemplate'

const createMiddleware = ({ assets }) => {
	const renderHtml = async req => {
		const data = await reactRouterLoadData(req.url)

		const store = createStore(state => state, data)

		const context = {}
		const content = renderToString(
			<Provider store={store}>
				<StaticRouter location={req.url} context={context}>
					{render()}
				</StaticRouter>
			</Provider>
		)

		return pageTemplate({
			css: assets.main.css,
			js: assets.main.js,
			content,
			data: JSON.stringify(data)
		})
	}

	function serverMiddleware(req, res, next) {
		renderHtml(req, res)
			.then(content => {
				res.send(content)
			})
			.catch(err => {
				res.status(500).json({
					message: err.message,
					stack: err.stack
				})
			})
	}

	const appRouter = new Router()

	// Data loading
	appRouter.get('/api/react-router-data', async (req, res, next) => {
		try {
			res.json(await reactRouterLoadData(req.query.url))
		} catch (err) {
			res.status(500).json({
				message: err.message,
				stack: err.stack
			})
		}
	})

	// Other routes
	appRouter.get('/*', serverMiddleware)

	return appRouter
}

export default createMiddleware
