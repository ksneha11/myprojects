import { DrugAlternative, PharmacyPricingType, PricingDetails } from 'atlas-services/src/models';
import DrugDetails, { PriceDetails } from 'atlas-services/src/models/response/drugDetailResponse';
import React from 'react';
import { View } from 'react-native';
import { Card, P } from '.';
import { DisclaimerCopy, H1, H2, IconTextLink, InlineAlert, PrimaryButton } from '..';
import { IconNames } from '../../styles';
import { formatCurrency } from '../../utils';
import StyledComponent, { StyleProps } from '../styledComponent';
import defaultStyle, { PrescriptionPricingCardStyleSchema } from './prescriptionPricingCard.style';

interface Props extends StyleProps {
    drugDetails?: DrugDetails;
    isBrandDrug?: boolean;
    isFooterVisible?: boolean;
    mailPrice?: boolean;
    onPrimaryButtonPress?: () => void; // TODO :- will be mandatory as do start a new prescription
    onPrimaryTextLinkPress?: () => void; // TODO :- will be mandatory as do start a new prescription
    onSecondaryTextLinkPress?: () => void; // TODO :- will be mandatory as do start a new prescription
    requestANewPrescriptionSuppressed?: boolean;
    showDrugNotFoundCard: boolean;
    theraputicDetails?: DrugAlternative;
}

const defaultProps = {
    isBrandDrug: true,
    isFooterVisible: false,
    mailPrice: true,
    requestANewPrescriptionSuppressed: false,
    showDrugNotFoundCard: false,
};

enum CoverageStatus {
    COVERED = 'Covered',
    NOT_COVERED = 'NotCovered',
}
export default class PrescriptionPricingCard extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'PrescriptionPricingCard';
    public pricingCardLabels = this.labels.prescriptionPricingCard;
    public style: PrescriptionPricingCardStyleSchema;

    public AlternativePrescriptionCard = () => {
        return (
            <>
                <Card {...this.props}>
                    {({ style }) => {
                        return (
                            <>
                                <View style={style.rootContainer}>
                                    <View style={this.style.mainCardContentContainer}>
                                        <this.AlternativePrescriptionDetails />
                                    </View>
                                </View>
                            </>
                        );
                    }}
                </Card>
            </>
        );
    };

    public AlternativePrescriptionDetails = () => {
        const { drugName, memberCost } = this.getAlternativeDetails(this.props.theraputicDetails);
        return (
            <View>
                <P style={{ paragraph: this.style.sectionText }}>{this.pricingCardLabels.genericPrescriptionType}</P>
                <H2 accessibilityRole="text" style={{ h2: this.style.drugNameText }}>
                    {drugName}
                </H2>
                {memberCost}
            </View>
        );
    };

    public BrandPrescriptionCard = () => {
        return (
            <Card
                footerText={' '}
                style={{
                    footerContainer: this.style.footerContainer,
                }}
                {...this.props}
            >
                {({ Footer, style }) => {
                    return (
                        <View style={style.rootContainer}>
                            <View style={this.style.mainCardContentContainer}>
                                <this.PrescriptionDetails />
                                <this.PrescriptionLinksContainer />
                            </View>
                            {this.props.isFooterVisible && (
                                <Footer>
                                    <View style={this.style.footerCardContentContainer}>
                                        <this.RequestANewPrescription />
                                    </View>
                                </Footer>
                            )}
                        </View>
                    );
                }}
            </Card>
        );
    };

    public NoDrugsFound = () => {
        const brandOrGenericLabel: string = this.props.isBrandDrug
            ? this.pricingCardLabels.brandPrescriptionType
            : this.pricingCardLabels.genericPrescriptionType;
        return (
            <Card {...this.props}>
                {({ style }) => {
                    return (
                        <View style={style.rootContainer}>
                            <View style={this.style.mainCardContentContainer}>
                                <P style={{ paragraph: this.style.sectionText }}>{brandOrGenericLabel}</P>
                                <H1 accessibilityRole="text" style={{ h1: this.style.memberCostText }}>
                                    {this.pricingCardLabels.drugNotAvailable}
                                </H1>
                            </View>
                        </View>
                    );
                }}
            </Card>
        );
    };

    public PrescriptionDetails = () => {
        const { brandOrGeneric, drugName, memberCost } = this.getPrescriptionDetails(this.props.drugDetails);
        return (
            <View>
                <P style={{ paragraph: this.style.sectionText }}>{brandOrGeneric}</P>
                <H2 accessibilityRole="text" style={{ h2: this.style.drugNameText }}>
                    {drugName}
                </H2>
                {memberCost}
            </View>
        );
    };

    public PrescriptionLink = ({
        iconName,
        isTextLinkDisabled,
        onPress,
        textLinkText,
    }: {
        iconName: IconNames;
        isTextLinkDisabled?: boolean;
        onPress: any;
        textLinkText: string;
    }) => {
        return (
            <IconTextLink
                isDisabled={isTextLinkDisabled}
                accessibilityLabel={textLinkText}
                iconName={iconName}
                isIconRight
                onPress={onPress}
                style={{ icon: { ...this.style.iconStyle, ...this.style.iconContainer } }}
            >
                {textLinkText}
            </IconTextLink>
        );
    };

    public PrescriptionLinksContainer = () => {
        const pricingDetails = this.props.mailPrice
            ? this.props.drugDetails?.mailPrice
            : this.props.drugDetails?.retailPrice;
        const memberAndEmployerConst = this.getMemberAndEmployerConst(pricingDetails);
        const isCostDetailsLinkDisabled = isNaN(parseFloat(memberAndEmployerConst.memberCost));
        const isBeAdvisedLinkDisabled = !(pricingDetails?.rejectionMessages?.length > 0);

        return (
            <View style={this.style.prescriptionLinkContainer}>
                <this.PrescriptionLink
                    isTextLinkDisabled={isCostDetailsLinkDisabled}
                    iconName={IconNames.LIST_ITEM_NAVIGATE_ICON}
                    onPress={this.props.onSecondaryTextLinkPress}
                    textLinkText={this.pricingCardLabels.prescriptionLinks.costDetailsTextLink}
                />
                <DisclaimerCopy style={{ disclaimerCopy: this.style.prescriptionLinksSeperator }}>{'|'}</DisclaimerCopy>
                <this.PrescriptionLink
                    isTextLinkDisabled={isBeAdvisedLinkDisabled}
                    iconName={IconNames.LIST_ITEM_NAVIGATE_ICON}
                    onPress={this.props.onPrimaryTextLinkPress}
                    textLinkText={this.pricingCardLabels.prescriptionLinks.beAdvisedTextLink}
                />
            </View>
        );
    };

    public render() {
        if (!!this.props.drugDetails?.name) {
            return <this.BrandPrescriptionCard />;
        } else if (!!this.props.theraputicDetails?.alternativeMedication?.name) {
            return <this.AlternativePrescriptionCard />;
        } else if (this.props.showDrugNotFoundCard) {
            return <this.NoDrugsFound />;
        }

        return null;
    }

    public RequestANewPrescription = () => {
        return this.props.requestANewPrescriptionSuppressed ? (
            <InlineAlert alertType="warning">{this.pricingCardLabels.requestANewPrescriptionAlert}</InlineAlert>
        ) : (
            <PrimaryButton
                onPress={this.props.onPrimaryButtonPress}
                title={this.pricingCardLabels.requestPrescriptionButton}
            />
        );
    };

    protected getAlternativeCoverageStatus = (drugCoverageStatus: string) => {
        let coverageStatus = drugCoverageStatus ?? '';
        if (coverageStatus) {
            if (coverageStatus === CoverageStatus.COVERED) {
                coverageStatus = this.pricingCardLabels.coverageStatus.covered;
            } else if (coverageStatus === CoverageStatus.NOT_COVERED) {
                coverageStatus = this.pricingCardLabels.coverageStatus.NotCovered;
            } else {
                coverageStatus = '';
            }
        }
        return coverageStatus;
    };

    protected getAlternativeDetails = (drugAlternative: DrugAlternative) => {
        let drugName: string = '';
        const memberCost: JSX.Element = this.getAlternativePricing(drugAlternative?.pricingDetails);
        drugName = drugAlternative?.alternativeMedication?.name ?? '';
        return { drugName, memberCost };
    };

    protected getAlternativePricing = (pricingDetails: PricingDetails[]) => {
        // TODO: Snatched this logic from the alternatives part of priceAMed
        //       once this is implemented we can see if we can remove a lot of that logic
        const estimatedCostDetails = this.getAlternativePricingDetails(pricingDetails);
        let estimatedOutOfPocketCost = '';
        if (estimatedCostDetails?.coverageInfo?.estimatedOutOfPocketCost) {
            estimatedOutOfPocketCost = isNaN(parseFloat(estimatedCostDetails.coverageInfo.estimatedOutOfPocketCost))
                ? ''
                : estimatedCostDetails.coverageInfo.estimatedOutOfPocketCost.toString();
        }
        const memberCost = estimatedOutOfPocketCost ? formatCurrency(estimatedOutOfPocketCost) : null;
        const coverageStatus = this.getAlternativeCoverageStatus(
            estimatedCostDetails?.coverageInfo?.drugCoverageStatus
        );
        const displayCost = memberCost ?? this.pricingCardLabels.pricing.standardDrugPricingUnavaliable;
        const displayDisclaimer =
            memberCost && coverageStatus
                ? this.formatLabel(this.pricingCardLabels.coverageStatus.alternativeCoverageStatus, coverageStatus)
                : '';
        return (
            <View>
                <P style={{ paragraph: this.style.sectionText }}>{this.pricingCardLabels.pricing.memberCostTitle}</P>
                <View style={this.style.memberCostContainer}>
                    <H1 accessibilityRole="text" style={{ h1: this.style.memberCostText }}>
                        {displayCost}
                    </H1>
                    <DisclaimerCopy
                        accessible={!!displayDisclaimer}
                        style={{ disclaimerCopy: this.style.employerCostDisclaimerCopy }}
                    >
                        {displayDisclaimer}
                    </DisclaimerCopy>
                </View>
            </View>
        );
    };
    protected getAlternativePricingDetails = (pricingDetails: PricingDetails[]): PricingDetails => {
        let mailPrice: PricingDetails = null;
        let retailPrice: PricingDetails = null;
        pricingDetails.forEach(pricingDetail => {
            const pharmacyType: string =
                pricingDetail.pharmacyInfo?.type ||
                this.logger.warn('pharmacy info/type does not exist on pricing detail') ||
                '';
            if (pharmacyType.trim().toUpperCase() === PharmacyPricingType.MAIL) {
                mailPrice = pricingDetail;
            } else if (pharmacyType.trim().toUpperCase() === PharmacyPricingType.NINETY_DAY_RETAIL) {
                retailPrice = pricingDetail;
            }
        });
        return this.props.mailPrice ? mailPrice : retailPrice;
    };

    protected getDrugPricingDetails = (drugDetails: DrugDetails) => {
        const pricingDetails = this.props.mailPrice ? drugDetails?.mailPrice : drugDetails?.retailPrice;
        const memberAndEmployerConst = this.getMemberAndEmployerConst(pricingDetails);
        const isEmployerCostVisible: boolean = !isNaN(parseFloat(memberAndEmployerConst.employerCost));
        const memberCost = isNaN(parseFloat(memberAndEmployerConst.memberCost))
            ? memberAndEmployerConst.memberCost
            : formatCurrency(memberAndEmployerConst.memberCost);
        return (
            <View>
                <P style={{ paragraph: this.style.sectionText }}>{this.pricingCardLabels.pricing.memberCostTitle}</P>
                <View style={this.style.memberCostContainer}>
                    <H1 accessibilityRole="text" style={{ h1: this.style.memberCostText }}>
                        {memberCost}
                    </H1>
                    {isEmployerCostVisible && (
                        <DisclaimerCopy style={{ disclaimerCopy: this.style.employerCostDisclaimerCopy }}>
                            {memberAndEmployerConst.employerCost}
                        </DisclaimerCopy>
                    )}
                </View>
            </View>
        );
    };

    protected getMemberAndEmployerConst = (
        pricingDetails: PriceDetails
    ): { employerCost: string; memberCost: string } => {
        let memberCost: string = '';
        let employerCost: string = '';
        if (isNaN(parseFloat(pricingDetails?.memberCost?.cost))) {
            memberCost = this.pricingCardLabels.pricing.standardDrugPricingUnavaliable;
            employerCost = '';
        } else {
            memberCost = pricingDetails.memberCost.cost;
            employerCost = isNaN(parseFloat(pricingDetails?.employerCost?.cost))
                ? this.pricingCardLabels.coverageStatus.noEmployerCost
                : (this.formatLabel(
                      this.pricingCardLabels.coverageStatus.employerCost,
                      formatCurrency(pricingDetails.employerCost.cost)
                  ) as string);
        }
        return { employerCost, memberCost };
    };

    protected getPrescriptionDetails = (drugDetails: DrugDetails) => {
        const brandOrGeneric: string = drugDetails?.isBrandName
            ? this.pricingCardLabels.brandPrescriptionType
            : this.pricingCardLabels.genericPrescriptionType;
        let drugName: string = drugDetails?.name ?? '';
        const drugStrength = drugDetails?.strength ?? '';
        const memberCost: JSX.Element = this.getDrugPricingDetails(drugDetails);
        drugName = drugName + ' ' + drugStrength;
        return { brandOrGeneric, drugName, memberCost };
    };
}
