import React from 'react';
import { View } from 'react-native';
import { IconNames } from '../../styles';
import { P, PopupButton } from '.';
import StyledComponent, { StyleProps } from '../styledComponent';
import defaultStyle, { ErrorBannerStyleSchema } from './errorBanner.style';

interface Props extends StyleProps {
    children: (component: ErrorBanner) => Children;
    icon: IconNames;
    isBannerVisible: boolean;
    primaryAction: () => void;
    secondaryAction: () => void;
}

interface State {
    isVisible: boolean;
}

const defaultProps: Partial<Props> = {
    children: ({ ActionContainer, BannerIcon, ContentContainer, ErrorText, PrimaryButton, SecondaryButton }) => (
        <>
            <ContentContainer>
                <BannerIcon />
                <ErrorText />
            </ContentContainer>
            <ActionContainer>
                <SecondaryButton />
                <PrimaryButton />
            </ActionContainer>
        </>
    ),
    icon: IconNames.ALERT_WARNING_ICON,
    isBannerVisible: false,
    primaryAction: () => {},
    secondaryAction: () => {},
};

export default class ErrorBanner extends StyledComponent<Props, State> {
    public static defaultProps: Partial<Props> = defaultProps;
    public readonly defaultStyle = defaultStyle;
    public readonly name: string = 'ErrorBanner';
    public readonly style: ErrorBannerStyleSchema;

    constructor(props) {
        super(props);
        this.state = {
            isVisible: props.isBannerVisible,
        };
    }

    public ActionContainer = ({ children }: { children: Children }): JSX.Element => {
        return <View style={this.style.actionContainer}>{children}</View>;
    };

    public BannerIcon = (): JSX.Element => {
        return <View style={this.style.iconWrapper}>{this.getIcon(this.props.icon, { style: this.style.icon })}</View>;
    };

    public ContentContainer = ({ children }: { children: Children }): JSX.Element => {
        return <View style={this.style.contentContainer}>{children}</View>;
    };

    public ErrorText = (): JSX.Element => {
        return <P style={{ paragraph: this.style.errorText }}>{this.labels.errorBanner.defaultText}</P>;
    };

    public MainContainer = ({ children }: { children: Children }): JSX.Element => {
        return (
            <View style={[this.style.mainContainer, !this.state.isVisible && this.style.isNotVisible]}>{children}</View>
        );
    };

    public PrimaryButton = () => {
        return (
            <PopupButton
                buttonLabel={this.labels.errorBanner.primaryButton}
                onPress={() => this.buttonAction(this.props.primaryAction)}
            />
        );
    };

    public render() {
        return <this.MainContainer>{this.props.children(this)}</this.MainContainer>;
    }

    public SecondaryButton = () => {
        return (
            <PopupButton
                buttonLabel={this.labels.errorBanner.secondaryButton}
                onPress={() => this.buttonAction(this.props.secondaryAction)}
                style={{ buttonLabel: this.style.secondaryButton }}
            />
        );
    };

    private buttonAction = callback => {
        callback();
        this.setState(prevState => ({
            isVisible: !prevState.isVisible,
        }));
    };
}
