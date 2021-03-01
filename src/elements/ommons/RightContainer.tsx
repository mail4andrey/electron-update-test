import React from 'react';

/** Свойства кнопки */
export interface IRightContainerProps {
	/** Содержимое */
	children?: React.ReactNode;
}
/** Кнопка */
export class RightContainer extends React.PureComponent<IRightContainerProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<div className='right-container'>
				{this.props.children}
			</div>
		);
	}
}
