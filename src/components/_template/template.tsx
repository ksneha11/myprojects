import React from 'react';
import AppComponent from '../common/appComponent';
import { ComponentTemplateView, ViewProps } from './';

interface State {}
interface Props extends Partial<ViewProps> {}

const defaultProps = {};

export default class ComponentTemplate extends AppComponent<Props, State> {
    public static defaultProps = defaultProps;

    constructor(props: any) {
        super(props);

        this.state = {};
    }

    public render() {
        return <ComponentTemplateView {...this.props} style={this.style} />;
    }
}
