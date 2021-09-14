import { observer } from 'mobx-react';
import React from 'react';


import { FitWithinEnum, RenderOnEnum, VideoSettingsModel } from './VideoSettingsModel';

import { isNumber } from 'util';

import { Checkbox } from '../../../../../elements/Checkbox';
import { FormControl } from '../../../../../elements/FormControl';
import { FormControlLabel } from '../../../../../elements/FormControlLabel';
import { FormGroup } from '../../../../../elements/FormGroup';
import { FormLabel } from '../../../../../elements/FormLabel';
import { Grid } from '../../../../../elements/Grid';
import { InputAdornment } from '../../../../../elements/InputAdornment';
import { InputLabel } from '../../../../../elements/InputLabel';
import { MenuItem } from '../../../../../elements/MenuItem';
import type { ISelectChangeEventProps } from '../../../../../elements/Select';
import { Select } from '../../../../../elements/Select';
import type { ITextFieldChangeEventProps } from '../../../../../elements/TextField';
import { TextField } from '../../../../../elements/TextField';
import { Typography } from '../../../../../elements/Typography';
import { MapperHelper } from '../../../../../helpers/MapperHelper';
import type { LanguageEnum } from '../../../../../src-front/models/LanguageEnum';
import { SettingsLocalization } from '../../SettingsLocalization';


/** */
export interface VideoSettingsTabProps {
	language?: LanguageEnum;

	addThumbnail?: boolean;
	fadeIn?: boolean;
	fadeInDuration?: string;
	fadeOut?: boolean;
	fadeOutDuration?: string;
	fps?: string;
	maxBitrate?: string;
	resolutionWidth?: string;
	resolutionHeight?: string;
	fitWithin?: FitWithinEnum;
	renderOn?: RenderOnEnum;

	onChange: (event: ITextFieldChangeEventProps, settings: VideoSettingsModel) => void;
}

/**
 *
 */
@observer
/** */
export class VideoSettingsTab extends React.PureComponent<VideoSettingsTabProps> {
	/** Отображение */
	public render(): React.ReactNode {
		const { language } = this.props;

		const seconds = (
			<InputAdornment position='end'>
				{SettingsLocalization.common.seconds(language)}
			</InputAdornment>
		);
		const kbitPerSeconds = (
			<InputAdornment position='end'>
				{SettingsLocalization.videoTab.kbitPerSeconds(language)}
			</InputAdornment>
		);

		const fadeIn = (
			<div className='white-space-nowrap'>
				<FormControlLabel
					control={
						<Checkbox
							checked={this.props.fadeIn}
							onChange={this.onFadeInChange}
							color='primary'
							disabled={false}
						/>
					}
					label={SettingsLocalization.common.fadeIn(language)}
					className='width-110px'
				/>
			</div>
		);

		const fadeOut = (
			<div className='white-space-nowrap'>
				<FormControlLabel
					control={
						<Checkbox
							checked={this.props.fadeOut}
							onChange={this.onFadeOutChange}
							color='primary'
							disabled={false}
						/>
					}
					label={SettingsLocalization.common.fadeOut(language)}
					className='width-110px'
				/>
			</div>
		);

		const fadeInDurationValid = Number(this.props.fadeInDuration) >= 0;
		const fadeOutDurationValid = Number(this.props.fadeOutDuration) >= 0;
		const fpsValid = Number(this.props.fps) >= 0;
		const maxBitrateValid = Number(this.props.maxBitrate) >= 0;
		const widthValid = Number(this.props.resolutionWidth) >= 0;
		const heightValid = Number(this.props.resolutionHeight) >= 0;
		return (
			<div className=''>
				<Typography
					variant='h5'
				>
					{SettingsLocalization.videoTab.title(language)}
				</Typography>

				{/* <Grid
					container={true}
					spacing={1}
					alignItems='center'
					justify='space-evenly'
					direction='row'
				>
					<Grid
						item={true}
					> */}

				<FormControl
					component='fieldset'
					fullWidth={true}
					margin='dense'
				>
					<FormGroup>
						<FormControl
							fullWidth={true}
							margin='dense'
						>
							<InputLabel id='fitWithin-select-label'>
								{SettingsLocalization.videoTab.fitWithin(language)}
							</InputLabel>
							<Select
								labelId='fitWithin-select-label'
								value={this.props.fitWithin}
								onChange={this.onFitWithinChange}
							>
								<MenuItem value={FitWithinEnum.fitAll}>{SettingsLocalization.videoTab.fitWithinItemDescription(language, FitWithinEnum.fitAll)}</MenuItem>
								<MenuItem value={FitWithinEnum.byWidth}>{SettingsLocalization.videoTab.fitWithinItemDescription(language, FitWithinEnum.byWidth)}</MenuItem>
								<MenuItem value={FitWithinEnum.byHeight}>{SettingsLocalization.videoTab.fitWithinItemDescription(language, FitWithinEnum.byHeight)}</MenuItem>
							</Select>
						</FormControl>
						<FormControl
							// className='padding-right-12px-important'
							fullWidth={true}
							margin='dense'
						>
							<TextField
								// label={fadeIn}
								// label={SettingsLocalization.videoTab.duration(language)}
								value={this.props.fadeInDuration}
								placeholder='0.0'
								disabled={!this.props.fadeIn}
								// defaultValue={0}
								// variant='outlined'
								onChange={this.onFadeInDurationChange}
								error={!fadeInDurationValid}
								// fullWidth={true}
								InputProps={{
									startAdornment: fadeIn,
									endAdornment: seconds
								}}
							/>
						</FormControl>
						<FormControl
							// className='padding-right-12px-important'
							fullWidth={true}
							margin='dense'
						>
							<TextField
								// label={fadeOut}
								// label={SettingsLocalization.videoTab.duration(language)}
								value={this.props.fadeOutDuration}
								placeholder='0.0'
								disabled={!this.props.fadeOut}
								// defaultValue={0}
								// variant='outlined'
								error={!fadeOutDurationValid}
								onChange={this.onFadeOutDurationChange}
								// fullWidth={true}
								InputProps={{
									startAdornment: fadeOut,
									endAdornment: seconds
								}}
							/>
						</FormControl>
						<FormControl
							// className='padding-right-12px-important'
							fullWidth={true}
							margin='dense'
						>
							<FormControlLabel
								control={
									<Checkbox
										checked={this.props.addThumbnail}
										onChange={this.onAddThumbnailChange}
										color='primary'
									/>
								}
								label={SettingsLocalization.videoTab.addThumbnail(language)}
							/>
						</FormControl>
					</FormGroup>
				</FormControl>
				{/* </Grid>
					<Grid
						item={true}
					> */}
				<FormControl
					fullWidth={true}
					component='fieldset'
					margin='dense'
					// variant='filled'
				>
					<FormLabel
						component='legend'
					>
						<Typography
							variant='h5'
						>
							{SettingsLocalization.videoTab.encode(language)}
						</Typography>
					</FormLabel>
					<FormGroup
						// row={true}
						// className='align-items-baseline'
					>
						<FormControl
							// className='padding-right-12px-important'
							fullWidth={true}
							margin='dense'
						>
							<TextField
								label={SettingsLocalization.videoTab.width(language)}
								value={this.props.resolutionWidth}
								error={!widthValid}
								onChange={this.onWidthChange}
							/>
						</FormControl>
						<FormControl
							// className='padding-right-12px-important'
							fullWidth={true}
							margin='dense'
						>
							<TextField
								label={SettingsLocalization.videoTab.height(language)}
								value={this.props.resolutionHeight}
								error={!heightValid}
								onChange={this.onHeightChange}
							/>
						</FormControl>
						<FormControl
							// className='padding-right-12px-important'
							fullWidth={true}
							margin='dense'
						>
							<TextField
								label={SettingsLocalization.videoTab.fps(language)}
								value={this.props.fps}
								error={!fpsValid}
								onChange={this.onFpsChange}
							/>
						</FormControl>
						<FormControl
							// className='padding-right-12px-important'
							fullWidth={true}
							margin='dense'
						>
							<TextField
								label={SettingsLocalization.videoTab.maxBitrate(language)}
								value={this.props.maxBitrate}
								error={!maxBitrateValid}
								onChange={this.onMaxBitrateChange}
								InputProps={{
									// startAdornment: fadeOut,
									endAdornment: kbitPerSeconds
								}}
							/>
						</FormControl>
						<FormControl
							// className='padding-right-12px-important'
							fullWidth={true}
							margin='dense'
						>
							<InputLabel id='renderOn-select-label'>
								{SettingsLocalization.videoTab.renderOn(language)}
							</InputLabel>
							<Select
								// label={SettingsLocalization.videoTab.renderOn(language)}
								labelId='renderOn-select-label'
								value={this.props.renderOn}
								onChange={this.onRenderOnChange}
							>
								<MenuItem value={RenderOnEnum.cpu}>{SettingsLocalization.videoTab.renderOnItemDescription(language, RenderOnEnum.cpu)}</MenuItem>
								<MenuItem value={RenderOnEnum.nvidiaH264}>{SettingsLocalization.videoTab.renderOnItemDescription(language, RenderOnEnum.nvidiaH264)}</MenuItem>
								<MenuItem value={RenderOnEnum.nvidiaNvench}>{SettingsLocalization.videoTab.renderOnItemDescription(language, RenderOnEnum.nvidiaNvench)}</MenuItem>
								<MenuItem value={RenderOnEnum.radeon}>{SettingsLocalization.videoTab.renderOnItemDescription(language, RenderOnEnum.radeon)}</MenuItem>
							</Select>
						</FormControl>
					</FormGroup>
				</FormControl>
				{/* </Grid>
				</Grid> */}
			</div>
		);
	}

	/** */
	private readonly onAddThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean): void => {
		this.onChange(event, { addThumbnail: checked });
	};

	/** */
	private readonly onFadeInChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean): void => {
		this.onChange(event, { fadeIn: checked });
	};

	/** */
	private readonly onFadeInDurationChange = (event: ITextFieldChangeEventProps): void => {
		this.onChange(event, { fadeInDuration: event.target.value });
	};

	/** */
	private readonly onFadeOutChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean): void => {
		this.onChange(event, { fadeOut: checked });
	};

	/** */
	private readonly onFadeOutDurationChange = (event: ITextFieldChangeEventProps): void => {
		this.onChange(event, { fadeOutDuration: event.target.value });
	};

	/** */
	private readonly onWidthChange = (event: ITextFieldChangeEventProps): void => {
		this.onChange(event, { resolutionWidth: event.target.value });
	};

	/** */
	private readonly onHeightChange = (event: ITextFieldChangeEventProps): void => {
		this.onChange(event, { resolutionHeight: event.target.value });
	};

	/** */
	private readonly onFpsChange = (event: ITextFieldChangeEventProps): void => {
		this.onChange(event, { fps: event.target.value });
	};

	/** */
	private readonly onMaxBitrateChange = (event: ITextFieldChangeEventProps): void => {
		this.onChange(event, { maxBitrate: event.target.value });
	};

	/** */
	private readonly onRenderOnChange = (event: ISelectChangeEventProps, _child: React.ReactNode): void => {
		this.onChange(event, { renderOn: event.target.value as RenderOnEnum });
	};

	/** */
	private readonly onFitWithinChange = (event: ISelectChangeEventProps, _child: React.ReactNode): void => {
		this.onChange(event, { fitWithin: event.target.value as FitWithinEnum });
	};

	/** */
	private readonly onChange = (event: any, value: VideoSettingsModel): void => {
		const result = new VideoSettingsModel();

		MapperHelper.mapValues(this.props, result);
		MapperHelper.mapValues(value, result);

		this.props.onChange(event, result);
	};
}
