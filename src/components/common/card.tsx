import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-elements';
import { Image } from '.';
import { InlineAlert } from '../';
import { IconNames, ImageNames } from '../../styles';
import StyledComponent, { StyleProps } from '../styledComponent';
import defaultStyle, { CardStyleSchema } from './card.style';
import Icon from './icon';

export enum EllipsizeMode {
    HEAD = 'head',
    MIDDLE = 'middle',
    TAIL = 'tail',
    CLIP = 'clip',
}

export interface Props extends StyleProps {
    action?: string;
    actionText?: string;
    alertMessage?: string;
    alertType?: 'warning' | 'info';
    children?: <C extends Card>(parent: C, style: CardStyleSchema) => React.ReactNode;
    content?: Children[];
    ellipsizeCount?: number;
    ellipsizeMode?: EllipsizeMode;
    footerAccessibilityHint?: string;
    footerAccessibilityLabel?: string;
    footerIconName?: IconNames;
    footerText?: string;
    isSelected?: boolean;
    leftIconName?: IconNames;
    leftImageName?: ImageNames;
    lowerRightIconName?: string;
    onActionPress?: noop;
    onCardPress?: noop;
    onCardPressLabel?: string;
    rightIconName?: IconNames;
    style?: Partial<CardStyleSchema>;
    title?: string;
}

export const defaultProps = {
    children: ({
        CardAction,
        CardText,
        Footer,
        LeftContent,
        MainContent,
        props: { alertMessage, alertType, content, footerIconName, footerText, onCardPress, onCardPressLabel, title },
        RightContent,
        style,
    }) => {
        let borderStyle;
        if (alertType === 'info') {
            borderStyle = style.infoStyle;
        } else if (alertType === 'warning') {
            borderStyle = style.warningStyle;
        }

        return (
            <>
                <TouchableOpacity
                    accessible={!!onCardPress}
                    accessibilityRole={onCardPress ? 'button' : 'none'}
                    accessibilityLabel={onCardPressLabel}
                    disabled={!onCardPress}
                    onPress={onCardPress}
                    style={{ ...style.rootContainer, ...borderStyle }}
                >
                    <MainContent>
                        <LeftContent />
                        <CardText content={content} title={title} />
                        <RightContent />
                    </MainContent>
                    <Footer>
                        <CardAction actionText={footerText} />
                        <Icon name={footerIconName} style={{ rootItem: style.iconStyle }} />
                    </Footer>
                </TouchableOpacity>
                {!!alertMessage && (
                    <InlineAlert alertType={alertType} style={{ container: style.alertContainer }}>
                        {alertMessage}
                    </InlineAlert>
                )}
            </>
        );
    },
    ellipsizeCount: 1,
    ellipsizeMode: null,
    isSelected: false,
};

export default class Card extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'Card';
    public style: CardStyleSchema;

    public CardAction = ({ actionText }: { actionText?: string }): JSX.Element => {
        return (
            <View style={this.style.actionContainer}>
                <Text style={this.style.actionText}>{actionText && actionText}</Text>
            </View>
        );
    };

    public CardText = ({ content, title }: { content?: Children[]; title?: string }): JSX.Element => {
        const ellipsizeProps: { ellipsizeMode?: any; numberOfLines?: number } = {};
        if (this.props.ellipsizeMode) {
            ellipsizeProps.ellipsizeMode = this.props.ellipsizeMode;
            ellipsizeProps.numberOfLines = this.props.ellipsizeCount;
        }
        return (
            <View accessible style={this.style.textContainer}>
                {title && (
                    <Text style={this.style.title} {...ellipsizeProps}>
                        {title}
                    </Text>
                )}
                {content &&
                    content.map((text, index) => (
                        <Text key={index} style={this.style.text} {...ellipsizeProps}>
                            {text}
                        </Text>
                    ))}
            </View>
        );
    };

    public Container = ({ children }): JSX.Element => {
        return <View>{children}</View>;
    };

    public Footer = ({ children }): JSX.Element => {
        const { onActionPress } = this.props;
        return (
            <>
                {(this.props.footerIconName || this.props.footerText) && (
                    <TouchableOpacity
                        accessible
                        accessibilityHint={this.props.footerAccessibilityHint}
                        accessibilityLabel={
                            this.props.footerAccessibilityLabel
                                ? this.props.footerAccessibilityLabel
                                : `${this.props.footerText} ${this.props.title}`
                        }
                        accessibilityRole="button"
                        onPress={() => onActionPress && onActionPress()}
                        style={this.style.footerContainer}
                    >
                        {children}
                    </TouchableOpacity>
                )}
            </>
        );
    };

    public LeftContent = (): JSX.Element => {
        if (this.props.leftImageName) {
            return <Image name={this.props.leftImageName} style={this.style.leftImage} />;
        }
        return <Icon name={this.props.leftIconName} style={{ rootItem: this.style.leftIcon }} />;
    };

    public MainContent = ({ children }) => {
        return <View style={this.style.contentContainer}>{children}</View>;
    };

    public render = () => {
        return <this.Container>{this.props.children(this, this.style)}</this.Container>;
    };

    public RightContent = () => {
        return (
            <>{this.props.rightIconName && this.getIcon(this.props.rightIconName, { style: this.style.rightIcon })}</>
        );
    };
}
