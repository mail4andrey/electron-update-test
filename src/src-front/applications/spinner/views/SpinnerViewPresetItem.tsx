import { observer } from 'mobx-react';
import React from 'react';

import { Accordion } from '../../../../elements/Accordion';
import { AccordionSummary } from '../../../../elements/AccordionSummary';
import { Button } from '../../../../elements/Button';
import { ExpandMore } from '../../../../elements/Icons';
import { SpinnerLocalization } from '../../../../src-front/localization/SpinnerLocalization';
import { AccordionDetails } from '../../../../elements/AccordionDetails';
import { TextField, ITextFieldChangeEventProps } from '../../../../elements/TextField';
import { FormControl } from '../../../../elements/FormControl';

/** */
export interface SpinnerViewProps {
	preset?: string;
}

/** */
@observer
/** */
class SpinnerView extends React.PureComponent<SpinnerViewProps> {
	// @inject
	// private readonly controller!: SpinnerViewController;
	/** Отображение */
	// public render(): React.ReactNode {
	// 	const { loaded, language } = this.store;
	// 	const selectedGuid = this.store.settings?.frontSettings?.selectedPresetGuid;
	// 	const preset = this.store.settings?.frontSettings?.presets?.find(preset => preset.guid === selectedGuid);


	// 	return (
	// 		<div>
	// 			<Accordion>
	// 				<AccordionSummary
	// 					expandIcon={<ExpandMore />}
	// 				>
	// 					<div className='width-100-percent'>
	// 						{SpinnerLocalization.settings(language)}
	// 						<div className='padding-top-6px'>
	// 							<Button
	// 								onClick={this.TestButtonClick}
	// 							>
	// 								{SpinnerLocalization.buttonTest(language)}
	// 							</Button>
	// 						</div>
	// 					</div>
	// 				</AccordionSummary>
	// 				<AccordionDetails>
	// 					<FormControl
	// 						fullWidth={true}
	// 						margin='dense'
	// 					>
	// 						<FormControl
	// 							fullWidth={true}
	// 							margin='dense'
	// 						>
	// 							<TextField
	// 								value={preset?.title}
	// 								label={SpinnerLocalization.frontSettings.title(language)}
	// 								// placeholder='0.0'
	// 								// disabled={!this.props.file || this.props.disabled}
	// 								// error={!recordVideoDurationValid}
	// 								onChange={this.onPresetTitleChange}
	// 								// helperText={SettingsLocalization.introOutroTab.durationForImageWarning(language)}
	// 								InputProps={{
	// 									// startAdornment: buttons,
	// 									// endAdornment: seconds
	// 								}}
	// 							/>
	// 						</FormControl>

	// 					</FormControl>
	// 				</AccordionDetails>
	// 			</Accordion>
	// 		</div>
	// 	);
	// }

	// /** */
	// private readonly onTitleChange = async (event: ITextFieldChangeEventProps): Promise<void> => {
	// 	this.store.localSettings.recordVideoDuration = event.target.value;
	// 	this.controller.saveSettingsToLocalStorage();
	// };
}