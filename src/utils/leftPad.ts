/**
 * Prepend a selectable final portion of a string with desired number of a given character.
 * For example, turn "XXXXXXXXXX123456" into "****3456".
 * @param {string} padCharacter The character that will be prepended to the final string
 * @param {number} padLength Number of padding characters to prepend
 * @param {number} sliceLength Length of the original string to return
 * @param {string | number} value Original string to be changed
 * @returns {string} Updated string
 */
const leftPad = (
    padCharacter: string = '*',
    padLength: number = 4,
    sliceLength: number = 4,
    value: number | string
): string => {
    const tail = (value + '').slice(-sliceLength);
    return padCharacter.repeat(padLength) + tail;
};

export default leftPad;
