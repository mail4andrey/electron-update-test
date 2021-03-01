/* eslint-disable react/no-multi-comp */
/* eslint-disable max-classes-per-file */
import {
	Folder as UiFolder,
	MoreHoriz as UiMoreHoriz,
	PlaylistAdd as UiPlaylistAdd,
	Remove as UiRemove,
	Print as UiPrint,
	Mail as UiMail
} from '@material-ui/icons';
import React from 'react';

/** Свойства кнопки */
export interface IIconProps {
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

