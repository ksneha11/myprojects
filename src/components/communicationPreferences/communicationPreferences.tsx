import React from 'react';
import AppComponent from '../common/appComponent';
import { CommunicationPreferencesView, ViewProps } from './';

interface State {}
interface Props extends ViewProps {}

const defaultProps = {};

class CommunicationPreferences extends AppComponent<Props, State> {
    public static defaultProps = defaultProps;

    constructor(props: any) {
        super(props);

        this.state = {};
    }

    public render() {
        return <CommunicationPreferencesView {...this.props} style={this.style} />;
    }
}

export default CommunicationPreferences;
