import { observable } from 'mobx';

/** */
export class VideoSettingsModel {
	public addThumbnail?: boolean = false;

	public fadeIn?: boolean = false;

	public fadeInDuration?: string = '0';

	public fadeOut?: boolean = false;

	public fadeOutDuration?: string = '0';

	public fps?: string = '30';

	public maxBitrate?: string = '8000';

	public resolutionWidth?: string = '1920';

	public resolutionHeight?: string = '1080';

	public fitWithin?: FitWithinEnum = FitWithinEnum.fitAll;

	public renderOn?: RenderOnEnum = RenderOnEnum.cpu;
}

/** */
export class VideoSettingsViewModel implements VideoSettingsModel {
	/** */
	@observable
	public fadeInDuration?: string;

	/** */
	@observable
	public fadeOutDuration?: string;

	/** */
	@observable
	public fps?: string;

	/** */
	@observable
	public maxBitrate?: string;

	/** */
	@observable
	public resolutionWidth?: string;

	/** */
	@observable
	public resolutionHeight?: string;

	/** */
	@observable
	public fitWithin = FitWithinEnum.fitAll;

	/** */
	@observable
	public renderOn = RenderOnEnum.cpu;

	/** */
	@observable
	public addThumbnail = false;

	/** */
	@observable
	public fadeIn = false;

	/** */
	@observable
	public fadeOut = false;
}

export enum FitWithinEnum {
	byWidth='byWidth',
	byHeight='byHeight',
	fitAll='fitAll',
}

export enum RenderOnEnum {
	cpu='cpu',
	nvidiaH264='nvidiaH264',
	nvidiaNvench='nvidiaNvench',
	radeon='radeon',
}
