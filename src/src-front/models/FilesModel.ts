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
