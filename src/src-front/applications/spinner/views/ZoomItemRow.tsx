import { remote } from 'electron';
import { observer } from 'mobx-react';
import React from 'react';
import { LanguageEnum } from '../../../models/LanguageEnum';
import { MultiplierEnum, SpinnerSettingsFrontZoomItemModel, SpinnerSettingsFrontZoomItemViewModel } from '../frontSettings/SpinnerSettingsFrontModel';
import { FormControl } from '../../../../elements/FormControl';
import { Slider, Mark } from '../../../../elements/Slider';
import { SpinnerLocalization } from '../../../localization/SpinnerLocalization';
import { TableRow } from '../../../../elements/Table';
import { TableCell } from '../../../../elements/Table';
import { Checkbox } from '../../../../elements/Checkbox';
import { MapperHelper } from '../../../../helpers/MapperHelper';

/** */
export interface ZoomItemRowProps extends SpinnerSettingsFrontZoomItemModel {
	title?: string;
	// value?: SpinnerSettingsFrontZoomItemModel;
	// language?: LanguageEnum;
	// disabled?: boolean;
	onChange: (event: any, value: SpinnerSettingsFrontZoomItemModel) => void;
	// onChangeCommitted: (event: any, value: {value: MultiplierEnum, position: number}) => void;
}

/** */
@observer
export class ZoomItemRow extends React.PureComponent<ZoomItemRowProps> {

	/** Отображение */
	public render(): React.ReactNode {
		if (!this.props.guid) {
			return null;
		}


		return (
			<TableRow
				key={this.props.guid}
				// sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
			>
				<TableCell>
				{/* <TableCell component="th" scope="row"> */}
					{this.props.title}
				</TableCell>
				<TableCell align='right'>
					<Checkbox
						checked={this.props.disable}
						onChange={this.onDisableChange}
						// color='primary'
					/>
				</TableCell>
				<TableCell align='right'>
					<Checkbox
						disabled={this.props.disable}
						checked={this.props.beforeSlow}
						onChange={this.onBeforeSlowChange}
						// color='primary'
					/>
				</TableCell>
				{/* <TableCell align='right'>
					<Checkbox
						disabled={this.props.disable}
						checked={this.props.afterSlow}
						onChange={this.onAfterSlowChange}
						// color='primary'
					/>
				</TableCell>
				<TableCell align='right'>
					<Checkbox
						disabled={this.props.disable}
						checked={this.props.afterPingPong}
						onChange={this.onAfterPingPongChange}
						// color='primary'
					/>
				</TableCell>
				<TableCell align='right'>
					<Checkbox
						disabled={this.props.disable}
						checked={this.props.forPhoto}
						onChange={this.onForPhotoChange}
						// color='primary'
					/>
				</TableCell> */}
			</TableRow>
		);
	}

	/** */
	private readonly onDisableChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean): void => {
		this.onChange(event, { disable: checked });
	};

	/** */
	private readonly onBeforeSlowChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean): void => {
		this.onChange(event, { beforeSlow: checked });
	};

	/** */
	private readonly onAfterSlowChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean): void => {
		this.onChange(event, { afterSlow: checked });
	};

	/** */
	private readonly onAfterPingPongChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean): void => {
		this.onChange(event, { afterPingPong: checked });
	};

	/** */
	private readonly onForPhotoChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean): void => {
		this.onChange(event, { forPhoto: checked });
	};

	/** */
	private readonly onChange = (event: any, value: SpinnerSettingsFrontZoomItemModel): void => {
		const result = new SpinnerSettingsFrontZoomItemViewModel();

		MapperHelper.mapValues(this.props, result);
		MapperHelper.mapValues(value, result);

		this.props.onChange(event, result);
	};
}
