import { observer } from 'mobx-react';
import { ProviderContext } from 'notistack';
import React from 'react';

import { KioskItemStateEnum } from './KioskItemStateEnum';
import { KioskViewFilesViewModel, KioskViewFileViewModel } from './KioskViewFileViewModel';
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
	currentItemSize?: VideoItemSizeEnum;

	sortOrder?: SortOrderEnum;

	size?: DesignSizeEnum;

	groupFiles?: KioskViewFilesViewModel;

	onSelectItemClick?: (event: React.ChangeEvent<HTMLInputElement>, value: KioskViewItemEventProps) => void;

	onPrintItemClick: (event: React.MouseEvent<Element, MouseEvent>, value?: PrintSendingItemModel) => Promise<void>;

	onSendByEmailItemClick: (event: React.MouseEvent<Element, MouseEvent>, value?: string) => Promise<void>;
}

/** */
@observer
export class KioskViewGroupItems extends React.PureComponent<KioskViewGroupItemsProps> {
	/** Отображение */
	public render(): React.ReactNode {
		const { groupFiles, size, currentItemSize, sortOrder, onPrintItemClick, onSendByEmailItemClick, onSelectItemClick } = this.props;

		if (!groupFiles?.files || groupFiles.files.length <= 0) {
			return null;
		}

		const showGroup = groupFiles.files
			.some((file: KioskViewFileViewModel) => file.state === KioskItemStateEnum.Show || file.state === KioskItemStateEnum.Loading);
		const classShowGroup = showGroup ? '' : 'display-none';
		// const filesGrouped = ArrayHelper.groupBy(files, (file: KioskViewFileViewModel) => file.dirname!);
		// const filesView: JSX.Element[] = [];
		const direction = currentItemSize === VideoItemSizeEnum.column
			? 'column'
			: 'row';
		const sortMultiplexer = sortOrder === SortOrderEnum.desc ? -1 : 1;
		const filesInGroupArraySorted = groupFiles.files
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
			/>
		));

		return (
			<div
				className={`padding-12px ${classShowGroup}`}
			>
				<Grid
					container={true}
					spacing={1}
					alignContent='stretch'
					direction='column'
				>
					<Grid
						item={true}
					>
						<Typography
							align='center'
							variant='h6'
						>
							{groupFiles.dirname}
						</Typography>
					</Grid>
					<Grid
						item={true}
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
					</Grid>
				</Grid>
			</div>
		);
	}
}
