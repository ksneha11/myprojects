export default interface ColorSchema {
    alerts: {
        confirmIcons: string;
        defaultBackground: string;
        dismissIcon: string;
        infoIcons: string;
        successBackground: string;
        warningBackground: string;
        warningIcons: string;
        warningText?: string;
    };
    bottomNavigation: {
        active: string;
        borderColor: string;
        // TODO: this is a temporary hack
        // we need this height for the bottom drawer component
        // in one of the last few PRs this was set to 56
        // https://bitbucket.anthem.com/projects/MOBGEN/repos/atlas-medicaid/pull-requests/399/diff
        // should refactor this and remove it from the color schema
        height?: number;
        inactive: string;
    };
    carousel: {
        pagination: {
            dotColor: string;
            inactiveDotColor: string;
            inactiveDotColorBorder: string;
        };
    };
    chat?: {
        message?: {
            recipient: {
                backgroundColor: string;
                typingAnimationColor: string;
            };
            sender?: {
                backgroundColor: string;
                textColor: string;
                typingAnimationColor: string;
            };
        };
        timeStampColor: string;
    };
    checkbox: {
        activeColor: string;
        inactiveColor: string;
    };
    drawerMenu: {
        backgroundColor: string;
        iconColor: string;
    };
    dropDown: {
        iOS: {
            header: {
                backgroundColor: string;
                borderColor: string;
                textColor: string;
            };
        };
    };
    headerGradient: {
        endColor: string;
        iOSSafeAreaColor: string;
        startColor: string;
    };
    iconSizes: {
        large: number;
        medium: number;
        small: number;
    };
    list: {
        expandIcon: string;
        listItem: {
            status: string;
        };
    };
    listModal: {
        itemDescription: string;
    };
    loadingIndicatorColor: string;
    map: {
        activeMarker: string;
        defaultMarker: string;
    };
    menus: {
        menuItems: {
            backgroundColor: string;
            borders: string;
            categories: {
                backgroundColor: string;
                foregroundColor: string;
            }; // menu items that aren't part of the menu, just title'd separators
            foregroundColor: string;
            helperIcons: string; // typically the graphic on the left of the list item
            navigationIcons: string; // typically the caret on the right of the list item
        };
    };
    modals: {
        backdrop: string;
        backgroundColor: string;
        footerColor: string;
        foregroundColor: string;
        secondaryText: string;
        solidBackgroundColor: string;
    };
    pageHeader: {
        background: string;
        backIcon: string;
        title: string;
    };
    pageHeaderLabel: {
        color: string;
    };
    pages: {
        backgroundColor: string;
        bannerHeading: {
            gradientEnd: string;
            gradientStart: string;
            textColor: string;
        };
        formColors: {
            actionButtons: {
                backgroundColor: string;
                foregroundColor: string;
            };
            actionIcons: string;
            alertNotifications: {
                backgroundColor: string;
                foregroundColor: string;
            };
            box: {
                placeholder: string;
            };
            cancelButtons: {
                backgroundColor: string;
                foregroundColor: string;
            };
            cards: {
                backgroundColor: string;
                foregroundColor: string;
            };
            descriptiveText: string;
            disableable: {
                disabledColor: string;
                disabledTitleColor: string;
                enabledColor: string;
            };
            errorBanner: {
                textColor: string;
            };
            expandableIcons: string;
            externalLinkIcons: string;
            filterButtons: {
                active: {
                    backgroundColor: string;
                    borderColor: string;
                    foregroundColor: string;
                };
            };
            formField: {
                inputBorders: string;
                inputBordersAlternative: string;
                inputBordersFocused: string;
                inputErrorBackground: string;
                inputErrorBorders: string;
                inputIcons: string;
                inputLabels: string;
                inputTexts: string;
                selectedBackground: string;
            };
            horizontalSeparators: string;
            links: string;
            neutralButtons: {
                backgroundColor: string;
                foregroundColor: string;
            };
            onboardButtons?: {
                backgroundColor: string;
            };
            paragraphs: string;
            sectionHeaders: string;
            shadows: string;
            subHeaders: string;
            toggleable: {
                active: {
                    backgroundColor: string;
                    color: string;
                };
                inactive: {
                    backgroundColor: string;
                    color: string;
                };
            };
            validation: {
                invalid: string;
                valid: string;
            };
            warningIcons: string;
            warningLabels: string;
        };
        layout: {
            lineHeight: number;
            paddingHorizontal: number;
        };
        pageTitles: {
            backgroundColor: string;
            foregroundColor: string;
        };
        text: {
            disabled: string;
            disclaimerCopy: string;
            finePrint: string;
            h1: string;
            h2: string;
            h3: string;
            h4: string;
            h5: string;
            helper: string;
            paragraph: string;
            title: string;
        };
    };
    progressor: {
        active: {
            color: string;
            container: string;
        };
        backgroundColor: string;
        inactive: {
            color: string;
            container: string;
        };
    };
    radioButton: {
        backgroundColor: string;
        selectedInnerColor: string;
        selectedOuterBorder: string;
        unselectedBorder: string;
        unselectedBorderAndroid: string;
    };
    renewalDateTitle: {
        color: string;
    };
    shadow: {
        // Default shadow styling for each app
        elevation: number;
        shadowColor: string;
        shadowOffset: { height: number; width: number };
        shadowOpacity: number;
        shadowRadius: number;
    };
    tabBars: {
        backgroundColor: string;
        borderColor: string;
    };
    table: {
        row: {
            backgroundColor: string;
            borderColor: string;
        };
        rowHeader: {
            backgroundColor: string;
            borderColor: string;
        };
        stripes: {
            backgroundColor: string;
        };
    };
    tabs: {
        backgroundColor: string;
        foregroundColor: string;
        selectedTab: string;
        textColor: string;
    };
    toggleSwitch: {
        active: string;
        activeButton: string;
        inactive: string;
        inactiveButton: string;
    };
    tooltips: {
        backgroundColor: string;
        foregroundColor: string;
    };
    topTabs: {
        activeBackgroundColor: string;
        activeTextColor: string;
        inactiveBackgroundColor: string;
        inactiveTextColor: string;
    };
    typeFace: string;
    typeFaceBold: string;
    typeFaceHelper: string;
    typeFaceLight: string;
    typeFaceParagraph: string;
    typeFaceParagraphBold?: string;
    typeFaceTitle: string;
}
