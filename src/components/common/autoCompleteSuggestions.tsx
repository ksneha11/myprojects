import React from 'react';
import { FlatList, Platform, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import StyledComponent, { StyleProps } from '../styledComponent';
import defaultStyle, { AutoCompleteSuggestionsStyleSchema } from './autoCompleteSuggestions.style';

export interface AutoCompleteData {
    data: any;
    display: string;
}

interface Props extends StyleProps {
    isFullScreen?: boolean;
    isVisible: boolean;
    items: AutoCompleteData[];
    onPressItem: (item: AutoCompleteData) => void;
    style?: Partial<AutoCompleteSuggestionsStyleSchema>;
}

const defaultProps: Partial<Props> = {
    isFullScreen: false,
    isVisible: false,
};

export default class AutoCompleteSuggestions extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'AutoCompleteSuggestions';
    public style: AutoCompleteSuggestionsStyleSchema;

    public AutoCompleteFlatList = () => {
        const iOSStyle = this.props.isFullScreen ? this.style.iosFullScreenContainer : this.style.iosContainer;

        return (
            <>
                <View
                    style={[
                        Platform.OS === 'ios' ? iOSStyle : this.style.androidContainer,
                        this.isVisible() ? {} : this.style.rootContainerHidden,
                    ]}
                >
                    <FlatList
                        data={this.props.items}
                        renderItem={({ item }) => this.renderRow(item)}
                        keyExtractor={(_, index) => index.toString()}
                        style={this.style.dropDownList}
                        keyboardDismissMode="on-drag"
                    />
                </View>
            </>
        );
    };

    public AutoCompleteFullPageContainer = () => {
        return (
            <View style={[this.style.rootContainer, this.isVisible() ? {} : this.style.rootContainerHidden]}>
                <this.AutoCompleteFlatList />
            </View>
        );
    };

    public isVisible = () => {
        return this.props.isVisible && this.props.items.length > 0;
    };

    public render() {
        if (this.props.isFullScreen) {
            return <this.AutoCompleteFullPageContainer />;
        }
        return <this.AutoCompleteFlatList />;
    }

    public renderRow = (item: AutoCompleteData) => {
        return (
            <TouchableOpacity
                accessibilityRole="button"
                onPress={() => this.props.onPressItem(item)}
                style={this.style.itemContainer}
            >
                <Text style={this.style.itemText}>{item.display}</Text>
            </TouchableOpacity>
        );
    };
}
