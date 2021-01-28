import isEqual from 'lodash.isequal';
import { Dimensions, StyleSheet, SwitchProps } from 'react-native';
import { InputProps } from 'react-native-elements';
import { LinearGradientProps } from 'react-native-linear-gradient';
import { AppContextInterface } from '../context';
import { DefaultStyleSchema, StyleSheetSchema } from '../styles';
import { merge } from '../utils';
import ContextComponent from './contextComponent';

export interface StyleProps {
    className?: string;
    style?: StyleSheetSchema;
}

export interface StylesProps<T> {
    className?: string;
    style?: T;
}

export interface InputStyleProps extends InputProps {
    className?: string;
    style?: StyleSheetSchema;
}

export interface GradientProps extends LinearGradientProps {
    className?: string;
    style?: StyleSheetSchema;
}

export interface ToggleSwitchProps extends SwitchProps {
    className?: string;
    style?: StyleSheetSchema;
}

const windowWidth = Dimensions.get('window').width;
const hairlineWidth = StyleSheet.hairlineWidth;

/**
 * Class which makes the app's style context available (this.style).
 * @extends React.Component
 */
abstract class StyledComponent<
    P extends StyleProps = {},
    S = {},
    C extends AppContextInterface = AppContextInterface
> extends ContextComponent<P, S, C> {
    get style(): StyleSheetSchema {
        if (!this.definedStyle || !isEqual(this.prevPropsStyle, this.props.style)) {
            const defaultStyleWithSchemaApplied = this.defaultStyle
                ? this.defaultStyle({
                      colorSchema: this.appContext.colorSchema,
                      hairlineWidth,
                      windowWidth,
                  })
                : {};

            const mergeOrder = [
                // defaultStyleWithSchemaApplied
                defaultStyleWithSchemaApplied,
                // styleOverides
                this.appContext.styleOverrides[this.name] || {},
                // styleOveridesByClassName
                this.appContext.styleOverrides[this.props.className || ''] || {},
                // inlineStyle
                this.props.style || {},
            ];
            this.prevPropsStyle = this.props.style;
            this.definedStyle = StyleSheet.create(merge(...mergeOrder));
        }

        return this.definedStyle;
    }
    public defaultStyle: DefaultStyleSchema;
    public name: string;

    public prevPropsStyle: any;
    private definedStyle: StyleSheetSchema = null;
}

export default StyledComponent;
