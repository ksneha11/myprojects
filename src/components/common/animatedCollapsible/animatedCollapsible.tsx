import React from 'react';
import { Animated } from 'react-native';
import AppComponent from '../appComponent';
import { AnimatedCollapsibleSchema } from './animatedCollapsible.style';
import AnimatedCollapsibleView, { defaultProps, Props as ParentProps } from './animatedCollapsible.view';

export interface Props extends Partial<ParentProps> {
    onPressCallback?: noop;
    style?: Partial<AnimatedCollapsibleSchema>;
    title?: string;
}

export interface State {
    animatedHeight: Animated.Value;
    expanded: boolean;
}

export default class AnimatedCollapsible extends AppComponent<Props, State> {
    public static defaultProps = defaultProps;

    constructor(props: Props) {
        super(props);

        this.state = {
            animatedHeight: new Animated.Value(0),
            expanded: false,
        };
    }

    public componentDidUpdate(prevProps, prevState) {
        if (prevState.expanded !== this.state.expanded) {
            this.toggleCollapsibleContent();
        }
    }

    public render() {
        const { iconCollapsed, iconExpanded } = this.props;
        const { expanded } = this.state;
        const iconLeft = expanded ? iconExpanded : iconCollapsed;
        return (
            <>
                <AnimatedCollapsibleView
                    {...this.props}
                    animatedHeight={this.state.animatedHeight}
                    collapsibleComponent={this.props.children}
                    expanded={this.state.expanded}
                    iconLeft={iconLeft}
                    onPress={this.onPress}
                />
            </>
        );
    }

    protected getCollapsedYHeight() {
        return -15;
    }

    protected onPress = () => {
        this.setState(
            previousState => ({ expanded: !previousState.expanded }),
            () => this.props.onPressCallback && this.props.onPressCallback()
        );
    };

    protected toggleCollapsibleContent() {
        const initialValue = this.state.expanded ? this.getCollapsedYHeight() : 0;
        const finalValue = this.state.expanded ? 0 : this.getCollapsedYHeight();
        this.state.animatedHeight.setValue(initialValue);
        Animated.spring(this.state.animatedHeight, {
            toValue: finalValue,
            useNativeDriver: true,
        }).start();
    }
}
