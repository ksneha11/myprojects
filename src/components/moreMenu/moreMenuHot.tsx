import React from 'react';
import { Labels } from '../../context/abstractAppContext';
import { MoreMenuHotActions } from '../../context/navigation/actions';
import { FeatureNames, Pressable } from '../../models';
import { RestrictionName } from '../../models/restriction';
import { IconNames } from '../../styles';
import { MenuSection } from '../profile/profile/profileLandingPage';
import StyledComponent, { StyleProps } from '../styledComponent';
import MoreMenu from './moreMenu';
import defaultStyle, { MoreMenuStyleSchema } from './moreMenu.style';

interface Props extends StyleProps {
    children: (parent: MoreMenuHot) => React.ReactNode;
    menuItems: (features: FeatureNames, label: Labels, getBenefitsMenuItem: () => Pressable) => MenuSection[];
    style?: Partial<MoreMenuStyleSchema>;
}

export const defaultProps = {
    children: ({ features, getBenefitsMenuItem, labels, props }) => {
        return (
            <MoreMenu
                menuItems={() => props.menuItems(features, labels, getBenefitsMenuItem)}
                title={labels.moreMenuHot.title}
            />
        );
    },
    menuItems: (features, { moreMenuHot }: Labels, getBenefitsMenuItem: () => Pressable): MenuSection[] => {
        const manageHealthcareLabels = moreMenuHot.manageHealthcare;
        const supportLabels = moreMenuHot.support;
        return [
            {
                items: [
                    ...(features.isRendered(FeatureNames.PROFILE)
                        ? [
                              {
                                  action: MoreMenuHotActions.PROFILE_PRESSED,
                                  iconLeft: IconNames.PROFILE,
                                  text: manageHealthcareLabels.profile,
                              },
                          ]
                        : []),
                    ...(features.isRendered(FeatureNames.FIND_CARE)
                        ? [
                              {
                                  action: MoreMenuHotActions.FIND_CARE_PRESSED,
                                  iconLeft: IconNames.INPUT_SEARCH_ICON,
                                  text: manageHealthcareLabels.findCare,
                              },
                          ]
                        : []),
                    ...(features.isRendered(FeatureNames.PLAN_BENEFITS) ? [getBenefitsMenuItem()] : []),
                    ...(features.isRendered(FeatureNames.PHARMACY_DEEPLINKED)
                        ? [
                              {
                                  action: MoreMenuHotActions.PHARMACY_PRESSED,
                                  iconLeft: IconNames.TOOL_FIND_PHARMACY_ICON,
                                  iconRight: IconNames.EXTERNAL_LINK,
                                  text: manageHealthcareLabels.pharmacy,
                              },
                          ]
                        : []),
                ],
                title: manageHealthcareLabels.title,
            },
            {
                items: [
                    ...(features.isRendered(FeatureNames.CONTACT_US)
                        ? [
                              {
                                  action: MoreMenuHotActions.CONTACT_US_PRESSED,
                                  iconLeft: IconNames.COMMUNICATION_PREFERENCES,
                                  text: supportLabels.contactUs,
                              },
                          ]
                        : []),
                    ...(features.isRendered(FeatureNames.SUPPORT_MESSAGE)
                        ? [
                              {
                                  action: MoreMenuHotActions.MESSAGE_US_PRESSED,
                                  iconLeft: IconNames.APP_MAIN_NAVIGATE_CONTACT_US_ICON,
                                  iconRight: IconNames.EXTERNAL_LINK,
                                  text: supportLabels.messagesToUs,
                              },
                          ]
                        : []),
                    ...(features.isRendered(FeatureNames.SUPPORT_CALL)
                        ? [
                              {
                                  action: MoreMenuHotActions.REQUEST_CALL_PRESSED,
                                  iconLeft: IconNames.CALL,
                                  iconRight: IconNames.EXTERNAL_LINK,
                                  text: supportLabels.requestACall,
                              },
                          ]
                        : []),
                    ...(features.isRendered(FeatureNames.SUPPORT_FREQUENT_QUESTIONS)
                        ? [
                              {
                                  action: MoreMenuHotActions.FAQ_PRESSED,
                                  iconLeft: IconNames.INPUT_VALIDATOR_INITIAL_ICON,
                                  text: supportLabels.frequentQuestions,
                              },
                          ]
                        : []),
                    ...(features.isRendered(FeatureNames.ABOUT_APP)
                        ? [
                              {
                                  action: MoreMenuHotActions.ABOUT_APP_PRESSED,
                                  iconLeft: IconNames.ABOUT_APP,
                                  text: supportLabels.aboutApp,
                              },
                          ]
                        : []),
                    {
                        action: MoreMenuHotActions.LOGOUT_PRESSED,
                        iconLeft: IconNames.LOGOUT,
                        iconRight: null,
                        text: supportLabels.logout,
                    },
                ],
                title: supportLabels.title,
            },
        ];
    },
};

export default class MoreMenuHot extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'MoreMenuHot';
    public style: MoreMenuStyleSchema;

    public render() {
        return <>{this.props.children(this)}</>;
    }

    protected getBenefitsMenuItem = (): Pressable => {
        const hasBenefitsPageRestriction: boolean =
            this.features.getRestriction(FeatureNames.PLAN_BENEFITS) &&
            this.features.getRestriction(FeatureNames.PLAN_BENEFITS).name === RestrictionName.BENEFITS_PAGE;

        return {
            action: hasBenefitsPageRestriction
                ? MoreMenuHotActions.BENEFITS_EXTERNAL_PRESSED
                : MoreMenuHotActions.PLAN_BENEFITS_PRESSED,
            iconLeft: IconNames.PLAN_BENEFITS,
            iconRight: hasBenefitsPageRestriction ? IconNames.EXTERNAL_LINK : IconNames.LIST_ITEM_NAVIGATE_ICON,
            text: this.labels.moreMenuHot.manageHealthcare.benefits,
        };
    };
}
