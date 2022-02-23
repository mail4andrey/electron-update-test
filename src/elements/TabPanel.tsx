import { Box, Typography } from '@material-ui/core';
import React from 'react';


/** Свойства кнопки */
export interface ITabPanelProps {
	children?: React.ReactNode;
	index: number;
	value?: number;
}

/** Кнопка */
export class TabPanel extends React.PureComponent<ITabPanelProps> {
	/** Отображение */
	public render(): React.ReactNode {
		const { children, value, index } = this.props;

		const content = value === index ? (
			<Box p={3}>
				{children}
			</Box>
		) : null;

		return (
			<div
				role="tabpanel"
				hidden={value !== index}
				id={`simple-tabpanel-${index}`}
				aria-labelledby={`simple-tab-${index}`}
			>
				{content}
			</div>
		);
	}
}
