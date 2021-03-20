import * as React from 'react';
import UIEventListener from 'react-event-listener';

/** Подписка на глобальные события */
export interface IEventListener {
	/** window/document */
	target: any | 'window' | 'document';

	/** Подписка на изменение размера */
	onResize?: (event: Event) => void;

	// /**
	//  * Подписка на кручение колесиком мыши
	//  * https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent
	//  */
	// onWheel?: (event: Event) => void;

	// /**
	//  * Подписка на обновления страницы и закрытие страницы
	//  * https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event
	//  */
	// onBeforeUnload?: (event: Event) => any;

	// /** Подписка на появление курсора мыши */
	// onMouseOver?: (_event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;

	// /** Подписка на отпускание кнопки мыши */
	// onMouseUp?: (_event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;

	// /** Подписка на перемещение мыши */
	// onMouseMove?: (_event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;

}

/**
 * Подписка на глобальные события
 * https://www.npmjs.com/package/react-event-listener
 */
export class EventListener extends React.PureComponent<IEventListener> {
	/** render */
	public render(): React.ReactElement {
		return <UIEventListener {...this.props} />;
	}
}
