import { usernameValidatorsWithLabels } from '../components/registration/usernamePassword/usernamePassword';
import TestContext from '../test/testContext';

const testValues = [
    {
        testValueInvalid: 'harry',
        testValueValid: 'dfhssjhhg',
    },
    {
        testValueInvalid: 'anthem bluecross',
        testValueValid: 'anthembluecross',
    },
    {
        testValueInvalid: '123harry',
        testValueValid: 'harry123',
    },
    {
        testValueInvalid: 'ff123131',
        testValueValid: 'tom123billy',
    },
    {
        testValueInvalid: '.harry',
        testValueValid: 'dfhssjhhg',
    },
    {
        testValueInvalid: '$bobbyJoe?',
        testValueValid: 'BobbyJoe',
    },
];

const context = new TestContext();

const validations = usernameValidatorsWithLabels(context.labels).map((validator, index) => ({
    ...validator,
    ...testValues[index],
}));

describe('test validators', () => {
    validations.forEach(({ errorMessage, isValid, testValueInvalid, testValueValid }) => {
        describe(errorMessage, () => {
            it('"' + testValueInvalid + '" should NOT pass', () => {
                expect(isValid(testValueInvalid)).toBeFalsy();
            });
            it('"' + testValueValid + '" should pass', () => {
                expect(isValid(testValueValid)).toBeTruthy();
            });
        });
    });
});
