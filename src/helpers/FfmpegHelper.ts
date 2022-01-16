import fs from 'fs';
import path from 'path';
import { app } from 'electron';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';
import ffprobeStatic from 'ffprobe-static';
import appRootDir from 'app-root-dir';
import { spawn, ChildProcessWithoutNullStreams } from 'child_process';
import fg from 'fast-glob';
// import { globby } from 'globby';
import { SpinnerSettingsModel } from '../applications/spinner/settings/SpinnerSettingsModel';
import { EventLogger } from './EventLogger';
import { SortHelper } from './SortHelper';
import { FitWithinEnum } from '../applications/base/settings/tabs/video/VideoSettingsModel';
import { AudioStartFromEnum, AudioStopToEnum } from '../applications/base/settings/tabs/audio/AudioSettingsItemModel';
import { MultiplierEnum } from '../src-front/applications/spinner/frontSettings/SpinnerSettingsFrontModel';

/** */
export class FfmpegHelper {
	private static eventLogger = new EventLogger();

	/** ff */
	public static setup () {
		//require the ffmpeg package so we can use ffmpeg using JS
		//Get the paths to the packaged versions of the binaries we want to use
		const ffmpegPath = ffmpegStatic.replace(
			'app.asar',
			'app.asar.unpacked'
		);
		const ffprobePath = ffprobeStatic.path.replace(
			'app.asar',
			'app.asar.unpacked'
		);
		//tell the ffmpeg package where it can find the needed binaries.
		ffmpeg.setFfmpegPath(ffmpegPath);
		ffmpeg.setFfprobePath(ffprobePath);
	}

	/** */
	public static async processvideo(fullname: string | undefined, settings: SpinnerSettingsModel, traceId: string): Promise<string | undefined> {
		if (!fullname
			|| !fs.existsSync(fullname)) {
			this.eventLogger.warn('File ' + fullname + ' not found');
			return;
		}

		const inputFiles = await FfmpegHelper.getInputFiles(fullname, settings, traceId);
		const inputFile = inputFiles.find(file => file.fileType === inputFileType.input)!;

		const slowedFile = await FfmpegHelper.slowMotion(inputFiles, settings, traceId);

		inputFile.file = slowedFile;
		const pingPongFile = await FfmpegHelper.pingPong(inputFiles, settings, traceId);
		const resultFile = await FfmpegHelper.addIntroOutroAudio(pingPongFile, settings, traceId);
		await FfmpegHelper.copyFileToDestination( resultFile, settings, traceId);
		await FfmpegHelper.moveSourceFile(fullname, settings);
		await FfmpegHelper.deleteFiles(slowedFile, pingPongFile, resultFile);
		
		// const filesCommand = files.map(item => item.commands!).flat();
	}

	private static async fitWithin(inputFiles: inputFile[], settings: SpinnerSettingsModel, traceId: string): Promise<string> {
		const blackscreen = inputFiles.findIndex(file => file.fileType === inputFileType.blackscreen)!;
		const inputFile = inputFiles.findIndex(file => file.fileType === inputFileType.input)!;

		const fitWithin = settings.videoSettings?.fitWithin ?? FitWithinEnum.fitAll;
		const resolutionHeight = Number(settings.videoSettings?.resolutionHeight ?? '1080');
		const resolutionWidth = Number(settings.videoSettings?.resolutionWidth ?? '1920');
		const videoInfoWidth = videoInfo.Width;
		const videoInfoHeight = videoInfo.Height;
		const zoomSettings = '';
		switch (fitWithin) {
			case FitWithinEnum.byHeight:
				const newWidth = resolutionHeight * videoInfoWidth / videoInfoHeight;
				if (newWidth < resolutionWidth)
				{
					fitWithin = `[${blackscreen}:v]scale=${resolutionWidth}:${resolutionHeight}[blackScreen];`
						+ `[${inputFile}:v]${zoomSettings}scale=-1:${resolutionHeight}[inputBeforeBlackScreen];`
						+ `[blackScreen][inputBeforeBlackScreen]overlay=shortest=1:x=(main_w-overlay_w)/2:y=(main_h-overlay_h)/2,`
							+ `crop=${resolutionWidth}:${resolutionHeight} [fitWithinOut]; `;
				}
				else
				{
					fitWithin = `[${inputFile}:v]${zoomSettings}scale=-1:${resolutionHeight},crop=${resolutionWidth}:${resolutionHeight} [fitWithinOut];`;
				}
				break;
		
			case FitWithinEnum.byWidth:
				//var newHeight = resolutionWidth / videoInfo.Width * resolutionHeight;
				var newHeight = resolutionWidth * videoInfoHeight / videoInfoWidth;
				if (newHeight < resolutionHeight)
				{
					fitWithin = `[${blackscreen}:v]scale=${resolutionWidth}:${resolutionHeight}[blackScreen];`
						+ `[${inputFile}:v]${zoomSettings}scale=${resolutionWidth}:-1[inputBeforeBlackScreen];`
						+ `[blackScreen][inputBeforeBlackScreen]overlay=shortest=1:x=(main_w-overlay_w)/2:y=(main_h-overlay_h)/2,`
							+ `crop=${resolutionWidth}:${resolutionHeight} [fitWithinOut]; `;
				}
				else
				{
					fitWithin = `[${inputFile}:v]${zoomSettings}scale=${resolutionWidth}:-1,crop=${resolutionWidth}:${resolutionHeight} [fitWithinOut];`;
				}

			default:
				fitWithin = `[${inputFile}:v]${zoomSettings}scale=${resolutionWidth}:${resolutionHeight}[fitWithinOut];`;
				break;

		}
	}

	
	private static getFfmpegMultiplier(slowerMultiplier?: MultiplierEnum): number
	{
		if (!slowerMultiplier || slowerMultiplier === MultiplierEnum.normal) {
			return 1;
		}

		else if (slowerMultiplier < 0)
		{
			slowerMultiplier = -1 / slowerMultiplier;
		}

		return slowerMultiplier;
	}
	

	public GetGetFfmpegFilter(string startChain, string endChain, string tempInputChain, bool reverse = false): string
	{
		return `[{InputNumber}:v]scale={{resolutionWidth}}:{OverlayHeight}[{tempInputChain+InputNumber}];[{startChain}][{tempInputChain+InputNumber}]overlay={(RepeatCount < 0 ? "shortest=1:" : "repeatlast=0:")}x=0:y={OverlayTop}[{endChain}];`;
	}

	public GetGetFfmpegFilter(bool reverse = false): string
	{
		if (!IsSelected) return "";

		return !reverse
			? `[{InputNumber}:v]scale={{resolutionWidth}}:{OverlayHeight}[overlay{InputNumber}];[applyOverlay{InputNumber}][overlay{InputNumber}]overlay={(RepeatCount < 0 ? "shortest=1:" : "repeatlast=0:")}x=0:y={OverlayTop}[applyOverlay{(InputNumber + 1)}];`
			: `[{InputNumber}:v]scale={{resolutionWidth}}:{OverlayHeight}[overlayReverse{InputNumber}];[applyOverlayReverse{InputNumber}][overlayReverse{InputNumber}]overlay={(RepeatCount < 0 ? "shortest=1:" : "repeatlast=0:")}x=0:y={OverlayTop}[applyOverlayReverse{(InputNumber + 1)}];`;
	}

	public getFfmpegOverlayFilter(
		startChain: string,
		endChain: string,
		reverse: boolean,
		before: boolean,
		afterPingPong: boolean)
	{
		var overlays = afterPingPong
			? Overlays.Where(m => m.IsSelectedAfterPingPong).ToArray()
			: before
				? Overlays.Where(m => m.IsSelectedBefore).ToArray()
				: Overlays.Where(m => m.IsSelected).ToArray();
		var result = '';

		var startChainInternal = startChain;
		var tempChainSuffix = afterPingPong
			? "applyOverlayAfterPingPong"
			: before
				? "applyOverlayBeforeSlow"
				: reverse
					? "applyOverlayReverse"
					: "applyOverlay";
		var tempInputChain = tempChainSuffix + "Scale";
		var count = overlays.Length;
		for (var index = 0; index < count; index++)
		{
			var endChainInternal = index == count - 1 ? endChain : tempChainSuffix + index;
			result += overlays[index].GetGetFfmpegFilter(startChainInternal, endChainInternal, tempInputChain);
			startChainInternal = endChainInternal;
		}

		return result;
	}

	private static async slowMotion(inputFiles: inputFile[], settings: SpinnerSettingsModel, traceId: string): Promise<string> {
		const selectedGuid = settings?.frontSettings?.selectedPresetGuid;
		const selectedPreset = settings?.frontSettings?.presets?.find(preset => preset.guid === selectedGuid);


		const ovarlayGuidsBeforeSlow = selectedPreset?.overlays?.filter(item => item.beforeSlow && !item.disable).map(item => item.guid) ?? [];
		const ovarlaysBeforeSlow = settings?.overlaySettings?.items?.filter(item => ovarlayGuidsBeforeSlow.some(guid => guid === item.guid)) ?? [];
		if (settings.overlaySettings?.enable
			&& ovarlaysBeforeSlow.length > 0) {
				;
		}

		if (settings.overlaySettings?.enable) {
			const ovarlayGuidsAfterSlow = selectedPreset?.overlays?.filter(item => item.afterSlow && !item.disable).map(item => item.guid) ?? [];
			const ovarlaysAfterSlow = settings.overlaySettings.items?.filter(item => ovarlayGuidsAfterSlow.some(guid => guid === item.guid)) ?? [];
		}


		const licensed = true;
		const parts = selectedPreset?.multipliers ?? [];
		const countParts = parts.length;
		const isOnePart = !licensed || countParts <= 1;

		let slowFilter = '';
		if (isOnePart) {
			const multiplier = this.getFfmpegMultiplier(selectedPreset?.multipliers?.find(item => true)).toFixed(2);
			// slowFilter = multiplier.toFixed(2);
			slowFilter = '[beforeSlow] setpts = ' + multiplier + ' * PTS[afterSlow];';
		} else {

			const fullMovieDuration = 10; // calc
			const durationParts = fullMovieDuration / countParts;
			const durationStr = durationParts.toFixed(2);
			let splitResult = "";
			let concatSlowerInput = "";
			let start = 0;
			let partsMultiplierCommand = "";
			for (var index = 0; index < countParts; index++)
			{
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

				// movieDuration = applyAudio
				// 	? (movieDuration + durationParts * itemMultiplier * multiplyAudioDuration)
				// 	: null;

				// itemIndex++;
				start += durationParts;
			}

			slowFilter = `[beforeSlow] split=${countParts} ${splitResult};${partsMultiplierCommand}` +
						   `${concatSlowerInput}concat=n=${countParts}:v=1[afterSlow];`;
			// slowerFilter = `[${(configuration.PingPong ? "recordSlow" : lastOverlayFilterBefore)}] split=${countParts} ${splitResult}${partsMultiplierCommand}` +
			// 			   `;${concatSlowerInput}concat=n=${countParts}:v=1[${firstOverlayFilter}];`;
		}

		const blackscreenIndex = inputFiles.findIndex(file => file.fileType === inputFileType.blackscreen)!;
		const inputFileIndex = inputFiles.findIndex(file => file.fileType === inputFileType.input)!;
		const audioIndex = inputFiles.findIndex(file => file.fileType === inputFileType.audio)!;
		const introIndex = inputFiles.findIndex(file => file.fileType === inputFileType.intro)!;
		const outroIndex = inputFiles.findIndex(file => file.fileType === inputFileType.outro)!;
		// const overlaysIndex = inputFiles.findIndex(file => file.fileType === inputFileType.overlay)!;
		if (settings.audioSettings?.enable && selectedPreset?.selectedAudioGuid) {
			const selectedAudio = settings.audioSettings.items?.find(item => item.guid === selectedPreset.selectedAudioGuid);
			if (selectedAudio?.startFrom === AudioStartFromEnum.fromMovie
				&& selectedAudio?.stopTo === AudioStopToEnum.toMovie) {
				;
			}
		}

		const fps = Number(settings.videoSettings?.fps ?? '30');
		const filter = '[' + inputFileIndex + ':v]split[forward][reverse];'
			+ '[reverse]reverse,fifo[reversed];'
			+ '[forward] setpts = 1.00 * PTS[forwardPts];'
			+ '[reversed] setpts = 1.00 * PTS[reversedPts];'
			+ '[forwardPts][reversedPts]concat=n=2:v=1,setsar=1[pingpong];'
			+ '[pingpong]fps=fps=' + fps +'[out]';

		const result = await FfmpegHelper.runFfmpeg(fullname, settings, traceId, filter);
		return result;
	}

	/** */
	private static async addOverlay(files: inputFile[], settings: SpinnerSettingsModel, traceId: string): Promise<string | undefined> {
		if (!settings.overlaySettings?.enable) {
			const inputFile = files.find(file => file.fileType === inputFileType.input)?.file;
			return inputFile;
		}

		const overlaysSelected = ['','1']
		const t = settings.overlaySettings?.items
			?.filter(item => overlaysSelected.some(overlaySelected => item.guid === overlaySelected))
			?.sort(SortHelper.dynamicSort('name'));
		const fps = Number(settings.overlaySettings ?? '30');
		const filter = '[0:v]split[forward][reverse];'
			+ '[reverse]reverse,fifo[reversed];'
			+ '[forward] setpts = 1.00 * PTS[forwardPts];'
			+ '[reversed] setpts = 1.00 * PTS[reversedPts];'
			+ '[forwardPts][reversedPts]concat=n=2:v=1,setsar=1[pingpong];'
			+ '[pingpong]fps=fps=' + fps +'[out]';

		const result = await FfmpegHelper.runFfmpeg(fullname, settings, traceId, filter);
		return result;
	}

	/** */
	public static async pingPong(inputFiles: inputFile[], settings: SpinnerSettingsModel, traceId: string): Promise<string | undefined> {
		;


		const fps = Number(settings.videoSettings?.fps ?? '30');
		const filter = '[0:v]split[forward][reverse];'
			+ '[reverse]reverse,fifo[reversed];'
			+ '[forward] setpts = 1.00 * PTS[forwardPts];'
			+ '[reversed] setpts = 1.00 * PTS[reversedPts];'
			+ '[forwardPts][reversedPts]concat=n=2:v=1,setsar=1[pingpong];'
			+ '[pingpong]fps=fps=' + fps +'[out]';

		const result = await FfmpegHelper.runFfmpeg(fullname, settings, traceId, filter);
		return result;
	}

	/** */
	public static async pingPong0(fullname: string | undefined, settings: SpinnerSettingsModel, traceId: string): Promise<string | undefined> {
		const fps = Number(settings.videoSettings?.fps ?? '30');
		const filter = '[0:v]split[forward][reverse];'
			+ '[reverse]reverse,fifo[reversed];'
			+ '[forward] setpts = 1.00 * PTS[forwardPts];'
			+ '[reversed] setpts = 1.00 * PTS[reversedPts];'
			+ '[forwardPts][reversedPts]concat=n=2:v=1,setsar=1[pingpong];'
			+ '[pingpong]fps=fps=' + fps +'[out]';

		const result = await FfmpegHelper.runFfmpeg(fullname, settings, traceId, filter);
		return result;

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
	}

	/** */
	// public static async addOverlay(fullname: string | undefined, settings: SpinnerSettingsModel, traceId: string): Promise<string | undefined> {
	public static async runFfmpeg(
		fullname: string | undefined,
		settings: SpinnerSettingsModel,
		traceId: string,
		filter: string
	): Promise<string | undefined> {

		if (!fullname
			|| !fs.existsSync(fullname)) {
			this.eventLogger.warn('File ' + fullname + ' not found');
			return;
		}

		const fileNamePattern = settings.pathSources?.fileNamePattern ?? '';
		const newFilename = await FfmpegHelper.getFilenameByPattern(fullname, fileNamePattern);
		
		try {
			const maxBitrate = Number(settings.videoSettings?.maxBitrate ?? '8000');
			const rootDir = appRootDir.get();
			const ffmpegpath = rootDir + '/node_modules/ffmpeg-static/ffmpeg';
			const ffmpegArgs = [
				'-loglevel', 'error',
				'-i', fullname,
				// '-r ' + fps,
				'-maxrate', maxBitrate + 'k',
				'-bufsize', maxBitrate * 2 + 'k',
				'-c:v', 'libx264',
				'-pix_fmt', 'yuv420p',
				'-crf', '23',
				'-profile:v', 'baseline',
				'-level', '3.0',
				'-filter_complex', filter,
				'-map', '[out]',
				newFilename
			];
			const ffmpegArgsString = ffmpegArgs.reduce((a, b) => a + ' ' + b);
			// const ffmpegpath = appRootDir + '/bin/ffmpeg';
			this.eventLogger.info(ffmpegpath + ' ' + ffmpegArgsString, 'ffmpeg run process ' + traceId + ' ');
			const process = spawn( ffmpegpath, ffmpegArgs);
			await FfmpegHelper.waitProcess(process, FfmpegHelper.eventLogger, traceId);
		} catch (error) {
			this.eventLogger.error(error, 'ffmpeg run process ' + traceId + ' ');
		}

		if (!fs.existsSync(newFilename)) {
			return undefined;
		}
		return newFilename;
	}

	private static async getFilenameByPattern(fullname: string, fileNamePattern?: string): Promise<string> {
		const filename = path.basename(fullname);
		const tempFolder = path.join(app.getPath('temp'), 'pingpong');
		// const tempFile = path.join(tempFolder, filename);
		this.eventLogger.info('fullname: ' + fullname + ' fillename: ' + filename);

		if (!fs.existsSync(tempFolder)) {
			fs.mkdirSync(tempFolder);
		}

		const templateFull = path.join(tempFolder, fileNamePattern + '_').replace(/\\/g, '/');
		const searchPattern = templateFull + '*.mp4';
		this.eventLogger.info('searchpattern: ' + searchPattern);
		const filesExist = await fg([searchPattern], { dot: true });
		this.eventLogger.info('find files: ' + JSON.stringify(filesExist));
		const fileNumbers = filesExist
			.map(file => file.replace(templateFull, '').replace('.mp4', ''))
			.filter(fileNumber => fileNumber)
			.map(fileNumber => Number(fileNumber))
			.filter(fileNumber => Number.isInteger(fileNumber));
		const maxFileNumber = fileNumbers.length > 0 ? Math.max(...fileNumbers) : 0;
		const nextFileNumber = maxFileNumber + 1;

		const newFilename = templateFull + nextFileNumber.toString().padStart(4, '0') + '.mp4';
		this.eventLogger.info('newfilename: ' + newFilename);
		return newFilename;
	}

	public static waitProcess(process: ChildProcessWithoutNullStreams, eventLogger: EventLogger, traceId: string): Promise<number> {
		return new Promise((resolve, reject) => {
			process.stdout.on('data', (data: any) => {
				eventLogger.info(`stdout ${traceId} : ${data}`);
			});
			process.stderr.on('data', (data: any) => {
				eventLogger.error(`stderr ${traceId} : ${data}`);
			});
			process.on('close', (code) => {
				eventLogger.error(`application closed with code ${traceId} : ${code}`);
				if (code) {
					reject();
				}
				resolve();
			});
			process.on('exit', (code) => {
				eventLogger.error(`application exit with code ${traceId} : ${code}`);
				if (code) {
					reject();
				}
				resolve();
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
		});
		inputFiles.push({
			commands: '-f lavfi -i color=black'.split(' '),
			fileType: inputFileType.blackscreen,
			// guid: '',
		});

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
			});
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
			});
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
			});
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
					});
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
	// zoom
}
export interface inputFile {
	fileType: inputFileType;
	guid?: string;
	file?: string;
	commands?: string[];
}