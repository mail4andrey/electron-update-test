import { RouteComponentProps } from 'react-router';

import { IBasicProps } from './IBasicProps';

/** Базовые параметры с роутингом */
export interface IBasicRoutedProps<T extends IBasicProps>
	extends RouteComponentProps<T> {}
