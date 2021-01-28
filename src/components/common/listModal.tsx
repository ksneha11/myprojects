import React from 'react';
import { Modal, ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { TextLink } from '.';
import { IconNames } from '../../styles';
import { setAccessibilityFocus } from '../../utils';
import StyledComponent, { StyleProps } from '../styledComponent';
import Icon from './icon';
import defaultStyle, { ListModalStyleSchema } from './listModal.style';

export interface ListModalItem {
    children?: ListModalItem[];
    description?: string;
    label: string;
    labelFooter?: string;
    onPress?: noop;
    rightIcon?: IconNames;
    textMiddle?: string;
    value?: string;
}

export interface Props extends StyleProps {
    children: (parent: ListModal) => React.ReactNode;
    footerText: (currentItem: ListModalItem) => string;
    headerLeftText: (currentItem: ListModalItem) => string;
    headerMiddleText: (currentItem: ListModalItem) => string;
    headerRightText: (currentItem: ListModalItem) => string;
    initialItem: ListModalItem;
    isVisible?: boolean;
    onClose: noop;
    onPressFooter?: (currentItem: ListModalItem) => void;
    onPressHeaderLeft?: (currentItem: ListModalItem) => void;
    style?: Partial<ListModalStyleSchema>;
}
export const defaultProps = {
    children: ({ Header, Items, Footer }) => {
        return (
            <>
                <Header />
                <Items />
                <Footer />
            </>
        );
    },
    footerText: (currentItem: ListModalItem) => currentItem.labelFooter,
    headerLeftText: () => '',
    headerMiddleText: (currentItem: ListModalItem) => currentItem.label,
    headerRightText: () => 'Done',
    isVisible: false,
};

export interface State {
    currentPosition: string[];
}

export default class ListModal extends StyledComponent<Props, State> {
    private get canGoBack() {
        return this.state.currentPosition.length > 0;
    }
    private get currentItem(): ListModalItem {
        let currentItem = this.props.initialItem;
        this.state.currentPosition.forEach(title => {
            currentItem = currentItem.children.find(item => item.label === title);
        });
        return currentItem;
    }
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'ListModal';
    public style: ListModalStyleSchema;
    protected backButtonRef;

    constructor(props: Props) {
        super(props);
        this.state = { currentPosition: [] };
    }

    public componentDidUpdate(prevProps: Props, prevState: State) {
        if (prevState.currentPosition !== this.state.currentPosition && this.canGoBack && this.backButtonRef) {
            setAccessibilityFocus(this.backButtonRef);
        }
    }

    public Footer = () => {
        const currentItem = this.currentItem;
        const style = this.style;
        return (
            <SafeAreaView style={style.footerSafeAreaViewContainer} forceInset={{ top: 'never' }}>
                <View accessible style={style.footer}>
                    {this.props.footerText && (
                        <TouchableWithoutFeedback
                            accessibilityRole="button"
                            onPress={() => this.props.onPressFooter(currentItem)}
                        >
                            <Text style={style.footerText}>{this.props.footerText(currentItem)}</Text>
                        </TouchableWithoutFeedback>
                    )}
                </View>
            </SafeAreaView>
        );
    };

    public Header = () => {
        const currentItem = this.currentItem;
        const style = this.style;
        return (
            // Without this clicking the header closes the modal
            <TouchableWithoutFeedback accessible={false}>
                <View accessible style={style.header}>
                    <View accessible={false} style={style.headerLeft}>
                        {this.canGoBack ? (
                            <Icon
                                name={IconNames.APP_GO_BACK_NAVIGATE_ICON}
                                onPress={() => this.onPressBack()}
                                accessibilityLabel={this.labels.sorters.accessibilityBackLabel}
                                accessibilityRole="button"
                                ref={component => {
                                    this.backButtonRef = component;
                                }}
                            />
                        ) : (
                            <TextLink
                                onPress={() => this.props.onPressHeaderLeft(currentItem)}
                                style={{ textLink: style.headerLeftRightText }}
                            >
                                {this.props.headerLeftText(currentItem)}
                            </TextLink>
                        )}
                    </View>
                    <View accessible={false} style={style.headerCenter}>
                        <Text
                            accessible
                            accessibilityRole="header"
                            accessibilityLabel={this.currentItem.label}
                            style={style.headerCenterText}
                        >
                            {this.props.headerMiddleText(currentItem)}
                        </Text>
                    </View>
                    <View style={style.headerRight}>
                        <TextLink accessible style={{ textLink: style.headerLeftRightText }} onPress={this.onPressDone}>
                            {this.props.headerRightText(currentItem)}
                        </TextLink>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    };

    public Items = () => {
        const currentItem = this.currentItem;
        const style = this.style;
        return (
            <ScrollView style={style.items}>
                {(currentItem.children || []).map((item, index) => {
                    const itemDescription = item.description ? item.description : '';
                    return (
                        <TouchableWithoutFeedback
                            accessibilityLabel={
                                item.label +
                                ', ' +
                                itemDescription +
                                ', ' +
                                (item.rightIcon ? 'selected' : 'unselected')
                            }
                            accessibilityRole="button"
                            key={index}
                            onPress={() => this.onPressItem(item)}
                        >
                            <View style={style.itemContainer}>
                                <View style={style.itemTitleContainer}>
                                    <Text style={style.itemTitleText}>{item.label}</Text>
                                    {item.description && <Text style={style.itemDescription}>{item.description}</Text>}
                                </View>
                                {!!item.textMiddle && (
                                    <View style={style.itemMiddleContainer}>
                                        <Text style={style.itemMiddleText} numberOfLines={1}>
                                            {item.textMiddle}
                                        </Text>
                                    </View>
                                )}
                                <View style={style.itemSelectorIconContainer}>
                                    {item.rightIcon &&
                                        this.context.appContext.getIcon(item.rightIcon, {
                                            accessibilityHint: 'Opens additional items',
                                            accessibilityLabel: 'More Items Menu',
                                            style: this.style.itemSelectorIcon,
                                        })}
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    );
                })}
            </ScrollView>
        );
    };

    public render() {
        const style = this.style;
        return (
            <Modal transparent visible={this.props.isVisible}>
                <TouchableWithoutFeedback
                    accessible={false}
                    onPress={() => {
                        this.setState({ currentPosition: [] });
                        this.props.onClose();
                    }}
                >
                    <View style={style.rootContainer}>
                        <TouchableWithoutFeedback accessible={false}>
                            <View style={style.contentContainer}>{this.props.children(this)}</View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }

    private onPressBack = () => {
        const keys = this.state.currentPosition;
        this.setState({ currentPosition: keys.splice(0, keys.length - 1) });
    };

    private onPressDone = () => {
        if (this.canGoBack) {
            this.onPressBack();
        } else {
            this.props.onClose();
        }
    };

    private onPressItem = (item: ListModalItem) => {
        if (Array.isArray(item.children)) {
            this.setState(prevState => ({
                currentPosition: [...prevState.currentPosition, item.label],
            }));
            return;
        }
        item.onPress();
    };
}
