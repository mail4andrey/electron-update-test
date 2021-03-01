import { BaseComponent } from './BaseComponent';
import { IBasicProps } from './props/IBasicProps';
import { IBasicRoutedProps } from './props/IBasicRoutedProps';

/** Базовый реакт компонент с навигацией */
export class BaseRoutedComponent<P extends Partial<IBasicRoutedProps<IBasicProps>>>
	extends BaseComponent<P> {

	/** Навигация на страницу по адресу url */
	protected navigateTo = (url: string): void => {
		if (this.props.history) {
			this.props.history.push(url);
		}
	};
}
