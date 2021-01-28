import React from 'react';
import { View } from 'react-native';
import StyledComponent from './styledComponent';

export default class extends StyledComponent {
    constructor(props: any) {
        super(props);
    }

    public render = () => {
        return <View style={{ flex: 1 }} />;
    };
}
