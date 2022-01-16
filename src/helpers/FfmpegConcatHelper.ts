// какя-то беда с версиями ноды

// вот на этой версии нормально работает

// https://bitbucket.org/selfiebox/selfiebox/downloads/node-v10.16.3-x64.msi

// ‌

// просто оставлю инструкцию, чтоб не искать потом

// установить https://nodejs.org
// добавить C:\Program Files\nodejs в Path - https://stackoverflow.com/a/27864253/3492412
// cmd под админом
// 3) npm install -g --production windows-build-tools
// 4) npm install -g node-gyp
// 5) npm install -g ffmpeg-concat

// проверить cmd не под админом
// 6) ffmpeg-concat -h

// import concat from '../ffmpeg-concat';
// import { concat } from 'ffmpeg-concat';
// import concat from 'ffmpeg-concat';

/** FfmpegHelper */
export class FfmpegConcatHelper {
	/** 0 */
	// public static async concat(): Promise<void> {
	// 	await concat({
	// 		output: 'test.mp4',
	// 		videos: [
	// 			'media/0.mp4',
	// 			'media/1.mp4',
	// 			'media/2.mp4'
	// 		],
	// 		transition: {
	// 			name: 'directionalWipe',
	// 			duration: 500
	// 		}
	// 	});
	// }
// // concat 3 mp4s together using 2 500ms directionalWipe transitions
// await concat({
//   output: 'test.mp4',
//   videos: [
//     'media/0.mp4',
//     'media/1.mp4',
//     'media/2.mp4'
//   ],
//   transition: {
//     name: 'directionalWipe',
//     duration: 500
//   }
// })
}
