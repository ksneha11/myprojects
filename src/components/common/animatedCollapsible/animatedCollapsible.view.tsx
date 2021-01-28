import React from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { H2, P } from '..';
import { IconNames } from '../../../styles';
import StyledComponent, { StyleProps } from '../../styledComponent';
import defaultStyle, { AnimatedCollapsibleSchema } from './animatedCollapsible.style';

export interface Props extends StyleProps {
    animatedHeight: Animated.Value;
    areChildrenPressable?: boolean; // Collapse when child component is pressed.  Must set isSelfPressable to false if this is set to false
    children?: React.ReactNode;
    collapsibleComponent: React.ReactNode;
    expanded: boolean;
    hasMoreSubtitles: boolean;
    iconCollapsed: IconNames;
    iconExpanded: IconNames;
    iconLeft: IconNames;
    isIconPositionLeft?: boolean;
    isSelfPressable: boolean; // Collapse when anything in the collasible is pressed.  Takes precedence over areChildrenPressable & isTitlePressable.
    isTitlePressable: boolean; // Collapse when title is pressed. Must set isSelfPressable to false if this is set to false.
    onPress: noop;
    style?: Partial<AnimatedCollapsibleSchema>;
    subtitleCollapsed: string[];
    subtitleExpanded: string[];
    title: string;
}

export const defaultProps: Partial<Props> = {
    areChildrenPressable: true,
    children: ({ CollapsibleContainer, CollapsibleComponent }: AnimatedCollapsibleView) => {
        return (
            <CollapsibleContainer>
                <CollapsibleComponent />
            </CollapsibleContainer>
        );
    },
    expanded: false,
    hasMoreSubtitles: false,
    iconCollapsed: IconNames.LIST_ITEM_EXPAND_ICON,
    iconExpanded: IconNames.LIST_ITEM_COLLAPSE_ICON,
    isIconPositionLeft: true,
    isSelfPressable: true,
    isTitlePressable: true,
    subtitleCollapsed: [],
    subtitleExpanded: [],
};

export default class AnimatedCollapsibleView extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'AnimatedCollapsible';
    public style: AnimatedCollapsibleSchema;

    public CollapsibleComponent = () => {
        const { expanded, collapsibleComponent } = this.props;
        return <>{expanded && collapsibleComponent}</>;
    };

    public CollapsibleContainer = ({ children }: { children: Children }) => {
        const {
            areChildrenPressable,
            isIconPositionLeft,
            isSelfPressable,
            isTitlePressable,
            onPress,
            subtitleCollapsed,
            subtitleExpanded,
        } = this.props;
        const label = this.labels.collapsible;
        const iconAccessibilityHint = this.props.expanded
            ? label.expanded.accessibilityHint
            : label.collapsed.accessibilityHint;
        const iconAccessibilityLabel = `${this.props.title} ${
            this.props.expanded ? label.expanded.accessibilityLabel : label.collapsed.accessibilityLabel
        }`;
        return (
            <View style={this.style.collapsibleContainer}>
                {isIconPositionLeft && (
                    <this.IconContainer onPress={onPress} hint={iconAccessibilityHint} label={iconAccessibilityLabel} />
                )}
                <View style={this.style.mainContent}>
                    <TouchableOpacity
                        accessible={false}
                        accessibilityRole="button"
                        disabled={!isTitlePressable && !isSelfPressable}
                        onPress={onPress}
                    >
                        <Text accessible accessibilityRole="header" style={this.style.title}>
                            {this.props.title}
                        </Text>
                        {subtitleCollapsed.length || subtitleExpanded.length ? <this.Subtitles /> : <></>}
                    </TouchableOpacity>
                    <TouchableOpacity
                        accessible={false}
                        disabled={!areChildrenPressable && !isSelfPressable}
                        onPress={onPress}
                    >
                        {children}
                    </TouchableOpacity>
                </View>
                {!isIconPositionLeft && (
                    <this.IconContainer onPress={onPress} hint={iconAccessibilityHint} label={iconAccessibilityLabel} />
                )}
            </View>
        );
    };

    public render() {
        return (
            <this.CollapsibleContainer>
                <Animated.View
                    style={[
                        { transform: [{ translateY: this.props.animatedHeight }] },
                        this.style.collapsibleContentContainer,
                    ]}
                >
                    <this.CollapsibleComponent />
                </Animated.View>
            </this.CollapsibleContainer>
        );
    }

    public Subtitles = () => {
        const { expanded, hasMoreSubtitles, subtitleCollapsed, subtitleExpanded } = this.props;

        return hasMoreSubtitles ? (
            <this.MultipleSubtitles
                expanded={expanded}
                titleCollapsed={subtitleCollapsed}
                titleExpanded={subtitleExpanded}
            />
        ) : (
            <this.RenderSubtitles
                expanded={expanded}
                titleCollapsed={subtitleCollapsed}
                titleExpanded={subtitleExpanded}
            />
        );
    };

    protected DisplaySubtitles = ({ title }: { title: string }) => {
        return (
            <>
                {!!title && (
                    <View style={this.style.hasMoreSubtitles}>
                        <P>{title}</P>
                    </View>
                )}
            </>
        );
    };

    protected IconContainer = ({ hint, label, onPress }: { hint: string; label: string; onPress: any }) => {
        return (
            <TouchableOpacity
                onPress={onPress}
                accessibilityHint={hint}
                accessibilityLabel={label}
                accessibilityRole="button"
            >
                <this.RenderIcon />
            </TouchableOpacity>
        );
    };

    protected MultipleSubtitles = ({
        expanded,
        titleCollapsed,
        titleExpanded,
    }: {
        expanded: boolean;
        titleCollapsed: string[];
        titleExpanded: string[];
    }) => {
        return (
            <View>
                {expanded ? (
                    <View style={this.style.hasMoreSubtitles}>
                        <H2>{titleCollapsed[0]}</H2>
                        {titleExpanded.map(title => {
                            return <this.DisplaySubtitles key={title} title={title} />;
                        })}
                    </View>
                ) : (
                    <P>{titleCollapsed.join()}</P>
                )}
            </View>
        );
    };

    protected RenderIcon = (): JSX.Element => {
        return (
            this.props.iconLeft &&
            this.getIcon(this.props.iconLeft, {
                style: [this.style.leftIcon, this.props.expanded ? this.style.iconExpanded : this.style.iconCollapsed],
            })
        );
    };

    protected RenderSubtitles = ({
        expanded,
        titleCollapsed,
        titleExpanded,
    }: {
        expanded: boolean;
        titleCollapsed: string[];
        titleExpanded: string[];
    }) => {
        return (
            <P
                style={{ paragraph: this.style.subtitle }}
                accessible={!!(expanded ? titleExpanded.length : titleCollapsed.length)}
            >
                {expanded ? titleExpanded.join() : titleCollapsed.join()}
            </P>
        );
    };
}
