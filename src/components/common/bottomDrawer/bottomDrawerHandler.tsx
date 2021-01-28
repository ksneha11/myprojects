import React from 'react';
import AppComponent from '../common/appComponent';
import BottomDrawer, { TransitionTable, TransitionTypes } from './bottomDrawer';

export abstract class AbstractBottomDrawerHandler<
    P extends Props = Props,
    S extends State = State
> extends AppComponent<P, S> {
    protected static reference: BottomDrawerHandler = null;

    public static hide() {
        AbstractBottomDrawerHandler.reference.hide();
    }

    /**
     * Setter for a function that is called when the drawer closes from the user swiping down
     * @param callback Function that returns a boolean, true should continue to close, false means do not close
     */
    public static setShouldClose = (callback: () => boolean, onResetExpansionComplete: () => void) => {
        AbstractBottomDrawerHandler.reference.setShouldClose(callback, onResetExpansionComplete);
    };

    public static show(drawerConfig: DrawerConfig) {
        AbstractBottomDrawerHandler.reference.show(drawerConfig);
    }

    public abstract hide();

    public abstract setShouldClose(callback: () => boolean, onResetExpansionComplete: () => void);

    public abstract show(drawerConfig: DrawerConfig);
}

interface DrawerConfig {
    content: Children;
    hasInputFields?: boolean;
    onClose?: noop;
    onCollapse?: noop;
    onExpand?: noop;
    style?: any;
    transitionIndex?: number;
    transitions?: TransitionTable;
}

interface State {
    content: Children;
    hasInputFields: boolean;
    isVisible: boolean;
    onClose: noop;
    onCollapse: noop;
    onExpand: noop;
    onResetExpansionComplete: () => void;
    shouldClose: () => boolean;
    style: any;
    transitionIndex: number;
    transitions: TransitionTable;
}

interface Props {}

export class BottomDrawerHandler extends AbstractBottomDrawerHandler {
    protected closeDrawerRef: noop;
    constructor(props) {
        super(props);
        this.state = {
            content: null,
            hasInputFields: false,
            isVisible: false,
            onClose: null,
            onCollapse: null,
            onExpand: null,
            onResetExpansionComplete: () => {},
            shouldClose: () => true,
            style: null,
            transitionIndex: 0,
            transitions: this.defaultTransition,
        };
    }

    public get defaultTransition() {
        return [
            {
                config: { hasOverlay: true, shouldDrawerReceiveAccessibilityFocus: true },
                transitions: new Map<TransitionTypes, number>([[TransitionTypes.CLOSE, 0]]),
            },
        ];
    }

    public componentDidMount() {
        AbstractBottomDrawerHandler.reference = this;
    }

    public hide() {
        this.closeDrawerRef();
        /* Timeout exists to prevent bottom drawer from being cleared before exit animation completes */
        setTimeout(() => {
            this.clearState();
        }, 500);
    }

    public render() {
        return (
            <BottomDrawer
                setCloseDrawerCallback={ref => (this.closeDrawerRef = ref)}
                hasInputFields={this.state.hasInputFields}
                isVisible={this.state.isVisible}
                onClose={this.onClose}
                onCollapse={this.state.onCollapse}
                onExpand={this.state.onExpand}
                onResetExpansionComplete={this.state.onResetExpansionComplete}
                wrapperContent={this.props.children}
                childrenIndex={this.state.transitionIndex}
                childrenTransitions={this.state.transitions}
                shouldCollapse={this.state.shouldClose}
                style={this.state.style}
            >
                {this.state.content}
            </BottomDrawer>
        );
    }

    public setShouldClose(callback, onResetExpansionComplete) {
        this.setState({ onResetExpansionComplete, shouldClose: callback });
    }

    public show(drawerConfig: DrawerConfig) {
        this.setState(
            {
                content: drawerConfig.content,
                hasInputFields: drawerConfig.hasInputFields ?? false,
                onClose: () => drawerConfig.onClose ?? null,
                onCollapse: () => drawerConfig.onCollapse ?? null,
                onExpand: () => drawerConfig.onExpand ?? null,
                style: drawerConfig.style ?? null,
                transitionIndex: drawerConfig.transitionIndex ?? 0,
                transitions: drawerConfig.transitions,
            },
            () => {
                this.setState({ isVisible: true });
            }
        );
    }

    protected clearState = () => {
        this.setState({
            content: null,
            hasInputFields: false,
            isVisible: false,
            onClose: null,
            onCollapse: null,
            onExpand: null,
            onResetExpansionComplete: () => {},
            shouldClose: () => true,
            transitionIndex: 0,
            transitions: this.defaultTransition,
        });
    };

    protected onClose = () => {
        this.setState({ content: null });
        this.state.onClose && this.state.onClose();
        this.clearState();
    };
}
