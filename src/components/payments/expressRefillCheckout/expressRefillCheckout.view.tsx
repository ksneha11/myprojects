import { Address, PrescriptionCart, PrescriptionCartCheckout, PrescriptionInfo } from 'atlas-services/src/models';
import moment from 'moment';
import React from 'react';
import { FlatList, SafeAreaView, ScrollView, View } from 'react-native';
import { H1, H2, HorizontalRule, P } from '../..';
import { CheckoutSection, DisclaimerCopy, H3 } from '../../common';
import CheckBox from '../../common/checkBox';
import ToggleSwitch from '../../common/toggleSwitch';
import { getPrescriptionRefillRenewStatus } from '../../pharmacy/prescriptions/prescriptionUtils';
import StyledComponent, { StyleProps } from '../../styledComponent';
import { formatCurrency } from './../../../utils';
import { defaultStyle, ExpressRefillCheckout, ExpressRefillCheckoutSchema } from './index';

export interface Props extends StyleProps {
    address: Address;
    children?: (parent: ExpressRefillCheckoutView) => React.ReactNode;
    isPrescriptionInCart: (item: PrescriptionInfo) => boolean;
    onPressCheckout: () => void;
    onPressToggleButton: () => void;
    prescriptions: PrescriptionInfo[];
    selectAllPressed: boolean;
    selectionText: string;
    style?: Partial<ExpressRefillCheckoutSchema>;
    updatePrescriptionCart: (item: PrescriptionInfo) => void;
}

export const defaultProps = {
    children: ({ Checkout, TitleContainer, ListItems }: ExpressRefillCheckoutView) => {
        return (
            <>
                <ScrollView>
                    <TitleContainer />
                    <ListItems />
                </ScrollView>
                <Checkout />
            </>
        );
    },
};

export default class ExpressRefillCheckoutView extends StyledComponent<Props> {
    public static defaultProps: Partial<Props> = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'ExpressRefillCheckout';
    public style: ExpressRefillCheckoutSchema;

    public Checkout = () => {
        if (this.props.prescriptions.length === 0) {
            return null;
        }
        const refillPrescriptions = new PrescriptionCartCheckout(
            this.appState.prescriptionCart
        ).selectedPrescriptions.filter(
            prescription => prescription.eligibility && prescription.eligibility.digitalCheckout
        );
        const totalCost = refillPrescriptions.reduce(
            (total, prescription) => total + Number(prescription.estimatedCopay),
            0
        );
        return (
            <View style={this.style.checkoutContainer}>
                <CheckoutSection
                    isDisabled={refillPrescriptions.length === 0}
                    cartItemCount={refillPrescriptions.length}
                    onPressCheckout={this.props.onPressCheckout}
                    subtotal={totalCost}
                />
            </View>
        );
    };

    public Container = ({ children }: { children: Children }) => {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={this.style.rootContainer}>{children}</View>
            </SafeAreaView>
        );
    };

    public DisclaimerContainer = () => {
        return (
            <View>
                <this.HorizontalRuleConatiner />
                <DisclaimerCopy>{this.labels.pharmacy.expressRefillCheckout.disclaimer}</DisclaimerCopy>
            </View>
        );
    };

    public HorizontalRuleConatiner = () => {
        return (
            <View style={this.style.horizontalRuleContainer}>
                <HorizontalRule />
            </View>
        );
    };

    public ListItems = () => {
        if (this.props.prescriptions.length === 0) {
            return null;
        }
        return (
            <View>
                <FlatList
                    extraData={this.props}
                    data={this.props.prescriptions.filter(
                        prescription => prescription.eligibility && prescription.eligibility.digitalCheckout
                    )}
                    ItemSeparatorComponent={this.HorizontalRuleConatiner}
                    keyExtractor={prescription => prescription.id}
                    renderItem={this.renderItem}
                    contentContainerStyle={this.style.flatListFooter}
                    ListFooterComponent={<this.DisclaimerContainer />}
                />
            </View>
        );
    };

    public render() {
        return <this.Container>{this.props.children(this)}</this.Container>;
    }

    public renderItem = ({ item }: { item: PrescriptionInfo }) => {
        const status = getPrescriptionRefillRenewStatus(item);
        const subText = this.getContent(item);
        const title = `${item.drugInfo.name}`;
        return (
            <View style={this.style.rootView}>
                <View style={this.style.titleView}>
                    <H2>{title}</H2>
                    {subText.map(text => (
                        <P key={text} style={{ paragraph: this.style.subText }}>
                            {text}
                        </P>
                    ))}
                </View>
                <View style={this.style.checkBoxContainer}>
                    {!!status && <P style={{ paragraph: this.style.statusText }}>{status}</P>}
                    <CheckBox
                        accessibilityLabel={(this.formatLabel(
                            this.labels.pharmacy.expressRefillCheckout.renderItem.checkbox.accessibilityLabel,
                            item.drugInfo.name
                        ) as string[]).join('')}
                        isChecked={this.props.isPrescriptionInCart(item)}
                        onPress={() => this.props.updatePrescriptionCart(item)}
                        style={{ rootContainer: this.style.checkBox }}
                    />
                </View>
            </View>
        );
    };

    public TitleContainer = () => {
        const labels = this.labels.pharmacy.expressRefillCheckout.titleContainer;
        const prescriptionCount = this.props.prescriptions.length;
        const prescriptionCountText = `${prescriptionCount} ${
            prescriptionCount === 1 ? labels.prescriptionCountSingle : labels.prescriptionCount
        }`;
        const availabilityStatus =
            prescriptionCount === 0
                ? labels.availabilityStatus.hasNoPrescriptions
                : labels.availabilityStatus.hasPrescriptions;

        return (
            <View style={this.style.title}>
                <H1>{labels.title}</H1>
                <P style={{ paragraph: this.style.subTitleContainer }}>
                    {labels.subTitle}
                    <H3>{prescriptionCountText} </H3>
                    {availabilityStatus}
                </P>
                <this.ToggleContainer />
                <this.HorizontalRuleConatiner />
            </View>
        );
    };

    public ToggleContainer = () => {
        if (this.props.prescriptions.length === 0) {
            return null;
        }
        return (
            <View style={this.style.toggleSwitch}>
                <P style={{ paragraph: this.style.selectDefaultTitleContainer }}> {this.props.selectionText}</P>
                <ToggleSwitch
                    onChangeValue={() => {
                        this.trackEvent(ExpressRefillCheckout, 'Select All toggle');
                        this.props.onPressToggleButton();
                    }}
                    value={this.props.selectAllPressed}
                />
            </View>
        );
    };

    protected getContent = (prescription: PrescriptionInfo): string[] => {
        const { estimatedCopay, prescribedTo } = prescription;
        const labels = this.labels.pharmacy.expressRefillCheckout.content;
        const name = `${prescribedTo.firstName} ${prescribedTo.lastName}`;
        const costLabel = labels.estimatedCost;
        const formattedDob = moment(prescribedTo.dob).format('MM/DD/YYYY');
        return [
            `${labels.for} ${name}`,
            `${labels.dateOfBirth} ${formattedDob}`,
            `${costLabel} ${formatCurrency(estimatedCopay)}`,
        ];
    };
}
