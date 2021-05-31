import React from 'react';

/** Свойства кнопки */
export interface ILeftContainerProps {
	/** Содержимое */
	children?: React.ReactNode;
}
/** Кнопка */
export class LeftContainer extends React.PureComponent<ILeftContainerProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<div className='left-container'>
				{this.props.children}
			</div>
		);
	}
}
