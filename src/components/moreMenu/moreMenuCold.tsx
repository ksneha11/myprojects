import React from 'react';
import serviceConfig from '../../../generated/serviceConfig.json';
import { Labels } from '../../context/abstractAppContext';
import { MoreMenuColdActions } from '../../context/navigation/actions';
import { FeatureNames, Features, Pressable } from '../../models';
import { IconNames } from '../../styles';
import StyledComponent, { StyleProps } from '../styledComponent';
import MoreMenu, { MenuSection } from './moreMenu';
import defaultStyle, { MoreMenuStyleSchema } from './moreMenu.style';

interface Props extends StyleProps {
    children: (parent: MoreMenuCold) => React.ReactNode;

    menuItems: (
        features: FeatureNames,
        getFindADoctorMenuItem: (labelText: string) => Pressable,
        labels: Labels
    ) => MenuSection[];
    style?: Partial<MoreMenuStyleSchema>;
}

const defaultProps = {
    children: ({ features, labels, props, getFindADoctorMenuItem }) => {
        return (
            <MoreMenu
                menuItems={() => props.menuItems(features, getFindADoctorMenuItem, labels)}
                showTitle={false}
                title={labels.moreMenuCold.title}
            />
        );
    },
    menuItems: (features: Features, getFindADoctorMenuItem, { moreMenuCold }: Labels): MenuSection[] => {
        const manageHealthcareLabels = moreMenuCold.manageHealthcare;
        const supportLabels = moreMenuCold.support;
        const multiState = features.isRendered(FeatureNames.MULTI_STATE);
        return [
            {
                items: [getFindADoctorMenuItem(manageHealthcareLabels.findADoctor)],
                title: manageHealthcareLabels.title,
            },
            {
                items: [
                    ...(features.isRendered(FeatureNames.LANGUAGES)
                        ? [
                              {
                                  action: MoreMenuColdActions.LANGUAGES_PRESSED,
                                  iconLeft: IconNames.LANGUAGES,
                                  text: supportLabels.appLanguage,
                              },
                          ]
                        : []),
                    ...(features.isRendered(FeatureNames.SUPPORT_FREQUENT_QUESTIONS)
                        ? [
                              {
                                  action: MoreMenuColdActions.FAQ_PRESSED,
                                  iconLeft: IconNames.INPUT_VALIDATOR_INITIAL_ICON,
                                  text: supportLabels.frequentQuestions,
                              },
                          ]
                        : []),
                    ...(features.isRendered(FeatureNames.ACCESSIBILITY)
                        ? [
                              {
                                  action: MoreMenuColdActions.ACCESSIBILITY_PRESSED,
                                  iconLeft: IconNames.ACCESSIBILITY,
                                  text: supportLabels.accessibility,
                              },
                          ]
                        : []),
                    ...(features.isRendered(FeatureNames.PRIVACY_POLICY)
                        ? [
                              {
                                  action: MoreMenuColdActions.PRIVACY_POLICY_PRESSED,
                                  iconLeft: IconNames.INPUT_SECURE_ICON,
                                  text: supportLabels.privacyPolicy,
                              },
                          ]
                        : []),
                    ...(features.isRendered(FeatureNames.TERMS_OF_USE)
                        ? [
                              {
                                  action: MoreMenuColdActions.TERMS_OF_USE_PRESSED,
                                  iconLeft: IconNames.TERMS_OF_USE,
                                  text: supportLabels.tou,
                              },
                          ]
                        : []),
                    ...(features.isRendered(FeatureNames.WASTE_FRAUD_ABUSE)
                        ? [
                              {
                                  action: MoreMenuColdActions.WASTE_FRAUD_ABUSE_PRESSED,
                                  iconLeft: IconNames.WASTE_FRAUD_ABUSE,
                                  iconRight: IconNames.EXTERNAL_LINK,
                                  text: supportLabels.wasteFraudAbuse,
                              },
                          ]
                        : []),
                    ...(features.isRendered(FeatureNames.VISIT_WEBSITE)
                        ? [
                              {
                                  action: multiState
                                      ? MoreMenuColdActions.VISIT_WEBSITE_PRESSED_MULTI_STATE
                                      : MoreMenuColdActions.VISIT_WEBSITE_PRESSED_SINGLE_STATE,
                                  iconLeft: IconNames.VISIT_WEBSITE,
                                  iconRight: multiState ? IconNames.LIST_ITEM_NAVIGATE_ICON : IconNames.EXTERNAL_LINK,
                                  text: supportLabels.visitWebsite,
                              },
                          ]
                        : []),
                    ...(serviceConfig.adminPanel
                        ? [
                              {
                                  action: MoreMenuColdActions.ADMIN_PANEL_PRESSED,
                                  iconLeft: IconNames.INFO_HELP_ICON,
                                  text: 'Admin Panel',
                              },
                          ]
                        : []),
                ],
                title: supportLabels.title,
            },
        ];
    },
};

export default class MoreMenuCold extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'MoreMenuCold';
    public style: MoreMenuStyleSchema;

    public render() {
        return <>{this.props.children(this)}</>;
    }

    protected getFindADoctorMenuItem = (labelText: string): Pressable => {
        return {
            action: MoreMenuColdActions.FIND_CARE_PRESSED,
            iconLeft: IconNames.TOOL_FIND_DOCTOR_ICON,
            iconRight: this.features.isRendered(FeatureNames.MULTI_PLAN)
                ? IconNames.LIST_ITEM_NAVIGATE_ICON
                : IconNames.EXTERNAL_LINK,
            param: { findDoctorUrl: this.appContent.deeplinks.findDoctor },
            text: labelText,
        };
    };
}
