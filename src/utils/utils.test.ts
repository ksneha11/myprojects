import { PrescriptionInfo, RefillRenewStatus } from 'atlas-services/src/models';
import { capitalizeFirstLetter, flattenDeep, groupBy, maskPasswordCharacters, removeFromArray, toTitleCase } from '.';
const testArray = ['q', 'w', 'e', 'r', 't', 'y'];

describe('test removeFromArray single item', () => {
    it('should pass', () => {
        const expecting = ['q', 'w', 'e', 't', 'y'];
        expect(removeFromArray(testArray, 'r')).toEqual(expecting);
    });
});

describe('test removeFromArray multiple items', () => {
    it('should pass', () => {
        const expecting = ['w', 'e', 't'];
        expect(removeFromArray(testArray, 'r', 'q', 'y')).toEqual(expecting);
    });
});

const toTitleCaseTests = [
    {
        actual: 'this is a test',
        expected: 'This Is A Test',
    },
    {
        actual: 'this  is  a  test',
        expected: 'This  Is  A  Test',
    },
    {
        actual: 'THIS IS A TEST',
        expected: 'This Is A Test',
    },
];

toTitleCaseTests.forEach(({ actual, expected }) => {
    describe(`test toTitleCase: ${actual}`, () => {
        it('should pass', () => {
            expect(toTitleCase(actual)).toEqual(expected);
        });
    });
});

const capitalizeFirstLetterTests = [
    {
        actual: 'a very cool sentence',
        expected: 'A very cool sentence',
    },
    {
        actual: 'bobby',
        expected: 'Bobby',
    },
    {
        actual: 'Bobby Was There',
        expected: 'Bobby Was There',
    },
    {
        actual: '$3.50',
        expected: '$3.50',
    },
    {
        actual: '',
        expected: '',
    },
];

capitalizeFirstLetterTests.forEach(({ actual, expected }) => {
    describe(`test capitalizeFirstLetter: ${actual}`, () => {
        it('should pass', () => {
            expect(capitalizeFirstLetter(actual)).toEqual(expected);
        });
    });
});

interface TestItem {
    label: string;
    value: number;
}

const testGroupItems: TestItem[] = [
    { label: 'Alpha', value: 3 },
    { label: 'Bravo', value: 2 },
    { label: 'Charlie', value: 1 },
    { label: 'Delta', value: 1 },
    { label: 'Echo', value: 4 },
];

const groupedItems = groupBy<TestItem>(
    testGroupItems,
    ({ value }) => {
        return value === 1;
    },
    ({ value }) => {
        return value === 3;
    }
);
const flattenedItems = flattenDeep(groupedItems);

describe(`should group items:`, () => {
    it('is grouped correctly', () => {
        expect(groupedItems[1][0].label).toEqual(testGroupItems[0].label);
    });
});

describe(`should flatten items:`, () => {
    it('is the same length as original list', () => {
        expect(flattenedItems.length).toEqual(testGroupItems.length);
    });
});

const maskPasswordCharactersTest = [
    {
        actual: 'Anthem',
        expected: '••••••',
    },
];

describe(`should return bullet points for characters:`, () => {
    it('if the password is masked', () => {
        expect(maskPasswordCharacters(maskPasswordCharactersTest[0].actual)).toEqual(
            maskPasswordCharactersTest[0].expected
        );
    });
});
