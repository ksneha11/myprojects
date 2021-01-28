export interface Restriction {
    readonly name: RestrictionName;
}

export class BasicRestriction implements Restriction {
    constructor(public readonly name: RestrictionName) {}
}

export enum RestrictionName {
    BENEFITS_PAGE,
}
