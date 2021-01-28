import { IconNames } from '../styles';

export default interface Pressable {
    readonly action?: string;
    iconLeft?: IconNames;
    iconRight?: IconNames;
    key?: number | string;
    param?: {};
    readonly subtext?: string | JSX.Element;
    readonly text: string | JSX.Element;
}
