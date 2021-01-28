export default interface FieldObject<T = string> {
    onBlur?: noop;
    onChange: (newValue?: T) => void;
    onFocus?: noop;
}
