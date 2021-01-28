import React from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-navigation';
import { IconNames } from '../../styles';
import { setAccessibilityFocus } from '../../utils';
import StyledComponent, { StyleProps } from '../styledComponent';
import { PageHeader } from './';
import defaultStyle, { HeaderStyleSchema } from './smallHeader.style';

export interface Props extends StyleProps {
    backButtonVisible: boolean;
    children?: (parent: SmallHeader) => React.ReactNode;
    onPressBackButton: noop;
    style?: Partial<HeaderStyleSchema>;
    title: string;
}

const defaultProps = {
    backButtonVisible: true,
    children: ({ HeaderContainer, Header }: SmallHeader) => {
        return (
            <>
                <HeaderContainer>
                    <Header />
                </HeaderContainer>
            </>
        );
    },
};

export default class SmallHeader extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'SmallHeader';
    public smallHeaderFocus: any;
    public style: HeaderStyleSchema;
    protected hasRecievedFocus: boolean = false;
    /*
     * In order to render back button here, headerBackTitleVisible must be set to true
     * from the options param in the navigator
     */
    public Header = () => {
        const BackIcon = this.getIcon(IconNames.APP_SUB_NAVIGATE_BACKWARD_ICON, {
            accessibilityHint: 'Navigates to the previous screen',
            accessibilityLabel: 'Go Back',
            accessibilityRole: 'button',
            onPress: this.props.onPressBackButton,
            style: this.style.backIcon,
        });

        return (
            <LinearGradient
                colors={[this.style.gradientColors.borderTopColor, this.style.gradientColors.borderBottomColor]}
                locations={[0.2, 0.8]}
            >
                <View collapsable={false} ref={ref => (this.smallHeaderFocus = ref)} style={this.style.headerContent}>
                    {this.props.backButtonVisible && BackIcon}
                    <this.Title />
                </View>
            </LinearGradient>
        );
    };

    public HeaderContainer = ({ children }): JSX.Element => {
        return <View style={this.style.headerContainer}>{children}</View>;
    };

    public render() {
        this.accessibilityHeaderFocus();
        return (
            <SafeAreaView
                // @ts-ignore The typing is wrong
                accessibilityActions={[{ name: 'escape', label: 'escape' }]}
                onAccessibilityAction={() => {
                    this.props.onPressBackButton();
                }}
                style={this.style.headerSafeAreaContainer}
                forceInset={{ bottom: 'never' }}
            >
                {this.props.children(this)}
            </SafeAreaView>
        );
    }

    public Title = (): JSX.Element => {
        return <PageHeader style={{ pageHeader: { backgroundColor: null } }} title={this.props.title} />;
    };

    protected accessibilityHeaderFocus = () => {
        if (this.smallHeaderFocus && !this.hasRecievedFocus) {
            setAccessibilityFocus(this.smallHeaderFocus);
            this.hasRecievedFocus = true;
        }
    };
}
