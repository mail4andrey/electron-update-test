import React from 'react';


import { IBasicProps } from './common/props/IBasicProps';

/** Основное окно приложения */
export class Layout extends React.PureComponent<IBasicProps> {
	/** */
	// public componentDidMount(): void {
	// }

	// /** */
	// public componentWillUnmount(): void {
	// }

	/** Отображение */
	public render(): React.ReactNode {
		return (
			<div
				className='background-whitesmoke'
			>
				{this.props.children}
			</div>
		);
	}
}
