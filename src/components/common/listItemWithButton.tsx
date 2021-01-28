import React from 'react';
import { Text, View } from 'react-native';
import { ListItem, P, SelectorButton } from '.';
import StyledComponent from '../styledComponent';
import { Props as ListItemProps } from './listItem';
import defaultStyle, { ListItemWithButtonStyleSchema } from './listItemWithButton.style';

export interface Props extends ListItemProps {
    buttonLabel: string;
    onPressButton: noop;
    subText: string[];
}

class ListItemWithButton extends StyledComponent<Props> {
    public readonly defaultStyle = defaultStyle;
    public readonly name: string = 'ListItemWithButton';
    public readonly style: ListItemWithButtonStyleSchema;

    public render() {
        const { buttonLabel, subText, title } = this.props;
        return (
            <ListItem componentRight={this.SelectButton(buttonLabel)} title={title}>
                {subText.map((text, key) => (
                    <P key={key} style={{ paragraph: this.style.subText }}>
                        {text}
                    </P>
                ))}
            </ListItem>
        );
    }

    protected SelectButton(label: string): JSX.Element {
        const { onPressButton } = this.props;
        return (
            <View style={this.style.buttonContainer}>
                <SelectorButton onPress={onPressButton} style={{ text: this.style.buttonLabel }} title={label} />
            </View>
        );
    }
}

export default ListItemWithButton;
