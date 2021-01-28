import React from 'react';
import { ImageProps, ImageStyle } from 'react-native';
import { ImageNames } from '../../styles';
import AppComponent from './appComponent';

interface Props extends Partial<ImageProps> {
    name: ImageNames;
}

const defaultProps = {
    style: {},
};

export default class Image extends AppComponent<Props> {
    public static defaultProps = defaultProps;
    public name = 'Image';

    public render() {
        return this.getImage(this.props.name, this.props);
    }
}
