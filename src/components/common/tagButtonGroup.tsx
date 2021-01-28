import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { IconNames } from '../../styles';
import StyledComponent, { StyleProps } from '../styledComponent';
import defaultStyle, { TagButtonGroupStyleSchema } from './tagButtonGroup.style';

interface Props extends StyleProps {
    accessibilityLabel: string;
    areIconsJustifiedRight?: boolean;
    buttons: TagButton[];
    children: (component: TagButtonGroup) => React.ReactNode;
    isVertical: boolean;
    style?: Partial<TagButtonGroupStyleSchema>;
    styleOverride: Partial<TagButtonGroupStyleSchema>;
    title?: string;
}

export interface TagButton {
    iconName: IconNames;
    label: string;
    onPress: (value: string) => void;
    value: string;
}

const defaultProps = {
    accessibilityLabel: 'Please choose an option.',
    children: ({ Title, Buttons }: TagButtonGroup) => (
        <>
            <Title />
            <Buttons />
        </>
    ),
    isVertical: false,
    styleOverride: {},
};

export default class TagButtonGroup extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'TagButtonGroup';
    public style: TagButtonGroupStyleSchema;

    public Buttons = (): JSX.Element => {
        const { isVertical, buttons } = this.props;
        const accessibilityText = this.labels.tagButtonGroup.accessibilityLabel;

        return (
            <View style={isVertical ? this.style.verticalOptionsContainer : this.style.horizontalOptionsContainer}>
                {buttons.map(button => {
                    return (
                        <Button
                            key={button.label}
                            accessibilityLabel={`${button.label} ${accessibilityText}`}
                            accessibilityRole="button"
                            accessibilityStates={['selected']}
                            buttonStyle={this.style.allButtons}
                            containerStyle={this.style.buttonDimensions}
                            icon={this.getIcon(button.iconName, { style: this.style.icon })}
                            iconContainerStyle={{ marginLeft: 5 }}
                            iconRight={this.props.areIconsJustifiedRight}
                            onPress={() => button.onPress(button.value)}
                            title={button.label}
                            titleStyle={this.style.buttonText}
                        />
                    );
                })}
            </View>
        );
    };

    public render() {
        const { children } = this.props;
        return <View style={this.style.rootContainer}>{children(this)}</View>;
    }

    public Title = (): JSX.Element => {
        return <>{this.props.title && <Text style={this.style.title}>{this.props.title}</Text>}</>;
    };
}
