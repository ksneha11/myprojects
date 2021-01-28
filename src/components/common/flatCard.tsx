import React from 'react';
import { Card } from '.';
import StyledComponent from '../styledComponent';
import { Props as CardProps } from './card';
import defaultStyle, { FlatCardStyleSchema } from './flatCard.style';

export default class FlatCard extends StyledComponent<CardProps> {
    public name = 'FlatCard';
    public style: FlatCardStyleSchema;
    public render() {
        return (
            <Card
                {...this.props}
                style={{
                    ...this.style,
                    ...defaultStyle(),
                }}
            />
        );
    }
}
