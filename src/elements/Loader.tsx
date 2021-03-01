import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';

/** Свойства кнопки */
export interface ICircularProgressProps {
}

/** */
export class Loader extends React.PureComponent<ICircularProgressProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<CircularProgress />
		);
	}
}
