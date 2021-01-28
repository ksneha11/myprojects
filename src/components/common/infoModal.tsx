import React from 'react';
import { View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { DialogBox } from '.';
import { IconNames } from '../../styles';
import StyledComponent, { StyleProps } from '../styledComponent';
import Icon from './icon';
import defaultStyle, { InfoModalStyleSchema } from './infoModal.style';

interface Props extends StyleProps {
    children: React.ReactNode[] | React.ReactNode;
    hitSlop?: { bottom?: number; left?: number; right?: number; top?: number };
    style?: Partial<InfoModalStyleSchema>;
    title: string;
}

const defaultProps: Partial<Props> = {
    hitSlop: {},
    title: '',
};

interface State {
    isVisible: boolean;
}

export default class InfoModal extends StyledComponent<Props, State> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'InfoModal';
    public style: InfoModalStyleSchema;

    constructor(props: Readonly<Props>) {
        super(props);
        this.state = { isVisible: false };
    }

    public closeModal = () => {
        this.setState({ isVisible: false });
    };

    public render() {
        return (
            <>
                <TouchableWithoutFeedback
                    accessibilityLabel={`${this.labels.infoModal.accessibilityLabel} ${this.props.title}`}
                    accessibilityRole={'button'}
                    hitSlop={this.props.hitSlop}
                    onPress={() => this.setState({ isVisible: true })}
                >
                    <Icon name={IconNames.ALERT_INFO_ICON} style={{ rootItem: this.style.infoIcon }} />
                </TouchableWithoutFeedback>
                <DialogBox
                    primaryMethod={this.closeModal}
                    primaryText={this.labels.infoModal.primaryText}
                    isVisible={this.state.isVisible}
                    onClose={this.closeModal}
                >
                    {({ Buttons }) => (
                        <>
                            <View collapsable={false}>{this.props.children}</View>
                            <Buttons />
                        </>
                    )}
                </DialogBox>
            </>
        );
    }
}
