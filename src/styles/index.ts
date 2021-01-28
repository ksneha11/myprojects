export { default as ColorSchema } from './colorSchema';
export { default as IconNames } from './iconNames';
export { default as ImageNames } from './imageNames';
import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import ColorSchema from './colorSchema';

export type StyleType = ViewStyle | TextStyle | ImageStyle;
export interface StyleSheetSchema {
    [key: string]: StyleType;
}

export type DefaultStyleSchema = (params: StyleSchemaParams) => StyleSheetSchema;

export interface StyleSchemaParams {
    colorSchema: ColorSchema | Partial<ColorSchema>;
    hairlineWidth: number;
    windowWidth: number;
}
