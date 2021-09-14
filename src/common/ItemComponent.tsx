import { remote } from 'electron';
import { observer } from 'mobx-react';
import React from 'react';

import { OneLine } from '../elements/commons/OneLine';
import { IconButton } from '../elements/IconButton';
import { ArrowUpward, ArrowDownward, Delete, ExpandMore } from '../elements/Icons';
import { InputAdornment } from '../elements/InputAdornment';
import type { ITextFieldChangeEventProps } from '../elements/TextField';
import { Tooltip } from '../elements/Tooltip';
import { LanguageEnum } from '../src-front/models/LanguageEnum';
import { Typography } from '../elements/Typography';
import { RightContainer } from '../elements/commons/RightContainer';
import { Accordion } from '../elements/Accordion';
import { AccordionSummary } from '../elements/AccordionSummary';
import { AccordionDetails } from '../elements/AccordionDetails';


/** */
export interface ItemComponentProps {
	language?: LanguageEnum;
	disabled?: boolean;
	position: number;
	removeButtonTitle?: string;
	title?: React.ReactNode;
	disableUpButton?: boolean;
	disableDownButton?: boolean;
	disableDeleteButton?: boolean;
	showUpButton?: boolean;
	showDownButton?: boolean;
	showDeleteButton?: boolean;
	onUpClick?: (event: React.MouseEvent<Element, MouseEvent>, position: number) => void;
	onDownClick?: (event: React.MouseEvent<Element, MouseEvent>, position: number) => void;
	onDeleteClick?: (event: React.MouseEvent<Element, MouseEvent>, position: number) => void;
}

/** */
@observer
export class ItemComponent extends React.PureComponent<ItemComponentProps> {

	/** Отображение */
	public render(): React.ReactNode {
		const upButton = this.props.showUpButton
			? (
				<IconButton
					size='small'
					disabled={this.props.disableUpButton || this.props.disabled}
					onClick={this.onUpClick}
				>
					<ArrowUpward />
				</IconButton>
			)
			: null;
		const downButton = this.props.showDownButton
			? (
				<IconButton
					size='small'
					disabled={this.props.disableDownButton || this.props.disabled}
					onClick={this.onDownClick}
				>
					<ArrowDownward />
				</IconButton>
			)
			: null;
		const deleteButton = this.props.showDeleteButton
			? (
				<Tooltip
					title={this.props.removeButtonTitle ?? ''}
				>
					<IconButton
						size='small'
						disabled={this.props.disableDeleteButton ||this.props.disabled}
						onClick={this.onDeleteClick}
					>
						<Delete />
					</IconButton>
				</Tooltip>
			)
			: null;
		const rightButtons = (
			<InputAdornment position='end'>
				<OneLine>
					{upButton}
					{downButton}
					{deleteButton}
				</OneLine>
			</InputAdornment>
		);
		return (
			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMore />}
				>
				<OneLine>
					{this.props.title}
					<RightContainer>
						{rightButtons}
					</RightContainer>
				</OneLine>
				</AccordionSummary>
				<AccordionDetails>
					{this.props.children}
				</AccordionDetails>
			</Accordion>
		);
	}

	/** */
	private readonly onDeleteClick = (event: React.MouseEvent<Element, MouseEvent>): void => {
		const { onDeleteClick, position: id } = this.props;
		if (onDeleteClick) {
			onDeleteClick(event, id);
			event.stopPropagation();
		}
	};

	/** */
	private readonly onUpClick = (event: React.MouseEvent<Element, MouseEvent>): void => {
		const { onUpClick, position: id } = this.props;
		if (onUpClick) {
			onUpClick(event, id);
			event.stopPropagation();
		}
	};

	/** */
	private readonly onDownClick = (event: React.MouseEvent<Element, MouseEvent>): void => {
		const { onDownClick, position: id } = this.props;
		if (onDownClick) {
			onDownClick(event, id);
			event.stopPropagation();
		}
	};
}
