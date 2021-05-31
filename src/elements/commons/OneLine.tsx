import React from 'react';

/** Свойства кнопки */
export interface IOneLineProps {
	/** Содержимое */
	children?: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
}
/** Кнопка */
export class OneLine extends React.PureComponent<IOneLineProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<div
				className={`oneline ${this.props.className ?? ''}`}
				style={this.props.style}
			>
				{this.props.children}
			</div>
		);
	}
}
