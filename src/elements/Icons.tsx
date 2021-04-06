/* eslint-disable react/no-multi-comp */
/* eslint-disable max-classes-per-file */
import {
	Folder as UiFolder,
	MoreHoriz as UiMoreHoriz,
	PlaylistAdd as UiPlaylistAdd,
	Remove as UiRemove,
	Print as UiPrint,
	PrintTwoTone as UiPrintTwoTone,
	Mail as UiMail,
	Send as UiSend,
	ViewComfy as UiViewComfy,
	ViewModule as UiViewModule,
	ViewStream as UiViewStream,
	ViewCarousel as UiViewCarousel,
	Sort as UiSort,
	Language as UiLanguage,
	CropLandscape as UiCropLandscape,
	CropPortrait as UiCropPortrait,
	PhotoSizeSelectActual as UiPhotoSizeSelectActual,
	PhotoSizeSelectLarge as UiPhotoSizeSelectLarge,
	FormatSize as UiFormatSize,
	PhotoLibrary as UiPhotoLibrary,
	Image as UiImage,
	SettingsEthernet as UiSettingsEthernet,
	KeyboardArrowDown as UiKeyboardArrowDown,
	KeyboardArrowUp as UiKeyboardArrowUp,
	KeyboardArrowLeft as UiKeyboardArrowLeft,
	KeyboardArrowRight as UiKeyboardArrowRight,
	CheckBox as UiCheckBox,
	CheckBoxOutlineBlank as UiCheckBoxOutlineBlank,
	Block as UiBlock,
	Settings as UiSettings,
} from '@material-ui/icons';
import React from 'react';

/** Свойства кнопки */
export interface IIconProps {
	className?: string;
	/**
	 * Node passed into the SVG element.
	 */
	children?: React.ReactNode;
	/**
	 * The color of the component. It supports those theme colors that make sense for this component.
	 * You can use the `htmlColor` prop to apply a color attribute to the SVG element.
	 */
	color?: 'inherit' | 'primary' | 'secondary' | 'action' | 'disabled' | 'error';
	/**
	 * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
	 */
	fontSize?: 'inherit' | 'default' | 'small' | 'large';
	/**
	 * Applies a color attribute to the SVG element.
	 */
	htmlColor?: string;
	/**
	 * The shape-rendering attribute. The behavior of the different options is described on the
	 * [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering).
	 * If you are having issues with blurry icons you should investigate this prop.
	 */
	shapeRendering?: string;
	/**
	 * Provides a human-readable title for the element that contains it.
	 * https://www.w3.org/TR/SVG-access/#Equivalent
	 */
	titleAccess?: string;
	/**
	 * Allows you to redefine what the coordinates without units mean inside an SVG element.
	 * For example, if the SVG element is 500 (width) by 200 (height), and you pass viewBox="0 0 50 20",
	 * this means that the coordinates inside the SVG will go from the top left corner (0,0)
	 * to bottom right (50,20) and each unit will be worth 10px.
	 */
	viewBox?: string;
}
/** Кнопка */
export class Folder extends React.PureComponent<IIconProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiFolder
				{...this.props}
			/>
		);
	}
}

/** */
export class MoreHoriz extends React.PureComponent<IIconProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiMoreHoriz
				{...this.props}
			/>
		);
	}
}
/** */
export class PlaylistAdd extends React.PureComponent<IIconProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiPlaylistAdd
				{...this.props}
			/>
		);
	}
}

/** */
export class Remove extends React.PureComponent<IIconProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiRemove
				{...this.props}
			/>
		);
	}
}

/** */
export class Print extends React.PureComponent<IIconProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiPrint
				{...this.props}
			/>
		);
	}
}

/** */
export class PrintTwoTone extends React.PureComponent<IIconProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiPrintTwoTone
				{...this.props}
			/>
		);
	}
}

/** */
export class Mail extends React.PureComponent<IIconProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiMail
				{...this.props}
			/>
		);
	}
}
/** */
export class Send extends React.PureComponent<IIconProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiSend
				{...this.props}
			/>
		);
	}
}
/** */
export class ViewComfy extends React.PureComponent<IIconProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiViewComfy
				{...this.props}
			/>
		);
	}
}
/** */
export class ViewModule extends React.PureComponent<IIconProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiViewModule
				{...this.props}
			/>
		);
	}
}

/** */
export class ViewStream extends React.PureComponent<IIconProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiViewStream
				{...this.props}
			/>
		);
	}
}

/** */
export class ViewCarousel extends React.PureComponent<IIconProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiViewCarousel
				{...this.props}
			/>
		);
	}
}

/** */
export class Sort extends React.PureComponent<IIconProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiSort
				{...this.props}
			/>
		);
	}
}

/** */
export class Language extends React.PureComponent<IIconProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiLanguage
				{...this.props}
			/>
		);
	}
}

/** */
export class CropLandscape extends React.PureComponent<IIconProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiCropLandscape
				{...this.props}
			/>
		);
	}
}

/** */
export class CropPortrait extends React.PureComponent<IIconProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiCropPortrait
				{...this.props}
			/>
		);
	}
}

/** */
export class PhotoSizeSelectActual extends React.PureComponent<IIconProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiPhotoSizeSelectActual
				{...this.props}
			/>
		);
	}
}
/** */
export class PhotoSizeSelectLarge extends React.PureComponent<IIconProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiPhotoSizeSelectLarge
				{...this.props}
			/>
		);
	}
}
/** */
export class FormatSize extends React.PureComponent<IIconProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiFormatSize
				{...this.props}
			/>
		);
	}
}
/** */
export class Image extends React.PureComponent<IIconProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiImage
				{...this.props}
			/>
		);
	}
}
/** */
export class PhotoLibrary extends React.PureComponent<IIconProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiPhotoLibrary
				{...this.props}
			/>
		);
	}
}
/** */
export class SettingsEthernet extends React.PureComponent<IIconProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiSettingsEthernet
				{...this.props}
			/>
		);
	}
}
/** */
export class KeyboardArrowDown extends React.PureComponent<IIconProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiKeyboardArrowDown
				{...this.props}
			/>
		);
	}
}
/** */
export class KeyboardArrowUp extends React.PureComponent<IIconProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiKeyboardArrowUp
				{...this.props}
			/>
		);
	}
}
/** */
export class CheckBox extends React.PureComponent<IIconProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiCheckBox
				{...this.props}
			/>
		);
	}
}
/** */
export class CheckBoxOutlineBlank extends React.PureComponent<IIconProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiCheckBoxOutlineBlank
				{...this.props}
			/>
		);
	}
}
/** */
export class Block extends React.PureComponent<IIconProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiBlock
				{...this.props}
			/>
		);
	}
}

/** */
export class KeyboardArrowLeft extends React.PureComponent<IIconProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiKeyboardArrowLeft
				{...this.props}
			/>
		);
	}
}
/** */
export class KeyboardArrowRight extends React.PureComponent<IIconProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiKeyboardArrowRight
				{...this.props}
			/>
		);
	}
}
/** */
export class Settings extends React.PureComponent<IIconProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiSettings
				{...this.props}
			/>
		);
	}
}
