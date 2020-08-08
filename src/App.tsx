// import { ButtonGroup, Button } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

// import { ButtonGroup, Button } from './elements';

import { Button } from './elements/Button';
import { ButtonGroup } from './elements/ButtonGroup';


/** Основное окно приложения */
export class App extends React.PureComponent {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<div>
				<h1>{'Home page'}</h1>
				<Link to='/profile'>{'Go back to profile'}</Link>
				<div>
					<ButtonGroup
						variant='contained'
						color='primary'
					>
						<Button
							color='primary'
						>
							{'Start'}
						</Button>
						<Button
							color='secondary'
						>
							{'Stop'}
						</Button>
						<Button
							color='default'
						>
							{'Test'}
						</Button>
					</ButtonGroup>
				</div>
				{/* <ButtonGroup
					variant='contained'
					color='primary'
					aria-label='contained primary button group'>
					<Button
						variant='contained'
						color='primary'>One</Button>
					<Button>Two</Button>
					<Button>Three</Button>
				</ButtonGroup>
				<ButtonGroup
					variant='text'
					color='primary'
					aria-label='text primary button group'>
					<Button>One</Button>
					<Button>Two</Button>
					<Button>Three</Button>
				</ButtonGroup> */}
			</div>
		);
	}
}
