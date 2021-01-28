import React from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { Image } from '..';
import { P } from '../..';
import { ImageNames } from '../../../styles';
import StyledComponent, { StyleProps } from '../../styledComponent';
import AppStatusBar from '../statusBar';
import { BrandedHeaderStyleSchema, defaultStyle } from './index';

export interface Props extends StyleProps {
    children?: (parent: BrandedHeaderView) => React.ReactNode;
    onPressProfileIcon: noop;
    style?: Partial<BrandedHeaderStyleSchema>;
}

export const defaultProps = {
    children: (context: BrandedHeaderView) => {
        const { appContext, BrandImage, name, ProfileIcon, StatusBar, style } = context;
        const Override = appContext.getComponentOverride(name);
        if (Override) {
            return <Override context={context} />;
        }
        return (
            <>
                <StatusBar />
                <View accessible={false} style={style.contentContainer}>
                    <BrandImage />
                    <ProfileIcon />
                </View>
            </>
        );
    },
};

export default class BrandedHeaderView extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'BrandedHeader';
    public style: BrandedHeaderStyleSchema;

    public BrandImage = () => {
        return <Image style={this.style.brandedImage} name={ImageNames.BRAND_HEADER} />;
    };

    public Container = ({ children }: { children: Children }) => {
        return <SafeAreaView style={this.style.rootContainer}>{children}</SafeAreaView>;
    };

    public ProfileIcon = ({ firstName = this.appState.memberContext.memberInfo.firstName }: { firstName?: string }) => {
        return (
            <TouchableOpacity
                accessibilityLabel={this.labels.brandedHeader.profileIcon.accessibilityLabel}
                accessibilityRole="button"
                onPress={this.props.onPressProfileIcon}
                style={this.style.profileIcon}
            >
                {/* TODO: P shouldn't have an onPress at all, need to set it to null here so it doesn't catch the press */}
                <P onPress={null} style={{ paragraph: this.style.profileIconText }}>
                    {firstName && firstName.substring(0, 1)}
                </P>
            </TouchableOpacity>
        );
    };

    public render() {
        return <this.Container>{this.props.children(this)}</this.Container>;
    }

    public StatusBar = () => {
        return <AppStatusBar lightBackground />;
    };
}
