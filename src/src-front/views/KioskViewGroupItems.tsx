import { observer } from 'mobx-react';
import React from 'react';

import { KioskItemStateEnum } from './KioskItemStateEnum';
import { KioskViewFileViewModel } from './KioskViewFileViewModel';
import { KioskViewItem } from './KioskViewItem';
import { KioskViewItemEventProps } from './KioskViewItemEventProps';
import { VideoItemSizeEnum } from './SizeEnum';
import { SortOrderEnum } from './SortOrderEnum';

import { Grid } from '../../elements/Grid';
import { Typography } from '../../elements/Typography';
import { DesignSizeEnum } from '../../settings/DesignSettingsModel';
import { PrintSendingItemModel } from '../../settings/PrintSendingItemModel';

/** */
export interface KioskViewGroupItemsProps {
	backgroundGroupName?: string;
	backgroundFileCard?: string;
	currentItemSize?: VideoItemSizeEnum;

	sortOrder?: SortOrderEnum;

	size?: DesignSizeEnum;

	// groupFiles?: KioskViewFilesViewModel;
	files: KioskViewFileViewModel[];

	groupname?: string;

	onSelectItemClick?: (event: React.ChangeEvent<HTMLInputElement>, value: KioskViewItemEventProps) => void;

	onPrintItemClick: (event: React.MouseEvent<Element, MouseEvent>, value?: PrintSendingItemModel) => Promise<void>;

	onSendByEmailItemClick: (event: React.MouseEvent<Element, MouseEvent>, value?: string) => Promise<void>;
}

/** */
@observer
export class KioskViewGroupItems extends React.PureComponent<KioskViewGroupItemsProps> {
	/** Отображение */
	public render(): React.ReactNode {
		const { groupname, files, size, currentItemSize, sortOrder, onPrintItemClick, onSendByEmailItemClick, onSelectItemClick } = this.props;

		if (!files || files.length <= 0) {
			return null;
		}

		const showGroup = files
			.some((file: KioskViewFileViewModel) => file.state === KioskItemStateEnum.Show || file.state === KioskItemStateEnum.Loading);
		const classShowGroup = showGroup ? '' : 'display-none';
		// const filesGrouped = ArrayHelper.groupBy(files, (file: KioskViewFileViewModel) => file.dirname!);
		// const filesView: JSX.Element[] = [];
		const direction = currentItemSize === VideoItemSizeEnum.column
			? 'column'
			: 'row';
		const sortMultiplexer = sortOrder === SortOrderEnum.desc ? -1 : 1;
		const filesInGroupArraySorted = files
			.slice()
			.sort((a: KioskViewFileViewModel, b: KioskViewFileViewModel) => a.filename!.localeCompare(b.filename!) * sortMultiplexer);
		const filesInGroupView = filesInGroupArraySorted.map((file: KioskViewFileViewModel) => (
			<KioskViewItem
				key={file.fullpath}
				file={file}
				size={currentItemSize}
				buttonSize={size}
				onSelect={onSelectItemClick}
				onSendClick={onSendByEmailItemClick}
				onPrintClick={onPrintItemClick}
				backgroundFileCard={this.props.backgroundFileCard}
			/>
		));

		const background = this.props.backgroundGroupName ?? 'gray';
		return (
			<div
				className={`${classShowGroup}`}
			>
				<Grid
					container={true}
					spacing={1}
					alignContent='stretch'
					direction='column'
				>
					<Grid
						item={true}
						className='kiosk-item-group-sticky'
					>
						<div
							className='padding-6px background-image-bottom-gray'
							style={{ background }}
						>
							<Typography
								align='center'
								variant='h6'
							>
								{groupname}
							</Typography>
						</div>
					</Grid>
					<Grid
						item={true}
					>
						<div
							className='padding-6px'
						>
							<Grid
								container={true}
								spacing={1}
								alignItems='center'
								justify='space-evenly'
								direction={direction}
							>
								{filesInGroupView}
							</Grid>
						</div>
					</Grid>
				</Grid>
			</div>
		);
	}
}
