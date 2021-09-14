import type { RouteComponentProps } from 'react-router';

import type { IBasicProps } from './IBasicProps';

/** Базовые параметры с роутингом */
export interface IBasicRoutedProps<T extends IBasicProps>
	extends RouteComponentProps<T> {}
