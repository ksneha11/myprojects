import debounce from 'lodash.debounce';
import React from 'react';
import { Platform, TextInput, TextInputProps, TouchableHighlight, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TextLink } from '.';
import { IconNames } from '../../styles';
import StyledComponent, { StyleProps } from '../styledComponent';
import AutoCompleteSuggestions, { AutoCompleteData } from './autoCompleteSuggestions';
import defaultStyle, { SearchBarStyleSchema } from './searchBar.style';

export interface Props extends StyleProps {
    hasCancelButton?: boolean;
    isAutoCompleteFullScreen?: boolean;
    leftIcon?: React.ReactNode;
    onBlur?: noop;
    onChangeText: (text: string) => void;
    onFocus: noop;
    onPressCancel?: noop;
    onPressPredictedSearchResult?: (searchText: AutoCompleteData) => void;
    onPressRightIcon?: noop;
    onSubmitEditing?: noop;
    predictedSearchResults: AutoCompleteData[];
    showPredictedSearchResults?: boolean;
    style?: Partial<SearchBarStyleSchema>;
    textInputValue: string;
    textPlaceholder: string;
}

const defaultProps = {
    hasCancelButton: false,
    isAutoCompleteFullScreen: false,
    onFocus: () => {},
    onPressCancel: () => {},
    onPressRightIcon: () => {},
    predictedSearchResults: [],
};

interface State {
    isFocused: boolean;
    showPredictedSearchResults: boolean;
    textInputValue: string;
}

const SEARCH_BAR_DEBOUNCE_TIME = 400;

export default class SearchBar<P extends Props = Props> extends StyledComponent<P, State> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'SearchBar';
    public style: SearchBarStyleSchema;
    protected textBoxRef: TextInput;

    constructor(props: P) {
        super(props);
        this.state = {
            isFocused: false,
            showPredictedSearchResults: false,
            textInputValue: props.textInputValue || '',
        };
        // this API is wack
        // should just be able to say _.debounce(() => onChange, 500)), but... that does not work
        this.searchDebounce = debounce(this.searchDebounce, SEARCH_BAR_DEBOUNCE_TIME);
    }

    public AndroidTextBox = () => {
        // Required for talk-back to be able to read form fields
        return (
            <TouchableHighlight
                accessibilityRole="search"
                activeOpacity={1}
                onPress={() => {
                    // focus input child on focus of touchable parent
                    this.textBoxRef && this.textBoxRef.focus();
                }}
                style={[this.style.androidSearchField, { paddingLeft: this.props.leftIcon ? 32 : 16 }]}
                underlayColor={this.appContext.colorSchema.pages.backgroundColor}
            >
                <this.TextBox importantForAccessibility="no" />
            </TouchableHighlight>
        );
    };

    public CancelButton = () => {
        return (
            <>
                {this.props.hasCancelButton && (
                    <TouchableOpacity accessibilityRole="button" onPress={this.onCancel}>
                        <TextLink alternateColor isUnderlined style={{ textLink: this.style.searchCancelButton }}>
                            {this.labels.searchBar.cancelButtonText}
                        </TextLink>
                    </TouchableOpacity>
                )}
            </>
        );
    };

    public componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>) {
        // if the calling component passes in a new prop value, we want to update our state with that
        if (prevProps.textInputValue !== this.props.textInputValue) {
            this.setState({ textInputValue: this.props.textInputValue });
        }
    }

    public DropDown = () => {
        return (
            <AutoCompleteSuggestions
                isFullScreen={this.props.isAutoCompleteFullScreen}
                isVisible={this.props.showPredictedSearchResults || this.state.showPredictedSearchResults}
                items={this.props.predictedSearchResults}
                onPressItem={this.onPressPredictedSearchResult}
            />
        );
    };

    public LeftIcon = () => {
        return <>{this.props.leftIcon && <View style={this.style.leftIconPosition}>{this.props.leftIcon}</View>}</>;
    };

    public onBlur = () => {
        if (this.props.onBlur) {
            this.props.onBlur();
        }
        if (this.props.hasCancelButton) {
            if (this.props.predictedSearchResults.length === 0 || !this.props.showPredictedSearchResults) {
                this.onCancel();
            }
        }
    };

    public onCancel = () => {
        this.setState({ showPredictedSearchResults: false });
        this.props.onPressCancel();
    };

    public onFocus = () => {
        this.setState({ isFocused: true, showPredictedSearchResults: true });
        this.props.onFocus();
    };

    public onPressPredictedSearchResult = (item: AutoCompleteData) => {
        this.setState({ showPredictedSearchResults: false });
        this.props.onPressPredictedSearchResult(item);
    };

    public render() {
        return (
            <View style={this.props.isAutoCompleteFullScreen ? this.style.fullScreenContainer : {}}>
                <View style={this.style.rootContainer}>
                    <View style={this.style.inputContainer}>
                        <this.LeftIcon />
                        {Platform.OS === 'android' ? <this.AndroidTextBox /> : <this.TextBox />}
                        <this.RightIcon />
                    </View>
                    <this.CancelButton />
                </View>
                <this.DropDown />
            </View>
        );
    }

    public RightIcon = () => {
        const { onChangeText, textInputValue } = this.props;

        let iconProps = {
            accessibilityLabel: this.labels.searchBar.clearField,
            buttonStyle: this.style.clearInputIconButton,
            icon: this.context.appContext.getIcon(IconNames.INPUT_DISMISS_ICON, {
                style: this.style.clearInputIcon,
            }),
            onPress: () => {
                this.setState({ textInputValue: '' });
                onChangeText('');
                this.props.onPressRightIcon();
            },
        };

        if (this.state.textInputValue?.length === 0) {
            iconProps = {
                accessibilityLabel: this.labels.searchBar.search,
                buttonStyle: this.style.searchIconButton,
                icon: this.context.appContext.getIcon(IconNames.INPUT_SEARCH_ICON, {
                    style: this.style.searchIcon,
                }),
                onPress: () => {},
            };
        }

        return (
            <View style={this.style.rightIconContainer}>
                <TouchableOpacity
                    accessibilityLabel={iconProps.accessibilityLabel}
                    accessibilityRole="button"
                    onPress={iconProps.onPress}
                    style={{ ...this.style.rightIconButton, ...iconProps.buttonStyle }}
                >
                    {iconProps.icon}
                </TouchableOpacity>
            </View>
        );
    };

    /*
     * TODO:
     * this was NOT setup quite right
     * it used to pull all its text input value only from props, so the component was never properly encapsulated
     * it basically made it so that the caller of the search bar had to be the search bar's smart component
     */
    public TextBox = (props?: TextInputProps) => {
        const { leftIcon, onSubmitEditing, textInputValue, textPlaceholder } = this.props;
        const conditionalOnSubmitEditing = textInputValue ? onSubmitEditing : () => {};

        return (
            <TextInput
                accessibilityRole="search"
                autoFocus={this.state.isFocused}
                onChangeText={(text: string) => {
                    this.setState({
                        textInputValue: text,
                    });
                    this.searchDebounce(text);
                }}
                onSubmitEditing={conditionalOnSubmitEditing}
                placeholder={textPlaceholder}
                ref={ref => (this.textBoxRef = ref)}
                returnKeyType="search"
                style={[this.style.searchField, { paddingLeft: leftIcon ? 32 : 16 }]}
                value={this.state.textInputValue}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                {...props}
            />
        );
    };

    protected searchDebounce = (text: string) => {
        this.props.onChangeText(text);
    };
}
