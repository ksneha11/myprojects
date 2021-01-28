import { ShippingOption, ShippingType } from 'atlas-services/src/models';
import moment from 'moment';
import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { HorizontalRule } from '..';
import { formatCurrency } from '../../utils';
import { H1, H2, P, PrimaryButton, RadioButton, RadioButtonGroup } from '../common';
import StyledComponent, { StyleProps } from '../styledComponent';
import { defaultStyle, ShippingOptionsStyleSchema } from './index';

export interface Props extends StyleProps {
    children?: (parent: ShippingOptionsView) => React.ReactNode;
    onPressSave: noop;
    onPressShippingOption: (index: ShippingType) => void;
    selectedShippingOption: ShippingType;
    shippingOptionsContent: ShippingOption[];
    style?: Partial<ShippingOptionsStyleSchema>;
}

export const defaultProps = {
    children: ({ HeaderTitle, HeaderInfo, HorizontalLine, RadioButtonContainer, SaveButton, style }) => {
        return (
            <>
                <View style={style.rootContainer}>
                    <ScrollView contentContainerStyle={style.scrollContainer}>
                        <View>
                            <HeaderTitle />
                            <HeaderInfo />
                            <RadioButtonContainer />
                            <HorizontalLine />
                        </View>
                    </ScrollView>
                    <SaveButton />
                </View>
            </>
        );
    },
};

export default class ShippingOptionsView extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'ShippingOptions';
    public style: ShippingOptionsStyleSchema;

    public Container = ({ children }: { children: Children }) => {
        return <SafeAreaView style={this.style.rootContainer}>{children}</SafeAreaView>;
    };

    public dateRange = (shippingOption: ShippingOption) => {
        const dateRange = `${moment(shippingOption.startDate).format('MMMM DD')} to ${moment(
            shippingOption.endDate
        ).format('MMMM DD')}`;
        return dateRange;
    };

    public getRadioAccessibilityLabels = (buttonInfo): string => {
        const shippingOptions = this.labels.pharmacy.shippingOptions.accessibilityLabels;
        let accessibilityLabel = '';
        switch (buttonInfo.shippingType) {
            case ShippingType.NEXT_DAY_DELIVERY:
                accessibilityLabel = shippingOptions.oneDayShipping;
                break;

            case ShippingType.STANDARD_DELIVERY:
                accessibilityLabel = shippingOptions.standardShipping;
                break;

            case ShippingType.TWO_DAY_DELIVERY:
                accessibilityLabel = shippingOptions.twoDayShipping;
                break;
        }
        return `${accessibilityLabel} ${this.dateRange(buttonInfo)}`;
    };

    public HeaderInfo = () => {
        return (
            <View>
                <View style={this.style.headerContainer}>
                    <P>{this.labels.pharmacy.shippingOptions.header.info}</P>
                </View>
            </View>
        );
    };

    public HeaderTitle = () => {
        return (
            <View style={this.style.titleContainer}>
                <H1>{this.labels.pharmacy.shippingOptions.header.title}</H1>
            </View>
        );
    };

    public HorizontalLine = () => {
        return (
            <View style={this.style.horizontalLine}>
                <HorizontalRule />
            </View>
        );
    };

    public RadioButtonContainer = () => {
        return (
            <RadioButtonGroup
                customButton={this.RadioButtonContent}
                radioButtonItems={this.props.shippingOptionsContent}
            />
        );
    };

    public RadioButtonContent = ({ buttonInfo }): JSX.Element => {
        const isActive = buttonInfo.shippingType === this.props.selectedShippingOption;
        return (
            <View>
                <this.HorizontalLine />
                <View style={this.style.radioButtonContentContainer}>
                    <View>
                        <RadioButton
                            accessibilityLabel={this.getRadioAccessibilityLabels(buttonInfo)}
                            selected={isActive}
                            onPress={() => this.props.onPressShippingOption(buttonInfo.shippingType)}
                        />
                    </View>
                    <View accessible={true} style={this.style.methodContainer}>
                        {this.shippingInfo(buttonInfo)}
                    </View>
                </View>
            </View>
        );
    };

    public render() {
        const { children } = this.props;
        return <this.Container>{children(this)}</this.Container>;
    }

    public SaveButton = () => {
        return (
            <View style={this.style.footerContainer}>
                <View style={this.style.saveButtonContainer}>
                    <PrimaryButton
                        onPress={this.props.onPressSave}
                        style={{ buttonContainer: this.style.formButton }}
                        title="Save"
                    />
                </View>
            </View>
        );
    };

    public shippingInfo = (shippingOption: ShippingOption) => {
        let shippingName;
        const dateRange = `${moment(shippingOption.startDate).format('MMMM DD')} - ${moment(
            shippingOption.endDate
        ).format('MMMM DD')}`;

        // FIXME: TODO: break this out into it's own function
        switch (shippingOption.shippingType) {
            case ShippingType.NEXT_DAY_DELIVERY:
                shippingName = this.labels.pharmacy.shippingOptions.oneDayShipping;
                break;

            case ShippingType.STANDARD_DELIVERY:
                shippingName = this.labels.pharmacy.shippingOptions.standardShipping;
                break;

            case ShippingType.TWO_DAY_DELIVERY:
                shippingName = this.labels.pharmacy.shippingOptions.twoDayShipping;
                break;
        }

        return (
            <View style={this.style.sectionContainer}>
                <View style={this.style.sectionInformationContainer}>
                    <H2 style={{ h2: this.style.header }}>{shippingName}</H2>
                    <P style={{ paragraph: this.style.paragraph }}>
                        {this.labels.pharmacy.shippingOptions.estimatedDelivery}
                    </P>
                    <P style={{ paragraph: this.style.paragraph }}>{dateRange}</P>
                </View>
                <View style={this.style.costContainer}>
                    <P> {formatCurrency(shippingOption.cost)}</P>
                </View>
            </View>
        );
    };
}
