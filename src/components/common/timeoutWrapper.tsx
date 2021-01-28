import React from 'react';
import AppComponent from './appComponent';

interface Props {
    children: Children;
    milliseconds: number;
    onTimeout: noop;
    show: boolean;
}

const defaultProps = {
    milliseconds: 15000,
};

export default class TimeoutWrapper extends AppComponent<Props> {
    public static defaultProps = defaultProps;
    public name = 'TimeoutWrapper';
    private timeout: any;

    public componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    public render() {
        const { onTimeout: callback, children, show, milliseconds } = this.props;
        if (show) {
            this.timeout = setTimeout(callback, milliseconds);
            return children;
        }
        return <></>;
    }
}
