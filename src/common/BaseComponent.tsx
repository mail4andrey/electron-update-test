import * as React from 'react';

import { IBasicProps } from './props/IBasicProps';


/** Базовый реакт компонент */
export class BaseComponent<P extends Partial<IBasicProps>>
	extends React.Component<P> {}
// extends React.PureComponent<P> {}

