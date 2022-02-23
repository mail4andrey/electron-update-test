import { TableContainer as UiTableContainer, TableBody as UiTableBody, Table as UiTable, TableHead as UiTableHead, TableRow as UiTableRow, TableCell as UiTableCell } from '@material-ui/core';
import React from 'react';

/** Свойства */
export interface ITableContainerProps {
}
/** Кнопка */
export class TableContainer extends React.PureComponent<ITableContainerProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiTableContainer
				{...this.props}
			/>
		);
	}
}


/** Свойства */
export interface ITableProps {
}
/** Кнопка */
export class Table extends React.PureComponent<ITableProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiTable
				{...this.props}
			/>
		);
	}
}

/** Свойства */
export interface ITableHeadProps {
}
/** Кнопка */
export class TableHead extends React.PureComponent<ITableHeadProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiTableHead
				{...this.props}
			/>
		);
	}
}

/** Свойства */
export interface ITableRowProps {
}
/** Кнопка */
export class TableRow extends React.PureComponent<ITableRowProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiTableRow
				{...this.props}
			/>
		);
	}
}

/** Свойства */
export interface ITableCellProps {
	/**
	 * Set the text-align on the table cell content.
	 *
	 * Monetary or generally number fields **should be right aligned** as that allows
	 * you to add them up quickly in your head without having to worry about decimals.
	 */
	align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
	/**
	 * The table cell contents.
	 */
	children?: React.ReactNode;
	variant?: 'head' | 'body' | 'footer';
}
/** Кнопка */
export class TableCell extends React.PureComponent<ITableCellProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiTableCell
				{...this.props}
			/>
		);
	}
}

/** Свойства */
export interface ITableBodyProps {
}
/** Кнопка */
export class TableBody extends React.PureComponent<ITableBodyProps> {
	/** Отображение */
	public render(): React.ReactNode {
		return (
			<UiTableBody
				{...this.props}
			/>
		);
	}
}