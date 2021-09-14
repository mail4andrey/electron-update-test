import { observer } from 'mobx-react';
import React from 'react';

import { IntroOutroSettingsItem } from './IntroOutroSettingsItem';
import { IntroOutroSettingsItemModel, IntroOutroSettingsViewItemModel } from './IntroOutroSettingsItemModel';
import { IntroOutroSettingsModel } from './IntroOutroSettingsModel';

import { ItemComponent } from '../../../../../common/ItemComponent';
import { Button } from '../../../../../elements/Button';
import { FormControl } from '../../../../../elements/FormControl';
import { PlaylistAdd } from '../../../../../elements/Icons';
import type { ITextFieldChangeEventProps } from '../../../../../elements/TextField';
import { Typography } from '../../../../../elements/Typography';
import { MapperHelper } from '../../../../../helpers/MapperHelper';
import type { LanguageEnum } from '../../../../../src-front/models/LanguageEnum';
import { SettingsLocalization } from '../../SettingsLocalization';
import { FormControlLabel } from '../../../../../elements/FormControlLabel';
import { Checkbox } from '../../../../../elements/Checkbox';


/** */
export interface IntroOutroSettingsTabProps extends IntroOutroSettingsModel {
	language?: LanguageEnum;

	/** */
	// settings?: IntroOutroSettingsModel;

	onChange: (event: ITextFieldChangeEventProps, settings: IntroOutroSettingsModel) => void;
	// onItemChange: (event: ITextFieldChangeEventProps, setting: IntroOutroSettingsItemModel) => void;
	// onChange: (event: React.MouseEvent<Element, MouseEvent>, settings: IntroOutroSettingsModel) => void;

	onAddClick?: (event: React.MouseEvent<Element, MouseEvent>) => void;
	// onChange?: (event: ITextFieldChangeEventProps, id?: number) => void;
	onDeleteClick?: (event: React.MouseEvent<Element, MouseEvent>, id?: number) => void;
	onUpClick?: (event: React.MouseEvent<Element, MouseEvent>, id?: number) => void;
	onDownClick?: (event: React.MouseEvent<Element, MouseEvent>, id?: number) => void;
}

// @provider(SettingsController, SettingsStore)
@observer
/** */
export class IntroOutroSettingsTab extends React.PureComponent<IntroOutroSettingsTabProps> {
	/** Отображение */
	public render(): React.ReactNode {
		const { language } = this.props;
		const items = this.props.items?.map((setting: IntroOutroSettingsItemModel, index: number, array: IntroOutroSettingsItemModel[]) => {
			const disableUpButton = index === 0;
			const disableDownButton = index === array.length - 1;
			const title = (
				<Typography
					variant='h6'
				>
					{setting.name}
				</Typography>
			);
			return (
				<div
					key={index}
					className='padding-bottom-12px'
				>
					<ItemComponent
						language={language}
						disabled={!this.props.enable}
						removeButtonTitle={SettingsLocalization.common.deleteButton(language)}
						disableUpButton={disableUpButton}
						disableDownButton={disableDownButton}
						showUpButton={true}
						showDownButton={true}
						showDeleteButton={true}
						position={index}
						title={title}

						onUpClick={this.onUpClick}
						onDownClick={this.onDownClick}
						onDeleteClick={this.onDeleteClick}
					>
						<IntroOutroSettingsItem
							{...setting}
							language={language}
							disabled={!this.props.enable}
							onChange={this.onSettingsItemChange}
						/>
					</ItemComponent>

					{/* <PathSelectorComponent
						id={index}
						path={path}
						removeButtonTitle={SettingsLocalization.introOutroTab.pathRemoveButtonTitle(language)}
						selectButtonTitle={SettingsLocalization.introOutroTab.pathSelectButtonTitle(language)}
						disableUpButton={disableUpButton}
						disableDownButton={disableDownButton}
						showUpButton={true}
						showDownButton={true}
						showDeleteButton={true}
						onPathChange={this.props.onChange}
						onUpClick={this.props.onUpClick}
						onDownClick={this.props.onDownClick}
						onDeleteClick={this.props.onDeleteClick}
					/> */}
				</div>
			);
		});

		return (
			<div className=''>
				<Typography
					variant='h5'
				>
					{SettingsLocalization.introOutroTab.title(language)}
				</Typography>
				<FormControl
					// className='padding-right-12px-important'
					fullWidth={true}
					margin='dense'
				>
					<FormControlLabel
						control={
							<Checkbox
								checked={this.props.enable}
								onChange={this.onEnableChange}
								color='primary'
							/>
						}
						label={SettingsLocalization.common.enable(language)}
					/>
				</FormControl>
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<Button
						onClick={this.onAddClick}
						color='primary'
						variant='contained'
						startIcon={<PlaylistAdd />}
						disabled={!this.props.enable}
					>
						{SettingsLocalization.common.addButton(language)}
					</Button>
				</FormControl>
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					{items}
				</FormControl>
			</div>
		);
	}

	/** */
	private readonly onEnableChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean): void => {
		this.onChange(event, { enable: checked });
	};

	/** */
	private readonly onSettingsItemChange = (event: any, value: IntroOutroSettingsItemModel): void => {
		const { items } = this.props;
		const changeItem = items?.find(item => item.guid === value.guid);
		if (items && changeItem) {
			MapperHelper.mapValues(value, changeItem);
			this.onChange(event, {items});
		}
	};

	/** */
	private readonly onAddClick = (event: React.MouseEvent<Element, MouseEvent>): void => {
		const items = this.props.items ?? [];
		const basename = 'New item';
		let findname = basename;
		let foundedName = false;
		let index = 0
		do {
			const item = items.find(item => item.name === findname);
			if (!item) {
				foundedName = true;
			} else {
				index++;
				findname = basename + ' ' + index;
			}
		} while (!foundedName);
		const newItem = new IntroOutroSettingsViewItemModel();
		newItem.name = findname;
		items.push(newItem);
		this.onChange(event, { items });
	};

	/** */
	private readonly onDeleteClick = (_event: React.MouseEvent<Element, MouseEvent>, id: number): void => {
		const { items } = this.props;
		if (items && id >= 0 && id < items.length) {
			items.splice(id, 1);
			this.onChange(event, { items });
		}
	};

	/** */
	private readonly onUpClick = (_event: React.MouseEvent<Element, MouseEvent>, id: number): void => {
		const { items } = this.props;
		if (items && id >= 1 && id < items.length) {
			const newValue = items[id - 1];
			items[id - 1] = items[id];
			items[id] = newValue;
			this.onChange(event, { items });
		}
	};

	/** */
	private readonly onDownClick = (_event: React.MouseEvent<Element, MouseEvent>, id: number): void => {
		const { items } = this.props;
		if (items && id >= 0 && id < items.length - 1) {
			const newValue = items[id + 1];
			items[id + 1] = items[id];
			items[id] = newValue;
			this.onChange(event, { items });
		}
	};

	/** */
	private readonly onChange = (event: any, value: IntroOutroSettingsModel): void => {
		const result = new IntroOutroSettingsModel();

		MapperHelper.mapValues(this.props, result);
		MapperHelper.mapValues(value, result);

		this.props.onChange(event, result);
	};

	/** */
	private readonly onItemChange = (event: any, value: IntroOutroSettingsItemModel): void => {
		const result = new IntroOutroSettingsItemModel();

		MapperHelper.mapValues(this.props, result);
		MapperHelper.mapValues(value, result);

		// this.props.onItemChange(event, result);
	};
}
