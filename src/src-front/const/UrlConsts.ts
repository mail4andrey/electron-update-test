/** */
export class UrlConsts {
	public static settingsUrl = 'settings';
	public static filesUrl = 'files';
	public static fileUrl = 'file';
	public static getFile = 'file';
	public static dataUrl = 'data';
	
	/** Запросы к беку по командам к камере */
	public static camera = class {
		/** */
		public static getStatus = 'camera/status';
		/** */
		public static setSetting = 'camera/setting';
		/** */
		public static pairing = 'camera/pairing';
		/** */
		public static takePhoto = 'camera/takePhoto';
		/** */
		public static recordVideo = 'camera/recordVideo';
		/** */
		public static getLastFile = 'camera/getLastFile';
		/** */
		public static downloadFile = 'camera/downloadFile';
		/** */
		public static deleteFile = 'camera/deleteFile';
		/** */
		public static getFiles = 'camera/files';
		/** */
		public static getFile = 'camera/file';
	}
	
	/** Запросы к GoPro */
	/** https://github.com/KonradIT/goprowifihack/blob/master/HERO7/HERO7-Commands.md */
	public static goPro = class {
		public static powerOff = 'http://10.5.5.9/gp/gpControl/command/system/sleep';
		public static getStatus = 'http://10.5.5.9/gp/gpControl/status';
		public static setVideoSubMode = 'http://10.5.5.9/gp/gpControl/command/sub_mode?mode=0&sub_mode=0';
		public static setPhotoSingleSubMode = 'http://10.5.5.9/gp/gpControl/command/sub_mode?mode=1&sub_mode=1';
		public static shuttler = 'http://10.5.5.9/gp/gpControl/command/shutter?p=1';
		public static stopShuttler = 'http://10.5.5.9/gp/gpControl/command/shutter?p=0';
		public static getMediaList = 'http://10.5.5.9/gp/gpMediaList';
		public static pairing = (pcname: string) =>  'http://10.5.5.9/gp/gpControl/command/wireless/pair/complete?success=1&deviceName=' + pcname;
		public static getFileData = (directory: string, filename: string) => 'http://10.5.5.9/videos/DCIM/' + directory + '/' + filename;
		public static setMode = (mode: string) => 'http://10.5.5.9/gp/gpControl/command/mode?p=' + mode;
		public static setSubMode = (mode: string, subMode: string) => 'http://10.5.5.9/gp/gpControl/command/sub_mode?mode=' + mode + '&sub_mode=' + subMode;
		public static deleteFile = (filename: string) => 'http://10.5.5.9/gp/gpControl/command/storage/delete?p=' + filename;

		public static setVideoResolution = (mode: string) => 'http://10.5.5.9/gp/gpControl/setting/2/' + mode;
		public static setVideoIsoLimit = (mode: string) => 'http://10.5.5.9/gp/gpControl/setting/13/' + mode;
		public static setVideoEvComp = (mode: string) => 'http://10.5.5.9/gp/gpControl/setting/15/' + mode;
		public static setVideoProTune = (mode: string) => 'http://10.5.5.9/gp/gpControl/setting/10/' + mode;
		public static setVideoFrameRate = (mode: string) => 'http://10.5.5.9/gp/gpControl/setting/3/' + mode;

		public static setPhotoResolution = (mode: string) => 'http://10.5.5.9/gp/gpControl/setting/17/' + mode;
		public static setPhotoIsoLimit = (mode: string) => 'http://10.5.5.9/gp/gpControl/setting/24/' + mode;
		public static setPhotoEvComp = (mode: string) => 'http://10.5.5.9/gp/gpControl/setting/26/' + mode;
		public static setPhotoProTune = (mode: string) => 'http://10.5.5.9/gp/gpControl/setting/21/' + mode;

		public static setTimeLapseResolution = (mode: string) => 'http://10.5.5.9/gp/gpControl/setting/28/' + mode;
		public static setTimeLapseIsoLimit = (mode: string) => 'http://10.5.5.9/gp/gpControl/setting/37/' + mode;
		public static setTimeLapseEvComp = (mode: string) => 'http://10.5.5.9/gp/gpControl/setting/39/' + mode;
		public static setTimeLapseProTune = (mode: string) => 'http://10.5.5.9/gp/gpControl/setting/34/' + mode;

		// GoPro8
		public static setModeGoPro8 = (mode: string) => 'http://10.5.5.9/gp/gpControl/setting/144/' + mode;
		public static setVideoEvCompGoPro8 = (mode: string) => 'http://10.5.5.9/gp/gpControl/setting/118/' + mode;
		public static setVideoProTuneGoPro8 = (mode: string) => 'http://10.5.5.9/gp/gpControl/setting/114/' + mode;
		public static setPhotoEvCompGoPro8 = (mode: string) => 'http://10.5.5.9/gp/gpControl/setting/118/' + mode;
		public static setPhotoProTuneGoPro8 = (mode: string) => 'http://10.5.5.9/gp/gpControl/setting/114/' + mode;
	}
}
