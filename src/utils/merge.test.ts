import merge from './merge';

class LabelsEnglish {
    public a: {
        b: {
            label: 'english';
        };
        label: 'english';
    };
}
const labelsSpanish = {
    a: {
        b: {
            label: 'espanol',
        },
        label: 'espanol',
    },
};

const obj1: any = {
    a: {
        b: 'b',
    },
    d: {},
};
const obj2: any = {
    a: {
        c: 'c',
    },
    d: {
        e: 'e',
    },
    f: {},
};

/*
 * TODO: schriste
 * get this working
 * my VPN died over the weekend and I couldn't get the proper jest dependencies installed to make this work
 * it's currently missing some babel plugin
 */
describe('Test Merge', () => {
    it('should pass', () => {
        expect(merge(obj1, undefined)).toEqual(obj1);
        expect(merge(obj1, obj2)).toEqual({
            a: {
                b: 'b',
                c: 'c',
            },
            d: {
                e: 'e',
            },
            f: {},
        });
    });

    it('should also merge classes', () => {
        const english: LabelsEnglish = new LabelsEnglish();
        const merged = merge(english, labelsSpanish);
        expect(merged.a.label).toEqual('espanol');
        expect(merged.a.b.label).toEqual('espanol');
    });
});
