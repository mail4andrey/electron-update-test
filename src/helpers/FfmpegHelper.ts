import fs from 'fs';
import path from 'path';
import { app } from 'electron';
// import ffmpeg from 'fluent-ffmpeg';
// import ffmpegStatic from 'ffmpeg-static';
import { ffmpegPath as ffmpegStatic, ffprobePath as ffprobeStatic} from '../bin/ffmpeg/index';
// import ffprobeStatic from 'ffprobe-static';
// import { ffmpegPath as ffmpegStatic, ffprobePath as ffprobeStatic } from 'ffmpeg-ffprobe-static';
// import { ffmpegPath as ffmpegStatic } from 'ffmpeg-ffprobe-static';
import appRootDir from 'app-root-dir';
import { spawn, ChildProcessWithoutNullStreams } from 'child_process';
import fg from 'fast-glob';
// import { globby } from 'globby';
import { SpinnerSettingsModel } from '../applications/spinner/settings/SpinnerSettingsModel';
import { EventLogger } from './EventLogger';
import { SortHelper } from './SortHelper';
import { FitWithinEnum, RenderOnEnum } from '../applications/base/settings/tabs/video/VideoSettingsModel';
import { AudioStartFromEnum, AudioStopToEnum } from '../applications/base/settings/tabs/audio/AudioSettingsItemModel';
import { MultiplierEnum, SpinnerSettingsFrontItemModel } from '../src-front/applications/spinner/frontSettings/SpinnerSettingsFrontModel';
import { AlignSettingEnum, OverlaySettingsItemModel } from '../applications/base/settings/tabs/overlay/OverlaySettingsItemModel';
import { ZoomSettingsItemModel } from '../applications/base/settings/tabs/zoom/ZoomSettingsItemModel';
import { IdGenerator } from './IdGenerator';
import { FileHelper } from '../src-front/helpers/FileHelper';
import { IntroOutroSettingsItemModel } from '../applications/base/settings/tabs/introOutro/IntroOutroSettingsItemModel';
import { FileExtension } from '../applications/base/settings/tabs/pathSources/PathSourcesSettingsModel';
import os from 'os';

/** */
export default class FfmpegHelper {
	private static eventLogger = new EventLogger();

	/** ff */
	public static setup () {
		// //require the ffmpeg package so we can use ffmpeg using JS
		// //Get the paths to the packaged versions of the binaries we want to use
		// const ffmpegPath = ffmpegStatic.replace(
		// 	'app.asar',
		// 	'app.asar.unpacked'
		// );
		// const ffprobePath = ffprobeStatic.path.replace(
		// 	'app.asar',
		// 	'app.asar.unpacked'
		// );
		// //tell the ffmpeg package where it can find the needed binaries.
		// ffmpeg.setFfmpegPath(ffmpegPath);
		// ffmpeg.setFfprobePath(ffprobePath);
		// this.eventLogger.info(ffmpegPath);
		// this.eventLogger.info(ffprobePath);
		const platform = os.platform();
		const arch = os.arch();
		this.eventLogger.info(platform + ' ' + arch);
	}
	
	public static async GetVideoInfo(file: string | undefined, traceId: string): Promise<videoInfo | undefined>
	{
		if (!file || !fs.existsSync(file)) {
			return undefined;
		}

		let videoInfoRaw;
		const videoInfo = {} as videoInfo;
		try {
			// const rootDir = appRootDir.get();
			// const ffprobepath = rootDir + '/node_modules/ffprobe-static/ffprobe';
			// const ffprobepath = ffprobeStatic.path;
			const ffprobepath = ffprobeStatic ?? '';
			this.eventLogger.info(ffprobepath);
			const ffprobeArgs = [
				'-i', file
			];
			const ffprobeArgsString = ffprobeArgs.map(item => (item?.indexOf(' ') ?? 0) >= 0 ? `"${item}"` : item).reduce((a, b) => a + ' ' + b);
			// const ffmpegpath = appRootDir + '/bin/ffmpeg';
			this.eventLogger.info(ffprobepath + ' ' + ffprobeArgsString, 'ffprobe run process ' + traceId + ' ');
			const process = spawn( ffprobepath, ffprobeArgs);
			videoInfoRaw = await FfmpegHelper.waitProcess(process, FfmpegHelper.eventLogger, traceId);
			// this.eventLogger.info(videoInfoRaw);
		} catch (error) {
			this.eventLogger.error(error, 'ffprobe run process ' + traceId + ' ');
		}

		//get duration
		const regExpDuration = new RegExp("[D|d]uration:.((\\d|:|\\.)*)");
		const matchDuration = regExpDuration.exec(videoInfoRaw);

		if (matchDuration && matchDuration.length > 0)
		{
			const duration = matchDuration[1];
			const timepieces = duration?.split(/[:.]+/);
			if (timepieces?.length == 4)
			{
				videoInfo.duration = Number(timepieces[0])*60*60 + Number(timepieces[1])*60 + Number(timepieces[2]) + Number(timepieces[3])/100;
			}
		}

		//get audio bit rate
		const regExpBitrate = new RegExp("[B|b]itrate:.((\\d|:)*)");
		const matchBitrate = regExpBitrate.exec(videoInfoRaw);
		if (matchBitrate && matchBitrate.length > 0)
		{
			videoInfo.bitRate = Number(matchBitrate[1]);
		}

		//get the audio format
		const regExpAudio = new RegExp("[A|a]udio:.*");
		const matchAudio = regExpAudio.exec(videoInfoRaw);
		if (matchAudio && matchAudio.length > 0)
		{
			videoInfo.audioFormat = matchAudio[0];
		}

		//get the video format
		const regExpVideo = new RegExp("[V|v]ideo:.*");
		const matchVideo = regExpVideo.exec(videoInfoRaw);
		if (matchVideo && matchVideo.length > 0)
		{
			videoInfo.videoFormat = matchVideo[0];
		}

		//get the video format
		const regExpResolution = new RegExp("(\\d{2,5})x(\\d{2,5})");
		const matchResolution = regExpResolution.exec(videoInfoRaw);
		if (matchResolution && matchResolution.length > 1)
		{
			videoInfo.width = Number(matchResolution[1]);
			videoInfo.height = Number(matchResolution[2]);
		}

		//get fps
		const regExpFps = new RegExp("(\\d*(?:\\.\\d*)?) fps");
		const matchFps = regExpFps.exec(videoInfoRaw);
		if (matchFps && matchFps.length > 0)
		{
			videoInfo.fps = Number(matchFps[1]);
		}

		this.eventLogger.info(JSON.stringify(videoInfo));
		return videoInfo;
	}
	public static async processvideos(directory: string | undefined, settings: SpinnerSettingsModel, traceId: string, testRun: boolean): Promise<string | undefined> {
		if (!directory
			|| !fs.existsSync(directory)) {
			this.eventLogger.warn('Directory ' + directory + ' not found');
			return;
		}

		const directoryFull = path.join(directory, '*.mp4').replace(/\\/g, '/');
		this.eventLogger.info('directoryFull: ' + directoryFull);
		const filesExist = await fg([directoryFull], { dot: true });
		this.eventLogger.info('find files: ' + JSON.stringify(filesExist));

		for (const filename of filesExist) {
			try {
				await this.processvideo(filename, settings, traceId, false);
			} catch (error) {
				this.eventLogger.error(error, 'Error when converted ' + filename);
			}
		}
	}
	/** */
	public static async processvideo(fullname: string | undefined, settings: SpinnerSettingsModel, traceId: string, testRun: boolean): Promise<string | undefined> {
		if (!fullname
			|| !fs.existsSync(fullname)) {
			this.eventLogger.warn('File ' + fullname + ' not found');
			return;
		}


		const fileExtension = settings.pathSources?.fileExtension ?? FileExtension.mp4;
		const inputFiles = await FfmpegHelper.getInputFiles(fullname, settings, traceId);
		const inputFile = inputFiles.find(file => file.fileType === inputFileType.input)!;
		const sourceFile = inputFile.file;

		// const tempPingPongFolder = path.join(app.getPath('temp'), 'pingpong');
		const fileNamePattern = settings.pathSources?.fileNamePattern ?? '';
		const pathDestination = settings.pathSources?.pathDestination ?? '';
		const destinationFile = await FfmpegHelper.getFilenameByPattern(fullname, fileNamePattern, pathDestination, fileExtension);
		const resultFile = await FfmpegHelper.slowMotion(inputFiles, settings, traceId, destinationFile);

		// inputFile.file = pingPongFile;
		// const tempintroOutroFolder = path.join(app.getPath('temp'), 'introOutro');
		// const introOutroFile = await FfmpegHelper.addIntroOutroAudio(inputFiles, settings, traceId, tempintroOutroFolder);
		// const resultFile = await FfmpegHelper.moveFileWithRename(pingPongFile, settings.pathSources?.pathDestination, settings.pathSources?.fileNamePattern, traceId);
		
		if (resultFile && fs.existsSync(resultFile)) {
			this.eventLogger.success('File created: ' + resultFile);
		} else {
			this.eventLogger.error('Error when create file ' + resultFile);
		}

		if (!testRun) {
			const today = new Date();
			const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
			const time = today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds();
			const pathForSourceFile = path.join(settings.pathSources?.pathSource ?? '', date + ' ' + time ).replace(/\\/g, '/');
			await FfmpegHelper.moveFile(sourceFile, pathForSourceFile, traceId);
		}

		// await FfmpegHelper.deleteFiles(slowedFile, pingPongFile, resultFile);
	}
	// private static async moveFileWithRename(sourceFile: string | undefined, pathDestination: string | undefined, fileNamePattern: string | undefined, traceId: string):  Promise<string | undefined> {
	// 	if (!sourceFile || !pathDestination) {
	// 		return;
	// 	}
		
	// 	if (!fs.existsSync(pathDestination)) {
	// 		fs.mkdirSync(pathDestination);
	// 	}

	// 	const newFilename = await FfmpegHelper.getFilenameByPattern(sourceFile, fileNamePattern ?? '', pathDestination ?? '');
	// 	try {
	// 		await FileHelper.moveFile(sourceFile, newFilename);
	// 		return newFilename;
	// 	} catch (error) {
	// 		this.eventLogger.error(error, 'Error when move file - "' + newFilename + '"');
	// 	}
	// }

	private static async moveFile(sourceFile: string | undefined, pathDestination: string | undefined, traceId: string):  Promise<string | undefined> {
		if (!sourceFile || !pathDestination) {
			return;
		}
		
		if (!fs.existsSync(pathDestination)) {
			fs.mkdirSync(pathDestination);
		}

		const filename = path.basename(sourceFile);
		const newFilename = path.join(pathDestination, filename).replace(/\\/g, '/');
		try {
			await FileHelper.moveFile(sourceFile, newFilename);
			return newFilename;
		} catch (error) {
			this.eventLogger.error(error, 'Error when move file - "' + sourceFile + '" to "' + newFilename + '"');
		}
	}

	// private static async addIntroOutroAudio(inputFiles: inputFile[], settings: SpinnerSettingsModel, traceId: string, tempintroOutroFolder: string) {
	// 	const selectedGuid = settings?.frontSettings?.selectedPresetGuid;
	// 	const selectedPreset = settings?.frontSettings?.presets?.find(preset => preset.guid === selectedGuid);

	// 	const videoInfo: videoInfo = {width: 1920, height: 1080, frames: 100};
	// 	const blackScreenIndex = inputFiles.findIndex(file => file.fileType === inputFileType.blackscreen)!;
	// 	const inputFileIndex = inputFiles.findIndex(file => file.fileType === inputFileType.input)!;

	// 	// const zoomSettingsAfterPingPongFilter = FfmpegHelper.getZoomFilter(selectedPreset, settings);

	// 	const { filter: fitWithinFilter, endChain: fitWithinResultChain } = FfmpegHelper.getFitWithinFilter(inputFiles, settings, videoInfo, zoomSettingsAfterPingPongFilter);

	// 	// overlaysAfterPingPong
	// 	const overlayGuidsAfterPingPong = selectedPreset?.overlays?.filter(item => item.afterPingPong && !item.disable).map(item => item.guid) ?? [];
	// 	const overlaysAfterPingPong = settings?.overlaySettings?.items?.filter(item => overlayGuidsAfterPingPong.some(guid => guid === item.guid)) ?? [];
	// 	const { filter: overlaysAfterPingPongFilter, endChain: overlayAfterPingPongResultChain } = FfmpegHelper.getOverlaysFilter(
	// 		inputFiles,
	// 		settings,
	// 		overlaysAfterPingPong,
	// 		fitWithinResultChain,
	// 		'overlayAfterPingPongTemp'
	// 	);

	// 	// const licensed = true;
	// 	const { filter: slowFilter, endChain: slowResultChain } = FfmpegHelper.getSlowFilter(licensed, overlayAfterPingPongResultChain, selectedPreset);

	// 	// overlaysAfterSlow
	// 	const overlayGuidsAfterSlow = selectedPreset?.overlays?.filter(item => item.afterSlow && !item.disable).map(item => item.guid) ?? [];
	// 	const overlaysAfterSlow = settings?.overlaySettings?.items?.filter(item => overlayGuidsAfterSlow.some(guid => guid === item.guid)) ?? [];
	// 	const { filter: overlaysAfterSlowFilter, endChain: overlayAfterSlowResultChain } = FfmpegHelper.getOverlaysFilter(
	// 		inputFiles,
	// 		settings,
	// 		overlaysAfterSlow,
	// 		slowResultChain,
	// 		'overlayAfterSlowTemp'
	// 	);

	// 	const { filter: pingPongFilter, endChain: pingPongResultChain } = FfmpegHelper.getPingPongFilter(selectedPreset, overlayAfterSlowResultChain);

	// 	// const smoothFilter = enableSmoothing ? "[b]; [b] minterpolate = 'mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps={framePerSeconds}'" : "") +
		
	// 	var { filter: fadeFilter, endChain: fadeOutResultChain } = FfmpegHelper.getFadeFilter(pingPongResultChain, settings, videoInfo);


	// 	const fps = Number(settings.videoSettings?.fps ?? '30');
	// 	const filter = fitWithinFilter
	// 		+ overlaysAfterPingPongFilter
	// 		+ slowFilter
	// 		+ overlaysAfterSlowFilter
	// 		+ pingPongFilter
	// 		// + smoothFilter
	// 		// + "setsar=1"
	// 		+ fadeFilter
	// 		+ `[${fadeOutResultChain}]fps=fps=${fps}[out]`;

	// 	const inputFile = inputFiles.find(file => file.fileType === inputFileType.input)?.file;
	// 	const result = await FfmpegHelper.runFfmpeg(inputFile, settings, traceId, filter, destinationPath);
	// 	return result;
	// }

	private static getFfmpegMultiplier(slowerMultiplier?: MultiplierEnum): number
	{
		if (slowerMultiplier === MultiplierEnum.normal || !slowerMultiplier) {
			return 1;
		}

		else if (slowerMultiplier < 0)
		{
			slowerMultiplier = -1 / (slowerMultiplier - 1);
		}

		return slowerMultiplier + 1;
	}
	
	public static GetZoomFfmpegFilter(zoomSettings: ZoomSettingsItemModel, frameRate: number): string
	{
		var startFrame = Number(zoomSettings.startFromSeconds) * frameRate;
		var durationsFrame = Number(zoomSettings.duration) * frameRate;
		var halfDurationsFrame = durationsFrame / 2;
		var zoom = Number(zoomSettings.zoomPercent) / 100;
		var zoomPerFrame = (zoom - 1) / halfDurationsFrame;
		if (zoomPerFrame > 0) {
			return `zoompan=z='if(lte(in,${startFrame}),1,` +
				`if(lte(in,${startFrame + halfDurationsFrame}),(1+(in-${startFrame})*${zoomPerFrame.toFixed(3)}),` +
				`if(lte(in,${startFrame + durationsFrame}),(${zoom.toFixed(3)}-(in-${halfDurationsFrame + startFrame})*${zoomPerFrame.toFixed(3)}),1)))'` +
				`:x='iw/2-(iw/zoom/2)'` +
				`:y='ih/2-(ih/zoom/2)'` +
				`:d=1` +
				`:fps=${frameRate.toFixed(2)}`;
		}

		return '';
		//zoompan=z='min(max(zoom,pzoom)+0.0015,1.5)':d=1:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':fps=100:s=120x120
		//zoompan=z='if(lte(in,10),1,if(lte(in,60),(1+(in-10)*0.02),if(lte(in,110),(2-(in-60)*0.02),1)))':d=1:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)'

		//":s={resolutionWidth}x{resolutionHeight}";
	}

	private static async slowMotion(inputFiles: inputFile[], settings: SpinnerSettingsModel, traceId: string, destinationFile: string): Promise<string | undefined> {
		const selectedGuid = settings?.frontSettings?.selectedPresetGuid;
		const selectedPreset = settings?.frontSettings?.presets?.find(preset => preset.guid === selectedGuid);

		// const videoInfo: videoInfo = {width: 1920, height: 1080, frames: 100};
		const blackScreenIndex = inputFiles.findIndex(file => file.fileType === inputFileType.blackscreen)!;
		const inputFileIndex = inputFiles.findIndex(file => file.fileType === inputFileType.input)!;
		const inputFile = inputFiles.find(file => file.fileType === inputFileType.input)?.file;
		const inputVideoInfo = await FfmpegHelper.GetVideoInfo(inputFile, traceId);

		const zoomSettingsBeforeSlowFilter = FfmpegHelper.getZoomFilter(selectedPreset, settings);

		const { filter: fitWithinFilter, endChain: fitWithinResultChain } = FfmpegHelper.getFitWithinFilter(inputFiles, settings, inputVideoInfo!, zoomSettingsBeforeSlowFilter);

		// overlaysBeforeSlow
		const overlayGuidsBeforeSlow = selectedPreset?.overlays?.filter(item => item.beforeSlow && !item.disable).map(item => item.guid) ?? [];
		const overlaysBeforeSlow = settings?.overlaySettings?.items?.filter(item => overlayGuidsBeforeSlow.some(guid => guid === item.guid)) ?? [];
		const { filter: overlaysBeforeSlowFilter, endChain: overlayBeforeSlowResultChain } = FfmpegHelper.getOverlaysFilter(
			inputFiles,
			settings,
			overlaysBeforeSlow,
			fitWithinResultChain,
			'overlayBeforeSlowTemp'
		);

		const licensed = true;
		const { filter: slowFilter, endChain: slowResultChain } = FfmpegHelper.getSlowFilter(licensed, overlayBeforeSlowResultChain, selectedPreset, inputVideoInfo!);

		// overlaysAfterSlow
		const overlayGuidsAfterSlow = selectedPreset?.overlays?.filter(item => item.afterSlow && !item.disable).map(item => item.guid) ?? [];
		const overlaysAfterSlow = settings?.overlaySettings?.items?.filter(item => overlayGuidsAfterSlow.some(guid => guid === item.guid)) ?? [];
		const { filter: overlaysAfterSlowFilter, endChain: overlayAfterSlowResultChain } = FfmpegHelper.getOverlaysFilter(
			inputFiles,
			settings,
			overlaysAfterSlow,
			slowResultChain,
			'overlayAfterSlowTemp'
		);

		const { filter: pingPongFilter, endChain: pingPongResultChain } = FfmpegHelper.getPingPongFilter(selectedPreset, overlayAfterSlowResultChain);

		
		// overlaysAfterPingPong
		const overlayGuidsAfterPingPong = selectedPreset?.overlays?.filter(item => item.afterPingPong && !item.disable).map(item => item.guid) ?? [];
		const overlaysAfterPingPong = settings?.overlaySettings?.items?.filter(item => overlayGuidsAfterPingPong.some(guid => guid === item.guid)) ?? [];
		const { filter: overlaysAfterPingPongFilter, endChain: overlayAfterPingPongResultChain } = FfmpegHelper.getOverlaysFilter(
			inputFiles,
			settings,
			overlaysAfterPingPong,
			pingPongResultChain,
			'overlayAfterPingPongTemp'
		);
		
		// const smoothFilter = enableSmoothing ? "[b]; [b] minterpolate = 'mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps={framePerSeconds}'" : "") +
		
		var { filter: fadeFilter, endChain: fadeOutResultChain } = FfmpegHelper.getFadeFilter(overlayAfterPingPongResultChain, settings);


		// introOutro
		var { filter: introOutroFilter, endChain: concatIntroOutroResultChain } = FfmpegHelper.getIntroAndOutroFilter(inputFiles, settings, selectedPreset, fadeOutResultChain);

		// audio
		var { filter: audioFilter, endChain: audioResultChain } = await FfmpegHelper.getAudioFilter(inputFiles, settings, selectedPreset, inputVideoInfo!, traceId);

		const fps = Number(settings.videoSettings?.fps ?? '30');
		const videoResultChain = 'video';
		const filter = fitWithinFilter
			+ overlaysBeforeSlowFilter
			+ slowFilter
			+ overlaysAfterSlowFilter
			+ pingPongFilter
			+ overlaysAfterPingPongFilter
			// + smoothFilter
			// + "setsar=1"
			+ fadeFilter
			+ introOutroFilter
			+ audioFilter
			+ `[${concatIntroOutroResultChain}]fps=fps=${fps}[${videoResultChain}]`;

		const result = await FfmpegHelper.runFfmpeg(inputFiles, settings, traceId, filter, destinationFile, videoResultChain, audioResultChain);
		return result;
	}

	private static async getAudioFilter(inputFiles: inputFile[], settings: SpinnerSettingsModel, selectedPreset: SpinnerSettingsFrontItemModel | undefined, videoInfo: videoInfo, traceId: string) {
		let audioFilter = '';
		let audioResultChain = '';
		const audioIndex = inputFiles.findIndex(m=>m.fileType === inputFileType.audio);
		const audioSetting = settings.audioSettings?.items?.find(item => item.guid === selectedPreset?.selectedAudioGuid);
		if (settings.audioSettings?.enable
			&& audioSetting) {
			const inputFile = inputFiles.find(m=>m.fileType === inputFileType.input)?.file;
			const introFile = inputFiles.find(m=>m.fileType === inputFileType.intro)?.file;
			const outroFile = inputFiles.find(m=>m.fileType === inputFileType.outro)?.file;
			const introVideoInfo = await FfmpegHelper.GetVideoInfo(introFile, traceId);
			const outroVideoInfo = await FfmpegHelper.GetVideoInfo(outroFile, traceId);
			const introImageDuration = Number(settings.introOutroSettings?.items?.find(item => item.guid === selectedPreset?.selectedIntroGuid)?.imageDuration ?? 0);
			const outroImageDuration = Number(settings.introOutroSettings?.items?.find(item => item.guid === selectedPreset?.selectedOutroGuid)?.imageDuration ?? 0);
			const inputDuration = (videoInfo?.duration ?? 0);
			const introDuration = (introVideoInfo?.duration ?? 0) + introImageDuration;
			const outroDuration = (outroVideoInfo?.duration ?? 0) + outroImageDuration;
			
			let multipliersCount = selectedPreset?.multipliers?.length ?? 0;
			if (multipliersCount <= 0) {
				multipliersCount = 1;
			}
			const inputDurationOnePart =Math.floor(inputDuration * 100 / multipliersCount) / 100;
			const partsDuration = selectedPreset?.multipliers
				?.map(item => item >= 0 ? inputDurationOnePart * (item + 1) : inputDurationOnePart / (-1 * item + 1)) ?? [inputDuration];
			const inputNewDuration = partsDuration.reduce((a, b) => a + b) * (selectedPreset?.pingPong ? 2 : 1);
			const resultDuration = inputNewDuration
				- Number(audioSetting.startFromSeconds ?? 0)
				+ introDuration
				// + (audioSetting.startFrom === AudioStartFromEnum.fromIntro && introFile
				// 	? introDuration
				// 	: 0)
				+ (audioSetting.stopTo === AudioStopToEnum.toOutro && outroFile
					? outroDuration
					: 0);


			audioResultChain = 'audio';
			audioFilter = `[${audioIndex}:a]` +
				`atrim=start=${audioSetting.startFromSeconds}:duration=${resultDuration.toFixed(2)}` +
				// `atrim=start=${audioSetting.startFromSeconds}:duration=${resultDuration.toFixed(2)},asetpts=PTS-STARTPTS` +
				(audioSetting.fadeIn ? `,afade=t=in:d=${audioSetting.fadeInDuration}` : ``) +
				(audioSetting.fadeOut ? `,areverse,afade=t=in:d=${audioSetting.fadeOutDuration},areverse` : ``) +
				(audioSetting.startFrom === AudioStartFromEnum.fromMovie && introFile ? `,adelay=delays=${(introDuration*1000).toFixed(0)}:all=1` : '') +
				',asetpts=PTS-STARTPTS' +
				// (audioSetting.startFrom === AudioStartFromEnum.fromMovie && introFile ? `,apad=pad_dur=${introDuration.toFixed(2)}` : '') +
				`[${audioResultChain}];`;
		}

		return {
			filter: audioFilter,
			endChain: audioResultChain
		};
	}
	private static getIntroAndOutroFilter(inputFiles: inputFile[], settings: SpinnerSettingsModel, selectedPreset: SpinnerSettingsFrontItemModel | undefined, fadeOutResultChain: string) {
		const introFileIndex = inputFiles.findIndex(file => file.fileType === inputFileType.intro)!;
		const intro = settings.introOutroSettings?.items?.find(item => item.guid === selectedPreset?.selectedIntroGuid);
		const introResultChain = 'intro';
		const introFilter = FfmpegHelper.getIntroOutroFilter(settings, intro, introFileIndex, introResultChain);

		// outro
		const outroFileIndex = inputFiles.findIndex(file => file.fileType === inputFileType.outro)!;
		const outro = settings.introOutroSettings?.items?.find(item => item.guid === selectedPreset?.selectedOutroGuid);
		const outroResultChain = 'outro';
		const outroFilter = FfmpegHelper.getIntroOutroFilter(settings, outro, outroFileIndex, outroResultChain);

		let concatIntroOutroFilter = '';
		let concatIntroOutroResultChain = fadeOutResultChain;
		if (introFilter || outroFilter) {
			concatIntroOutroResultChain = 'concatIntroOutro';
			if (!outroFilter) {
				concatIntroOutroFilter = `[${introResultChain}][${fadeOutResultChain}]concat=n=2:v=1[${concatIntroOutroResultChain}];`;
			}
			else if (!outroFilter) {
				concatIntroOutroFilter = `[${fadeOutResultChain}][${outroResultChain}]concat=n=2:v=1[${concatIntroOutroResultChain}];`;
			}
			else {
				concatIntroOutroFilter = `[${introResultChain}][${fadeOutResultChain}][${outroResultChain}]concat=n=3:v=1[${concatIntroOutroResultChain}];`;
			}
		}
		const introOutroFilter = introFilter + outroFilter + concatIntroOutroFilter;
		
		return {
			filter: introOutroFilter,
			endChain: concatIntroOutroResultChain
		};
	}

	private static getIntroOutroFilter(settings: SpinnerSettingsModel, introOutro: IntroOutroSettingsItemModel | undefined, introOutroFileIndex: number, introOutroResultChain: string) {
		let introOutroFilter = '';
		if (settings.introOutroSettings?.enable && introOutro) {
			const resolutionWidth = Number(settings.videoSettings?.resolutionWidth);
			const resolutionHeight = Number(settings.videoSettings?.resolutionHeight);
			const fps = Number(settings.videoSettings?.fps ?? '30');
			const imageDuration = Number(introOutro.imageDuration);
			// introResultChain = '';
			introOutroFilter = `[${introOutroFileIndex}:v]` +
				`scale=${resolutionWidth}:${resolutionHeight}` +
				`,setsar=1` +
				(introOutro.imageDuration ? `,loop=loop=${fps * imageDuration}:size=1` : ``) +
				(introOutro.fadeIn ? `,fade=t=in:d=${introOutro.fadeInDuration}` : ``) +
				(introOutro.fadeOut ? `,reverse,fade=t=in:d=${introOutro.fadeOutDuration},reverse` : ``) +
				`[${introOutroResultChain}];`;
		}
		return introOutroFilter;
	}

	private static getFadeFilter(pingPongResultChain: string, settings: SpinnerSettingsModel) {
		let fadeInFilter = '';
		let fadeInResultChain = pingPongResultChain;
		if (settings.videoSettings?.fadeIn
			&& settings.videoSettings?.fadeInDuration) {
			fadeInResultChain = 'fadeIn';
			fadeInFilter = `[${pingPongResultChain}]fade=t=in:d=${settings.videoSettings?.fadeInDuration}[${fadeInResultChain}];`;
			// fadeInFilter = "[outBeforeFadeIn];[outBeforeFadeIn]fade=t=in:d=" + settings.videoSettings?.fadeInDuration
		}

		// const frames = videoInfo?.frames ?? 0;
		// const allFrames = frames;
		let fadeOutFilter = '';
		let fadeOutResultChain = fadeInResultChain;
		if (settings.videoSettings?.fadeOut
			&& settings.videoSettings?.fadeOutDuration) {
			fadeOutResultChain = 'fadeOut';
			// const fps = Number(settings.videoSettings?.fps ?? '30');
			// const fadeOutStart = allFrames - Number(settings.videoSettings.fadeOutDuration) * fps;
			fadeOutFilter = `[${fadeInResultChain}]reverse,fade=t=in:d=${settings.videoSettings.fadeOutDuration},reverse[${fadeOutResultChain}];`;
			// fadeOutFilter = `[${fadeInResultChain}]fade=t=out:d=${settings.videoSettings.fadeOutDuration}:s=${(!fadeOutStart || fadeOutStart < 0 ? 0 : fadeOutStart).toFixed(2)}`;
		}
		const fadeFilter = fadeInFilter + fadeOutFilter;
		
		return {
			filter: fadeFilter,
			endChain: fadeOutResultChain
		};
	}


	private static getPingPongFilter(selectedPreset: SpinnerSettingsFrontItemModel | undefined, overlayAfterSlowResultChain: string) {
		let pingPongFilter = '';
		let pingPongResultChain = overlayAfterSlowResultChain;
		if (selectedPreset?.pingPong) {
			pingPongResultChain = 'pingPong';
			pingPongFilter = `[${overlayAfterSlowResultChain}]split[forward][reverse];`
				+ '[reverse]reverse,fifo[reversed];'
				+ '[forward] setpts = 1.00 * PTS[forwardPts];'
				+ '[reversed] setpts = 1.00 * PTS[reversedPts];'
				+ `[forwardPts][reversedPts]concat=n=2:v=1,setsar=1[${pingPongResultChain}];`;
			// + '[pingpong]fps=fps=' + fps +'[out]';
		}
		return {
			filter: pingPongFilter,
			endChain: pingPongResultChain
		};
	}

	// private static async slowMotion00(inputFiles: inputFile[], settings: SpinnerSettingsModel, traceId: string): Promise<string | undefined> {


	// 	const fps = Number(settings.videoSettings?.fps ?? '30');
	// 	const audioIndex = inputFiles.findIndex(file => file.fileType === inputFileType.audio)!;
	// 	const introIndex = inputFiles.findIndex(file => file.fileType === inputFileType.intro)!;
	// 	const outroIndex = inputFiles.findIndex(file => file.fileType === inputFileType.outro)!;
	// 	// const overlaysIndex = inputFiles.findIndex(file => file.fileType === inputFileType.overlay)!;
	// 	if (settings.audioSettings?.enable && selectedPreset?.selectedAudioGuid) {
	// 		const selectedAudio = settings.audioSettings.items?.find(item => item.guid === selectedPreset.selectedAudioGuid);
	// 		if (selectedAudio?.startFrom === AudioStartFromEnum.fromMovie
	// 			&& selectedAudio?.stopTo === AudioStopToEnum.toMovie) {
	// 			;
	// 		}
	// 	}
	// }
	

	private static getFitWithinFilter(inputFiles: inputFile[], settings: SpinnerSettingsModel, videoInfo: videoInfo, zoomSettingsBeforeSlowFilter: string) {
		const fitWithinResultChain = 'fitted';

		const blackScreenIndex = inputFiles?.findIndex(file => file.fileType === inputFileType.blackscreen)!;
		const inputFileIndex = inputFiles?.findIndex(file => file.fileType === inputFileType.input)!;
		const fitWithinSetting = settings.videoSettings?.fitWithin;
		let fitWithinFilter = '';
		const resolutionWidth = Number(settings.videoSettings?.resolutionWidth);
		const resolutionHeight = Number(settings.videoSettings?.resolutionHeight);
		const fps = Number(settings.videoSettings?.fps);
		if (fitWithinSetting === FitWithinEnum.byHeight) {
			var newWidth = resolutionHeight * videoInfo.width / videoInfo.height;
			if (newWidth < resolutionWidth) {
				fitWithinFilter = `[${blackScreenIndex}:v]scale=${resolutionWidth}:${resolutionHeight}[blackScreen];`
					+ ` [${inputFileIndex}:v]${zoomSettingsBeforeSlowFilter}scale=-1:${resolutionHeight}[inputBeforeBlackScreen];`
					+ `[blackScreen][inputBeforeBlackScreen]overlay=shortest=1:x=(main_w-overlay_w)/2:y=(main_h-overlay_h)/2,`
					+ `crop=${resolutionWidth}:${resolutionHeight} [${fitWithinResultChain}]; `;
			}
			else {
				fitWithinFilter = `[${inputFileIndex}:v]${zoomSettingsBeforeSlowFilter} scale=-1:${resolutionHeight},crop=${resolutionWidth}:${resolutionHeight} [${fitWithinResultChain}]; `;
			}
		}
		else if (fitWithinSetting === FitWithinEnum.byWidth) {
			var newHeight = resolutionWidth * videoInfo.height / videoInfo.width;
			if (newHeight < resolutionHeight) {
				fitWithinFilter = `[${blackScreenIndex}:v]scale=${resolutionWidth}:${resolutionHeight}[blackScreen];`
					+ ` [${inputFileIndex}:v]${zoomSettingsBeforeSlowFilter} scale=${resolutionWidth}:-1[inputBeforeBlackScreen];`
					+ `[blackScreen][inputBeforeBlackScreen]overlay=shortest=1:x=(main_w-overlay_w)/2:y=(main_h-overlay_h)/2,`
					+ `crop=${resolutionWidth}:${resolutionHeight} [${fitWithinResultChain}]; `;
			}
			else {
				fitWithinFilter = `[${inputFileIndex}:v]${zoomSettingsBeforeSlowFilter} scale=${resolutionWidth}:-1,crop=${resolutionWidth}:${resolutionHeight} [${fitWithinResultChain}]; `;
			}
		}
		else {
			fitWithinFilter = `[${inputFileIndex}:v]${zoomSettingsBeforeSlowFilter}scale=${resolutionWidth}:${resolutionHeight} [${fitWithinResultChain}]; `;
		}
		return {
			filter: fitWithinFilter,
			endChain: fitWithinResultChain
		};
	}

	private static getZoomFilter(selectedPreset: SpinnerSettingsFrontItemModel | undefined, settings: SpinnerSettingsModel) {
		const fps = Number(settings.videoSettings?.fps);
		const zoomGuidsBeforeSlow = selectedPreset?.zooms?.filter(item => !item.disable && item.beforeSlow).map(item => item.guid);
		const zoomBeforeSlow = settings.zoomSettings?.items?.filter(item => zoomGuidsBeforeSlow?.some(zoom => zoom === item.guid && Number(item.duration) > 0));
		let zoomSettingsBeforeSlowFilter = '';
		if (settings.zoomSettings?.enable
			&& zoomBeforeSlow?.length) {
			for (const zoomBeforeSlowItem of zoomBeforeSlow) {
				zoomSettingsBeforeSlowFilter = zoomSettingsBeforeSlowFilter + this.GetZoomFfmpegFilter(zoomBeforeSlowItem, fps) + ',';
			}
		}
		return zoomSettingsBeforeSlowFilter;
	}

	private static getSlowFilter(
		licensed: boolean,
		slowChainStart: string,
		selectedPreset: SpinnerSettingsFrontItemModel | undefined,
		inputVideoInfo: videoInfo
		): {filter: string, endChain: string} {
		const slowChainResult = 'afterSlow';
		const parts = selectedPreset?.multipliers ?? [];
		const countParts = parts.length;
		const isOnePart = !licensed || countParts <= 1;

		let slowFilter = '';
		if (isOnePart) {
			const multiplier = this.getFfmpegMultiplier(selectedPreset?.multipliers?.find(item => true)).toFixed(2);
			slowFilter = `[${slowChainStart}] setpts = ${multiplier} * PTS[${slowChainResult}];`;
		}
		else {
			const fullMovieDuration = inputVideoInfo.duration;
			const durationParts = Math.floor(fullMovieDuration * 100 / countParts)/100;
			const durationStr = durationParts.toFixed(2);
			let splitResult = "";
			let concatSlowerInput = "";
			let start = 0;
			let partsMultiplierCommand = "";
			for (var index = 0; index < countParts; index++) {
				const item = parts[index];

				const splitPartChain = "[split" + index + "]";
				const splitPartChainOut = "[splitOut" + index + "]";
				splitResult = splitResult + splitPartChain;
				concatSlowerInput = concatSlowerInput + splitPartChainOut;
				const startStr = start.toFixed(2);

				const itemMultiplier = this.getFfmpegMultiplier(item);
				const itemMultiplierStr = itemMultiplier.toFixed(2);

				const durationFilterParam = ':duration=' + durationStr;

				const partsMultiplierFilterCommand = `${splitPartChain}trim=start=${startStr}${durationFilterParam}` +
					`,setpts=PTS-STARTPTS,setpts=${itemMultiplierStr}*PTS${splitPartChainOut};`;
				partsMultiplierCommand = partsMultiplierCommand + partsMultiplierFilterCommand;

				start += durationParts;
			}

			slowFilter = `[${slowChainStart}] split=${countParts} ${splitResult};${partsMultiplierCommand}` +
				`${concatSlowerInput}concat=n=${countParts}:v=1[${slowChainResult}];`;
		}
		return {
			filter: slowFilter,
			endChain: slowChainResult
		};
	}

	private static getOverlaysFilter(
		inputFiles: inputFile[],
		settings: SpinnerSettingsModel,
		overlaysItems: OverlaySettingsItemModel[],
		startOverlaysChain: string,
		// endOverlaysChain: string,
		tempChainPrefix: string): {filter: string, endChain: string} {

		let overlaysResultFilter = '';
		// let endOverlaysChain = startOverlaysChain;
		let tempOverlaysResultChain = startOverlaysChain;
		const resolutionWidth = Number(settings.videoSettings?.resolutionWidth);
		const resolutionHeight = Number(settings.videoSettings?.resolutionHeight);

		if (settings.overlaySettings?.enable
			&& overlaysItems.length) {
			for (let index = 0; index < overlaysItems.length; index++) {
				const overlaysItem = overlaysItems[index];
				const overlayIndex = inputFiles?.findIndex(file =>  file.fileType === inputFileType.overlay &&  file.guid === overlaysItem.guid) ?? -1;
				if (overlayIndex < 0) {
					continue;
				}

				const overlayHeight = overlaysItem.align === AlignSettingEnum.stretch ? resolutionHeight : -1;
				const overlayTop = overlaysItem.align === AlignSettingEnum.bottom ? "main_h-overlay_h" : "0";
				const repeateCountForVideo = Number(overlaysItem.repeateCountForVideo ?? 0);
				const repeateCountForVideoCommand = repeateCountForVideo <= 0 ? "shortest=1:" : `repeatlast=${repeateCountForVideo}:`;

				const tempOverlayScaleChain = tempChainPrefix + 'Scale' + overlayIndex;
				const tempOverlayResultChain = tempChainPrefix + overlayIndex;

				// const endChainInternal = index === overlaysItems.length - 1 ? endOverlaysChain : tempOverlayResultChain;
				const overlayFilter = `[${overlayIndex}:v]scale=${resolutionWidth}:${overlayHeight}[${tempOverlayScaleChain}];`
					+ `[${tempOverlaysResultChain}][${tempOverlayScaleChain}]overlay=${repeateCountForVideoCommand}x=0:y=${overlayTop}[${tempOverlayResultChain}];`;
				tempOverlaysResultChain = tempOverlayResultChain;
				overlaysResultFilter = overlaysResultFilter + overlayFilter;
			}
		}

		return {
			filter: overlaysResultFilter,
			endChain: tempOverlaysResultChain
		};
	}

	/** */
	// private static async addOverlay(files: inputFile[], settings: SpinnerSettingsModel, traceId: string): Promise<string | undefined> {
	// 	if (!settings.overlaySettings?.enable) {
	// 		const inputFile = files.find(file => file.fileType === inputFileType.input)?.file;
	// 		return inputFile;
	// 	}

	// 	const overlaysSelected = ['','1']
	// 	const t = settings.overlaySettings?.items
	// 		?.filter(item => overlaysSelected.some(overlaySelected => item.guid === overlaySelected))
	// 		?.sort(SortHelper.dynamicSort('name'));
	// 	const fps = Number(settings.overlaySettings ?? '30');
	// 	const filter = '[0:v]split[forward][reverse];'
	// 		+ '[reverse]reverse,fifo[reversed];'
	// 		+ '[forward] setpts = 1.00 * PTS[forwardPts];'
	// 		+ '[reversed] setpts = 1.00 * PTS[reversedPts];'
	// 		+ '[forwardPts][reversedPts]concat=n=2:v=1,setsar=1[pingpong];'
	// 		+ '[pingpong]fps=fps=' + fps +'[out]';

	// 	const result = await FfmpegHelper.runFfmpeg(fullname, settings, traceId, filter);
	// 	return result;
	// }

	/** */
	// public static async pingPong(inputFiles: inputFile[], settings: SpinnerSettingsModel, traceId: string): Promise<string | undefined> {
	// 	;


	// 	const fps = Number(settings.videoSettings?.fps ?? '30');
	// 	const filter = '[0:v]split[forward][reverse];'
	// 		+ '[reverse]reverse,fifo[reversed];'
	// 		+ '[forward] setpts = 1.00 * PTS[forwardPts];'
	// 		+ '[reversed] setpts = 1.00 * PTS[reversedPts];'
	// 		+ '[forwardPts][reversedPts]concat=n=2:v=1,setsar=1[pingpong];'
	// 		+ '[pingpong]fps=fps=' + fps +'[out]';

	// 	const result = await FfmpegHelper.runFfmpeg(fullname, settings, traceId, filter);
	// 	return result;
	// }

	/** */
	// public static async pingPong0(fullname: string | undefined, settings: SpinnerSettingsModel, traceId: string): Promise<string | undefined> {
	// 	const fps = Number(settings.videoSettings?.fps ?? '30');
	// 	const filter = '[0:v]split[forward][reverse];'
	// 		+ '[reverse]reverse,fifo[reversed];'
	// 		+ '[forward] setpts = 1.00 * PTS[forwardPts];'
	// 		+ '[reversed] setpts = 1.00 * PTS[reversedPts];'
	// 		+ '[forwardPts][reversedPts]concat=n=2:v=1,setsar=1[pingpong];'
	// 		+ '[pingpong]fps=fps=' + fps +'[out]';

	// 	const result = await FfmpegHelper.runFfmpeg(fullname, settings, traceId, filter);
	// 	return result;

		// const fileNamePattern = settings.pathSources?.fileNamePattern ?? '';
		// const newFilename = await FfmpegHelper.getFilenameByPattern(fullname, fileNamePattern);
		
		// try {
		// 	const maxBitrate = Number(settings.videoSettings?.maxBitrate ?? '8000');
		// 	const fps = Number(settings.videoSettings?.fps ?? '30');
		// 	const filter = '[0:v]split[forward][reverse];'
		// 		+ '[reverse]reverse,fifo[reversed];'
		// 		+ '[forward] setpts = 1.00 * PTS[forwardPts];'
		// 		+ '[reversed] setpts = 1.00 * PTS[reversedPts];'
		// 		+ '[forwardPts][reversedPts]concat=n=2:v=1,setsar=1[pingpong];'
		// 		+ '[pingpong]fps=fps=' + fps +'[out]';
		// 	const rootDir = appRootDir.get();
		// 	const ffmpegpath = rootDir + '/node_modules/ffmpeg-static/ffmpeg';
		// 	const ffmpegArgs = [
		// 		'-loglevel', 'error',
		// 		'-i', fullname,
		// 		// '-r ' + fps,
		// 		'-maxrate', maxBitrate + 'k',
		// 		'-bufsize', maxBitrate * 2 + 'k',
		// 		'-c:v', 'libx264',
		// 		'-pix_fmt', 'yuv420p',
		// 		'-crf', '23',
		// 		'-profile:v', 'baseline',
		// 		'-level', '3.0',
		// 		'-filter_complex', filter,
		// 		'-map', '[out]',
		// 		newFilename
		// 	];
		// 	const ffmpegArgsString = ffmpegArgs.reduce((a, b) => a + ' ' + b);
		// 	// const ffmpegpath = appRootDir + '/bin/ffmpeg';
		// 	this.eventLogger.info(ffmpegpath + ' ' + ffmpegArgsString, 'ffmpeg run process ' + traceId + ' ');
		// 	const process = spawn( ffmpegpath, ffmpegArgs);
		// 	await FfmpegHelper.waitProcess(process, FfmpegHelper.eventLogger, traceId);
		// } catch (error) {
		// 	this.eventLogger.error(error, 'ffmpeg run process ' + traceId + ' ');
		// }

		// if (!fs.existsSync(newFilename)) {
		// 	return undefined;
		// }
		// // var fs = require('fs');
		// // var ffmpeg = require('fluent-ffmpeg');
		// // // Setting ffmpeg path to ffmpeg binary for os x so that ffmpeg can be packaged with the app.
		// // ffmpeg.setFfmpegPath("./bin/ffmpeg")
		// // //because of the nature of ffmpeg, this can take both audio or video files as input
		// // function convertToWav(file,output, cb) {
		// //   var  audioBitRateFor100mbSize='2';
		// //   var aud_file =  output;
		// //   var comand = ffmpeg(file)
		// // 				.noVideo()
		// // 				.audioCodec('pcm_s16le')
		// // 				.audioChannels(1)
		// // 				.audioFrequency(16000)
		// // 				.audioBitrate(audioBitRateFor100mbSize, true)
		// // 				// .videoBitrate(audioBitRateFor100mbSize, true)
		// // 				.output(aud_file)
		// // 				.on('progress', function(progress) {
		// // 				  //  progress // {"frames":null,"currentFps":null,"currentKbps":256,"targetSize":204871,"timemark":"01:49:15.90"}
		// // 				  console.log('Processing: ' + progress.timemark + ' done ' + progress.targetSize+' kilobytes');
		// // 				})
		// // 				.on('end',
		// // 				//listener must be a function, so to return the callback wrapping it inside a function
		// // 				  function(){
		// // 					cb(aud_file)
		// // 				  }
		// // 				  || function() {ж0
		// // 					   console.log('Finished processing');
		// // 					}
		// // 				).run();
		// return newFilename;
	// }

	/** */
	// public static async addOverlay(fullname: string | undefined, settings: SpinnerSettingsModel, traceId: string): Promise<string | undefined> {
	public static async runFfmpeg(
		inputFiles: inputFile[],
		settings: SpinnerSettingsModel,
		traceId: string,
		filter: string,
		destinationFile: string,
		videoResultChain: string,
		audioResultChain: string
	): Promise<string | undefined> {

		const inputCommands = inputFiles.map(item => (item.commands?.split(' ') ?? (['-i', item.file?.replace(/\\/g, '/') ?? '']))).flat();
		const maxBitrate = Number(settings.videoSettings?.maxBitrate ?? '8000');

		// "Cpu": "-c:v libx264 -crf 23 -profile:v baseline -level 3.0",
		// "NvidiaQsv": "-c:v h264_qsv -preset slow -b:v 8000k",
		// "NvidiaNvenc": "-c:v nvenc_h264 -preset slow -b:v 8000k",
		// "Radeon": "-c:v h264_amf -b:v 8000k"
		let render = '';
		switch (settings.videoSettings?.renderOn) {
			case RenderOnEnum.nvidiaH264:
				render = `-c:v h264_qsv -preset slow -b:v ${maxBitrate}k`;
				break;
			case RenderOnEnum.nvidiaNvench:
				render = `-c:v nvenc_h264 -preset slow -b:v ${maxBitrate}k`;
				break;
			case RenderOnEnum.radeon:
				render = `-c:v h264_amf -b:v ${maxBitrate}k`;
				break;
			case RenderOnEnum.cpu:
			default:
				render = '-c:v libx264 -pix_fmt yuv420p -crf 23 -profile:v baseline -level 3.0';
				break;
		}
		const renderFormat = render.split(' ');
		// if (!fullname
		// 	|| !fs.existsSync(fullname)) {
		// 	this.eventLogger.warn('File ' + fullname + ' not found');
		// 	return;
		// }

		// const newFileName = IdGenerator.getNewNotificationId() + '.mp4';
		// const newFileNameFull = path.join(destinationPath, newFileName).replace(/\\/g, '/');
		// const fileNamePattern = settings.pathSources?.fileNamePattern ?? '';
		// const newFilename = await FfmpegHelper.getFilenameByPattern(fullname, fileNamePattern, destinationPath);
		const newFileNameFull = destinationFile.replace(/\\/g, '/');

		const mapResult = [
			'-map',
			`[${videoResultChain}]`
		]
		if (audioResultChain) {
			mapResult.push('-map');
			mapResult.push(`[${audioResultChain}]`);
		}
		try {
			// const rootDir = appRootDir.get();
			// const ffmpegpath = rootDir + '/node_modules/ffmpeg-static/ffmpeg';
			const ffmpegpath = ffmpegStatic ?? '';
			this.eventLogger.info(ffmpegpath);
			const ffmpegArgs = [
				'-loglevel', 'error',
				... inputCommands,
				// '-i', fullname,
				// '-r ' + fps,
				'-maxrate', maxBitrate + 'k',
				'-bufsize', maxBitrate * 2 + 'k',
				... renderFormat,
				// '-c:v', 'libx264',
				// '-pix_fmt', 'yuv420p',
				// '-crf', '23',
				// '-profile:v', 'baseline',
				// '-level', '3.0',
				'-filter_complex', filter,
				... mapResult,
				newFileNameFull
			];
			const ffmpegArgsString = ffmpegArgs.map(item => (item?.indexOf(' ') ?? 0) >= 0 ? `"${item}"` : item).reduce((a, b) => a + ' ' + b);
			// const ffmpegpath = appRootDir + '/bin/ffmpeg';
			this.eventLogger.info(ffmpegpath + ' ' + ffmpegArgsString, 'ffmpeg run process ' + traceId + ' ');
			const process = spawn( ffmpegpath, ffmpegArgs);
			await FfmpegHelper.waitProcess(process, FfmpegHelper.eventLogger, traceId);
		} catch (error) {
			this.eventLogger.error(error, 'ffmpeg run process ' + traceId + ' ');
		}

		if (!fs.existsSync(newFileNameFull)) {
			return undefined;
		}
		return newFileNameFull;
	}

	private static async getFilenameByPattern(fullname: string, fileNamePattern: string, destinationPath: string, fileExtension: string): Promise<string> {
		const filename = path.basename(fullname);
		// const tempFile = path.join(tempFolder, filename);
		this.eventLogger.info('fullname: ' + fullname + ' fillename: ' + filename);

		if (!fs.existsSync(destinationPath)) {
			fs.mkdirSync(destinationPath);
		}

		const templateFull = path.join(destinationPath, fileNamePattern + '_').replace(/\\/g, '/');
		const searchPattern = `${templateFull}*.${fileExtension}`;
		// const searchPattern = templateFull + '*.mp4';
		this.eventLogger.info('searchpattern: ' + searchPattern);
		const filesExist = await fg([searchPattern], { dot: true });
		this.eventLogger.info('find files: ' + JSON.stringify(filesExist));
		const fileNumbers = filesExist
			.map(file => file.replace(templateFull, '').replace(`.${fileExtension}`, ''))
			// .map(file => file.replace(templateFull, '').replace('.mp4', ''))
			.filter(fileNumber => fileNumber)
			.map(fileNumber => Number(fileNumber))
			.filter(fileNumber => Number.isInteger(fileNumber));
		const maxFileNumber = fileNumbers.length > 0 ? Math.max(...fileNumbers) : 0;
		const nextFileNumber = maxFileNumber + 1;

		const newFilename = `${templateFull}${nextFileNumber.toString().padStart(4, '0')}.${fileExtension}`;
		// const newFilename = templateFull + nextFileNumber.toString().padStart(4, '0') + '.mp4';
		this.eventLogger.info('newfilename: ' + newFilename);
		return newFilename;
	}

	public static waitProcess(process: ChildProcessWithoutNullStreams, eventLogger: EventLogger, traceId: string): Promise<any> {
		return new Promise((resolve, reject) => {
			let stdoutInfo: any;
			let stdoutError: any;
			process.stdout.on('data', (data: any) => {
				eventLogger.info(`stdout ${traceId} : ${data}`);
				stdoutInfo = data;
			});
			process.stderr.on('data', (data: any) => {
				eventLogger.info(`stderr ${traceId} : ${data}`);
				stdoutError = data;
			});
			process.on('close', (code) => {
				eventLogger.info(`application closed with code ${traceId} : ${code}`);
				if (code) {
					reject(stdoutError);
				}
				resolve(stdoutInfo ?? stdoutError);
			});
			process.on('exit', (code) => {
				eventLogger.info(`application exit with code ${traceId} : ${code}`);
				if (code) {
					reject(stdoutError);
				}
				resolve(stdoutInfo ?? stdoutError);
			});
		});
		// return new Promise((resolve, reject) => {
		// 	setTimeout(resolve, milliseconds);
		// });
	}

	private static async getInputFiles (fullname: string | undefined,
		settings: SpinnerSettingsModel,
		traceId: string
	): Promise<inputFile[]> {
		const inputFiles: inputFile[] = [];

		if (!fullname
			|| !fs.existsSync(fullname)) {
			this.eventLogger.warn('File ' + fullname + ' not found');
			return inputFiles;
		}

		inputFiles.push({
			// commands: ['-i', fullname],
			file: fullname,
			fileType: inputFileType.input,
			// guid: '',
		} as inputFile);
		inputFiles.push({
			commands: '-f lavfi -i color=black',
			fileType: inputFileType.blackscreen,
			// guid: '',
		} as inputFile);

		const selectedGuid = settings?.frontSettings?.selectedPresetGuid;
		const selectedPreset = settings?.frontSettings?.presets?.find(preset => preset.guid === selectedGuid);
		const selectedIntro = settings.introOutroSettings?.items?.find(item => item.guid === selectedPreset?.selectedIntroGuid);

		if (settings.introOutroSettings?.enable
			&& selectedIntro?.file
			&& fs.existsSync(selectedIntro.file)
		) {
			inputFiles.push({
				// commands: ['-i', selectedIntro.file],
				file: selectedIntro.file,
				fileType: inputFileType.intro,
				// guid: '',
			} as inputFile);
		}

		const selectedOutro = settings.introOutroSettings?.items?.find(item => item.guid === selectedPreset?.selectedOutroGuid);
		if (settings.introOutroSettings?.enable
			&& selectedOutro?.file
			&& fs.existsSync(selectedOutro.file)
		) {
			inputFiles.push({
				// commands: ['-i', selectedOutro.file],
				file: selectedOutro.file,
				fileType: inputFileType.outro,
				// guid: '',
			} as inputFile);
		}

		const selectedAudio = settings.audioSettings?.items?.find(item => item.guid === selectedPreset?.selectedAudioGuid);
		if (settings.audioSettings?.enable
			&& selectedAudio?.file
			&& fs.existsSync(selectedAudio.file)
		) {
			inputFiles.push({
				// commands: ['-i', selectedAudio.file],
				file: selectedAudio.file,
				fileType: inputFileType.audio,
				// guid: '',
			} as inputFile);
			// inputFiles.push({
			// 	commands: '-t 1 -i anullsrc=channel_layout=stereo:sample_rate=44100',
			// 	fileType: inputFileType.silenceaudio,
			// } as inputFile);
		}

		if (selectedPreset?.overlays) {
			for (const overlay of selectedPreset.overlays.filter(item => !item.disable && (item.afterPingPong || item.afterSlow || item.beforeSlow))) {
				const selectedOverlay = settings.overlaySettings?.items?.find(item => item.guid === overlay.guid);
				if (settings.overlaySettings?.enable
					&& selectedOverlay?.file
					&& fs.existsSync(selectedOverlay.file)
				) {
					inputFiles.push({
						// commands: ['-i', selectedOverlay.file],
						file: selectedOverlay.file,
						fileType: inputFileType.overlay,
						guid: overlay.guid,
					} as inputFile);
				}
			}
		}

		// if (selectedPreset?.zooms) {
		// 	for (const zoom of selectedPreset.zooms.filter(item => !item.disable && (item.afterPingPong || item.afterSlow || item.beforeSlow))) {
		// 		const selectedZoom = settings.zoomSettings?.items?.find(item => item.guid === zoom.guid);
		// 		if (settings.zoomSettings?.enable
		// 			&& selectedZoom?.file
		// 			&& fs.existsSync(selectedZoom.file)
		// 		) {
		// 			inputFiles.push({
		// 				file: selectedZoom.file,
		// 				fileType: inputFileType.zoom,
		// 				guid: zoom.guid,
		// 			});
		// 		}
		// 	}
		// }

		return inputFiles;
	}
}
export enum inputFileType {
	input,
	intro,
	outro,
	overlay,
	blackscreen,
	audio,
	// silenceaudio,
	// zoom
}
export interface inputFile {
	fileType: inputFileType;
	guid?: string;
	file?: string;
	commands?: string;
}
export interface videoInfo {
	width: number;
	height: number;
	frames: number;
	duration: number;
	bitRate: number;
	audioFormat: string;
	videoFormat: string;
	rawInfo: string;
	fps: number;
	// public decimal Frames => (decimal)Duration.TotalSeconds * Fps;
}
