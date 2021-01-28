import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { Overlay, OverlayProps } from 'react-native-elements';
import { setAccessibilityFocus } from '../../utils';
import StyledComponent, { StyleProps } from '../styledComponent';
import defaultStyle, { ModalStyleSchema } from './modal.style';

export interface Props extends StyleProps, OverlayProps {
    isFixedBottom?: boolean;
    // passing styles in for now here - not sure how to get around this
    onClose?: () => void;
    style?: Partial<ModalStyleSchema>;
    title?: string;
}

const defaultProps = {
    isFixedBottom: false,
    isVisible: true,
    onClose: () => {},
};

interface State {
    hasAccessibityFocusBeenRemoved: boolean;
}

export default class Modal extends StyledComponent<Props, State> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'Modal';
    public style: ModalStyleSchema;
    protected hasRecievedFocus: boolean = false;
    protected titleRef: SafeAreaView;

    constructor(props) {
        super(props);
        this.state = {
            hasAccessibityFocusBeenRemoved: false,
        };
    }
    public componentDidUpdate(prevProps: Props) {
        if (!prevProps.isVisible && this.props.isVisible && !this.hasRecievedFocus && this.titleRef) {
            // When the modal pops up, set focus to it
            setAccessibilityFocus(this.titleRef);
            this.hasRecievedFocus = true;
        }

        if (prevProps.isVisible && !this.props.isVisible) {
            // When it goes from visible to invisible, reset focus so next pop up will focus again.
            this.hasRecievedFocus = false;
        }
    }

    public ModalHeader = () => {
        return (
            <View style={this.style.titleContainer}>
                <Text accessibilityRole={'header'} style={this.style.titleText}>
                    {this.props.title}
                </Text>
            </View>
        );
    };

    public render() {
        const { isVisible, onClose, isFixedBottom } = this.props;
        const style = this.style;
        return (
            <Overlay
                {...this.props}
                containerStyle={style.backdrop}
                isVisible={isVisible}
                onBackdropPress={() => onClose()}
                overlayStyle={[style.rootContainer, isFixedBottom ? style.rootContainerFixedBottom : {}]}
            >
                <SafeAreaView ref={ref => (this.titleRef = ref)} style={style.contentContainer}>
                    {this.props.title && <this.ModalHeader />}
                    {this.props.children}
                </SafeAreaView>
            </Overlay>
        );
    }
}
