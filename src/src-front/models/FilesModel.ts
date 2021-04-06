/** */
export interface PathSourceFilesModel {

	dirname?: string;

	files?: PathSourceFileModel[];
}

/** */
export interface PathSourceFileModel {
	filename?: string;

	dirname?: string;

	fullpath?: string;

	extension?: string;

	fileSize?: number;
}

/** Модель настроек приложения */
export interface DesignSettingsModel {
	/** */
	titleFrontPage?: string;
	/** */
	background?: string;

	/** */
	backgroundToolbar?: string;

	/** */
	backgroundGroupName?: string;

	/** */
	backgroundFileCard?: string;

	/** */
	iconColor?: string;

	// /** */
	// size?: DesignSizeEnum;
}
