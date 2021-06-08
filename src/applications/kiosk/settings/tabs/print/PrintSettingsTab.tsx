import { observable } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';


import { PrinterModel, PrintFitOnPageEnum, PrintLayoutEnum, PrintSettingsModel, PrintSettingsViewModel } from './PrintSettingsModel';
import { SettingsLocalization } from '../../SettingsLocalization';

import { Button } from '../../../../../elements/Button';
import { OneLine } from '../../../../../elements/commons/OneLine';
import { FormControl } from '../../../../../elements/FormControl';
import { CropLandscape, CropPortrait, PhotoSizeSelectActual, PhotoSizeSelectLarge, Print } from '../../../../../elements/Icons';
import { InputLabel } from '../../../../../elements/InputLabel';
import { MenuItem } from '../../../../../elements/MenuItem';
import { ISelectChangeEventProps, Select } from '../../../../../elements/Select';
import { Skeleton } from '../../../../../elements/Skeleton';
import { Typography } from '../../../../../elements/Typography';
import { PrintProxy } from '../../../../../helpers/PrintProxy';
import { LanguageEnum } from '../../../../../src-front/views/LanguageEnum';


/** */
export interface PrinterSettingsTabProps {
	language?: LanguageEnum;
	settings?: PrintSettingsModel;

	onChange?: (event: ISelectChangeEventProps, settings: PrintSettingsModel) => void;
}

// @provider(SettingsController, SettingsStore)
@observer
/** */
export class PrintSettingsTab extends React.PureComponent<PrinterSettingsTabProps> {
	@observable
	private printers?: PrinterModel[];

	@observable
	private loaded = false;

	/** */
	private readonly client = new PrintProxy();

	/** */
	private readonly settings = new PrintSettingsViewModel();

	/** */
	public async componentDidMount(): Promise<void> {
		this.loaded = false;
		try {
			this.settings.printer = this.props.settings?.printer;
			this.settings.layout = this.props.settings?.layout;
			this.settings.fitOnPage = this.props.settings?.fitOnPage;
			this.printers = await this.client.getPrinters();
		} catch (error) {
			console.error(error);
		}
		this.loaded = true;
	}

	/** Отображение */
	public render(): React.ReactNode {
		const { language } = this.props;
		const printers = this.getPrinters();
		const layout = this.settings.layout ?? PrintLayoutEnum.landscape;
		const layoutValues = [
			(
				<MenuItem
					key={PrintLayoutEnum.landscape}
					value={PrintLayoutEnum.landscape}
				>
					<OneLine>
						<CropLandscape />
						<div className='padding-left-12px'>
							{SettingsLocalization.printerTab.layoutEnum(language, PrintLayoutEnum.landscape)}
						</div>
					</OneLine>
				</MenuItem>
			), (
				<MenuItem
					key={PrintLayoutEnum.portrait}
					value={PrintLayoutEnum.portrait}
				>
					<OneLine>
						<CropPortrait />
						<div className='padding-left-12px'>
							{SettingsLocalization.printerTab.layoutEnum(language, PrintLayoutEnum.portrait)}
						</div>
					</OneLine>
				</MenuItem>
			)
		];
		const fitOnPage = this.settings.fitOnPage ?? PrintFitOnPageEnum.contain;
		const fitOnPageValues = [
			(
				<MenuItem
					key={PrintFitOnPageEnum.contain}
					value={PrintFitOnPageEnum.contain}
				>
					<OneLine>
						<PhotoSizeSelectLarge />
						<div className='padding-left-12px'>
							{SettingsLocalization.printerTab.fitOnPageEnum(language, PrintFitOnPageEnum.contain)}
						</div>
					</OneLine>
				</MenuItem>
			), (
				<MenuItem
					key={PrintFitOnPageEnum.cover}
					value={PrintFitOnPageEnum.cover}
				>
					<OneLine>
						<PhotoSizeSelectActual />
						<div className='padding-left-12px'>
							{SettingsLocalization.printerTab.fitOnPageEnum(language, PrintFitOnPageEnum.cover)}
						</div>
					</OneLine>
				</MenuItem>
			)
		];
		return (
			<div className=''>
				<Typography
					variant='h5'
				>
					{SettingsLocalization.printerTab.title(language)}
				</Typography>
				{printers}
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<InputLabel>
						{SettingsLocalization.printerTab.layoutName(language)}
					</InputLabel>
					<Select
						value={layout}
						onChange={this.onLayoutChange}
						// className='min-width-200px'
					>
						{layoutValues}
					</Select>
				</FormControl>
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<InputLabel>
						{SettingsLocalization.printerTab.fitOnPageName(language)}
					</InputLabel>
					<Select
						value={fitOnPage}
						onChange={this.onFitOnPageChange}
						// className='min-width-200px'
					>
						{fitOnPageValues}
					</Select>
				</FormControl>
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<Button
						onClick={this.onTestPrint}
						color='primary'
						variant='contained'
						startIcon={<Print />}
					>
						{SettingsLocalization.printerTab.testPrintButton(language)}
					</Button>
				</FormControl>
			</div>
		);
	}

	/** */
	private readonly getPrinters = (): React.ReactNode => {
		const { language } = this.props;
		if (!this.loaded) {
			return (
				<Skeleton
					height={60}
				/>
			);
		}

		const printer = this.settings.printer
			?? this.printers?.find((printerItem: PrinterModel) => printerItem.isDefault)?.name;

		const printers = this.printers?.map((printerItem: PrinterModel) => (
			<MenuItem
				key={printerItem.name}
				value={printerItem.name}
			>
				{printerItem.displayName}
			</MenuItem>
		));

		return (
			<FormControl
				fullWidth={true}
				margin='dense'
			>
				<InputLabel>
					{SettingsLocalization.printerTab.printerName(language)}
				</InputLabel>
				<Select
					value={printer}
					onChange={this.onPrinterChange}
					// className='min-width-200px'
					// displayEmpty={true}
					// renderValue={this.getLoader}
				>
					{printers}
				</Select>
			</FormControl>
		);
	};

	/** */
	private readonly onPrinterChange = (event: ISelectChangeEventProps): void => {
		const value = event.target.value as string;
		this.settings.printer = value;
		this.onPrintSettingsChange(event);
	};

	/** */
	private readonly onLayoutChange = (event: ISelectChangeEventProps): void => {
		const value = event.target.value as PrintLayoutEnum;
		this.settings.layout = value;
		this.onPrintSettingsChange(event);
	};

	/** */
	private readonly onFitOnPageChange = (event: ISelectChangeEventProps): void => {
		const value = event.target.value as PrintFitOnPageEnum;
		this.settings.fitOnPage = value;
		this.onPrintSettingsChange(event);
	};

	/** */
	private readonly onTestPrint = async (_event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
		try {
			const settings = {
				printer: this.settings.printer,
				fitOnPage: this.settings.fitOnPage,
				layout: this.settings.layout
			} as PrintSettingsModel;
			await this.client.printTest(settings);
		} catch (error) {
		}
	};

	/** */
	private onPrintSettingsChange(event: ISelectChangeEventProps): void {
		const { onChange } = this.props;
		if (onChange) {
			const settings = {
				printer: this.settings.printer,
				fitOnPage: this.settings.fitOnPage,
				layout: this.settings.layout
			} as PrintSettingsModel;
			onChange(event, settings);
		}
	}
}
