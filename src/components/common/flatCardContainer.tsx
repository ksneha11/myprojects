import React from 'react';
import { View } from 'react-native';
import { FlatCard } from '.';
import { IconNames } from '../../styles';
import StyledComponent, { StyleProps } from '../styledComponent';
import { CardStyleSchema } from './card.style';
import defaultStyle, { FlatCardContainerStyleSchema } from './flatCardContainer.style';

export interface FlatCardItems {
    content: Children[];
    icon: IconNames;
    style?: Partial<CardStyleSchema>;
    title: string;
}

export interface Props extends StyleProps {
    cards: FlatCardItems[];
}

const defaultProps: Partial<Props> = {
    cards: [],
};

export default class FlatCardContainer extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public readonly defaultStyle = defaultStyle;
    public readonly name = 'FlatCardContainer';
    public style: FlatCardContainerStyleSchema;

    public render() {
        return (
            <View style={this.style.rootContainer}>
                {this.props.cards.map((item: FlatCardItems) => (
                    <FlatCard
                        key={item.title}
                        content={item.content}
                        leftIconName={item.icon}
                        style={item.style}
                        title={item.title}
                    />
                ))}
            </View>
        );
    }
}
