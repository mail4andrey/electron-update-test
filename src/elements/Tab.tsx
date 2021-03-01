import { Tab as UiTab } from '@material-ui/core';
import React from 'react';

// export inte

/** Свойства кнопки */
export interface ITabProps {
	disableFocusRipple?: boolean;
	fullWidth?: boolean;
	icon?: string | React.ReactElement;
	/** Описание */
	label?: React.ReactNode;
	onChange?: (event: React.ChangeEvent<{ checked: boolean; }>, value: any) => void;
	onClick?: React.EventHandler<any>;
	selected?: boolean;
	style?: React.CSSProperties;
	textColor?: string | 'secondary' | 'primary' | 'inherit';
	value?: any;
	wrapped?: boolean;

	// id?: string;
	// 'aria-controls'?: string;
	index?: number;
}

/** Кнопка */
export class Tab extends React.PureComponent<ITabProps> {

	/** Отображение */
	public render(): React.ReactNode {
		const tabProps = this.a11yProps(this.props.index);
		return (
			<UiTab
				{...this.props}
				{...tabProps}
			/>
		);
	}


	/** z */
	private a11yProps(index: any): {id: string; 'aria-controls': string;} {
		return {
			id: `simple-tab-${index}`,
			'aria-controls': `simple-tabpanel-${index}`,
		};
	}
}
