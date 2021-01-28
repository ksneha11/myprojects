import { AccountInfo } from 'atlas-services/src/models';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { HorizontalRule } from '../..';
import { HitSlop } from '../../../models';
import { IconNames } from '../../../styles';
import { H1, H2, H3, P, PrimaryButton, TextLink } from '../../common';
import Icon from '../../common/icon';
import TextButton from '../../common/textButton';
import StyledComponent, { StyleProps } from '../../styledComponent';
import { AutomaticPaymentsDisabledStyleSchema, defaultStyle } from './index';

export interface Props extends StyleProps {
    children?: (parent: AutomaticPaymentsDisabledView) => React.ReactNode;
    memberName: string;
    onReturnToHomePressed: () => void;
    onSetUpAdditionalMembersPressed: () => void;
    onSetUpPressed: () => void;
    primaryButtonTitle: string;
    setupAdditionalMembersHitSlop?: HitSlop;
    specialtyAccounts: AccountInfo[];
    style?: Partial<AutomaticPaymentsDisabledStyleSchema>;
}

export const defaultProps = {
    children: ({
        BottomControls,
        Disclaimer,
        Header,
        HorizontalRuleNoMargin,
        MemberInfo,
        SetUpAdditionalMembersContainer,
        StatusInfo,
    }: AutomaticPaymentsDisabledView) => {
        return (
            <>
                <Header />
                <Disclaimer />
                <MemberInfo />
                <StatusInfo />
                <HorizontalRuleNoMargin />
                <SetUpAdditionalMembersContainer />
                <HorizontalRuleNoMargin />
                <BottomControls />
            </>
        );
    },
    setUpAdditionalMembersHitSlop: { bottom: 10, left: 0, right: 0, top: 10 },
};

export default class AutomaticPaymentsDisabledView extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'AutomaticPaymentsDisabled';
    public style: AutomaticPaymentsDisabledStyleSchema;

    public BottomControls = () => {
        const { onReturnToHomePressed, primaryButtonTitle } = this.props;
        return (
            <View style={this.style.footerContainer}>
                <PrimaryButton onPress={onReturnToHomePressed} title={primaryButtonTitle} />
            </View>
        );
    };

    public Container = ({ children }: { children: Children }) => {
        return <View style={this.style.rootContainer}>{children}</View>;
    };

    public Disclaimer = () => {
        const labels = this.labels.automaticPaymentsDisabled;
        return (
            <View style={this.style.discliamerContainer}>
                <P>{labels.unerolledDisclaimer}</P>
            </View>
        );
    };

    public Header = () => {
        const labels = this.labels.automaticPaymentsDisabled;

        return (
            <View style={this.style.headerContainer}>
                <H1>{labels.youHaveUnenrolled}</H1>
            </View>
        );
    };

    public HorizontalRuleNoMargin = () => {
        return <HorizontalRule style={{ horizontalRule: this.style.horizontalRuleNoMargin }} />;
    };

    public MemberInfo = () => {
        const labels = this.labels.automaticPaymentsDisabled;

        return (
            <View style={this.style.memberInfoContainer}>
                <H2>{`${labels.member} ${this.props.memberName}`}</H2>
            </View>
        );
    };

    public render() {
        return <this.Container>{this.props.children(this)}</this.Container>;
    }

    // Content should display if there exist multiple specialty accounts
    public SetUpAdditionalMembersContainer = () => {
        const labels = this.labels.automaticPaymentsDisabled;

        return (
            <>
                {this.props.specialtyAccounts && this.props.specialtyAccounts.length > 1 && (
                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityLabel={labels.setUpAdditionalMembers}
                        hitSlop={this.props.setupAdditionalMembersHitSlop}
                        onPress={this.props.onSetUpAdditionalMembersPressed}
                        style={this.style.setUpAdditionalMembersContainer}
                    >
                        <View style={this.style.setUpAdditionaMembersTextContainer}>
                            <TextLink onPress={this.props.onSetUpAdditionalMembersPressed}>
                                {labels.setUpAdditionalMembers}
                            </TextLink>
                        </View>
                        <Icon style={{ rootItem: this.style.iconRight }} name={IconNames.LIST_ITEM_NAVIGATE_ICON} />
                    </TouchableOpacity>
                )}
            </>
        );
    };

    public StatusInfo = () => {
        const labels = this.labels.automaticPaymentsDisabled;

        return (
            <View style={this.style.enrollmentStatusContainer}>
                <H3 accessibilityLabel={`${labels.status},`}>
                    {labels.status}
                </H3>
                <View style={this.style.setUpContainer}>
                    <TextButton onPress={this.props.onSetUpPressed} isUnderlined>
                        {labels.setUp}
                    </TextButton>
                </View>
            </View>
        );
    };
}
