import React from 'react';
import AppComponent from '../appComponent';
import { Props as ViewProps, RadioButtonGroupView } from '.';

interface Props extends ViewProps {}

export default class extends AppComponent<Props> {
    public render() {
        return (
            <RadioButtonGroupView activeIndex={this.props.activeIndex} onPress={this.props.onPress} {...this.props} />
        );
    }
}
