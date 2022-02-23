import { observer } from 'mobx-react';
import { ProviderContext, withSnackbar } from 'notistack';
import React from 'react';
import { inject, provider } from 'react-ioc';

import { AppBar } from '../../../../elements/AppBar';
import { IconButton } from '../../../../elements/IconButton';
import { ExpandMore, PhotoCamera, Videocam, PowerSettingsNew, BatteryChargingFull, BatteryFull, Battery50, Battery20, BatteryAlert, PlaylistAdd, Delete } from '../../../../elements/Icons';
import { InputAdornment } from '../../../../elements/InputAdornment';
import { OneLine } from '../../../../elements/commons/OneLine';
import { RightContainer } from '../../../../elements/commons/RightContainer';
import { TextField, ITextFieldChangeEventProps } from '../../../../elements/TextField';
import { Toolbar } from '../../../../elements/Toolbar';
import { Tooltip } from '../../../../elements/Tooltip';
import { Typography } from '../../../../elements/Typography';
import { SpinnerViewController } from './SpinnerViewController';
import { SpinnerViewStore } from './SpinnerViewStore';
import { LanguageEnum } from '../../../../src-front/models/LanguageEnum';
import { LanguageButton } from '../../../../src-front/applications/LanguageButton';
import { Accordion } from '../../../../elements/Accordion';
import { AccordionSummary } from '../../../../elements/AccordionSummary';
import { AccordionDetails } from '../../../../elements/AccordionDetails';
import { SpinnerLocalization } from '../../../../src-front/localization/SpinnerLocalization';
import { FormControl } from '../../../../elements/FormControl';
import { Button } from '../../../../elements/Button';
import { Select, ISelectChangeEventProps } from '../../../../elements/Select';
import { InputLabel } from '../../../../elements/InputLabel';
import { MenuItem } from '../../../../elements/MenuItem';
import { VideoIsoLimit, CameraSettingEnum, EvComp, ProTune, FrameRate, CameraMode, CameraSubMode, PhotoIsoLimit, VideoResolution, CameraModeGoPro8, BatteryLevel } from '../../../../src-front/models/CameraStateModel';
import { ListSubheader } from '../../../../elements/ListSubheader';
import { FormHelperText } from '../../../../elements/FormHelperText';
import { KioskViewCarouselItem } from '../../../../src-front/applications/kiosk/views/KioskViewCarouselItem';
import { GroupByEnum } from '../../../../src-front/applications/kiosk/views/GroupByEnum';
import { SortOrderEnum } from '../../../../src-front/applications/kiosk/views/SortOrderEnum';
import { ButtonGroup } from '../../../../elements/ButtonGroup';
import { SortHelper } from '../../../../helpers/SortHelper';
import { ItemComponent } from '../../../../elements/combine/ItemComponent';
import { MultiplierEnum, SpinnerSettingsFrontItemViewModel, SpinnerSettingsFrontOverlayItemModel, SpinnerSettingsFrontOverlayItemViewModel, SpinnerSettingsFrontZoomItemViewModel, SpinnerSettingsFrontZoomItemModel } from '../frontSettings/SpinnerSettingsFrontModel';
import { MultiplierItem } from './MultiplierItem';
import { FormControlLabel } from '../../../../elements/FormControlLabel';
import { Checkbox } from '../../../../elements/Checkbox';
import { Divider } from '../../../../elements/Divider';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '../../../../elements/Table';
import { OverlayItemRow } from './OverlayItemRow';
import { MapperHelper } from '../../../../helpers/MapperHelper';
import { ZoomItemRow } from './ZoomItemRow';
import { Switch } from '../../../../elements/Switch';


/** */
export interface SpinnerViewProps extends ProviderContext {
	title?: string;

	backgroundToolbar?: string;

	backgroundGroupName?: string;

	backgroundFileCard?: string;

	iconColor?: string;

}

/**
 *
 */
@provider(SpinnerViewController, SpinnerViewStore)
@observer
/** */
class SpinnerView extends React.PureComponent<SpinnerViewProps> {
	@inject
	private readonly controller!: SpinnerViewController;

	@inject
	private readonly store!: SpinnerViewStore;

	/** */
	public async componentDidMount(): Promise<void> {
		await this.controller.init();
	}

	/** */
	public async componentWillUnmount(): Promise<void> {
		await this.controller.dispose();
	}

	/** Отображение */
	public render(): React.ReactNode {
		const { language } = this.store;
		const powerOffButton = (
			<IconButton
				onClick={this.onPowerOffClick}
			>
				<Tooltip
					title={SpinnerLocalization.powerOff(language)}
				>
					<PowerSettingsNew
						htmlColor='red'
					/>
				</Tooltip>
			</IconButton>
		);

		var buttons = (
			<>
				<div
					className='padding-right-12px-important'
				>
					<IconButton
						onClick={this.onTakePhotoClick}
					>
						<Tooltip
							title={SpinnerLocalization.takePhoto(language)}
						>
							<PhotoCamera />
						</Tooltip>
					</IconButton>
				</div>
				<div
					className='padding-right-12px-important'
				>
					<IconButton
						onClick={this.onRecordVideoClick}
					>
						<Tooltip
							title={SpinnerLocalization.recordVideo(language)}
						>
							<Videocam />
						</Tooltip>
					</IconButton>
				</div>
			</>
		)

		const seconds = (
			<InputAdornment position='end'>
				{SpinnerLocalization.seconds(language)}
				{powerOffButton}
			</InputAdornment>
		);
		const recordVideoDurationValid = Number(this.store.localSettings?.recordVideoDuration) > 0;
		const background = this.props.backgroundToolbar ?? 'gray';
		const goProBackground = this.store.cameraNotFound
			? 'background-color-red'
			: this.store.cameraNotFound === false
				? 'background-color-green'
				: '';
		const goProSettingsBackground = this.store.cameraNotFound
			? 'background-color-pink'
			: this.store.cameraNotFound === false
				? 'background-color-lightgreen'
				: '';

		const cameraStatus = this.getCameraStatus(language);
		const settings = this.getSettings(language);

		const frontSettings = this.getFrontSettings(language);

		return (
			<div>
				<div
					className='padding-top-6px background-image-bottom-gray'
					style={{ background }}
				>
					<Typography
						align='center'
						variant='h5'
					>
						{this.props.title}
					</Typography>
				</div>
				<AppBar
					position='sticky'
					color='transparent'
				>
					<div
						className='padding-top-6px background-image-bottom-gray height65px'
						style={{ background }}
					>
						<Toolbar
							variant='dense'
						>
							<OneLine>
								<RightContainer
									className='padding-left-32px'
								>
									<LanguageButton
										language={language}
										onClick={this.controller.onLanguageChange}
									/>
								</RightContainer>
							</OneLine>
						</Toolbar>
					</div>
				</AppBar>
				<div>
					<Accordion>
						<AccordionSummary
							expandIcon={<ExpandMore />}
							className={goProBackground}
						>
							<div className='width-100-percent'>
								<OneLine className='font-bold-larger'>
									{SpinnerLocalization.cameraNotFound(language, this.store.cameraNotFound)}
								</OneLine>
								{cameraStatus}
							</div>
						</AccordionSummary>
						<AccordionDetails
							className={goProSettingsBackground}
						>
							<FormControl
								fullWidth={true}
								margin='dense'
							>
								<FormControl
									fullWidth={true}
									margin='dense'
								>
									<TextField
										value={this.store.localSettings?.recordVideoDuration}
										label={SpinnerLocalization.takePhotoOrRecordVideo(language)}
										placeholder='0.0'
										error={!recordVideoDurationValid}
										onChange={this.onRecordVideoDurationChange}
										InputProps={{
											startAdornment: buttons,
											endAdornment: seconds
										}}
									/>
								</FormControl>
								<FormControl
									fullWidth={true}
									margin='dense'
								>
									<FormControlLabel
										control={
											<Checkbox
												checked={this.store.localSettings.processGoProVideo}
												onChange={this.onProcessGoProVideoChange}
												color='primary'
											/>
										}
										label={SpinnerLocalization.processGoProVideo(language)}
									/>
								</FormControl>

								<div className='padding-top-6px'>
									<Accordion>
										<AccordionSummary
											expandIcon={<ExpandMore />}
											className={goProBackground}
										>
											<div className='width-100-percent'>
												{SpinnerLocalization.goProSettings(language)}
											</div>
										</AccordionSummary>
										<AccordionDetails
											className={goProSettingsBackground}
										>
											{settings}
										</AccordionDetails>
									</Accordion>
									<Accordion>
										<AccordionSummary
											expandIcon={<ExpandMore />}
											className='background-color-gray-opacity'
										>
											<div className='width-100-percent'>
												{SpinnerLocalization.goProPreview(language)}
											</div>
										</AccordionSummary>
										<AccordionDetails
											className={goProSettingsBackground}
										>
											<FormControl
												fullWidth={true}
												margin='dense'
											>
												<KioskViewCarouselItem
													language={language}
													groupBy={GroupByEnum.groupByDir}
													groups={this.store.goProGroupsFiles}
													sortOrder={SortOrderEnum.desc}
												/>
											</FormControl>
										</AccordionDetails>
									</Accordion>
								</div>
							</FormControl>
						</AccordionDetails>
					</Accordion>
				</div>
				{frontSettings}
			</div>
		);
	}

	/** */
	private readonly onRecordVideoDurationChange = (event: ITextFieldChangeEventProps): void => {
		this.store.localSettings.recordVideoDuration = event.target.value;
		this.controller.saveSettingsToLocalStorage();
	};

	/** */
	private readonly TestButtonClick = async (): Promise<void> => {
		await this.controller.testVideo();
	};

	/** */
	private readonly onManualStartClick = async (): Promise<void> => {
		await this.controller.processVideo();
	};

	/** */
	private readonly onAutoModeChange = async (event: React.ChangeEvent<HTMLInputElement>, checked: boolean): Promise<void> => {
		if (this.store.settings?.frontSettings) {
			this.store.settings.frontSettings.autoMode = checked;
			this.controller.saveFrontSettings(this.store.settings?.frontSettings);
		}
	};

	/** */
	private readonly onTakePhotoClick = async (event: React.MouseEvent<Element, MouseEvent>): Promise<void> => {
		event.stopPropagation();
		await this.controller.takePhoto();
	};

	/** */
	private readonly onRecordVideoClick = async (event: React.MouseEvent<Element, MouseEvent>): Promise<void> => {
		event.stopPropagation();
		await this.controller.recordVideo();
	};
	
	/** */
	private readonly onPowerOffClick = async (): Promise<void> => {
		await this.controller.setCameraSetting(CameraSettingEnum.PowerOff, '');
	};
	
	/** */
	private readonly onCameraSubModeChange = async (event: ISelectChangeEventProps, _child: React.ReactNode): Promise<void> => {
		await this.controller.setCameraSetting(CameraSettingEnum.SubMode, event.target.value as string);
	};
	
	/** */
	private readonly onVideoSettingsResolutionChange = async (event: ISelectChangeEventProps, _child: React.ReactNode): Promise<void> => {
		await this.controller.setCameraSetting(CameraSettingEnum.VideoResolution, event.target.value as string);
	};
	
	/** */
	private readonly onVideoSettingsIsoLimitChange = async (event: ISelectChangeEventProps, _child: React.ReactNode): Promise<void> => {
		await this.controller.setCameraSetting(CameraSettingEnum.VideoIsoLimit, event.target.value as string);
	};
	
	/** */
	private readonly onVideoSettingsEvCompChange = async (event: ISelectChangeEventProps, _child: React.ReactNode): Promise<void> => {
		await this.controller.setCameraSetting(CameraSettingEnum.VideoEvComp, event.target.value as string);
	};
	
	/** */
	private readonly onVideoSettingsProTuneChange = async (event: ISelectChangeEventProps, _child: React.ReactNode): Promise<void> => {
		await this.controller.setCameraSetting(CameraSettingEnum.VideoProTune, event.target.value as string);
	};
	
	/** */
	private readonly onVideoSettingsFrameRateChange = async (event: ISelectChangeEventProps, _child: React.ReactNode): Promise<void> => {
		await this.controller.setCameraSetting(CameraSettingEnum.VideoFrameRate, event.target.value as string);
	};

	/** */
	private readonly onPhotoSettingsIsoLimitChange = async (event: ISelectChangeEventProps, _child: React.ReactNode): Promise<void> => {
		await this.controller.setCameraSetting(CameraSettingEnum.PhotoIsoLimit, event.target.value as string);
	};
	
	/** */
	private readonly onPhotoSettingsEvCompChange = async (event: ISelectChangeEventProps, _child: React.ReactNode): Promise<void> => {
		await this.controller.setCameraSetting(CameraSettingEnum.PhotoEvComp, event.target.value as string);
	};
	
	/** */
	private readonly onPhotoSettingsEvCompGoPro8Change = async (event: ISelectChangeEventProps, _child: React.ReactNode): Promise<void> => {
		await this.controller.setCameraSetting(CameraSettingEnum.PhotoEvCompGoPro8, event.target.value as string);
	};
	
	/** */
	private readonly onPhotoSettingsProTuneChange = async (event: ISelectChangeEventProps, _child: React.ReactNode): Promise<void> => {
		await this.controller.setCameraSetting(CameraSettingEnum.PhotoProTune, event.target.value as string);
	};
	
	/** */
	private readonly onPhotoSettingsProTuneGoPro8Change = async (event: ISelectChangeEventProps, _child: React.ReactNode): Promise<void> => {
		await this.controller.setCameraSetting(CameraSettingEnum.PhotoProTuneGoPro8, event.target.value as string);
	};


	/** */
	private readonly onTimeLapseSettingsIsoLimitChange = async (event: ISelectChangeEventProps, _child: React.ReactNode): Promise<void> => {
		await this.controller.setCameraSetting(CameraSettingEnum.TimeLapseIsoLimit, event.target.value as string);
	};
	
	/** */
	private readonly onTimeLapseSettingsEvCompChange = async (event: ISelectChangeEventProps, _child: React.ReactNode): Promise<void> => {
		await this.controller.setCameraSetting(CameraSettingEnum.TimeLapseEvComp, event.target.value as string);
	};
	
	/** */
	private readonly onTimeLapseSettingsProTuneChange = async (event: ISelectChangeEventProps, _child: React.ReactNode): Promise<void> => {
		await this.controller.setCameraSetting(CameraSettingEnum.TimeLapseProTune, event.target.value as string);
	};

	// GoPro8
	/** */
	private readonly onCameraModeGoPro8Change = async (event: ISelectChangeEventProps, _child: React.ReactNode): Promise<void> => {
		await this.controller.setCameraSetting(CameraSettingEnum.Mode, event.target.value as string);
	};
	
	/** */
	private readonly onVideoSettingsEvCompGoPro8Change = async (event: ISelectChangeEventProps, _child: React.ReactNode): Promise<void> => {
		await this.controller.setCameraSetting(CameraSettingEnum.VideoEvCompGoPro8, event.target.value as string);
	};
	
	/** */
	private readonly onVideoSettingsProTuneGoPro8Change = async (event: ISelectChangeEventProps, _child: React.ReactNode): Promise<void> => {
		await this.controller.setCameraSetting(CameraSettingEnum.VideoProTuneGoPro8, event.target.value as string);
	};

	private getBatteryLevel(): React.ReactNode {
		switch (this.store.cameraSettings.batteryLevel) {
			case BatteryLevel.Charging:
				return <BatteryChargingFull />;
			case BatteryLevel.Full:
				return <BatteryFull />;
			case BatteryLevel.Halfway:
				return <Battery50 />;
			case BatteryLevel.Low:
				return <Battery20 />;
			case BatteryLevel.Empty:
				return <BatteryAlert />;
		
			default:
				break;
		}
	}

	private getCameraStatus(language: LanguageEnum | undefined) {
		if (this.store.cameraNotFound
			|| !this.store.cameraSettings.cameraOnline) {
			return null;
		}

		const batteryLevel = this.getBatteryLevel();

		var buttonsInline = (
			<>
				<div
					className='padding-right-12px-important'
				>
					<IconButton
						onClick={this.onTakePhotoClick}
					>
						<Tooltip
							title={SpinnerLocalization.takePhoto(language)}
						>
							<PhotoCamera />
						</Tooltip>
					</IconButton>
				</div>
				<div
					className='padding-right-12px-important'
				>
					<IconButton
						onClick={this.onRecordVideoClick}
					>
						<Tooltip
							title={SpinnerLocalization.recordVideo(language)}
						>
							<Videocam />
						</Tooltip>
					<div
						className='bange'
					>
						{this.store.localSettings.recordVideoDuration ?? '0.0'}
					</div>
					</IconButton>
				</div>
			</>
		);

		const shuttleStatus = this.getGoProShuttleStatus();

		if (this.store.cameraSettings.currentMode === CameraMode.Video
			&& (this.store.cameraSettings.currentSubMode === CameraSubMode.SubMode0
			|| this.store.cameraSettings.currentSubMode === CameraSubMode.SubMode3)) {
			return (
				<>
					<OneLine>
						<div className='padding-right-12px-important'>
							{SpinnerLocalization.goPro(language)}
						</div>
						{buttonsInline}
						<div className='padding-right-12px-important'>
							{SpinnerLocalization.subModeItem(language, this.store.cameraSettings.currentMode, this.store.cameraSettings.currentSubMode)}
						</div>
						<div className='padding-right-12px-important'>
							{SpinnerLocalization.resolution(language)}:
							{SpinnerLocalization.videoResolutionItem(language, this.store.cameraSettings.videoSettingsResolution)}
						</div>
						<div className='padding-right-12px-important'>
							{SpinnerLocalization.frameRate(language)}:
							{SpinnerLocalization.frameRateItem(language, this.store.cameraSettings.videoSettingsFrameRate)}
						</div>
						<div className='padding-right-12px-important'>
							{SpinnerLocalization.isoLimit(language)}:
							{SpinnerLocalization.videoIsoLimitItem(language, this.store.cameraSettings.videoSettingsIsoLimit)}
						</div>
						<div className='padding-right-12px-important'>
							{SpinnerLocalization.evComp(language)}:
							{SpinnerLocalization.evCompItem(language, this.store.cameraSettings.videoSettingsEvComp)}
						</div>
						<div className='padding-right-12px-important'>
							{SpinnerLocalization.proTune(language)}:
							{SpinnerLocalization.proTuneItem(language, this.store.cameraSettings.videoSettingsProTune)}
						</div>
						<RightContainer>
							{batteryLevel}
						</RightContainer>
					</OneLine>
					{shuttleStatus}
				</>
			);
		}

		if (this.store.cameraSettings.currentMode === CameraMode.Photo
			&& (this.store.cameraSettings.currentSubMode === CameraSubMode.SubMode1
			|| this.store.cameraSettings.currentSubMode === CameraSubMode.SubMode2)
			|| this.store.cameraSettings.currentMode === CameraMode.MultiShot
			&& this.store.cameraSettings.currentSubMode === CameraSubMode.SubMode0) {
			return (
				<>
					<OneLine>
						<div className='padding-right-12px-important'>
							{SpinnerLocalization.goPro(language)}
						</div>
						{buttonsInline}
						<div className='padding-right-12px-important'>

							{SpinnerLocalization.subModeItem(language, this.store.cameraSettings.currentMode, this.store.cameraSettings.currentSubMode)}
						</div>
						<div className='padding-right-12px-important'>
							{SpinnerLocalization.isoLimit(language)}:
							{SpinnerLocalization.photoIsoLimitItem(language, this.store.cameraSettings.photoSettingsIsoLimit)}
						</div>
						<div className='padding-right-12px-important'>
							{SpinnerLocalization.evComp(language)}:
							{SpinnerLocalization.evCompItem(language, this.store.cameraSettings.photoSettingsEvComp)}
						</div>
						<div className='padding-right-12px-important'>
							{SpinnerLocalization.proTune(language)}:
							{SpinnerLocalization.proTuneItem(language, this.store.cameraSettings.photoSettingsProTune)}
						</div>
						<RightContainer>
							{batteryLevel}
						</RightContainer>
					</OneLine>
					{shuttleStatus}
				</>
			);
		}


		if (this.store.cameraSettings.currentMode === CameraMode.Video
			&& (this.store.cameraSettings.currentSubMode === CameraSubMode.SubMode1
			|| this.store.cameraSettings.currentSubMode === CameraSubMode.SubMode4)
			|| (this.store.cameraSettings.currentMode === CameraMode.MultiShot
			&& (this.store.cameraSettings.currentSubMode === CameraSubMode.SubMode1
			|| this.store.cameraSettings.currentSubMode === CameraSubMode.SubMode2))) {
			return (
				<>
					<OneLine>
						<div className='padding-right-12px-important'>
							{SpinnerLocalization.goPro(language)}
						</div>
						{buttonsInline}
						<div className='padding-right-12px-important'>

							{SpinnerLocalization.subModeItem(language, this.store.cameraSettings.currentMode, this.store.cameraSettings.currentSubMode)}
						</div>
						<div className='padding-right-12px-important'>
							{SpinnerLocalization.resolution(language)}:
							{SpinnerLocalization.videoResolutionItem(language, this.store.cameraSettings.videoSettingsResolution)}
						</div>
						<div className='padding-right-12px-important'>
							{SpinnerLocalization.isoLimit(language)}:
							{SpinnerLocalization.photoIsoLimitItem(language, this.store.cameraSettings.timeLapseSettingsIsoLimit)}
						</div>
						<div className='padding-right-12px-important'>
							{SpinnerLocalization.evComp(language)}:
							{SpinnerLocalization.evCompItem(language, this.store.cameraSettings.timeLapseSettingsEvComp)}
						</div>
						<div className='padding-right-12px-important'>
							{SpinnerLocalization.proTune(language)}:
							{SpinnerLocalization.proTuneItem(language, this.store.cameraSettings.timeLapseSettingsProTune)}
						</div>
						<RightContainer>
							{batteryLevel}
						</RightContainer>
					</OneLine>
					{shuttleStatus}
				</>
			);
		}

		// GoPro8
		if (this.store.cameraSettings.currentModeGoPro8 === CameraModeGoPro8.Video
			|| this.store.cameraSettings.currentModeGoPro8 === CameraModeGoPro8.Looping
			|| this.store.cameraSettings.currentModeGoPro8 === CameraModeGoPro8.TimeLapsePhoto
			|| this.store.cameraSettings.currentModeGoPro8 === CameraModeGoPro8.TimeLapseVideo
			|| this.store.cameraSettings.currentModeGoPro8 === CameraModeGoPro8.NightLapsePhoto
			|| this.store.cameraSettings.currentModeGoPro8 === CameraModeGoPro8.TimeWarpVideo
			|| this.store.cameraSettings.currentModeGoPro8 === CameraModeGoPro8.NightLapseVideo
			|| this.store.cameraSettings.currentModeGoPro8 === CameraModeGoPro8.SloMo) {
			return (
				<>
					<OneLine>
						<div className='padding-right-12px-important'>
							{SpinnerLocalization.goPro8(language)}
						</div>
						{buttonsInline}
						<div className='padding-right-12px-important'>
							{SpinnerLocalization.modeGoPro8Item(language, this.store.cameraSettings.currentModeGoPro8)}
						</div>
						<div className='padding-right-12px-important'>
							{SpinnerLocalization.resolution(language)}:
							{SpinnerLocalization.videoResolutionItem(language, this.store.cameraSettings.videoSettingsResolution)}
						</div>
						<div className='padding-right-12px-important'>
							{SpinnerLocalization.frameRate(language)}:
							{SpinnerLocalization.frameRateItem(language, this.store.cameraSettings.videoSettingsFrameRate)}
						</div>
						<div className='padding-right-12px-important'>
							{SpinnerLocalization.isoLimit(language)}:
							{SpinnerLocalization.videoIsoLimitItem(language, this.store.cameraSettings.videoSettingsIsoLimit)}
						</div>
						<div className='padding-right-12px-important'>
							{SpinnerLocalization.evComp(language)}:
							{SpinnerLocalization.evCompItem(language, this.store.cameraSettings.videoSettingsEvCompGoPro8)}
						</div>
						<div className='padding-right-12px-important'>
							{SpinnerLocalization.proTune(language)}:
							{SpinnerLocalization.proTuneItem(language, this.store.cameraSettings.videoSettingsProTuneGoPro8)}
						</div>
						<RightContainer>
							{batteryLevel}
						</RightContainer>
					</OneLine>
					{shuttleStatus}
				</>
			);
		}

		
		if (this.store.cameraSettings.currentModeGoPro8 === CameraModeGoPro8.Photo
			|| this.store.cameraSettings.currentModeGoPro8 === CameraModeGoPro8.BurstPhoto
			|| this.store.cameraSettings.currentModeGoPro8 === CameraModeGoPro8.NightPhoto
			|| this.store.cameraSettings.currentModeGoPro8 === CameraModeGoPro8.LiveBurst) {
			return (
				<>
					<OneLine>
						<div className='padding-right-12px-important'>
							{SpinnerLocalization.goPro8(language)}
						</div>
						{buttonsInline}
						<div className='padding-right-12px-important'>
							{SpinnerLocalization.modeGoPro8Item(language, this.store.cameraSettings.currentModeGoPro8)}
						</div>
						<div className='padding-right-12px-important'>
							{SpinnerLocalization.isoLimit(language)}:
							{SpinnerLocalization.photoIsoLimitItem(language, this.store.cameraSettings.photoSettingsIsoLimit)}
						</div>
						<div className='padding-right-12px-important'>
							{SpinnerLocalization.evComp(language)}:
							{SpinnerLocalization.evCompItem(language, this.store.cameraSettings.photoSettingsEvCompGoPro8)}
						</div>
						<div className='padding-right-12px-important'>
							{SpinnerLocalization.proTune(language)}:
							{SpinnerLocalization.proTuneItem(language, this.store.cameraSettings.photoSettingsProTuneGoPro8)}
						</div>
						<RightContainer>
							{batteryLevel}
						</RightContainer>
					</OneLine>
					{shuttleStatus}
				</>
			);
		}

		return null;
	}

	private getSettings(language: LanguageEnum | undefined) {
		if (this.store.cameraNotFound
			|| !this.store.cameraSettings.cameraOnline) {
			return null;
		}
		if (this.store.cameraSettings.currentMode !== undefined) {
			const modeSettings = this.getModeSettings(language);
			const videoSettings = this.getVideoSettings(language);
			const photoSettings = this.getPhotoSettings(language);
			const timeLapseSettings = this.getTimeLapseSettings(language);
			return (
				<>
					{modeSettings}
					{videoSettings}
					{photoSettings}
					{timeLapseSettings}
				</>
			);
		}

		const modeSettingsGoPro8 = this.getModeSettingsGoPro8(language);
		const videoSettingsGoPro8 = this.getVideoSettingsGoPro8(language);
		const photoSettingsGoPro8 = this.getPhotoSettingsGoPro8(language);
		const timeLapseSettingsGoPro8 = this.getTimeLapseSettingsGoPro8(language);
		return (
			<>
				{modeSettingsGoPro8}
				{videoSettingsGoPro8}
				{photoSettingsGoPro8}
				{timeLapseSettingsGoPro8}
			</>
		);
	}

	private getModeSettings(language: LanguageEnum | undefined) {
		if (this.store.cameraSettings.currentMode === undefined
			|| this.store.cameraNotFound
			|| !this.store.cameraSettings.cameraOnline) {
			return null;
		}

		const currentSubMode = this.store.cameraSettings.currentMode + '_' + this.store.cameraSettings.currentSubMode;
		return (
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<InputLabel id='camera-settings-mode-select-label'>
						{SpinnerLocalization.mode(language)}
					</InputLabel>
					<Select
						labelId='camera-settings-mode-select-label'
						value={currentSubMode}
						onChange={this.onCameraSubModeChange}
					>
						<ListSubheader>{SpinnerLocalization.usefull(language)}</ListSubheader>
						<MenuItem value={CameraMode.Video + '_' + CameraSubMode.SubMode0}>{SpinnerLocalization.subModeItem(language, CameraMode.Video, CameraSubMode.SubMode0)}</MenuItem>
						<MenuItem value={CameraMode.Photo + '_' + CameraSubMode.SubMode1}>{SpinnerLocalization.subModeItem(language, CameraMode.Photo, CameraSubMode.SubMode1)}</MenuItem>
						<ListSubheader>{SpinnerLocalization.modeItem(language, CameraMode.Photo)}</ListSubheader>
						<MenuItem value={CameraMode.Photo + '_' + CameraSubMode.SubMode1}>{SpinnerLocalization.subModeItem(language, CameraMode.Photo, CameraSubMode.SubMode1)}</MenuItem>
						<MenuItem value={CameraMode.MultiShot + '_' + CameraSubMode.SubMode0}>{SpinnerLocalization.subModeItem(language, CameraMode.MultiShot, CameraSubMode.SubMode0)}</MenuItem>
						<MenuItem value={CameraMode.Photo + '_' + CameraSubMode.SubMode2}>{SpinnerLocalization.subModeItem(language, CameraMode.Photo, CameraSubMode.SubMode2)}</MenuItem>
						<ListSubheader>{SpinnerLocalization.modeItem(language, CameraMode.Video)}</ListSubheader>
						<MenuItem value={CameraMode.Video + '_' + CameraSubMode.SubMode0}>{SpinnerLocalization.subModeItem(language, CameraMode.Video, CameraSubMode.SubMode0)}</MenuItem>
						<MenuItem value={CameraMode.Video + '_' + CameraSubMode.SubMode3}>{SpinnerLocalization.subModeItem(language, CameraMode.Video, CameraSubMode.SubMode3)}</MenuItem>
						<ListSubheader>{SpinnerLocalization.modeItem(language, CameraMode.MultiShot)}</ListSubheader>
						<MenuItem value={CameraMode.Video + '_' + CameraSubMode.SubMode4}>{SpinnerLocalization.subModeItem(language, CameraMode.Video, CameraSubMode.SubMode4)}</MenuItem>
						<MenuItem value={CameraMode.Video + '_' + CameraSubMode.SubMode1}>{SpinnerLocalization.subModeItem(language, CameraMode.Video, CameraSubMode.SubMode1)}</MenuItem>
						<MenuItem value={CameraMode.MultiShot + '_' + CameraSubMode.SubMode1}>{SpinnerLocalization.subModeItem(language, CameraMode.MultiShot, CameraSubMode.SubMode1)}</MenuItem>
						<MenuItem value={CameraMode.MultiShot + '_' + CameraSubMode.SubMode2}>{SpinnerLocalization.subModeItem(language, CameraMode.MultiShot, CameraSubMode.SubMode2)}</MenuItem>
					</Select>
				</FormControl>
		);
	}

	private getVideoSettings(language: LanguageEnum | undefined) {
		if (!(this.store.cameraSettings.currentMode === CameraMode.Video
			&& (this.store.cameraSettings.currentSubMode === CameraSubMode.SubMode0
			|| this.store.cameraSettings.currentSubMode === CameraSubMode.SubMode3))) {
			return null;
		}
		return (
			<>
				<h3>{SpinnerLocalization.videoSettings(language)}</h3>
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<InputLabel id='camera-settings-resolution-select-label'>
						{SpinnerLocalization.resolution(language)}
					</InputLabel>
					<Select
						labelId='camera-settings-resolution-select-label'
						value={Number(this.store.cameraSettings.videoSettingsResolution)}
						onChange={this.onVideoSettingsResolutionChange}
					>
						<MenuItem value={VideoResolution.Resolution4K43}>{SpinnerLocalization.videoResolutionItem(language, VideoResolution.Resolution4K43)}</MenuItem>
						<MenuItem value={VideoResolution.Resolution4K}>{SpinnerLocalization.videoResolutionItem(language, VideoResolution.Resolution4K)}</MenuItem>
						{/* <MenuItem value={VideoResolution.Resolution4KSV}>{SpinnerLocalization.videoResolutionItem(language, VideoResolution.Resolution4KSV)}</MenuItem> */}
						<MenuItem value={VideoResolution.Resolution27K43}>{SpinnerLocalization.videoResolutionItem(language, VideoResolution.Resolution27K43)}</MenuItem>
						<MenuItem value={VideoResolution.Resolution27K}>{SpinnerLocalization.videoResolutionItem(language, VideoResolution.Resolution27K)}</MenuItem>
						{/* <MenuItem value={VideoResolution.Resolution27KSV}>{SpinnerLocalization.videoResolutionItem(language, VideoResolution.Resolution27KSV)}</MenuItem> */}
						<MenuItem value={VideoResolution.Resolution1440}>{SpinnerLocalization.videoResolutionItem(language, VideoResolution.Resolution1440)}</MenuItem>
						<MenuItem value={VideoResolution.Resolution1080}>{SpinnerLocalization.videoResolutionItem(language, VideoResolution.Resolution1080)}</MenuItem>
						{/* <MenuItem value={VideoResolution.Resolution1080SV}>{SpinnerLocalization.videoResolutionItem(language, VideoResolution.Resolution1080SV)}</MenuItem> */}
						<MenuItem value={VideoResolution.Resolution960}>{SpinnerLocalization.videoResolutionItem(language, VideoResolution.Resolution960)}</MenuItem>
						<MenuItem value={VideoResolution.Resolution720}>{SpinnerLocalization.videoResolutionItem(language, VideoResolution.Resolution720)}</MenuItem>
						{/* <MenuItem value={VideoResolution.Resolution720SV}>{SpinnerLocalization.videoResolutionItem(language, VideoResolution.Resolution720SV)}</MenuItem> */}
					</Select>
				</FormControl>
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<InputLabel id='camera-settings-fps-select-label'>
						{SpinnerLocalization.frameRate(language)}
					</InputLabel>
					<Select
						labelId='camera-settings-fps-select-label'
						value={Number(this.store.cameraSettings.videoSettingsFrameRate)}
						onChange={this.onVideoSettingsFrameRateChange}
					>
						<MenuItem value={FrameRate.Fps240}>{SpinnerLocalization.frameRateItem(language, FrameRate.Fps240)}</MenuItem>
						<MenuItem value={FrameRate.Fps120}>{SpinnerLocalization.frameRateItem(language, FrameRate.Fps120)}</MenuItem>
						{/* <MenuItem value={FrameRate.Fps100}>{SpinnerLocalization.frameRateItem(language, FrameRate.Fps100)}</MenuItem> */}
						{/* <MenuItem value={FrameRate.Fps90}>{SpinnerLocalization.frameRateItem(language, FrameRate.Fps90)}</MenuItem> */}
						{/* <MenuItem value={FrameRate.Fps80}>{SpinnerLocalization.frameRateItem(language, FrameRate.Fps80)}</MenuItem> */}
						<MenuItem value={FrameRate.Fps60}>{SpinnerLocalization.frameRateItem(language, FrameRate.Fps60)}</MenuItem>
						{/* <MenuItem value={FrameRate.Fps50}>{SpinnerLocalization.frameRateItem(language, FrameRate.Fps50)}</MenuItem> */}
						{/* <MenuItem value={FrameRate.Fps48}>{SpinnerLocalization.frameRateItem(language, FrameRate.Fps48)}</MenuItem> */}
						<MenuItem value={FrameRate.Fps30}>{SpinnerLocalization.frameRateItem(language, FrameRate.Fps30)}</MenuItem>
						{/* <MenuItem value={FrameRate.Fps25}>{SpinnerLocalization.frameRateItem(language, FrameRate.Fps25)}</MenuItem> */}
						<MenuItem value={FrameRate.Fps24}>{SpinnerLocalization.frameRateItem(language, FrameRate.Fps24)}</MenuItem>
						{/* <MenuItem value={FrameRate.Fps15}>{SpinnerLocalization.frameRateItem(language, FrameRate.Fps15)}</MenuItem> */}
						{/* <MenuItem value={FrameRate.Fps12_5}>{SpinnerLocalization.frameRateItem(language, FrameRate.Fps12_5)}</MenuItem> */}
					</Select>
				</FormControl>
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<InputLabel id='camera-settings-iso-select-label'>
						{SpinnerLocalization.isoLimit(language)}
					</InputLabel>
					<Select
						labelId='camera-settings-iso-select-label'
						value={Number(this.store.cameraSettings.videoSettingsIsoLimit)}
						onChange={this.onVideoSettingsIsoLimitChange}
					>
						<MenuItem value={VideoIsoLimit.Iso6400}>{SpinnerLocalization.videoIsoLimitItem(language, VideoIsoLimit.Iso6400)}</MenuItem>
						<MenuItem value={VideoIsoLimit.Iso3200}>{SpinnerLocalization.videoIsoLimitItem(language, VideoIsoLimit.Iso3200)}</MenuItem>
						<MenuItem value={VideoIsoLimit.Iso1600}>{SpinnerLocalization.videoIsoLimitItem(language, VideoIsoLimit.Iso1600)}</MenuItem>
						<MenuItem value={VideoIsoLimit.Iso800}>{SpinnerLocalization.videoIsoLimitItem(language, VideoIsoLimit.Iso800)}</MenuItem>
						<MenuItem value={VideoIsoLimit.Iso400}>{SpinnerLocalization.videoIsoLimitItem(language, VideoIsoLimit.Iso400)}</MenuItem>
						<MenuItem value={VideoIsoLimit.Iso200}>{SpinnerLocalization.videoIsoLimitItem(language, VideoIsoLimit.Iso200)}</MenuItem>
						<MenuItem value={VideoIsoLimit.Iso100}>{SpinnerLocalization.videoIsoLimitItem(language, VideoIsoLimit.Iso100)}</MenuItem>
					</Select>
				</FormControl>
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<InputLabel id='camera-settings-ev-select-label'>
						{SpinnerLocalization.evComp(language)}
					</InputLabel>
					<Select
						labelId='camera-settings-ev-select-label'
						value={Number(this.store.cameraSettings.videoSettingsEvComp)}
						onChange={this.onVideoSettingsEvCompChange}
					>
						<MenuItem value={EvComp.EvPlus2}>{SpinnerLocalization.evCompItem(language, EvComp.EvPlus2)}</MenuItem>
						<MenuItem value={EvComp.EvPlus1_5}>{SpinnerLocalization.evCompItem(language, EvComp.EvPlus1_5)}</MenuItem>
						<MenuItem value={EvComp.EvPlus1}>{SpinnerLocalization.evCompItem(language, EvComp.EvPlus1)}</MenuItem>
						<MenuItem value={EvComp.EvPlus0_5}>{SpinnerLocalization.evCompItem(language, EvComp.EvPlus0_5)}</MenuItem>
						<MenuItem value={EvComp.Ev0}>{SpinnerLocalization.evCompItem(language, EvComp.Ev0)}</MenuItem>
						<MenuItem value={EvComp.EvMinus0_5}>{SpinnerLocalization.evCompItem(language, EvComp.EvMinus0_5)}</MenuItem>
						<MenuItem value={EvComp.EvMinus1}>{SpinnerLocalization.evCompItem(language, EvComp.EvMinus1)}</MenuItem>
						<MenuItem value={EvComp.EvMinus1_5}>{SpinnerLocalization.evCompItem(language, EvComp.EvMinus1_5)}</MenuItem>
						<MenuItem value={EvComp.EvMinus2}>{SpinnerLocalization.evCompItem(language, EvComp.EvMinus2)}</MenuItem>
					</Select>
				</FormControl>
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<InputLabel id='camera-settings-protune-select-label'>
						{SpinnerLocalization.proTune(language)}
					</InputLabel>
					<Select
						labelId='camera-settings-protune-select-label'
						value={Number(this.store.cameraSettings.videoSettingsProTune)}
						onChange={this.onVideoSettingsProTuneChange}
					>
						<MenuItem value={ProTune.On}>{SpinnerLocalization.proTuneItem(language, ProTune.On)}</MenuItem>
						<MenuItem value={ProTune.Off}>{SpinnerLocalization.proTuneItem(language, ProTune.Off)}</MenuItem>
					</Select>
				</FormControl>
			</>
		);
	}

	private getPhotoSettings(language: LanguageEnum | undefined) {
		if (this.store.cameraNotFound
			|| !(this.store.cameraSettings.currentMode === CameraMode.Photo
			&& (this.store.cameraSettings.currentSubMode === CameraSubMode.SubMode1
			|| this.store.cameraSettings.currentSubMode === CameraSubMode.SubMode2)
			|| this.store.cameraSettings.currentMode === CameraMode.MultiShot
			&& this.store.cameraSettings.currentSubMode === CameraSubMode.SubMode0
			|| this.store.cameraSettings.currentModeGoPro8 === CameraModeGoPro8.Photo
			|| this.store.cameraSettings.currentModeGoPro8 === CameraModeGoPro8.BurstPhoto
			|| this.store.cameraSettings.currentModeGoPro8 === CameraModeGoPro8.LiveBurst
			|| this.store.cameraSettings.currentModeGoPro8 === CameraModeGoPro8.NightPhoto)) {
			return null;
		}

		return (
			<>
				<h3>{SpinnerLocalization.photoSettings(language)}</h3>
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<InputLabel id='camera-settings-iso-select-label'>
						{SpinnerLocalization.isoLimit(language)}
					</InputLabel>
					<Select
						labelId='camera-settings-iso-select-label'
						value={Number(this.store.cameraSettings.photoSettingsIsoLimit)}
						onChange={this.onPhotoSettingsIsoLimitChange}
					>
						<MenuItem value={PhotoIsoLimit.Iso3200}>{SpinnerLocalization.photoIsoLimitItem(language, PhotoIsoLimit.Iso3200)}</MenuItem>
						<MenuItem value={PhotoIsoLimit.Iso1600}>{SpinnerLocalization.photoIsoLimitItem(language, PhotoIsoLimit.Iso1600)}</MenuItem>
						<MenuItem value={PhotoIsoLimit.Iso800}>{SpinnerLocalization.photoIsoLimitItem(language, PhotoIsoLimit.Iso800)}</MenuItem>
						<MenuItem value={PhotoIsoLimit.Iso400}>{SpinnerLocalization.photoIsoLimitItem(language, PhotoIsoLimit.Iso400)}</MenuItem>
						<MenuItem value={PhotoIsoLimit.Iso200}>{SpinnerLocalization.photoIsoLimitItem(language, PhotoIsoLimit.Iso200)}</MenuItem>
						<MenuItem value={PhotoIsoLimit.Iso100}>{SpinnerLocalization.photoIsoLimitItem(language, PhotoIsoLimit.Iso100)}</MenuItem>
					</Select>
				</FormControl>
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<InputLabel id='camera-settings-ev-select-label'>
						{SpinnerLocalization.evComp(language)}
					</InputLabel>
					<Select
						labelId='camera-settings-ev-select-label'
						value={Number(this.store.cameraSettings.photoSettingsEvComp)}
						onChange={this.onPhotoSettingsEvCompChange}
					>
						<MenuItem value={EvComp.EvPlus2}>{SpinnerLocalization.evCompItem(language, EvComp.EvPlus2)}</MenuItem>
						<MenuItem value={EvComp.EvPlus1_5}>{SpinnerLocalization.evCompItem(language, EvComp.EvPlus1_5)}</MenuItem>
						<MenuItem value={EvComp.EvPlus1}>{SpinnerLocalization.evCompItem(language, EvComp.EvPlus1)}</MenuItem>
						<MenuItem value={EvComp.EvPlus0_5}>{SpinnerLocalization.evCompItem(language, EvComp.EvPlus0_5)}</MenuItem>
						<MenuItem value={EvComp.Ev0}>{SpinnerLocalization.evCompItem(language, EvComp.Ev0)}</MenuItem>
						<MenuItem value={EvComp.EvMinus0_5}>{SpinnerLocalization.evCompItem(language, EvComp.EvMinus0_5)}</MenuItem>
						<MenuItem value={EvComp.EvMinus1}>{SpinnerLocalization.evCompItem(language, EvComp.EvMinus1)}</MenuItem>
						<MenuItem value={EvComp.EvMinus1_5}>{SpinnerLocalization.evCompItem(language, EvComp.EvMinus1_5)}</MenuItem>
						<MenuItem value={EvComp.EvMinus2}>{SpinnerLocalization.evCompItem(language, EvComp.EvMinus2)}</MenuItem>
					</Select>
				</FormControl>
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<InputLabel id='camera-settings-protune-select-label'>
						{SpinnerLocalization.proTune(language)}
					</InputLabel>
					<Select
						labelId='camera-settings-protune-select-label'
						value={Number(this.store.cameraSettings.photoSettingsProTune)}
						onChange={this.onPhotoSettingsProTuneChange}
					>
						<MenuItem value={ProTune.On}>{SpinnerLocalization.proTuneItem(language, ProTune.On)}</MenuItem>
						<MenuItem value={ProTune.Off}>{SpinnerLocalization.proTuneItem(language, ProTune.Off)}</MenuItem>
					</Select>
				</FormControl>
			</>
		);
	}

	private getTimeLapseSettings(language: LanguageEnum | undefined) {
		if (this.store.cameraNotFound
			|| !(this.store.cameraSettings.currentMode === CameraMode.Video
			&& (this.store.cameraSettings.currentSubMode === CameraSubMode.SubMode1
			|| this.store.cameraSettings.currentSubMode === CameraSubMode.SubMode4)
			|| (this.store.cameraSettings.currentMode === CameraMode.MultiShot
			&& (this.store.cameraSettings.currentSubMode === CameraSubMode.SubMode1
			|| this.store.cameraSettings.currentSubMode === CameraSubMode.SubMode2)))) {
			return null;
		}

		return (
			<>
				<h3>{SpinnerLocalization.timeLapseSettings(language)}</h3>
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<InputLabel id='camera-settings-resolution-select-label'>
						{SpinnerLocalization.resolution(language)}
					</InputLabel>
					<Select
						labelId='camera-settings-resolution-select-label'
						value={Number(this.store.cameraSettings.videoSettingsResolution)}
						onChange={this.onVideoSettingsResolutionChange}
					>
						<MenuItem value={VideoResolution.Resolution4K}>{SpinnerLocalization.videoResolutionItem(language, VideoResolution.Resolution4K)}</MenuItem>
						<MenuItem value={VideoResolution.Resolution27K43}>{SpinnerLocalization.videoResolutionItem(language, VideoResolution.Resolution27K43)}</MenuItem>
						<MenuItem value={VideoResolution.Resolution1440}>{SpinnerLocalization.videoResolutionItem(language, VideoResolution.Resolution1440)}</MenuItem>
						<MenuItem value={VideoResolution.Resolution1080}>{SpinnerLocalization.videoResolutionItem(language, VideoResolution.Resolution1080)}</MenuItem>
					</Select>
				</FormControl>
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<InputLabel id='camera-settings-iso-select-label'>
						{SpinnerLocalization.isoLimit(language)}
					</InputLabel>
					<Select
						labelId='camera-settings-iso-select-label'
						value={Number(this.store.cameraSettings.timeLapseSettingsIsoLimit)}
						onChange={this.onTimeLapseSettingsIsoLimitChange}
					>
						<MenuItem value={PhotoIsoLimit.Iso3200}>{SpinnerLocalization.photoIsoLimitItem(language, PhotoIsoLimit.Iso3200)}</MenuItem>
						<MenuItem value={PhotoIsoLimit.Iso1600}>{SpinnerLocalization.photoIsoLimitItem(language, PhotoIsoLimit.Iso1600)}</MenuItem>
						<MenuItem value={PhotoIsoLimit.Iso800}>{SpinnerLocalization.photoIsoLimitItem(language, PhotoIsoLimit.Iso800)}</MenuItem>
						<MenuItem value={PhotoIsoLimit.Iso400}>{SpinnerLocalization.photoIsoLimitItem(language, PhotoIsoLimit.Iso400)}</MenuItem>
						<MenuItem value={PhotoIsoLimit.Iso200}>{SpinnerLocalization.photoIsoLimitItem(language, PhotoIsoLimit.Iso200)}</MenuItem>
						<MenuItem value={PhotoIsoLimit.Iso100}>{SpinnerLocalization.photoIsoLimitItem(language, PhotoIsoLimit.Iso100)}</MenuItem>
					</Select>
				</FormControl>
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<InputLabel id='camera-settings-ev-select-label'>
						{SpinnerLocalization.evComp(language)}
					</InputLabel>
					<Select
						labelId='camera-settings-ev-select-label'
						value={Number(this.store.cameraSettings.timeLapseSettingsEvComp)}
						onChange={this.onTimeLapseSettingsEvCompChange}
					>
						<MenuItem value={EvComp.EvPlus2}>{SpinnerLocalization.evCompItem(language, EvComp.EvPlus2)}</MenuItem>
						<MenuItem value={EvComp.EvPlus1_5}>{SpinnerLocalization.evCompItem(language, EvComp.EvPlus1_5)}</MenuItem>
						<MenuItem value={EvComp.EvPlus1}>{SpinnerLocalization.evCompItem(language, EvComp.EvPlus1)}</MenuItem>
						<MenuItem value={EvComp.EvPlus0_5}>{SpinnerLocalization.evCompItem(language, EvComp.EvPlus0_5)}</MenuItem>
						<MenuItem value={EvComp.Ev0}>{SpinnerLocalization.evCompItem(language, EvComp.Ev0)}</MenuItem>
						<MenuItem value={EvComp.EvMinus0_5}>{SpinnerLocalization.evCompItem(language, EvComp.EvMinus0_5)}</MenuItem>
						<MenuItem value={EvComp.EvMinus1}>{SpinnerLocalization.evCompItem(language, EvComp.EvMinus1)}</MenuItem>
						<MenuItem value={EvComp.EvMinus1_5}>{SpinnerLocalization.evCompItem(language, EvComp.EvMinus1_5)}</MenuItem>
						<MenuItem value={EvComp.EvMinus2}>{SpinnerLocalization.evCompItem(language, EvComp.EvMinus2)}</MenuItem>
					</Select>
				</FormControl>
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<InputLabel id='camera-settings-protune-select-label'>
						{SpinnerLocalization.proTune(language)}
					</InputLabel>
					<Select
						labelId='camera-settings-protune-select-label'
						value={Number(this.store.cameraSettings.timeLapseSettingsProTune)}
						onChange={this.onTimeLapseSettingsProTuneChange}
					>
						<MenuItem value={ProTune.On}>{SpinnerLocalization.proTuneItem(language, ProTune.On)}</MenuItem>
						<MenuItem value={ProTune.Off}>{SpinnerLocalization.proTuneItem(language, ProTune.Off)}</MenuItem>
					</Select>
				</FormControl>
			</>
		);
	}
	private getModeSettingsGoPro8(language: LanguageEnum | undefined) {
		const currentModeGoPro8 =
			this.store.cameraSettings.currentModeGoPro8 === CameraModeGoPro8.Photo
			|| this.store.cameraSettings.currentModeGoPro8 === CameraModeGoPro8.BurstPhoto
			|| this.store.cameraSettings.currentModeGoPro8 === CameraModeGoPro8.LiveBurst
			|| this.store.cameraSettings.currentModeGoPro8 === CameraModeGoPro8.NightPhoto
			? CameraMode.Photo
			: this.store.cameraSettings.currentModeGoPro8 === CameraModeGoPro8.Video
				|| this.store.cameraSettings.currentModeGoPro8 === CameraModeGoPro8.SloMo
				|| this.store.cameraSettings.currentModeGoPro8 === CameraModeGoPro8.Looping
			? CameraMode.Video
			: this.store.cameraSettings.currentModeGoPro8 === CameraModeGoPro8.TimeLapsePhoto
				|| this.store.cameraSettings.currentModeGoPro8 === CameraModeGoPro8.TimeLapseVideo
				|| this.store.cameraSettings.currentModeGoPro8 === CameraModeGoPro8.TimeWarpVideo
				|| this.store.cameraSettings.currentModeGoPro8 === CameraModeGoPro8.NightLapsePhoto
				|| this.store.cameraSettings.currentModeGoPro8 === CameraModeGoPro8.NightLapseVideo
			? CameraMode.MultiShot
			: '';

		console.log(currentModeGoPro8);
		console.log(this.store.cameraSettings.currentModeGoPro8);

		return (
			<FormControl
				fullWidth={true}
				margin='dense'
			>
				<InputLabel id='camera-settings-mode-gopro8-select-label'>
					{SpinnerLocalization.mode(language)}
				</InputLabel>
				<Select
					labelId='camera-settings-mode-gopro8-select-label'
					value={currentModeGoPro8}
					onChange={this.onCameraModeGoPro8Change}
				>
					<MenuItem value={CameraMode.Video}>{SpinnerLocalization.modeItem(language, CameraMode.Video)}</MenuItem>
					<MenuItem value={CameraMode.Photo}>{SpinnerLocalization.modeItem(language, CameraMode.Photo)}</MenuItem>
					<MenuItem value={CameraMode.MultiShot}>{SpinnerLocalization.modeItem(language, CameraMode.MultiShot)}</MenuItem>
				</Select>
				<FormHelperText>
					{SpinnerLocalization.mode(language)}
				</FormHelperText>
			</FormControl>
		);
	}



	private getVideoSettingsGoPro8(language: LanguageEnum | undefined) {
		if (this.store.cameraNotFound
			|| !this.store.cameraSettings.cameraOnline
			|| !(this.store.cameraSettings.currentModeGoPro8 === CameraModeGoPro8.Video
				|| this.store.cameraSettings.currentModeGoPro8 === CameraModeGoPro8.Looping
				|| this.store.cameraSettings.currentModeGoPro8 === CameraModeGoPro8.SloMo)) {
			return null;
		}

		return (
			<>
				<h3>{SpinnerLocalization.videoSettings(language)}</h3>
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<InputLabel id='camera-settings-resolution-select-label'>
						{SpinnerLocalization.resolution(language)}
					</InputLabel>
					<Select
						labelId='camera-settings-resolution-select-label'
						value={Number(this.store.cameraSettings.videoSettingsResolution)}
						onChange={this.onVideoSettingsResolutionChange}
					>
						<MenuItem value={VideoResolution.Resolution4K43}>{SpinnerLocalization.videoResolutionItem(language, VideoResolution.Resolution4K43)}</MenuItem>
						<MenuItem value={VideoResolution.Resolution4K}>{SpinnerLocalization.videoResolutionItem(language, VideoResolution.Resolution4K)}</MenuItem>
						<MenuItem value={VideoResolution.Resolution27K43}>{SpinnerLocalization.videoResolutionItem(language, VideoResolution.Resolution27K43)}</MenuItem>
						<MenuItem value={VideoResolution.Resolution27K}>{SpinnerLocalization.videoResolutionItem(language, VideoResolution.Resolution27K)}</MenuItem>
						<MenuItem value={VideoResolution.Resolution1440}>{SpinnerLocalization.videoResolutionItem(language, VideoResolution.Resolution1440)}</MenuItem>
						<MenuItem value={VideoResolution.Resolution1080}>{SpinnerLocalization.videoResolutionItem(language, VideoResolution.Resolution1080)}</MenuItem>
					</Select>
				</FormControl>
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<InputLabel id='camera-settings-fps-select-label'>
						{SpinnerLocalization.frameRate(language)}
					</InputLabel>
					<Select
						labelId='camera-settings-fps-select-label'
						value={Number(this.store.cameraSettings.videoSettingsFrameRate)}
						onChange={this.onVideoSettingsFrameRateChange}
					>
						<MenuItem value={FrameRate.Fps200}>{SpinnerLocalization.frameRateItem(language, FrameRate.Fps200)}</MenuItem>
						<MenuItem value={FrameRate.Fps100}>{SpinnerLocalization.frameRateItem(language, FrameRate.Fps100)}</MenuItem>
						<MenuItem value={FrameRate.Fps50}>{SpinnerLocalization.frameRateItem(language, FrameRate.Fps50)}</MenuItem>
						<MenuItem value={FrameRate.Fps25}>{SpinnerLocalization.frameRateItem(language, FrameRate.Fps25)}</MenuItem>
						<MenuItem value={FrameRate.Fps24}>{SpinnerLocalization.frameRateItem(language, FrameRate.Fps24)}</MenuItem>
					</Select>
				</FormControl>
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<InputLabel id='camera-settings-iso-select-label'>
						{SpinnerLocalization.isoLimit(language)}
					</InputLabel>
					<Select
						labelId='camera-settings-iso-select-label'
						value={Number(this.store.cameraSettings.videoSettingsIsoLimit)}
						onChange={this.onVideoSettingsIsoLimitChange}
					>
						<MenuItem value={VideoIsoLimit.Iso6400}>{SpinnerLocalization.videoIsoLimitItem(language, VideoIsoLimit.Iso6400)}</MenuItem>
						<MenuItem value={VideoIsoLimit.Iso3200}>{SpinnerLocalization.videoIsoLimitItem(language, VideoIsoLimit.Iso3200)}</MenuItem>
						<MenuItem value={VideoIsoLimit.Iso1600}>{SpinnerLocalization.videoIsoLimitItem(language, VideoIsoLimit.Iso1600)}</MenuItem>
						<MenuItem value={VideoIsoLimit.Iso800}>{SpinnerLocalization.videoIsoLimitItem(language, VideoIsoLimit.Iso800)}</MenuItem>
						<MenuItem value={VideoIsoLimit.Iso400}>{SpinnerLocalization.videoIsoLimitItem(language, VideoIsoLimit.Iso400)}</MenuItem>
						<MenuItem value={VideoIsoLimit.Iso200}>{SpinnerLocalization.videoIsoLimitItem(language, VideoIsoLimit.Iso200)}</MenuItem>
						<MenuItem value={VideoIsoLimit.Iso100}>{SpinnerLocalization.videoIsoLimitItem(language, VideoIsoLimit.Iso100)}</MenuItem>
					</Select>
				</FormControl>
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<InputLabel id='camera-settings-ev-select-label'>
						{SpinnerLocalization.evComp(language)}
					</InputLabel>
					<Select
						labelId='camera-settings-ev-select-label'
						value={Number(this.store.cameraSettings.videoSettingsEvCompGoPro8)}
						onChange={this.onVideoSettingsEvCompGoPro8Change}
					>
						<MenuItem value={EvComp.EvPlus2}>{SpinnerLocalization.evCompItem(language, EvComp.EvPlus2)}</MenuItem>
						<MenuItem value={EvComp.EvPlus1_5}>{SpinnerLocalization.evCompItem(language, EvComp.EvPlus1_5)}</MenuItem>
						<MenuItem value={EvComp.EvPlus1}>{SpinnerLocalization.evCompItem(language, EvComp.EvPlus1)}</MenuItem>
						<MenuItem value={EvComp.EvPlus0_5}>{SpinnerLocalization.evCompItem(language, EvComp.EvPlus0_5)}</MenuItem>
						<MenuItem value={EvComp.Ev0}>{SpinnerLocalization.evCompItem(language, EvComp.Ev0)}</MenuItem>
						<MenuItem value={EvComp.EvMinus0_5}>{SpinnerLocalization.evCompItem(language, EvComp.EvMinus0_5)}</MenuItem>
						<MenuItem value={EvComp.EvMinus1}>{SpinnerLocalization.evCompItem(language, EvComp.EvMinus1)}</MenuItem>
						<MenuItem value={EvComp.EvMinus1_5}>{SpinnerLocalization.evCompItem(language, EvComp.EvMinus1_5)}</MenuItem>
						<MenuItem value={EvComp.EvMinus2}>{SpinnerLocalization.evCompItem(language, EvComp.EvMinus2)}</MenuItem>
					</Select>
				</FormControl>
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<InputLabel id='camera-settings-protune-select-label'>
						{SpinnerLocalization.proTune(language)}
					</InputLabel>
					<Select
						labelId='camera-settings-protune-select-label'
						value={Number(this.store.cameraSettings.videoSettingsProTuneGoPro8)}
						onChange={this.onVideoSettingsProTuneGoPro8Change}
					>
						<MenuItem value={ProTune.On}>{SpinnerLocalization.proTuneItem(language, ProTune.On)}</MenuItem>
						<MenuItem value={ProTune.Off}>{SpinnerLocalization.proTuneItem(language, ProTune.Off)}</MenuItem>
					</Select>
				</FormControl>
			</>
		);
	}
	private getPhotoSettingsGoPro8(language: LanguageEnum | undefined) {
		if (this.store.cameraNotFound
			|| !this.store.cameraSettings.cameraOnline
			|| !(this.store.cameraSettings.currentModeGoPro8 === CameraModeGoPro8.Photo
				|| this.store.cameraSettings.currentModeGoPro8 === CameraModeGoPro8.BurstPhoto
				|| this.store.cameraSettings.currentModeGoPro8 === CameraModeGoPro8.LiveBurst
				|| this.store.cameraSettings.currentModeGoPro8 === CameraModeGoPro8.NightPhoto)) {
			return null;
		}

		return (
			<>
				<h3>{SpinnerLocalization.photoSettings(language)}</h3>
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<InputLabel id='camera-settings-iso-select-label'>
						{SpinnerLocalization.isoLimit(language)}
					</InputLabel>
					<Select
						labelId='camera-settings-iso-select-label'
						value={Number(this.store.cameraSettings.photoSettingsIsoLimit)}
						onChange={this.onPhotoSettingsIsoLimitChange}
					>
						<MenuItem value={PhotoIsoLimit.Iso3200}>{SpinnerLocalization.photoIsoLimitItem(language, PhotoIsoLimit.Iso3200)}</MenuItem>
						<MenuItem value={PhotoIsoLimit.Iso1600}>{SpinnerLocalization.photoIsoLimitItem(language, PhotoIsoLimit.Iso1600)}</MenuItem>
						<MenuItem value={PhotoIsoLimit.Iso800}>{SpinnerLocalization.photoIsoLimitItem(language, PhotoIsoLimit.Iso800)}</MenuItem>
						<MenuItem value={PhotoIsoLimit.Iso400}>{SpinnerLocalization.photoIsoLimitItem(language, PhotoIsoLimit.Iso400)}</MenuItem>
						<MenuItem value={PhotoIsoLimit.Iso200}>{SpinnerLocalization.photoIsoLimitItem(language, PhotoIsoLimit.Iso200)}</MenuItem>
						<MenuItem value={PhotoIsoLimit.Iso100}>{SpinnerLocalization.photoIsoLimitItem(language, PhotoIsoLimit.Iso100)}</MenuItem>
					</Select>
				</FormControl>
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<InputLabel id='camera-settings-ev-select-label'>
						{SpinnerLocalization.evComp(language)}
					</InputLabel>
					<Select
						labelId='camera-settings-ev-select-label'
						value={Number(this.store.cameraSettings.photoSettingsEvCompGoPro8)}
						onChange={this.onPhotoSettingsEvCompGoPro8Change}
					>
						<MenuItem value={EvComp.EvPlus2}>{SpinnerLocalization.evCompItem(language, EvComp.EvPlus2)}</MenuItem>
						<MenuItem value={EvComp.EvPlus1_5}>{SpinnerLocalization.evCompItem(language, EvComp.EvPlus1_5)}</MenuItem>
						<MenuItem value={EvComp.EvPlus1}>{SpinnerLocalization.evCompItem(language, EvComp.EvPlus1)}</MenuItem>
						<MenuItem value={EvComp.EvPlus0_5}>{SpinnerLocalization.evCompItem(language, EvComp.EvPlus0_5)}</MenuItem>
						<MenuItem value={EvComp.Ev0}>{SpinnerLocalization.evCompItem(language, EvComp.Ev0)}</MenuItem>
						<MenuItem value={EvComp.EvMinus0_5}>{SpinnerLocalization.evCompItem(language, EvComp.EvMinus0_5)}</MenuItem>
						<MenuItem value={EvComp.EvMinus1}>{SpinnerLocalization.evCompItem(language, EvComp.EvMinus1)}</MenuItem>
						<MenuItem value={EvComp.EvMinus1_5}>{SpinnerLocalization.evCompItem(language, EvComp.EvMinus1_5)}</MenuItem>
						<MenuItem value={EvComp.EvMinus2}>{SpinnerLocalization.evCompItem(language, EvComp.EvMinus2)}</MenuItem>
					</Select>
				</FormControl>
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<InputLabel id='camera-settings-protune-select-label'>
						{SpinnerLocalization.proTune(language)}
					</InputLabel>
					<Select
						labelId='camera-settings-protune-select-label'
						value={Number(this.store.cameraSettings.photoSettingsProTuneGoPro8)}
						onChange={this.onPhotoSettingsProTuneGoPro8Change}
					>
						<MenuItem value={ProTune.On}>{SpinnerLocalization.proTuneItem(language, ProTune.On)}</MenuItem>
						<MenuItem value={ProTune.Off}>{SpinnerLocalization.proTuneItem(language, ProTune.Off)}</MenuItem>
					</Select>
				</FormControl>
			</>
		);
	}
	private getTimeLapseSettingsGoPro8(language: LanguageEnum | undefined) {
		if (this.store.cameraNotFound
			|| !this.store.cameraSettings.cameraOnline
			|| !(this.store.cameraSettings.currentModeGoPro8 === CameraModeGoPro8.TimeLapsePhoto
				|| this.store.cameraSettings.currentModeGoPro8 === CameraModeGoPro8.TimeLapseVideo
				|| this.store.cameraSettings.currentModeGoPro8 === CameraModeGoPro8.NightLapsePhoto
				|| this.store.cameraSettings.currentModeGoPro8 === CameraModeGoPro8.TimeWarpVideo
				|| this.store.cameraSettings.currentModeGoPro8 === CameraModeGoPro8.NightLapseVideo)) {
			return null;
		}

		return (
			<>
				<h3>{SpinnerLocalization.timeLapseSettings(language)}</h3>
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<InputLabel id='camera-settings-resolution-select-label'>
						{SpinnerLocalization.resolution(language)}
					</InputLabel>
					<Select
						labelId='camera-settings-resolution-select-label'
						value={Number(this.store.cameraSettings.videoSettingsResolution)}
						onChange={this.onVideoSettingsResolutionChange}
					>
						<MenuItem value={VideoResolution.Resolution4K}>{SpinnerLocalization.videoResolutionItem(language, VideoResolution.Resolution4K)}</MenuItem>
						<MenuItem value={VideoResolution.Resolution27K43}>{SpinnerLocalization.videoResolutionItem(language, VideoResolution.Resolution27K43)}</MenuItem>
						<MenuItem value={VideoResolution.Resolution1440}>{SpinnerLocalization.videoResolutionItem(language, VideoResolution.Resolution1440)}</MenuItem>
						<MenuItem value={VideoResolution.Resolution1080}>{SpinnerLocalization.videoResolutionItem(language, VideoResolution.Resolution1080)}</MenuItem>
					</Select>
				</FormControl>
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<InputLabel id='camera-settings-iso-select-label'>
						{SpinnerLocalization.isoLimit(language)}
					</InputLabel>
					<Select
						labelId='camera-settings-iso-select-label'
						value={Number(this.store.cameraSettings.videoSettingsIsoLimit)}
						onChange={this.onVideoSettingsIsoLimitChange}
					>
						<MenuItem value={VideoIsoLimit.Iso6400}>{SpinnerLocalization.videoIsoLimitItem(language, VideoIsoLimit.Iso6400)}</MenuItem>
						<MenuItem value={VideoIsoLimit.Iso3200}>{SpinnerLocalization.videoIsoLimitItem(language, VideoIsoLimit.Iso3200)}</MenuItem>
						<MenuItem value={VideoIsoLimit.Iso1600}>{SpinnerLocalization.videoIsoLimitItem(language, VideoIsoLimit.Iso1600)}</MenuItem>
						<MenuItem value={VideoIsoLimit.Iso800}>{SpinnerLocalization.videoIsoLimitItem(language, VideoIsoLimit.Iso800)}</MenuItem>
						<MenuItem value={VideoIsoLimit.Iso400}>{SpinnerLocalization.videoIsoLimitItem(language, VideoIsoLimit.Iso400)}</MenuItem>
						<MenuItem value={VideoIsoLimit.Iso200}>{SpinnerLocalization.videoIsoLimitItem(language, VideoIsoLimit.Iso200)}</MenuItem>
						<MenuItem value={VideoIsoLimit.Iso100}>{SpinnerLocalization.videoIsoLimitItem(language, VideoIsoLimit.Iso100)}</MenuItem>
					</Select>
				</FormControl>
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<InputLabel id='camera-settings-ev-select-label'>
						{SpinnerLocalization.evComp(language)}
					</InputLabel>
					<Select
						labelId='camera-settings-ev-select-label'
						value={Number(this.store.cameraSettings.videoSettingsEvCompGoPro8)}
						onChange={this.onVideoSettingsEvCompGoPro8Change}
					>
						<MenuItem value={EvComp.EvPlus2}>{SpinnerLocalization.evCompItem(language, EvComp.EvPlus2)}</MenuItem>
						<MenuItem value={EvComp.EvPlus1_5}>{SpinnerLocalization.evCompItem(language, EvComp.EvPlus1_5)}</MenuItem>
						<MenuItem value={EvComp.EvPlus1}>{SpinnerLocalization.evCompItem(language, EvComp.EvPlus1)}</MenuItem>
						<MenuItem value={EvComp.EvPlus0_5}>{SpinnerLocalization.evCompItem(language, EvComp.EvPlus0_5)}</MenuItem>
						<MenuItem value={EvComp.Ev0}>{SpinnerLocalization.evCompItem(language, EvComp.Ev0)}</MenuItem>
						<MenuItem value={EvComp.EvMinus0_5}>{SpinnerLocalization.evCompItem(language, EvComp.EvMinus0_5)}</MenuItem>
						<MenuItem value={EvComp.EvMinus1}>{SpinnerLocalization.evCompItem(language, EvComp.EvMinus1)}</MenuItem>
						<MenuItem value={EvComp.EvMinus1_5}>{SpinnerLocalization.evCompItem(language, EvComp.EvMinus1_5)}</MenuItem>
						<MenuItem value={EvComp.EvMinus2}>{SpinnerLocalization.evCompItem(language, EvComp.EvMinus2)}</MenuItem>
					</Select>
				</FormControl>
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<InputLabel id='camera-settings-protune-select-label'>
						{SpinnerLocalization.proTune(language)}
					</InputLabel>
					<Select
						labelId='camera-settings-protune-select-label'
						value={Number(this.store.cameraSettings.videoSettingsProTuneGoPro8)}
						onChange={this.onVideoSettingsProTuneGoPro8Change}
					>
						<MenuItem value={ProTune.On}>{SpinnerLocalization.proTuneItem(language, ProTune.On)}</MenuItem>
						<MenuItem value={ProTune.Off}>{SpinnerLocalization.proTuneItem(language, ProTune.Off)}</MenuItem>
					</Select>
				</FormControl>
			</>
		);
	}

	/** */
	private getGoProShuttleStatus(): React.ReactNode {
		if (!this.store.status) {
			return null;
		}

		const status = SpinnerLocalization.shuttlerStatus(this.store.language, this.store.status, this.store.statusFilename);
		return (	
			<div className='padding-right-12px-important'>
				{status}
			</div>
		);
	};

	/** */
	private getFrontSettings(language: LanguageEnum | undefined): React.ReactNode {
		const selectedGuid = this.store.settings?.frontSettings?.selectedPresetGuid;
		const selectedPreset = this.store.settings?.frontSettings?.presets?.find(preset => preset.guid === selectedGuid);


		const presets = this.store.settings?.frontSettings?.presets
			?.slice()
			?.sort(SortHelper.dynamicSort('title'))
			?.map(item => {
				return <MenuItem key={item.guid} value={item.guid}>{item.title}</MenuItem>
			}) ?? [];
		const newPresetNumber = (this.store.settings?.frontSettings?.presets?.length ?? 0) + 1;
		presets?.push(<Divider />);
		presets?.push(<MenuItem className='font-style-italic' value={'new' + newPresetNumber}>{SpinnerLocalization.frontSettings.createNewPreset(newPresetNumber, language)}</MenuItem>);

		const multipliers = this.getMultipliers(language);

		const introOutroItems = [(
				<MenuItem value=''>
					<em>{SpinnerLocalization.frontSettings.none(language)}</em>
				</MenuItem>
			),
			<Divider />
		];
		introOutroItems.push(...this.store.settings?.introOutroItems
			?.sort(SortHelper.dynamicSort('title'))
			?.map(item => {
				return <MenuItem value={item.value}>{item.title}</MenuItem>
			}) ?? []
		);
		const introOutro = this.store.settings?.introOutroItems?.length ?? 0 > 0
			? (
				<>
					<FormControl
						fullWidth={true}
						margin='dense'
					>
						<InputLabel id='intro-select-label'>
							{SpinnerLocalization.frontSettings.intro(language)}
						</InputLabel>
						<Select
							labelId='intro-select-label'
							value={selectedPreset?.selectedIntroGuid}
							onChange={this.onIntroChange}
						>
							{introOutroItems}
						</Select>
					</FormControl>
					<FormControl
						fullWidth={true}
						margin='dense'
					>
						<InputLabel id='outro-select-label'>
							{SpinnerLocalization.frontSettings.outro(language)}
						</InputLabel>
						<Select
							labelId='outro-select-label'
							value={selectedPreset?.selectedOutroGuid}
							onChange={this.onOutroChange}
						>
							{introOutroItems}
						</Select>
					</FormControl>
				</>
			)
			: null;

		const audioItems = [(
				<MenuItem value=''>
					<em>{SpinnerLocalization.frontSettings.none(language)}</em>
				</MenuItem>
			),
			<Divider />
		];
		audioItems.push(...this.store.settings?.audioItems
			?.sort(SortHelper.dynamicSort('title'))
			?.map(item => {
				return <MenuItem value={item.value}>{item.title}</MenuItem>
			}) ?? []
		);
		const audio = this.store.settings?.audioItems?.length ?? 0 > 0
			? (
				<>
					<FormControl
						fullWidth={true}
						margin='dense'
					>
						<InputLabel id='audio-select-label'>
							{SpinnerLocalization.frontSettings.audio(language)}
						</InputLabel>
						<Select
							labelId='audio-select-label'
							value={selectedPreset?.selectedAudioGuid}
							onChange={this.onAudioChange}
						>
							{audioItems}
						</Select>
					</FormControl>
				</>
			)
			: null;


		const debug = process.env.NODE_ENV === 'development'
		? (
			<div>
				{'guid:' + selectedPreset?.guid}
				{'   selectedGuid:' + this.store.settings?.frontSettings?.selectedPresetGuid}
			</div>
		)
		: null;

		const overlays = this.getOverlays(language);
		const zooms = this.getZooms(language);
		const deletePresetButton = (
			<Tooltip
				title={SpinnerLocalization.frontSettings.deletePresetButton(language)}
			>
				<IconButton
					size='small'
					onClick={this.onDeletePresetClick}
				>
					<Delete />
				</IconButton>
			</Tooltip>
		);

		return (
			<div className=''>
				<div className='padding-top-6px kiosk-item-group-sticky background-whitesmoke'>
					<div className='padding-top-6px padding-left-16px'>
						<Typography
							variant='h6'
						>
							<FormControl
								fullWidth={true}
								margin='dense'
							>
								<InputLabel id='preset-select-label'>
									{SpinnerLocalization.frontSettings.presets(language)}
								</InputLabel>
								<Select
									labelId='preset-select-label'
									value={this.store.settings?.frontSettings?.selectedPresetGuid}
									onChange={this.onPresetChange}
								>
									{presets}
								</Select>
							</FormControl>
						</Typography>
						{debug}
					</div>
					<OneLine className='padding-top-6px padding-left-16px'>
						<ButtonGroup>
							<Button
								className='width100px'
								color='secondary'
								onClick={this.TestButtonClick}
								disabled={this.store.settings.frontSettings?.processVideo || this.store.localSettings.processVideo}
							>
								{SpinnerLocalization.buttonTest(language)}
							</Button>
							<Button
								className='width100px'
								color='primary'
								onClick={this.onManualStartClick}
								disabled={this.store.settings.frontSettings?.processVideo || this.store.localSettings.processVideo}
							>
								{SpinnerLocalization.buttonManualStart(language)}
							</Button>
						</ButtonGroup>
						<div className='padding-left-12px'>
							<FormControlLabel
								control={
									<Switch
										checked={this.store.settings?.frontSettings?.autoMode}
										onChange={this.onAutoModeChange}
									/>
								}
								label={SpinnerLocalization.buttonAutoMode(language)}
							/>
						</div>
					</OneLine>
				</div>
				<div className='padding-top-6px'>
					<Accordion>
						<AccordionSummary
							expandIcon={<ExpandMore />}
							className='background-color-gray-opacity'
						>
							<div className='width-100-percent'>
								<div className='padding-top-6px'>
									<Typography
										variant='h6'
									>
										{SpinnerLocalization.settings(language)}
									</Typography>
								</div>
							</div>
						</AccordionSummary>
						<AccordionDetails>
							<FormControl
								fullWidth={true}
								margin='dense'
							>
								<FormControl
									fullWidth={true}
									margin='dense'
								>
									<TextField
										value={selectedPreset?.title}
										label={SpinnerLocalization.frontSettings.presetName(language)}
										onChange={this.onPresetTitleChange}
										InputProps={{
											endAdornment: deletePresetButton
										}}
									/>
								</FormControl>
								<FormControl
									fullWidth={true}
									margin='dense'
								>
									<FormControlLabel
										control={
											<Checkbox
												checked={selectedPreset?.pingPong}
												onChange={this.onPingPongChange}
												color='primary'
											/>
										}
										label={SpinnerLocalization.frontSettings.pingPong(language)}
									/>
								</FormControl>
								{multipliers}
								{introOutro}
								{audio}
								{overlays}
								{zooms}
							</FormControl>
						</AccordionDetails>
					</Accordion>
					<Accordion>
						<AccordionSummary
							expandIcon={<ExpandMore />}
							className='background-color-gray-opacity'
						>
							<div className='width-100-percent'>
								{SpinnerLocalization.frontSettings.preview(language)}
							</div>
						</AccordionSummary>
						<AccordionDetails>
							<FormControl
								fullWidth={true}
								margin='dense'
							>
								<KioskViewCarouselItem
									language={language}
									groupBy={GroupByEnum.groupByDir}
									groups={this.store.commonGroupsFiles}
									sortOrder={SortOrderEnum.desc}
								/>
							</FormControl>
						</AccordionDetails>
					</Accordion>
				</div>
			</div>
		);
	}

	/** Отображение */
	private getOverlays(language?: LanguageEnum): React.ReactNode {
		if (!this.store.settings?.overlayItems || this.store.settings.overlayItems.length === 0) {
			return null;
		}

		const selectedGuid = this.store.settings?.frontSettings?.selectedPresetGuid;
		const selectedPreset = this.store.settings?.frontSettings?.presets?.find(preset => preset.guid === selectedGuid);

		const rows = this.store.settings?.overlayItems?.map(item => {
			let frontOverlay = selectedPreset?.overlays?.find(overlay => overlay.guid === item.value);
			if (!frontOverlay) {
				frontOverlay = new SpinnerSettingsFrontOverlayItemViewModel();
				frontOverlay.guid = item.value;
			}
			return (
				<OverlayItemRow
					title={item.title}
					{...frontOverlay}
					onChange={this.onOverlayItemChange}
				/>
			);
		});
		return (
			<div className='padding-top-12px padding-bottom-6px'>
				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>{SpinnerLocalization.frontSettings.overlay(language)}</TableCell>
								<TableCell align='right'>{SpinnerLocalization.frontSettings.disable(language)}</TableCell>
								<TableCell align='right'>{SpinnerLocalization.frontSettings.beforeSlow(language)}</TableCell>
								<TableCell align='right'>{SpinnerLocalization.frontSettings.afterSlow(language)}</TableCell>
								<TableCell align='right'>{SpinnerLocalization.frontSettings.afterPingPong(language)}</TableCell>
								<TableCell align='right'>{SpinnerLocalization.frontSettings.forPhoto(language)}</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		);
	}

	/** Отображение */
	private getZooms(language?: LanguageEnum): React.ReactNode {
		if (!this.store.settings?.zoomItems || this.store.settings.zoomItems.length === 0) {
			return null;
		}

		const selectedGuid = this.store.settings?.frontSettings?.selectedPresetGuid;
		const selectedPreset = this.store.settings?.frontSettings?.presets?.find(preset => preset.guid === selectedGuid);

		const rows = this.store.settings?.zoomItems?.map(item => {
			let frontZoom = selectedPreset?.zooms?.find(zoom => zoom.guid === item.value);
			if (!frontZoom) {
				frontZoom = new SpinnerSettingsFrontZoomItemViewModel();
				frontZoom.guid = item.value;
			}
			return (
				<ZoomItemRow
					title={item.title}
					{...frontZoom}
					onChange={this.onZoomItemChange}
				/>
			);
		});
		return (
			<div className='padding-top-12px padding-bottom-6px'>
				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>{SpinnerLocalization.frontSettings.zoom(language)}</TableCell>
								<TableCell align='right'>{SpinnerLocalization.frontSettings.disable(language)}</TableCell>
								<TableCell align='right'>{SpinnerLocalization.frontSettings.beforeSlow(language)}</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		);
	}

	/** Отображение */
	private getMultipliers(language?: LanguageEnum): React.ReactNode {
		const selectedGuid = this.store.settings?.frontSettings?.selectedPresetGuid;
		const selectedPreset = this.store.settings?.frontSettings?.presets?.find(preset => preset.guid === selectedGuid);
		const items = selectedPreset?.multipliers?.map((setting: MultiplierEnum, index: number, array: MultiplierEnum[]) => {
			const disableUpButton = index === 0;
			const disableDownButton = index === array.length - 1;
			const title = (
				<div className='width100prc'>
					<Typography
						variant='body2'
						align='center'
					>
						{SpinnerLocalization.frontSettings.multiplierValue(setting, language)}
					</Typography>
					<OneLine className='slider-container0'>
						<FormControl
							fullWidth={true}
							margin='dense'
						>
							<MultiplierItem
								value={setting}
								position={index}
								language={language}
								onChange={this.onMultiplierItemChange}
								onChangeCommitted={this.onMultiplierItemChangeCommitted}
							/>
						</FormControl>
					</OneLine>
				</div>
			);
			return (
				<div
					key={index}
					className='padding-bottom-12px'
				>
					<ItemComponent
						language={language}
						removeButtonTitle={SpinnerLocalization.frontSettings.deleteButton(language)}
						disableUpButton={disableUpButton}
						disableDownButton={disableDownButton}
						showUpButton={true}
						showDownButton={true}
						showDeleteButton={true}
						position={index}
						title={title}

						onUpClick={this.onMultiplierUpClick}
						onDownClick={this.onMultiplierDownClick}
						onDeleteClick={this.onMultiplierDeleteClick}
					>
						{/* <MultiplierItem
							value={setting}
							position={index}
							language={language}
							// disabled={!this.props.enable}
							onChange={this.onMultiplierItemChange}
						/> */}
					</ItemComponent>
				</div>
			);
		});

		return (
			<div className=''>
				<Typography
					variant='h6'
				>
					{SpinnerLocalization.frontSettings.speedMultipliers(language)}
				</Typography>
				<FormControl
					fullWidth={true}
					margin='dense'
				>
					<Button
						onClick={this.onAddMultiplierClick}
						color='primary'
						variant='contained'
						startIcon={<PlaylistAdd />}
					>
						{SpinnerLocalization.frontSettings.addButton(language)}
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
	private readonly onDeletePresetClick = (): void => {
		const selectedGuid = this.store.settings?.frontSettings?.selectedPresetGuid;
		if (this.store.settings?.frontSettings?.presets) {
			this.store.settings.frontSettings.presets = this.store.settings?.frontSettings?.presets?.filter(preset => preset.guid !== selectedGuid);
			if (this.store.settings.frontSettings.presets?.length > 0) {
				this.store.settings.frontSettings.selectedPresetGuid = this.store.settings.frontSettings
					.presets
					.sort(SortHelper.dynamicSort('title'))
					[0].guid;
			} else {
				const newPresetNumber = (this.store.settings.frontSettings.presets.length ?? 0) + 1;
				const newPreset = new SpinnerSettingsFrontItemViewModel();
				newPreset.title = SpinnerLocalization.frontSettings.newPreset(newPresetNumber, this.store.language);
				this.store.settings.frontSettings.presets.push(newPreset);
				this.store.settings.frontSettings.selectedPresetGuid = newPreset.guid;
			}
		}

		this.controller.saveFrontSettings(this.store.settings?.frontSettings);
	};
	/** */
	private readonly onOverlayItemChange = (event: any, value: SpinnerSettingsFrontOverlayItemModel): void => {
		const selectedGuid = this.store.settings?.frontSettings?.selectedPresetGuid;
		const selectedPreset = this.store.settings?.frontSettings?.presets?.find(preset => preset.guid === selectedGuid);
		let overlay = selectedPreset?.overlays?.find(item => item.guid === value.guid);
		if (!overlay) {
			overlay = new SpinnerSettingsFrontOverlayItemViewModel();
			overlay.guid = value.guid;
			selectedPreset?.overlays?.push(overlay);
		}

		MapperHelper.mapProperties(value, overlay);
		this.controller.saveFrontSettings(this.store.settings?.frontSettings);
	};

	/** */
	private readonly onZoomItemChange = (event: any, value: SpinnerSettingsFrontZoomItemModel): void => {
		const selectedGuid = this.store.settings?.frontSettings?.selectedPresetGuid;
		const selectedPreset = this.store.settings?.frontSettings?.presets?.find(preset => preset.guid === selectedGuid);
		let zoom = selectedPreset?.zooms?.find(item => item.guid === value.guid);
		if (!zoom) {
			zoom = new SpinnerSettingsFrontZoomItemViewModel();
			zoom.guid = value.guid;
			selectedPreset?.zooms?.push(zoom);
		}

		MapperHelper.mapProperties(value, zoom);
		this.controller.saveFrontSettings(this.store.settings?.frontSettings);
	};

	/** */
	private readonly onMultiplierItemChange = (event: any, value: {value: MultiplierEnum, position: number}): void => {
		const selectedGuid = this.store.settings?.frontSettings?.selectedPresetGuid;
		const selectedPreset = this.store.settings?.frontSettings?.presets?.find(preset => preset.guid === selectedGuid);
		const items = selectedPreset?.multipliers ?? [];
		const id = value.position;
		if (items && id >= 0 && id < items.length) {
			items[id] = value.value;
			selectedPreset!.multipliers = items;
		}
	};

	/** */
	private readonly onMultiplierItemChangeCommitted = (event: any, value: {value: MultiplierEnum, position: number}): void => {
		const selectedGuid = this.store.settings?.frontSettings?.selectedPresetGuid;
		const selectedPreset = this.store.settings?.frontSettings?.presets?.find(preset => preset.guid === selectedGuid);
		const items = selectedPreset?.multipliers ?? [];
		const id = value.position;
		if (items && id >= 0 && id < items.length) {
			items[id] = value.value;
			selectedPreset!.multipliers = items;
			this.controller.saveFrontSettings(this.store.settings?.frontSettings);
		}
	};

	/** */
	private readonly onMultiplierDeleteClick = (_event: React.MouseEvent<Element, MouseEvent>, id: number): void => {
		const selectedGuid = this.store.settings?.frontSettings?.selectedPresetGuid;
		const selectedPreset = this.store.settings?.frontSettings?.presets?.find(preset => preset.guid === selectedGuid);
		const items = selectedPreset?.multipliers ?? [];
		if (items && id >= 0 && id < items.length) {
			items.splice(id, 1);
			selectedPreset!.multipliers = items;
			this.controller.saveFrontSettings(this.store.settings?.frontSettings);
		}
	};

	/** */
	private readonly onMultiplierUpClick = (_event: React.MouseEvent<Element, MouseEvent>, id: number): void => {
		const selectedGuid = this.store.settings?.frontSettings?.selectedPresetGuid;
		const selectedPreset = this.store.settings?.frontSettings?.presets?.find(preset => preset.guid === selectedGuid);
		const items = selectedPreset?.multipliers ?? [];
		if (items && id >= 1 && id < items.length) {
			const newValue = items[id - 1];
			items[id - 1] = items[id];
			items[id] = newValue;
			this.controller.saveFrontSettings(this.store.settings?.frontSettings);
		}
	};

	/** */
	private readonly onMultiplierDownClick = (_event: React.MouseEvent<Element, MouseEvent>, id: number): void => {
		const selectedGuid = this.store.settings?.frontSettings?.selectedPresetGuid;
		const selectedPreset = this.store.settings?.frontSettings?.presets?.find(preset => preset.guid === selectedGuid);
		const items = selectedPreset?.multipliers ?? [];
		if (items && id >= 0 && id < items.length - 1) {
			const newValue = items[id + 1];
			items[id + 1] = items[id];
			items[id] = newValue;
			this.controller.saveFrontSettings(this.store.settings?.frontSettings);
		}
	};

	/** */
	private readonly onAddMultiplierClick = async (): Promise<void> => {
		const selectedGuid = this.store.settings?.frontSettings?.selectedPresetGuid;
		const selectedPreset = this.store.settings?.frontSettings?.presets?.find(preset => preset.guid === selectedGuid);

		if (selectedPreset) {
			selectedPreset.multipliers?.push(MultiplierEnum.slow5Times);
			this.controller.saveFrontSettings(this.store.settings?.frontSettings);
		}
	};

	/** */
	private readonly onProcessGoProVideoChange = async (event: React.ChangeEvent<HTMLInputElement>, checked: boolean): Promise<void> => {
		this.store.localSettings.processGoProVideo = checked;
		this.controller.saveSettingsToLocalStorage();
	};

	/** */
	private readonly onPingPongChange = async (event: React.ChangeEvent<HTMLInputElement>, checked: boolean): Promise<void> => {
		const selectedGuid = this.store.settings?.frontSettings?.selectedPresetGuid;
		const selectedPreset = this.store.settings?.frontSettings?.presets?.find(preset => preset.guid === selectedGuid);

		if (selectedPreset) {
			selectedPreset.pingPong = checked;
			this.controller.saveFrontSettings(this.store.settings?.frontSettings);
		}
	};

	/** */
	private readonly onPresetTitleChange = async (event: ITextFieldChangeEventProps): Promise<void> => {
		const selectedGuid = this.store.settings?.frontSettings?.selectedPresetGuid;
		const selectedPreset = this.store.settings?.frontSettings?.presets?.find(preset => preset.guid === selectedGuid);

		if (selectedPreset) {
			selectedPreset.title = event.target.value;
			this.controller.saveFrontSettings(this.store.settings?.frontSettings);
		}
	};

	/** */
	private readonly onIntroChange = async (event: ISelectChangeEventProps): Promise<void> => {
		const selectedGuid = this.store.settings?.frontSettings?.selectedPresetGuid;
		const selectedPreset = this.store.settings?.frontSettings?.presets?.find(preset => preset.guid === selectedGuid);

		if (selectedPreset) {
			selectedPreset.selectedIntroGuid = event.target.value as string;
			this.controller.saveFrontSettings(this.store.settings?.frontSettings);
		}
	};

	/** */
	private readonly onOutroChange = async (event: ISelectChangeEventProps): Promise<void> => {
		const selectedGuid = this.store.settings?.frontSettings?.selectedPresetGuid;
		const selectedPreset = this.store.settings?.frontSettings?.presets?.find(preset => preset.guid === selectedGuid);

		if (selectedPreset) {
			selectedPreset.selectedOutroGuid = event.target.value as string;
			this.controller.saveFrontSettings(this.store.settings?.frontSettings);
		}
	};

	/** */
	private readonly onAudioChange = async (event: ISelectChangeEventProps): Promise<void> => {
		const selectedGuid = this.store.settings?.frontSettings?.selectedPresetGuid;
		const selectedPreset = this.store.settings?.frontSettings?.presets?.find(preset => preset.guid === selectedGuid);

		if (selectedPreset) {
			selectedPreset.selectedAudioGuid = event.target.value as string;
			this.controller.saveFrontSettings(this.store.settings?.frontSettings);
		}
	};

	/** */
	private readonly onPresetChange = async (event: ISelectChangeEventProps): Promise<void> => {
		const value = event.target.value as string;
		if (value.startsWith('new')) {
			const newPresetNumber = (this.store.settings?.frontSettings?.presets?.length ?? 0) + 1;
			const newPreset = new SpinnerSettingsFrontItemViewModel();
			newPreset.title = SpinnerLocalization.frontSettings.newPreset(newPresetNumber, this.store.language);
			this.store.settings?.frontSettings?.presets?.push(newPreset);
			this.store.settings!.frontSettings!.selectedPresetGuid = newPreset.guid;
		} else if (this.store.settings?.frontSettings) {
			this.store.settings.frontSettings.selectedPresetGuid = value;
		}
		this.controller.saveFrontSettings(this.store.settings?.frontSettings);
	};

}

export default withSnackbar(SpinnerView);
