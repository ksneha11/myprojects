import React from 'react';
import { SafeAreaView, View } from 'react-native';
import serviceConfig from '../../../generated/serviceConfig.json';
import { Labels } from '../../context/abstractAppContext';
import { Features, Pressable } from '../../models';
import AppComponent from '../common/appComponent';
import GradientHeader from '../common/gradientHeader';
import { MenuPages, MenuSectionHeader } from '../common/menuPages';
import { StyleProps } from '../styledComponent';
import defaultStyle, { MoreMenuStyleSchema } from './moreMenu.style';

export interface MenuSection {
    items: Pressable[];
    title: string;
}

interface Props extends StyleProps {
    children: (parent: MoreMenu) => React.ReactNode;
    menuItems: (features: Features, label: Labels) => MenuSection[];
    showTitle?: boolean;
    style?: Partial<MoreMenuStyleSchema>;
    title: string;
}

const defaultProps = {
    children: ({ AppVersion, features, labels, PageTitle, props }: MoreMenu) => {
        return (
            <>
                {props.showTitle && <PageTitle />}
                <MenuPages>
                    {({ Menu }) => {
                        return (
                            <>
                                {props.menuItems(features, labels).map(menuItem => {
                                    return (
                                        <View key={menuItem.title}>
                                            <MenuSectionHeader text={menuItem.title} />
                                            <Menu hasHeader={false} menuItems={menuItem.items} />
                                        </View>
                                    );
                                })}
                                <AppVersion />
                            </>
                        );
                    }}
                </MenuPages>
            </>
        );
    },
    menuItems: (features, label): MenuSection[] => [],
    showTitle: true,
};

export default class MoreMenu extends AppComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'MoreMenu';
    public style: MoreMenuStyleSchema;

    public AppVersion = () => {
        // .uver doesnt work
        // tslint:disable-next-line: no-string-literal
        const versionNumber = serviceConfig['uver'] || serviceConfig.headers['X-MADT-AppVersion'];

        return (
            <MenuSectionHeader
                // Although this uses the styling of a header, in this case it is not a header
                accessibilityRole={null}
                style={{
                    sectionHeader: this.style.appVersionText,
                    sectionHeaderContainer: this.style.appVersionContainer,
                }}
                text={`${this.labels.moreMenuCold.appVersion} ${versionNumber}`}
            />
        );
    };

    public Container = ({ children }) => {
        return <SafeAreaView style={this.style.rootContainer}>{children}</SafeAreaView>;
    };

    public PageTitle = () => {
        return <GradientHeader title={this.props.title} />;
    };

    public render() {
        return <this.Container>{this.props.children(this)}</this.Container>;
    }
}
