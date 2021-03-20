import React from 'react';

/** Свойства кнопки */
export interface IOneLineProps {
	/** Содержимое */
	children?: React.ReactNode;
	className?: string;
}
/** Кнопка */
export class OneLine extends React.PureComponent<IOneLineProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<div className={`oneline ${this.props.className ?? ''}`}>
				{this.props.children}
			</div>
		);
	}
}
