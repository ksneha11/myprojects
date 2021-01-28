import React from 'react';
import {
    Animated,
    Dimensions,
    PanResponder,
    PanResponderInstance,
    ScrollView,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { Overlay } from 'react-native-elements';
import { EdgeInsets, SafeAreaConsumer } from 'react-native-safe-area-context';
import { HorizontalRule } from '../';
import { setAccessibilityFocus } from '../../utils';
import { InputWrapper } from '../common';
import StyledComponent, { StyleProps } from '../styledComponent';
import defaultStyle, { BottomDrawerStyle } from './bottomDrawer.style';

export interface Props extends StyleProps {
    additionalSafeAreaBottomOffset?: number;
    children: ((parent: BottomDrawer) => Children) | Children;
    childrenIndex?: number;
    childrenTransitions?: TransitionTable; // TODO: This name is a little weird
    hasInputFields?: boolean; // If true, wraps children in an input wrapper, otherwise scrollview
    isVisible?: boolean;
    onClose?: noop;
    onCollapse?: noop;
    onExpand?: noop;
    onResetExpansionComplete?: noop;
    setCloseDrawerCallback?: (noop) => void;
    shouldCollapse?: () => boolean; // If the user triggers the "collapse drawer" option, we don't always want it to actually close
    wrapperContent: Children;
}

export interface State {
    /*
     * need some type of transition table to know how to navigate different sets of children
     * if we have the expanded/collapsed children, we'd need to know how to navigate when
     * one expands/minimizes
     */
    childrenIndex: number;
    hasOverlay: boolean;
    resetPosition: boolean;
    visibilityChanged: boolean;
}

/*
 * a transition table where each index in the array is the possible transitions from the
 * children at that index.
 * if your children array looked like [A, B]
 * and your transition table is [
 *      {EXPAND => 1, CLOSE => 0},
 *      {COLLAPSE => 0}
 * ]
 * that would mean that from children A, you can expand to B or close the drawer
 * from child B you can collapse back to A
 */
// TODO: potentially add params here so we can know whether or not the collapsible thing should scroll itself
// or if any gesture should open or close the drawer (on the current collapsed pharmacy landing page show refills one,
// we should just be able to grab that whole thing and pull it up, not just the top part)
export interface TransitionConfig {
    fullScreen?: boolean;
    hasOverlay?: boolean;
    shouldDrawerReceiveAccessibilityFocus?: boolean;
}

export declare type TransitionTable = Array<{ config?: TransitionConfig; transitions: Map<TransitionTypes, number> }>;

export enum TransitionTypes {
    CLOSE,
    COLLAPSE,
    EXPAND,
}

export const defaultProps: Partial<Props> = {
    additionalSafeAreaBottomOffset: 12,
    childrenIndex: 0,
    childrenTransitions: [
        {
            config: { hasOverlay: true, shouldDrawerReceiveAccessibilityFocus: true },
            transitions: new Map<TransitionTypes, number>([[TransitionTypes.CLOSE, 0]]),
        },
    ],
    hasInputFields: false,
    isVisible: true,
    onResetExpansionComplete: () => {},
    shouldCollapse: () => true,
};

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default class BottomDrawer extends StyledComponent<Props, State> {
    private get children() {
        // @ts-ignore for some reason ts isn't recognizing that checking if the type is a function means that after the check, it's guarunteed to be a function
        const children = typeof this.props.children === 'function' ? this.props.children(this) : this.props.children;
        // If children is an array, display the active one.  If not, just display the single child
        if (Array.isArray(children)) {
            return children[this.state.childrenIndex];
        }
        return children;
    }

    private get contentHeight() {
        return this.contentHeights[this.state.childrenIndex] || SCREEN_HEIGHT - this.drawerPositionY;
    }

    private set contentHeight(contentHeight: number) {
        this.contentHeights[this.state.childrenIndex] = contentHeight;
    }

    private get maxHeight() {
        const maxHeight = SCREEN_HEIGHT;
        if (this.safeArea?.bottom > 0) {
            // if there's a safe area, this is a phone that has a bottom bar and needs a bigger max height
            // maxHeight += this.safeArea.bottom ;
        }
        return maxHeight;
    }

    private get transitions() {
        return this.props.childrenTransitions[this.state.childrenIndex];
    }
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'BottomDrawer';
    public style: BottomDrawerStyle;

    /*
     * TODO:
     * there's some weird stuff going on with the animation API
     * i'm not 100% sure I understand the ValueXY object
     * you can't get the current values without doing some really hacky stuff
     *
     * it works fine for setting position, and has convenience methods for working with absolute position
     * the problem is there's no clean way I can see to get the current y value on it
     *
     * see below for usages
     * would like to clean this up, but don't have time to do a deep dive into the Animated API
     * if the component works and this weirdness is encapsulated within this class then, for the time being, whatever
     */
    protected animationPosition = new Animated.ValueXY({ x: 0, y: 500 });
    protected contentHeights = [];
    protected contentWrapper: View;
    protected drawerPositionY = 0;
    protected gestureId: number; // TODO: future enhancement
    protected hasRecievedFocus: boolean = false;
    protected readonly panResponder: PanResponderInstance;
    protected safeArea: EdgeInsets;

    constructor(props: Props) {
        super(props);
        this.panResponder = PanResponder.create({
            onPanResponderMove: this.onPanResponderMove,
            onPanResponderRelease: this.onPanResponderRelease,
            onPanResponderStart: this.onPanResponderStart,
            onStartShouldSetPanResponder: () => true,
        });
        this.state = {
            childrenIndex: props.childrenIndex,
            hasOverlay: this.hasOverlay(props.childrenTransitions, props.childrenIndex),
            resetPosition: true,
            visibilityChanged: false,
        };
    }

    public componentDidMount() {
        if (this.props.setCloseDrawerCallback) {
            this.props.setCloseDrawerCallback(() => this.closeDrawer(this.props.onClose));
        }
    }

    public componentDidUpdate(previousProps: Props) {
        if (previousProps.childrenIndex !== this.props.childrenIndex) {
            this.setState({ childrenIndex: this.props.childrenIndex, resetPosition: true }, () => {
                const previousIndex = previousProps.childrenIndex;
                const currentIndex = this.props.childrenIndex;
                const transition = this.props.childrenTransitions[previousIndex].transitions;
                // if the state changed externally to a valid transition, do the transition
                if (transition.has(TransitionTypes.EXPAND) && transition.get(TransitionTypes.EXPAND) === currentIndex) {
                    this.animateTransition(this.props.onExpand);
                } else if (
                    transition.has(TransitionTypes.COLLAPSE) &&
                    transition.get(TransitionTypes.COLLAPSE) === currentIndex
                ) {
                    this.animateTransition(this.props.onCollapse);
                }
            });
        }
        if (previousProps.isVisible !== this.props.isVisible && this.props.isVisible) {
            this.drawerPositionY = this.getInitialPosition();
            this.setState({
                resetPosition: true,
                visibilityChanged: true,
            });
            if (
                this.contentWrapper &&
                !this.hasRecievedFocus &&
                this.transitions.config?.shouldDrawerReceiveAccessibilityFocus
            ) {
                setAccessibilityFocus(this.contentWrapper);
                this.hasRecievedFocus = true;
            }
        }
    }

    public DrawerContent = () => {
        return (
            <>
                {this.props.wrapperContent && this.props.wrapperContent}
                <SafeAreaConsumer>
                    {safeArea => {
                        // the safeArea API is a little weird here
                        // there's no way to just do it in componentDidMount or anything like that
                        this.safeArea = safeArea;
                        return (
                            <Animated.View
                                style={{
                                    // drawer is going to be absolute positioned
                                    // the left/right coordinates come from the current position
                                    ...this.animationPosition.getLayout(),
                                    pointerEvents: 'none',
                                    position: 'absolute',
                                    width: SCREEN_WIDTH,
                                }}
                            >
                                <View
                                    onLayout={this.onLayout}
                                    style={[
                                        this.style.rootContainer,
                                        !this.state.hasOverlay && this.style.shadows,
                                        { maxHeight: this.maxHeight },
                                        this.state.hasOverlay && { height: this.maxHeight }, // If overlay on, height should be max height
                                        this.transitions.config?.fullScreen && {
                                            height: Number(this.style.fullScreen.height) - this.safeArea?.bottom,
                                        },
                                    ]}
                                >
                                    {/* 
                                TODO: future enhancement
                                move panResponder to parentView in the case that it's the collapsed component
                                will need information in the transitionTable to indicate whether or not that's feasible
                                ideally components that aren't scroll views you should be able to grab anywhere and expand/collapse them
                            */}
                                    <View
                                        accessible
                                        accessibilityLabel={this.labels.bottomDrawer.handler.accessibilityClose}
                                        accessibilityRole="button"
                                        hitSlop={{ bottom: 3, top: 3 }}
                                        // @ts-ignore accessibilityActions not TS'd correctly, the "correct" way doesn't actaully work, this does but isn't recognized
                                        accessibilityActions={[{ name: 'activate', label: 'activate' }]}
                                        onAccessibilityAction={() => this.closeDrawer(this.props.onClose)}
                                        ref={ref => (this.contentWrapper = ref)}
                                        style={this.style.modalHeader}
                                        {...this.panResponder.panHandlers}
                                    >
                                        <HorizontalRule style={{ horizontalRule: this.style.modalHook }} />
                                    </View>
                                    <this.ScrollContainer>
                                        <TouchableWithoutFeedback>{this.children}</TouchableWithoutFeedback>
                                    </this.ScrollContainer>
                                </View>
                            </Animated.View>
                        );
                    }}
                </SafeAreaConsumer>
            </>
        );
    };

    public ModalDrawer = ({ children }: { children: JSX.Element }) => {
        return (
            <Overlay
                containerStyle={this.style.modalBackdrop}
                isVisible
                onBackdropPress={() => this.props.shouldCollapse() && this.closeDrawer(this.props.onClose)}
                overlayStyle={[
                    this.style.modalContainer,
                    // The overlay height should be the max height - 80, but max height doesn't include the safe area so that needs to be added on,
                    // because the overlay should also cover the bottom areas
                    { height: this.maxHeight - (80 + (this.safeArea?.bottom ?? 0)) },
                ]}
            >
                {children}
            </Overlay>
        );
    };

    public render() {
        if (!this.props.isVisible || !this.children) {
            return this.props.wrapperContent ?? null;
        }
        if (this.hasOverlay(this.props.childrenTransitions, this.props.childrenIndex)) {
            return (
                <this.ModalDrawer>
                    <this.DrawerContent />
                </this.ModalDrawer>
            );
        }
        return <this.DrawerContent />;
    }

    public ScrollContainer = ({ children }: { children: Children }) => {
        if (this.props.hasInputFields) {
            return (
                <InputWrapper
                    style={{ rootContainer: this.style.contentContainer }}
                    showsVerticalScrollIndicator={false}
                >
                    {children}
                </InputWrapper>
            );
        }

        return (
            <ScrollView style={this.style.contentContainer} showsVerticalScrollIndicator={false}>
                {children}
            </ScrollView>
        );
    };

    // TODO: figure out easing here
    // apparently the easing may make the transition slightly smoother as it gets closer to its destination
    // not 100% on this yet, haven't done it before and need to research it and play with it
    // can treat that as an enhancement if this is working fine
    // * alternatively - if it's open sourced - we can just add to it
    protected animateTransition = (onAnimationComplete?: noop) => {
        this.drawerPositionY = this.getInitialPosition();
        Animated.spring(this.animationPosition, {
            bounciness: 4,
            restDisplacementThreshold: 40,
            restSpeedThreshold: 100,
            speed: 4,
            toValue: { x: 0, y: this.drawerPositionY },
        }).start(() => {
            this.setState({
                hasOverlay: this.hasOverlay(this.props.childrenTransitions, this.state.childrenIndex),
                visibilityChanged: false,
            });
            if (onAnimationComplete) {
                onAnimationComplete();
            }
        });
    };

    protected closeDrawer = (onAnimationComplete?: noop) => {
        Animated.spring(this.animationPosition, {
            restDisplacementThreshold: 40,
            restSpeedThreshold: 100,
            toValue: { x: 0, y: SCREEN_HEIGHT },
        }).start(() => {
            this.drawerPositionY = SCREEN_HEIGHT;
            this.animationPosition.setValue({ x: 0, y: this.drawerPositionY });
            if (onAnimationComplete) {
                onAnimationComplete();
                this.hasRecievedFocus = false;
            }
            this.setState({ hasOverlay: this.hasOverlay(this.props.childrenTransitions, this.state.childrenIndex) });
        });
    };

    protected collapseDrawer = (onAnimationComplete?: noop) => {
        this.setState(
            {
                childrenIndex: this.transitions.transitions.get(TransitionTypes.COLLAPSE),
                resetPosition: true,
            },
            () => {
                // after the state has been set, we should be able to recalculate the initial position
                this.animateTransition(onAnimationComplete);
            }
        );
    };

    protected getGestureInfo = (gestureState: {
        dy: number;
        vy: number;
    }): { collapsing: boolean; expanding: boolean } => {
        // TODO: would like to include velocity but it's not working right
        // gestureState vy sometimes returns 0 and I'm not sure why
        const hasVelocity: boolean = Math.abs(gestureState.vy) > 0;
        const collapsing = gestureState.dy > 0;
        const expanding = gestureState.dy < 0;
        return { collapsing, expanding };
    };

    protected getInitialPosition = (fromHidden: boolean = false) => {
        if (fromHidden) {
            return 0;
        }
        const offsetBottom = this.appContext.colorSchema.bottomNavigation.height;
        let initialPosition = SCREEN_HEIGHT - this.contentHeight - offsetBottom;
        if (this.safeArea?.bottom > 0) {
            initialPosition -= this.safeArea.bottom;
            // the safe area insets don't actually set the height 100% correctly
            // i'm not sure why, but there's an additional amount of padding that needs to be applied
            // TODO: play with styling and see if that can take care of this
            // would be nice to remove this prop, seems hacky
            initialPosition -= this.props.additionalSafeAreaBottomOffset;
        }
        if (initialPosition < 0) {
            initialPosition = 0;
        }
        return initialPosition;
    };

    protected getPositionFromGesture = deltaPosition => {
        let newPosition = this.drawerPositionY + deltaPosition;
        if (newPosition < 0) {
            newPosition = 0; // don't want to drag above the header (bottom of header is 0)
        }
        return newPosition;
    };

    protected hasOverlay = (transitions: TransitionTable, index: number): boolean => {
        return transitions[index].config?.hasOverlay ?? false;
    };

    protected onLayout = event => {
        this.contentHeight = event.nativeEvent.layout.height;
        if (this.state.resetPosition) {
            /*
             * after a completed transition between components we need to reset the animation position, not doing this
             * will cause some funky scrolling behaviors
             * if the animation position is not reset, you may grab a component at a certain location on the screen, then
             * when you start scrolling the component will jump down to the previous animation position instead of scrolling
             * smoothly from where it's at
             */
            this.drawerPositionY = this.getInitialPosition();
            if (this.state.visibilityChanged) {
                this.animateTransition();
            } else {
                this.animationPosition.setValue({ x: 0, y: this.drawerPositionY });
            }
            this.setState({ resetPosition: false, visibilityChanged: false });
        }
    };

    // TODO: determine types on these guys
    protected onPanResponderMove = (
        event: any,
        gestureState: {
            // the change in vertical position
            // dy < 0 = moving up, dy > 0 = moving down
            dy: number;
            // the vertical velocity of the gesture
            vy: number;
        }
    ) => {
        // TODO: FUTURE ENHANCEMENT
        // see note in onPanResponderStart - want to keep track of gesture id, don't transition if the same gesture
        const { collapsing, expanding } = this.getGestureInfo(gestureState);
        const scrollPosition = this.getPositionFromGesture(gestureState.dy);
        if (expanding) {
            this.onScrollUp(scrollPosition);
        } else if (collapsing) {
            this.onScrollDown(scrollPosition);
        }
    };

    protected onPanResponderRelease = (
        event,
        gestureState: {
            dy: number;
            vy: number;
        }
    ) => {
        // on release we want to update the drawer position
        // this.drawerPositionY = this.getPositionFromGesture(gestureState.dy);
        const { collapsing, expanding } = this.getGestureInfo(gestureState);
        if (expanding) {
            this.onReleaseExpand();
        } else if (collapsing) {
            this.onReleaseCollapse();
        }
    };

    protected onPanResponderStart = (event, gestureState) => {
        // TODO:
        // for future enhancement with multiple transitions
        // keep track of the gesture on start, just give it an ID and increment it
        // in the other methods, don't do the transition if it's the same gesture id
    };

    protected onReleaseCollapse = () => {
        // Callback that can prevent a collapse and implement custom behavior
        if (this.props.shouldCollapse()) {
            if (this.transitions.transitions.has(TransitionTypes.CLOSE)) {
                this.closeDrawer(this.props.onClose);
            } else if (this.transitions.transitions.has(TransitionTypes.COLLAPSE)) {
                this.collapseDrawer();
            }
        } else {
            this.setState({ resetPosition: true }, () =>
                this.animateTransition(() => this.props.onResetExpansionComplete())
            );
        }
        /*
         * just scrolling down doesn't do the transition like scrolling up does
         * on release if we're moving down, need to either close the drawer or transition to the collapsed component
         */
    };

    protected onReleaseExpand = () => {
        /*
         * while scrolling the children index should have been switched
         * on release we just need to fire the transition animation to pull the current expanded component up to it's correct height
         *
         * we also need to shrink the content height potentially after the expansion animation has finished
         * if the component gets all the way to the top of the page and is off screen on the bottom, we need to manually set the height to the
         * screen height - the safe area boundaries and the bottom nav bar
         *
         * i'm assuming that changing the height of the component will cause the scroll view to kick in
         */
        // don't check for transitions here - the transition will happen on scroll
        this.setState({ resetPosition: true }, () => {
            this.animateTransition(() => {
                if (this.props.onExpand) {
                    this.props.onExpand();
                }
            });
        });
    };

    protected onScrollDown = (scrollPosition: number) => {
        // nothing to do on scrolling downward - just simply move the component and wait for the release
        this.animationPosition.setValue({ x: 0, y: scrollPosition });
    };

    protected onScrollUp = (scrollPosition: number) => {
        /*
         * when we scroll up, if there's a valid expansion to transition to, we want to transition to that component without doing the
         * release animation
         * if you're dragging the collapsed component up, you should see the expanded component while it's dragging
         * on release, the expanded component should be displayed fully
         */
        const isPositionAboveContent = scrollPosition < SCREEN_HEIGHT - this.contentHeight;
        if (isPositionAboveContent && this.transitions.transitions.has(TransitionTypes.EXPAND)) {
            // update the children index only - don't animate the transition until the release
            // TODO: future enhancement - don't do this if it's the same gesture ID
            this.setState({
                childrenIndex: this.transitions.transitions.get(TransitionTypes.EXPAND),
            });
        }
        this.animationPosition.setValue({ x: 0, y: scrollPosition });
    };
}
