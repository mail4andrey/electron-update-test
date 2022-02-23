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
	onChange: (event: any, value: SpinnerSettingsFrontZoomItemModel) => void;
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
			>
				<TableCell>
					{this.props.title}
				</TableCell>
				<TableCell align='right'>
					<Checkbox
						checked={this.props.disable}
						onChange={this.onDisableChange}
					/>
				</TableCell>
				<TableCell align='right'>
					<Checkbox
						disabled={this.props.disable}
						checked={this.props.beforeSlow}
						onChange={this.onBeforeSlowChange}
					/>
				</TableCell>
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
