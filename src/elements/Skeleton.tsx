import { Skeleton as UiSkeleton } from '@material-ui/lab';
import React from 'react';

/** Свойства кнопки */
export interface ISkeletonProps {
	className?: string;
	animation?: 'pulse' | 'wave' | false;
	children?: React.ReactNode;
	height?: number | string;
	variant?: 'text' | 'rect' | 'circle';
	width?: number | string;
}
/** Кнопка */
export class Skeleton extends React.PureComponent<ISkeletonProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiSkeleton
				{...this.props}
			/>
		);
	}
}
