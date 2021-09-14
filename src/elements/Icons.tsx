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
	Camera as UiCamera,
	Movie as UiMovie,
	SwitchVideo as UiSwitchVideo,
	PictureInPicture as UiPictureInPicture,
	MovieFilter as UiMovieFilter,
	Audiotrack as UiAudiotrack,
	ExpandMore as UiExpandMore,
	ArrowDownward as UiArrowDownward,
	ArrowUpward as UiArrowUpward,
	Delete as UiDelete,
	PhotoCamera as UiPhotoCamera,
	Videocam as UiVideocam,
	PowerSettingsNew as UiPowerSettingsNew,
	BatteryChargingFull as UiBatteryChargingFull,
	BatteryFull as UiBatteryFull,
	Battery50 as UiBattery50,
	Battery20 as UiBattery20,
	BatteryAlert as UiBatteryAlert,
	ZoomIn as UiZoomIn,
	OpenInNew as UiOpenInNew,
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
/** */
export class Camera extends React.PureComponent<IIconProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiCamera
				{...this.props}
			/>
		);
	}
}
/** */
export class Movie extends React.PureComponent<IIconProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiMovie
				{...this.props}
			/>
		);
	}
}
/** */
export class SwitchVideo extends React.PureComponent<IIconProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiSwitchVideo
				{...this.props}
			/>
		);
	}
}
/** */
export class PictureInPicture extends React.PureComponent<IIconProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiPictureInPicture
				{...this.props}
			/>
		);
	}
}
/** */
export class MovieFilter extends React.PureComponent<IIconProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiMovieFilter
				{...this.props}
			/>
		);
	}
}

/** */
export class Audiotrack extends React.PureComponent<IIconProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiAudiotrack
				{...this.props}
			/>
		);
	}
}

/** */
export class ExpandMore extends React.PureComponent<IIconProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiExpandMore
				{...this.props}
			/>
		);
	}
}

/** */
export class ArrowUpward extends React.PureComponent<IIconProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiArrowUpward
				{...this.props}
			/>
		);
	}
}

/** */
export class ArrowDownward extends React.PureComponent<IIconProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiArrowDownward
				{...this.props}
			/>
		);
	}
}

/** */
export class Delete extends React.PureComponent<IIconProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiDelete
				{...this.props}
			/>
		);
	}
}


/** */
export class PhotoCamera extends React.PureComponent<IIconProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiPhotoCamera
				{...this.props}
			/>
		);
	}
}
/** */
export class Videocam extends React.PureComponent<IIconProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiVideocam
				{...this.props}
			/>
		);
	}
}
/** */
export class PowerSettingsNew extends React.PureComponent<IIconProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiPowerSettingsNew
				{...this.props}
			/>
		);
	}
}
/** */
export class BatteryChargingFull extends React.PureComponent<IIconProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiBatteryChargingFull
				{...this.props}
			/>
		);
	}
}
/** */
export class BatteryFull extends React.PureComponent<IIconProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiBatteryFull
				{...this.props}
			/>
		);
	}
}

/** */
export class Battery50 extends React.PureComponent<IIconProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiBattery50
				{...this.props}
			/>
		);
	}
}
/** */
export class Battery20 extends React.PureComponent<IIconProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiBattery20
				{...this.props}
			/>
		);
	}
}
/** */
export class BatteryAlert extends React.PureComponent<IIconProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiBatteryAlert
				{...this.props}
			/>
		);
	}
}
/** */
export class ZoomIn extends React.PureComponent<IIconProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiZoomIn
				{...this.props}
			/>
		);
	}
}
/** */
export class OpenInNew extends React.PureComponent<IIconProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiOpenInNew
				{...this.props}
			/>
		);
	}
}