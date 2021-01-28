import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { Labels } from '../../context/abstractAppContext';
import { ProfileActions } from '../../context/navigation/actions';
import { FeatureNames, Pressable } from '../../models';
import { BodyCopy, H1 } from '../common';
import { MenuPages } from '../common/menuPages';
import StyledComponent, { StyleProps } from '../styledComponent';
import { ContactInformationStyleSchema, defaultStyle } from './index';

export interface Props extends StyleProps {
    children?: (parent: ContactInformationView) => React.ReactNode;
    menuItems?: (features, label) => Pressable[];
    style?: Partial<ContactInformationStyleSchema>;
}

export const defaultProps = {
    children: ({ TitleContainer, ScreenTitle, SubHeading, props, features, labels, style }: ContactInformationView) => {
        return (
            <>
                <TitleContainer>
                    <ScreenTitle />
                    <SubHeading />
                </TitleContainer>
                <MenuPages>
                    {({ Menu }) => {
                        return <Menu hasHeader={false} menuItems={props.menuItems(features, labels)} />;
                    }}
                </MenuPages>
            </>
        );
    },
    menuItems: (features, { contactInformation }: Labels): Pressable[] => {
        const labels = contactInformation.menuItems;
        return [
            ...(features.isRendered(FeatureNames.PROFILE_PHYSICAL_ADDRESSES)
                ? [
                      {
                          action: ProfileActions.PHYSICAL_ADDRESSES_PRESSED,
                          text: labels.physicalAddresses,
                      },
                  ]
                : []),
            ...(features.isRendered(FeatureNames.PROFILE_EMAIL_ADDRESSES)
                ? [
                      {
                          action: ProfileActions.EMAIL_ADDRESSES_PRESSED,
                          text: labels.emailAddresses,
                      },
                  ]
                : []),
            ...(features.isRendered(FeatureNames.PROFILE_VOICE_NUMBERS)
                ? [
                      {
                          action: ProfileActions.VOICE_NUMBERS_PRESSED,
                          text: labels.voiceNumbers,
                      },
                  ]
                : []),
            ...(features.isRendered(FeatureNames.PROFILE_TEXT_NUMBERS)
                ? [
                      {
                          action: ProfileActions.TEXT_NUMBERS_PRESSED,
                          text: labels.textNumbers,
                      },
                  ]
                : []),
            ...(features.isRendered(FeatureNames.TWO_FACTOR_AUTHENTICATION)
                ? [
                      {
                          action: ProfileActions.ACCOUNT_RECOVERY_NUMBER_PRESSED,
                          text: labels.accountRecoveryNumber,
                      },
                  ]
                : []),
        ];
    },
};

export default class ContactInformationView extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'ContactInformation';
    public style: ContactInformationStyleSchema;

    public Container = ({ children }: { children: Children }) => {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={this.style.rootContainer}>{children}</View>
            </SafeAreaView>
        );
    };

    public render() {
        return <this.Container>{this.props.children(this)}</this.Container>;
    }

    public ScreenTitle = () => <H1>{this.labels.contactInformation.screenTitle}</H1>;

    public SubHeading = () => {
        return <BodyCopy>{this.labels.contactInformation.subHeading}</BodyCopy>;
    };

    public TitleContainer = ({ children }: { children?: Children }) => {
        return <View style={this.style.titleContainer}>{children || null}</View>;
    };
}
