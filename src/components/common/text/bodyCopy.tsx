import React from 'react';
import { Text } from 'react-native';
import StyledComponent, { StyleProps } from '../../styledComponent';
import defaultStyle, { BodyCopyStyleSchema } from './bodyCopy.style';

interface Props extends StyleProps {
    style?: Partial<BodyCopyStyleSchema>;
}

const defaultProps = {};

export default class BodyCopy extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'BodyCopy';
    public style: BodyCopyStyleSchema;

    public AccessibilityLink = ({ textLink }) => {
        return (
            <Text
                accessibilityLabel={textLink.props.children}
                accessibilityRole="button"
                onPress={() => textLink.props.onPress()}
                style={this.style.accessibilityField}
            />
        );
    };

    public getTextLinksFromTree = (children, textLinks = []) => {
        if (Array.isArray(children)) {
            // If there are multiple elements, recursively get their text links
            children.forEach(child => {
                textLinks = this.getTextLinksFromTree(child, textLinks);
            });
        } else if (typeof children === 'object') {
            // If is a JSX element
            if (children?.props?.onPress && typeof children?.props?.children === 'string') {
                textLinks.push(children);
                // If it is any other non-string element
            } else if (typeof children?.props?.children !== 'string') {
                textLinks = this.getTextLinksFromTree(children.props.children, textLinks);
            }
        }
        return textLinks;
    };

    public render() {
        const accessibilityLinks = this.appState.isScreenReaderEnabled
            ? this.getTextLinksFromTree(this.props.children).map(textLink => {
                  return this.AccessibilityLink({ textLink });
              })
            : [];
        if (this.appState.isScreenReaderEnabled && accessibilityLinks.length > 0) {
            return (
                <>
                    <Text
                        // @ts-ignore accessibilityActions not recognized
                        accessibilityActions={[{ name: 'activate', label: 'activate' }]}
                        onAccessibilityAction={event => {
                            if (accessibilityLinks.length === 1) {
                                accessibilityLinks[0]?.props?.onPress();
                            }
                        }}
                        accessibilityRole={accessibilityLinks.length === 1 ? 'button' : 'text'}
                        style={this.style.bodyCopy}
                    >
                        {this.props.children}
                    </Text>
                    {this.appState.isScreenReaderEnabled &&
                        accessibilityLinks.length > 1 &&
                        this.getTextLinksFromTree(this.props.children).map(textLink => {
                            return this.AccessibilityLink({ textLink });
                        })}
                </>
            );
        }
        return <Text style={this.style.bodyCopy}>{this.props.children}</Text>;
    }
}
