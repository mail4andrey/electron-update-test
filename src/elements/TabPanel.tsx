// import { TabPanel as UiTabPanel } from '@material-ui/core';
import { Box, Typography } from '@material-ui/core';
import React from 'react';

// export inte

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
		// const { children, value, index, ...other } = this.props;
		const { children, value, index } = this.props;

		const content = value === index ? (
			<Box p={3}>
				{/* <Typography> */}
				{children}
				{/* </Typography> */}
			</Box>
		) : null;

		return (
			<div
				role="tabpanel"
				hidden={value !== index}
				id={`simple-tabpanel-${index}`}
				aria-labelledby={`simple-tab-${index}`}
				// {...other}
			>
				{content}
				{/* {value === index && (
					// <Box p={3}>
					// 	<Typography>{children}</Typography>
					// </Box>
				)} */}
			</div>
		);
		// return (
		// 	<UiTabPanel
		// 		{...this.props}
		// 	/>
		// );
	}
}
