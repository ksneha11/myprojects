import React from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { MenuItem, P } from '../.';
import { HorizontalRule } from '../..';
import { Pressable } from '../../../models';
import { IconNames } from '../../../styles';
import StyledComponent, { StyleProps } from '../../styledComponent';
import defaultStyle, { MenuPagesStyleSchema } from './menuPages.style';

export interface Props extends StyleProps {
    children: (parent: MenuPagesView) => React.ReactNode;
    hasFullLineDivider?: boolean;
    menuItems: Pressable[];
    onMenuItemPress: (action: string, param?: {}) => void;
    style: Partial<MenuPagesStyleSchema>;
    title: string;
}

export const defaultProps: Partial<Props> = {
    hasFullLineDivider: true,
};

export default class MenuPagesView extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'MenuPages';
    public style: Partial<MenuPagesStyleSchema>;

    public Container = ({ children }) => {
        return (
            <ScrollView contentContainerStyle={this.style.rootContainer} showsVerticalScrollIndicator={false}>
                {children}
            </ScrollView>
        );
    };

    public HeaderText = ({ headerText }): JSX.Element => {
        return (
            <View style={this.style.pageTextContainer}>
                <P>{headerText}</P>
            </View>
        );
    };

    public HorizontalDivider = () => {
        return (
            <HorizontalRule
                style={{
                    horizontalRule: {
                        ...this.style.horizontalRule,
                        ...(!this.props.hasFullLineDivider && this.style.horizontalRuleWithPadding),
                    },
                }}
            />
        );
    };

    public Menu = ({
        hasFooter = true,
        hasHeader = true,
        menuItems,
    }: {
        hasFooter?: boolean;
        hasHeader?: boolean;
        menuItems: Pressable[];
    }): JSX.Element => {
        return (
            <FlatList
                data={menuItems}
                renderItem={this.provideComponent}
                keyExtractor={(item: Pressable) => (item.key as string) || (item.text as string)}
                ItemSeparatorComponent={this.HorizontalDivider}
                ListHeaderComponent={hasHeader && this.HorizontalDivider}
                ListFooterComponent={hasFooter && this.HorizontalDivider}
            />
        );
    };

    public provideComponent = ({ item }: { item: Pressable }): JSX.Element => (
        <MenuItem
            onPress={() => this.props.onMenuItemPress(item.action, item.param)}
            iconLeft={item.iconLeft}
            iconRight={item.iconRight === undefined ? IconNames.LIST_ITEM_NAVIGATE_ICON : item.iconRight}
            style={{
                textContainer: this.style.textContainer,
                title: this.style.menuItemText,
                titleContainer: this.style.menuItemContainer,
            }}
            subtext={item.subtext as string}
            title={item.text as string}
        />
    );

    public render() {
        return <this.Container>{this.props.children(this)}</this.Container>;
    }
}
