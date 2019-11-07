import React from 'react'
import { Route } from 'react-router-dom'

import { ReactRouterDataNavigation } from 'components/ReactRouterDataNavigation/ReactRouterDataNavigation'
import { ReactRouterDataSwitch } from 'components/ReactRouterDataSwitch/ReactRouterDataSwitch'

import { routesConfig } from 'routes'

const ReactRouterDataExample = () => {
	return (
		<section className="section">
			<ReactRouterDataNavigation />

			<div className="section__content">
				<ReactRouterDataSwitch>
					{routesConfig.map(route => (
						<Route {...route} />
					))}
				</ReactRouterDataSwitch>
			</div>
		</section>
	)
}

export { ReactRouterDataExample }
