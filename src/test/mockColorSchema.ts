import { ColorSchema } from '../styles';

const BLACK = '#000000';

const BLUE = '#005DBF';
const BLUE_DARK = '#004085';
const BLUE_DARKER = '#002c7a';
const BLUE_LIGHT = '#009CDC';
const BLUE_LIGHTER = '#0091da';
const BLUE_MATTE = '#408bc6';
const BLUE_NAVY = '#005EB8';
const BLUE_SKY = '#339fdb';
const BLUE_SKY_DARK = '#1B79C2';

const DEFAULT_PAGE_PADDING = 20;

const GRADIENT_BLUE_CONTRAST = '#4578ba';
const GRADIENT_BLUE_DARK = '#003594';
const GRADIENT_BLUE_LIGHT = '#015ab0';

const GREEN = '#4d9d2e';

const GREY = '#9b9b9b';
const GREY_DARK = '#3d3d3d';
const GREY_DARKER = '#333333';
const GREY_GRAPHITE = '#4A4A4A';
const GREY_MATTERHORN = '#4d4d4d';
const GREY_LIGHT = '#e4e4e4';
const GREY_LIGHTER = '#eeeeee';
const GREY_OVERLAY = 'rgba(0, 0, 0, 0.65)';
const GREY_OVERLAY_LIGHT = '#f0f0f0';

const GREY_OVERLAY_SOLID = '#3c3c3c';
const GREY_SILVER = '#999999';
const GREY_SILVER_DARK = '#666666';
const GREY_SILVER_LIGHT = '#cccccc';

const IOS_UI_BACKGROUND = '#FAFAF8';
const IOS_UI_BORDER = '#E1E0E0';
const IOS_UI_TEXT = '#3172E3';

const OFFWHITE = '#fafafa';
const OFFWHITE_LIGHT = '#fcfcfc';

const ORANGE = '#ea7600';
const RED = '#e22319';

const TEAL = '#008d9b';
const TEAL_DARK = '#007d8a';
const TEAL_LIGHTER = '#10a8b7';

const WHITE = '#ffffff';
const WHITE_ORANGE_PALE = '#fffbf8';
export const mockColorSchema: ColorSchema = {
    alerts: {
        confirmIcons: BLUE_LIGHT,
        defaultBackground: OFFWHITE,
        dismissIcon: GREY_DARK,
        infoIcons: TEAL_DARK,
        successBackground: GREEN,
        warningBackground: WHITE_ORANGE_PALE,
        warningIcons: ORANGE,
    },
    bottomNavigation: {
        active: BLUE,
        borderColor: GREY_SILVER,
        inactive: WHITE,
    },
    carousel: {
        pagination: {
            dotColor: GREY_DARKER,
            inactiveDotColor: GREY_LIGHT,
            inactiveDotColorBorder: GREY_DARKER,
        },
    },
    chat: {
        message: {
            recipient: {
                backgroundColor: GREY_OVERLAY_LIGHT,
                typingAnimationColor: TEAL_DARK,
            },
            sender: {
                backgroundColor: TEAL_DARK,
                textColor: WHITE,
                typingAnimationColor: WHITE,
            },
        },
        timeStampColor: GREY,
    },
    checkbox: {
        activeColor: TEAL_DARK,
        inactiveColor: GREY,
    },
    drawerMenu: {
        backgroundColor: OFFWHITE,
        iconColor: BLUE,
    },
    dropDown: {
        iOS: {
            header: {
                backgroundColor: IOS_UI_BACKGROUND,
                borderColor: IOS_UI_BORDER,
                textColor: IOS_UI_TEXT,
            },
        },
    },
    headerGradient: {
        endColor: GRADIENT_BLUE_LIGHT,
        iOSSafeAreaColor: GRADIENT_BLUE_DARK,
        startColor: GRADIENT_BLUE_DARK,
    },
    iconSizes: {
        // Placeholders, fill in with what the standard icon sizes should be!
        large: 38,
        medium: 30,
        small: 24,
    },
    list: {
        expandIcon: GREY,
        listItem: {
            status: BLUE_LIGHT,
        },
    },
    listModal: {
        itemDescription: GREY_SILVER_DARK,
    },
    loadingIndicatorColor: TEAL,
    map: {
        activeMarker: BLUE_SKY,
        defaultMarker: GREY_GRAPHITE,
    },
    menus: {
        menuItems: {
            backgroundColor: WHITE,
            borders: GREY_LIGHT,
            categories: { backgroundColor: WHITE, foregroundColor: GREY_DARK },
            foregroundColor: TEAL_DARK,
            helperIcons: TEAL_DARK,
            navigationIcons: TEAL_DARK,
        },
    },
    modals: {
        backdrop: GREY_OVERLAY,
        backgroundColor: GREY_DARK,
        footerColor: GREY_LIGHTER,
        foregroundColor: WHITE,
        secondaryText: BLUE_LIGHT,
        solidBackgroundColor: GREY_OVERLAY_SOLID,
    },
    pageHeader: {
        backIcon: GREY_DARK,
        background: WHITE,
        title: GREY_DARK,
    },
    pageHeaderLabel: {
        color: GREY_DARKER,
    },
    pages: {
        backgroundColor: WHITE,
        bannerHeading: {
            gradientEnd: TEAL_DARK,
            gradientStart: TEAL,
            textColor: WHITE,
        },
        formColors: {
            actionButtons: {
                backgroundColor: TEAL_DARK,
                foregroundColor: WHITE,
            },
            actionIcons: BLUE,
            alertNotifications: {
                backgroundColor: BLACK,
                foregroundColor: BLACK,
            },
            box: {
                placeholder: GREY_GRAPHITE,
            },
            cancelButtons: {
                backgroundColor: WHITE,
                foregroundColor: TEAL_DARK,
            },
            cards: {
                backgroundColor: OFFWHITE_LIGHT,
                foregroundColor: GREY_DARK,
            },
            descriptiveText: GREY_DARK,
            disableable: {
                disabledColor: GREY_SILVER_LIGHT,
                disabledTitleColor: GREY_DARKER,
                enabledColor: BLACK,
            },
            errorBanner: {
                textColor: GREY_DARKER,
            },
            expandableIcons: TEAL_DARK,
            externalLinkIcons: GREY_SILVER_DARK,
            filterButtons: {
                active: {
                    backgroundColor: BLUE_SKY,
                    borderColor: GREY_LIGHT,
                    foregroundColor: WHITE,
                },
            },
            formField: {
                inputBorders: GREY_SILVER_LIGHT,
                inputBordersAlternative: TEAL,
                inputBordersFocused: GREY_SILVER_LIGHT,
                inputErrorBackground: WHITE,
                inputErrorBorders: ORANGE,
                inputIcons: TEAL_DARK,
                inputLabels: GREY_DARK,
                inputTexts: GREY_DARK,
                selectedBackground: GREY_LIGHT,
            },
            horizontalSeparators: GREY_LIGHT,
            links: TEAL_DARK,
            neutralButtons: {
                backgroundColor: WHITE,
                foregroundColor: TEAL_DARK,
            },
            paragraphs: GREY_DARK,
            sectionHeaders: BLUE,
            shadows: BLACK,
            subHeaders: GREY_DARK,
            toggleable: {
                active: {
                    backgroundColor: TEAL_DARK,
                    color: WHITE,
                },
                inactive: {
                    backgroundColor: WHITE,
                    color: BLACK,
                },
            },
            validation: {
                invalid: RED,
                valid: GREEN,
            },
            warningIcons: ORANGE,
            warningLabels: RED,
        },
        layout: {
            lineHeight: 14,
            paddingHorizontal: DEFAULT_PAGE_PADDING,
        },
        pageTitles: {
            backgroundColor: BLUE_MATTE,
            foregroundColor: BLUE,
        },
        text: {
            disabled: GREY_SILVER_DARK,
            disclaimerCopy: GREY,
            finePrint: GREY,
            h1: BLUE,
            h2: GREY_DARK,
            h3: GREY_DARK,
            h4: GREY_DARK,
            h5: GREY_DARK,
            helper: GREY_DARKER,
            paragraph: GREY_DARKER,
            title: GREY_MATTERHORN,
        },
    },
    progressor: {
        active: {
            color: WHITE,
            container: TEAL_DARK,
        },
        backgroundColor: WHITE,
        inactive: {
            color: GREY_SILVER,
            container: GREY_LIGHTER,
        },
    },
    radioButton: {
        backgroundColor: WHITE,
        selectedInnerColor: TEAL_DARK,
        selectedOuterBorder: TEAL_DARK,
        unselectedBorder: GREY_DARK,
        unselectedBorderAndroid: GREY,
    },
    renewalDateTitle: {
        color: GREY_DARKER,
    },
    shadow: {
        elevation: 1,
        shadowColor: GREY_SILVER_LIGHT,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
    },
    tabBars: {
        backgroundColor: WHITE,
        borderColor: GREY_DARK,
    },
    table: {
        row: {
            backgroundColor: WHITE,
            borderColor: GREY_LIGHT,
        },
        rowHeader: {
            backgroundColor: OFFWHITE,
            borderColor: GREY_LIGHT,
        },
        stripes: {
            backgroundColor: OFFWHITE,
        },
    },
    tabs: {
        backgroundColor: WHITE,
        foregroundColor: WHITE,
        selectedTab: BLUE,
        textColor: BLUE,
    },
    toggleSwitch: {
        active: TEAL_LIGHTER,
        activeButton: TEAL_DARK,
        inactive: GREY,
        inactiveButton: GREY_DARK,
    },
    tooltips: {
        backgroundColor: BLUE_DARK,
        foregroundColor: WHITE,
    },
    topTabs: {
        activeBackgroundColor: TEAL_DARK,
        activeTextColor: WHITE,
        inactiveBackgroundColor: GREY_LIGHT,
        inactiveTextColor: GREY_SILVER_DARK,
    },
    typeFace: 'Roboto',
    typeFaceBold: 'Calibri-Bold',
    typeFaceHelper: 'Roboto',
    typeFaceLight: 'Roboto-Light',
    typeFaceParagraph: 'Roboto',
    typeFaceTitle: 'Calibri',
};
