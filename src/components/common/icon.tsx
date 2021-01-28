import React from 'react';
import { IconNames } from '../../styles';
import StyledComponent, { StyleProps } from '../styledComponent';
import defaultStyle, { IconStyleSchema } from './icon.style';

interface Props extends StyleProps {
    accessibilityLabel?: string;
    [key: string]: any;
    name: IconNames;
    style?: Partial<IconStyleSchema>;
}

const defaultProps: Partial<Props> = {
    style: {
        rootItem: {},
    },
};

export default class Icon extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'Icon';
    public style: IconStyleSchema;

    public render() {
        const { name } = this.props;
        const iconProps = { ...this.props, style: this.props.style.rootItem || this.style.rootItem };
        return <>{name && this.getIcon(name, iconProps)}</>;
    }
}
