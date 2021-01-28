import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { P } from '..';
import Modal from '../modal';

export default class DropDownModal extends Modal {
    public name = 'DropDownModal';

    public modalHeader = () => {
        return (
            <View style={this.style.dropdownHeaderContainer}>
                <TouchableOpacity
                    accessibilityLabel={this.labels.dropDown.done}
                    accessibilityRole={'button'}
                    onPress={this.props.onClose}
                >
                    <View pointerEvents="none">
                        <P accessible={false} style={{ paragraph: this.style.dropdownDoneButton }}>
                            {this.labels.dropDown.done}
                        </P>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };
}
