export const invalidInputAmount = (value: string) => {
    return value.match(/^\d+(\.\d{2})?$/g);
};
