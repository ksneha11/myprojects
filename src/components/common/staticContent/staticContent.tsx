import {
    ContentType,
    default as StaticContentElement,
    FontWeight,
    Spacing,
} from 'atlas-services/src/models/staticContent';
import { GET_STATIC_CONTENT } from 'atlas-services/src/services/middleware/serviceEndpoint';
import React from 'react';
import { AccessibilityInfo, ScrollView, Text, View, ViewStyle } from 'react-native';
import { EmailLink, MenuItem, PhoneLink } from '..';
import { DisclaimerCopy, H1, H2, HorizontalRule, P, TextLink } from '../..';
import { StaticContentActions } from '../../../context/navigation/actions';
import { IconNames } from '../../../styles';
import { StyleProps } from '../../styledComponent';
import AppComponent from '../appComponent';
import defaultStyle, { StaticContentSchema } from './staticContent.style';

interface AccessibilityAction {
    action: noop;
    link: string;
}
interface Props extends StyleProps {
    contentId: string;
    useStateLob?: boolean;
    content?: StaticContentElement[];
}

interface State {
    content: StaticContentElement[];
}

/**
 * should be accessed like this from the navigator
 * Legal: () => <StaticContent contentId={'legal'};
 * AboutUs: () => <StaticContent contentId={'aboutUs'}
 */
export default class StaticContent extends AppComponent<Props, State> {
    public defaultStyle = defaultStyle;
    public name = 'StaticContent';
    public style: StaticContentSchema;

    constructor(props: Props) {
        super(props);
        this.state = {
            content: [],
        };
    }

    public AccessibilityLink = ({ link }: { link: AccessibilityAction }) => {
        return (
            <Text
                accessible={true}
                accessibilityLabel={link.link}
                accessibilityRole="button"
                onPress={link.action}
                style={this.style.accessibilityField}
            />
        );
    };

    public BulletGroup = ({ contentJson }: { contentJson: StaticContentElement }) => {
        const content: string | Array<string | StaticContentElement> = contentJson.content;
        const children: Array<string | StaticContentElement> = contentJson.children;
        if (typeof content === 'string') {
            return (
                <>
                    <View style={this.style.bulletGroupContentContainer}>
                        {this.getIcon(IconNames.BULLET_FILLED, {
                            style: this.style.bulletIcon,
                        })}
                        <P
                            style={{
                                paragraph: {
                                    ...this.style.bulletGroupContent,
                                    ...this.getStylingByParams(contentJson),
                                },
                            }}
                        >
                            {content}
                        </P>
                    </View>
                    {this.bulletGroupChildrenHandler(children)}
                </>
            );
        } else {
            /*
             * Very similar to the Paragraph component below, in order to leverage formatLabel
             */
            const bulletPoint: string = content[0] as string;
            const subContents: StaticContentElement[] = content.slice(1) as StaticContentElement[];
            return (
                <>
                    <View style={this.style.bulletGroupContentContainer}>
                        {this.getIcon(IconNames.BULLET_FILLED, {
                            style: this.style.bulletIcon,
                        })}
                        <P
                            style={{
                                paragraph: {
                                    ...this.style.bulletGroupContent,
                                    ...this.getStylingByParams(contentJson),
                                },
                            }}
                        >
                            {this.formatLabel(
                                bulletPoint,
                                ...subContents.map(subComponent =>
                                    this.createComponent(subComponent as StaticContentElement)
                                )
                            )}
                        </P>
                    </View>
                    {this.bulletGroupChildrenHandler(children)}
                </>
            );
        }
    };

    public componentDidMount() {
        /*
         * hit the content service if the content is not passed in props and pull the json back from the service
         */
        if (this.props.content) {
            this.setState({ content: this.props.content });
        }
        else {
            const { contentId } = this.props;
            this.logger.info('Rendering static content:', contentId);
            this.appContext
                .getServiceExecutor()
                .execute(GET_STATIC_CONTENT, {
                    payload: {
                        contentId,
                        language: this.appState.selectedLanguage,
                        stateLob: this.props.useStateLob ? this.appState.memberContext?.stateLob : undefined,
                    },
                })
                .then(content => {
                    this.setState({ content });
                });
        }
    }

    public createComponent(content: StaticContentElement, styleOverrides?: {}): JSX.Element {
        switch (content.type) {
            case ContentType.BULLET_GROUP:
                return <this.BulletGroup key={Math.random()} contentJson={content} />;
            case ContentType.DISCLAIMER:
                return <this.Disclaimer key={Math.random()} contentJson={content} />;
            case ContentType.EMAIL:
                return <this.Email key={Math.random()} contentJson={content} styleOverrides={styleOverrides} />;
            case ContentType.HEADER:
                return <this.Header key={Math.random()} contentJson={content} />;
            case ContentType.INTERNAL_LINK:
                return <this.InternalLink key={Math.random()} contentJson={content} styleOverrides={styleOverrides} />;
            case ContentType.LINK:
                return <this.Link key={Math.random()} contentJson={content} styleOverrides={styleOverrides} />;
            case ContentType.MENU_ITEM_EXTERNAL:
                return <this.MenuLink key={Math.random()} contentJson={content} />;
            case ContentType.MENU_ITEM_INTERNAL:
                return <this.MenuLink key={Math.random()} contentJson={content} />;
            case ContentType.PARAGRAPH:
                return <this.Paragraph key={Math.random()} contentJson={content} styleOverrides={styleOverrides} />;
            case ContentType.PHONE_NUMBER:
                return <this.PhoneNumber key={Math.random()} contentJson={content} styleOverrides={styleOverrides} />;
            case ContentType.SECTION_HEADER:
                return <this.SectionHeader key={Math.random()} contentJson={content} />;
            case ContentType.SUB_HEADER:
                return <this.SubHeader key={Math.random()} contentJson={content} />;
            default:
                this.logger.warn(`there's no static content component defined for type: ${content.type}`);
        }
    }

    public Disclaimer = ({ contentJson }: { contentJson: StaticContentElement }) => {
        const text: string = contentJson.content as string;

        return <DisclaimerCopy>{text}</DisclaimerCopy>;
    };

    public Email = ({ contentJson, styleOverrides }: { contentJson: StaticContentElement; styleOverrides: {} }) => {
        const text: string = contentJson.content as string;
        const emailAddress: string = contentJson.action || text; // shorthand in case link and text are the same
        const style = { ...this.style.paragraph, ...this.getStylingByParams(contentJson) };

        return (
            <EmailLink emailAddress={emailAddress} style={{ textLink: style }}>
                {text}
            </EmailLink>
        );
    };

    public Header = ({ contentJson }: { contentJson: StaticContentElement }) => {
        const headerText = contentJson.content as string;

        return (
            <View style={this.style.headerContainer}>
                <H1 style={{ h1: this.style.header }}>{headerText}</H1>
            </View>
        );
    };

    public InternalLink = ({
        contentJson,
        styleOverrides,
    }: {
        contentJson: StaticContentElement;
        styleOverrides: {};
    }) => {
        const text: string = contentJson.content as string;
        const action: string = contentJson.action;
        const style = { ...this.style.paragraph, ...this.getStylingByParams(contentJson) };

        return (
            <TextLink
                accessibilityLabel={text}
                accessibilityRole={'button'}
                isUnderlined
                onPress={() => this.internalNavigation(action)}
                style={{ textLink: style }}
            >
                {text}
            </TextLink>
        );
    };

    public Link = ({ contentJson, styleOverrides }: { contentJson: StaticContentElement; styleOverrides: {} }) => {
        const text: string = contentJson.content as string;
        const href: string = contentJson.action || text; // shorthand in case link and text are the same
        const style = { ...this.style.paragraph, ...this.getStylingByParams(contentJson) };

        return (
            <TextLink
                accessibilityLabel={text}
                accessibilityRole={'link'}
                onPress={() => this.setParamsAndNavigate(href)}
                style={{ textLink: style }}
            >
                {text}
            </TextLink>
        );
    };

    public MenuLink = ({ contentJson }: { contentJson: StaticContentElement }) => {
        const isExternal = contentJson.type === ContentType.MENU_ITEM_EXTERNAL;
        const isInternal = contentJson.type === ContentType.MENU_ITEM_INTERNAL;
        const iconRight = (isExternal && IconNames.EXTERNAL_LINK) || (isInternal && IconNames.LIST_ITEM_NAVIGATE_ICON);
        const onPress = isExternal ? this.setParamsAndNavigate : this.internalNavigation;
        const style = this.getStyleFromSpacing(
            contentJson,
            this.style.menuItemExtraAbove,
            this.style.menuItemExtraBelow
        );

        return (
            <View>
                <MenuItem
                    iconRight={iconRight}
                    onPress={() => onPress(contentJson.action)}
                    style={{ rootContainer: this.style.menuItem, title: { ...this.style.menuItemText, ...style } }}
                    title={contentJson.content as string}
                />
                <HorizontalRule />
            </View>
        );
    };

    public Paragraph = ({ contentJson, styleOverrides }: { contentJson: StaticContentElement; styleOverrides: {} }) => {
        const content: string | Array<string | StaticContentElement> = contentJson.content;
        const style = { ...this.style.paragraph, ...this.getStylingByParams(contentJson) };
        const accessibilityLinks: AccessibilityAction[] = this.getAccessibilityActions(contentJson);
        if (typeof content === 'string') {
            return <P style={{ paragraph: style }}>{content}</P>;
        } else {
            /*
             * this might be a little fragile, but think it's worth implementing this way
             * would like to leverage the existing format label method to keep the paragraph format
             * the standard for paragraphs with subcomponents should be that the 1st element in the array is the actual paragraph
             * the rest of the array elements can be the subcomponents nested in the paragraph
             * we can pop off the first element of the array, then format it with the remaining elements in the array as subcomponents
             */
            const paragraph: string = content[0] as string;
            const subContents: StaticContentElement[] = content.slice(1) as StaticContentElement[];
            return (
                <View style={this.style.paragraphContainer}>
                    <P
                        onPress={() => {
                            this.appState.isScreenReaderEnabled &&
                                accessibilityLinks?.length === 1 &&
                                accessibilityLinks[0].action();
                        }}
                        style={{ paragraph: { ...style, ...styleOverrides } }}
                    >
                        {this.formatLabel(
                            paragraph,
                            ...subContents.map(subComponent =>
                                this.createComponent(subComponent as StaticContentElement)
                            )
                        )}
                    </P>
                    {this.appState.isScreenReaderEnabled &&
                        accessibilityLinks?.length > 1 &&
                        accessibilityLinks.map(accessibilityLink => {
                            return <this.AccessibilityLink key={accessibilityLink.link} link={accessibilityLink} />;
                        })}
                </View>
            );
        }
    };

    public PhoneNumber = ({
        contentJson,
        styleOverrides,
    }: {
        contentJson: StaticContentElement;
        styleOverrides: {};
    }) => {
        const phoneNumber: string = contentJson.content as string;
        const style = { ...this.style.paragraph, ...this.getStylingByParams(contentJson) };

        return (
            <PhoneLink phoneNumber={contentJson.action} style={{ textLink: style }}>
                {phoneNumber}
            </PhoneLink>
        );
    };

    public render() {
        return (
            <ScrollView showsVerticalScrollIndicator={false} style={this.style.rootContainer}>
                <View style={this.style.contentContainer}>
                    {this.state.content &&
                        this.state.content.map((contentJson: StaticContentElement, styleOverrides: {}) =>
                            this.createComponent(contentJson)
                        )}
                </View>
            </ScrollView>
        );
    }

    public SectionHeader = ({ contentJson }: { contentJson: StaticContentElement }) => {
        const content: string = contentJson.content as string;
        return (
            <View style={this.style.sectionHeaderContainer}>
                <H2
                    style={{
                        h2: { ...this.getStylingByParams(contentJson), ...this.style.sectionHeader },
                    }}
                >
                    {content}
                </H2>
            </View>
        );
    };

    public SubHeader = ({ contentJson }: { contentJson: StaticContentElement }) => {
        const content: string = contentJson.content as string;
        return (
            <View style={this.style.sectionHeaderContainer}>
                <P
                    style={{
                        paragraph: {
                            ...this.getStylingByParams(contentJson),
                            ...this.style.paragraph,
                            ...this.style.subHeader,
                        },
                    }}
                >
                    {content}
                </P>
            </View>
        );
    };

    protected bulletGroupChildrenHandler = (children: Array<string | StaticContentElement>) => {
        return (
            <>
                {children &&
                    children.map((child: string | StaticContentElement) => (
                        <View key={Math.random()} style={this.style.bulletGroupChildContainer}>
                            {this.getIcon(IconNames.BULLET_EMPTY, {
                                style: { ...this.style.bulletIcon, ...this.style.bulletSubIcon },
                            })}
                            {typeof child === 'string' ? (
                                <P style={{ paragraph: { ...this.style.paragraph, ...this.style.subText } }}>{child}</P>
                            ) : (
                                    this.createComponent(child, { ...this.style.subTextZeroMargin })
                                )}
                        </View>
                    ))}
            </>
        );
    };

    protected getAccessibilityActions = (contentJson: StaticContentElement): AccessibilityAction[] => {
        const actions: AccessibilityAction[] = [];
        // This will recursively take all links from children and return it for accessibility press
        if ([ContentType.LINK, ContentType.MENU_ITEM_INTERNAL].includes(contentJson.type)) {
            return [
                { action: () => this.setParamsAndNavigate(contentJson.action), link: contentJson.content as string },
            ];
        } else if ([ContentType.INTERNAL_LINK, ContentType.MENU_ITEM_EXTERNAL].includes(contentJson.type)) {
            return [{ action: () => this.internalNavigation(contentJson.action), link: contentJson.content as string }];
        } else {
            if (typeof contentJson.content !== 'string') {
                const linkContent = contentJson.content.find(child => {
                    if (typeof child !== 'string') {
                        const childAction = this.getAccessibilityActions(child);
                        if (childAction.length && typeof childAction[0].action === 'function') {
                            actions.push(childAction[0]);
                        }
                    }
                });
                if (linkContent) {
                    return this.getAccessibilityActions(linkContent as StaticContentElement);
                }
            }
        }
        return actions;
    };

    protected getStyleFromFontWeight = (fontWeight: FontWeight) => {
        if (fontWeight === FontWeight.BOLD) {
            return this.style.fontWeightBold;
        } else if (fontWeight === FontWeight.LIGHT) {
            return this.style.fontWeightLight;
        }
        return this.style.fontWeightNormal;
    };

    protected getStyleFromSpacing = (
        contentElement: StaticContentElement,
        spaceAbove: ViewStyle = this.style.spaceAbove,
        spaceBelow: ViewStyle = this.style.spaceBelow,
        lessAbove: ViewStyle = this.style.lessAbove,
        lessBelow: ViewStyle = this.style.lessBelow,
        noneBelow: ViewStyle = this.style.noneBelow
    ) => {
        const spacing = contentElement.spacing;
        let style;
        if (!spacing) {
            return style;
        }
        if (spacing.includes(Spacing.EXTRA_ABOVE)) {
            style = { ...style, ...spaceAbove };
        }
        if (spacing.includes(Spacing.EXTRA_BELOW)) {
            style = { ...style, ...spaceBelow };
        }
        if (spacing.includes(Spacing.LESS_ABOVE)) {
            style = { ...style, ...lessAbove };
        }
        if (spacing.includes(Spacing.LESS_BELOW)) {
            style = { ...style, ...lessBelow };
        }
        if (spacing.includes(Spacing.NONE_BELOW)) {
            style = { ...style, ...noneBelow };
        }
        return style;
    };

    protected getStylingByParams = (contentJson: StaticContentElement) => {
        return { ...this.getStyleFromSpacing(contentJson), ...this.getStyleFromFontWeight(contentJson.weight) };
    };

    // TODO: Add ability to just pass the route name rather than an action
    protected internalNavigation = (action: string) => {
        this.navigate(action);
    };

    protected setParamsAndNavigate = (url: string) => {
        this.navigate(StaticContentActions.EXTERNAL_URL_PRESSED, { externalUrl: url });
    };
}
