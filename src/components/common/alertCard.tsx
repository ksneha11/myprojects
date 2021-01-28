import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Card } from '..';
import { ImageNames } from '../../styles';
import StyledComponent, { StyleProps } from '../styledComponent';
import defaultStyle, { AlertCardStyleSchema } from './alertCard.style';

interface Props extends StyleProps {
    alertImage?: ImageNames;
    content: string[];
    onCardPressLabel?: string;
    onPressCard?: noop;
    style?: Partial<AlertCardStyleSchema>;
    title?: string;
}

const defaultProps = {
    alertImage: ImageNames.RENEW_ID_CARD_ICON,
};

export default class AlertCard extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'AlertCard';
    public style: AlertCardStyleSchema;

    public render() {
        return (
            <Card content={this.props.content} leftImageName={this.props.alertImage} title={this.props.title}>
                {({ CardText, LeftContent, props, MainContent, style: cardStyle }: Card) => {
                    // Shadow doesn't work properly with a background color set, had to overwrite children
                    return (
                        <View style={this.style.cardShadows}>
                            <TouchableOpacity
                                accessibilityRole={this.props.onPressCard ? 'button' : null}
                                accessibilityLabel={this.props.onCardPressLabel}
                                disabled={!this.props.onPressCard}
                                onPress={this.props.onPressCard}
                                style={cardStyle.rootContainer}
                            >
                                <View style={this.style.card}>
                                    <MainContent>
                                        <LeftContent />
                                        <CardText content={props.content} title={props.title} />
                                    </MainContent>
                                </View>
                            </TouchableOpacity>
                        </View>
                    );
                }}
            </Card>
        );
    }
}
