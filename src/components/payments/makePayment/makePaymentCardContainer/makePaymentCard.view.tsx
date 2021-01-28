import { AccountInfo } from 'atlas-services/src/models';
import React from 'react';
import { View } from 'react-native';
import { H2, P } from '../../..';
import { IconNames } from '../../../../styles';
import { formatCurrency } from '../../../../utils';
import Card, { defaultProps, Props as ParentProps } from '../../../common/card';
import { CardStyleSchema } from '../../../common/card.style';
import Icon from '../../../common/icon';
import StyledComponent from '../../../styledComponent';
import defaultStyle, { MakePaymentStyleSchema } from './makePaymentCard.style';

interface Props extends ParentProps {
    formatCurrency: (value: number | string) => string;
    isPaymentNeeded: (balance: number) => boolean;
    numberOfAutoEnrolledAccounts: number;
}

const makePaymentCardDefaultProps = {
    footerIconName: IconNames.LIST_ITEM_NAVIGATE_ICON,
    formatCurrency,
    isFooterTextVisible: true,
    leftIconName: IconNames.SHIPPING_DETAILS_ICON,
};

export default class MakePaymentCardView extends StyledComponent<Props> {
    public static defaultProps = makePaymentCardDefaultProps;
    public defaultStyle = defaultStyle;
    public name = 'MakePaymentCard';
    public style: MakePaymentStyleSchema;

    public AutomaticPaymentSection = () => {
        const labels = this.labels.pharmacy.makePayment.automaticPaymentSection;
        const { numberOfAutoEnrolledAccounts } = this.props;
        const numberOfSpecialtyAccounts = this.appState.specialtyAccounts.length;
        const areAllAccountsAutoEnrolled = numberOfAutoEnrolledAccounts === numberOfSpecialtyAccounts;
        if (areAllAccountsAutoEnrolled) {
            return (
                <View>
                    <P>{labels.enrolled}</P>
                </View>
            );
        } else if (numberOfAutoEnrolledAccounts > 0) {
            return (
                <View>
                    <P>
                        {this.formatLabel(labels.someEnrolled, numberOfAutoEnrolledAccounts, numberOfSpecialtyAccounts)}
                    </P>
                </View>
            );
        } else {
            return (
                <View>
                    <P>{labels.notEnrolled}</P>
                </View>
            );
        }
    };

    public render() {
        const labels = this.labels.pharmacy.makePayment.makePaymentCard;
        const styleOverrides: Partial<CardStyleSchema> = {
            contentContainer: this.style.contentContainer,
            rootContainer: this.style.rootContainer,
        };
        return (
            <View style={this.style.mainContainer}>
                <View style={this.style.rootContainer}>
                    <H2>{labels.title}</H2>
                </View>
                <Card
                    style={styleOverrides}
                    footerAccessibilityLabel={labels.footer.footerAccessibilityLabel}
                    footerText={labels.footer.text}
                    footerIconName={this.props.footerIconName}
                    {...this.props}
                >
                    {({ CardAction, Footer, props: { footerText, footerIconName }, style }) => {
                        return (
                            <>
                                <View style={style.rootContainer}>
                                    <this.TextContent />
                                    <Footer>
                                        <CardAction actionText={footerText} />
                                        <Icon name={footerIconName} style={{ rootItem: style.iconStyle }} />
                                    </Footer>
                                </View>
                            </>
                        );
                    }}
                </Card>
            </View>
        );
    }

    public TextContent = () => {
        const labels = this.labels.pharmacy.makePayment.makePaymentCard;
        return (
            <View style={this.style.textContainer}>
                <View style={this.style.textContentContainer}>
                    <P>{labels.content.pharmacyText}</P>
                    <P>
                        {this.props.isPaymentNeeded(this.appState.pbmAccountBalance)
                            ? this.props.formatCurrency(this.appState.pbmAccountBalance)
                            : this.props.formatCurrency(0)}
                    </P>
                </View>
                {this.appState.specialtyAccounts?.length > 0 && (
                    <>
                        <View style={this.style.textContentContainer}>
                            <P>{labels.content.specialtyText}</P>
                            <P>{this.props.formatCurrency(this.appState.specialtyAccountBalance)}</P>
                        </View>
                        <View style={this.style.textContentContainer}>
                            <P>{labels.content.automaticPaymentText}</P>
                            <this.AutomaticPaymentSection />
                        </View>
                    </>
                )}
            </View>
        );
    };
}
