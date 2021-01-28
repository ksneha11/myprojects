import { AmerigroupPlanType, EmpirePlanType, MemberContext } from 'atlas-services/src/models';

// todo: union new plan types for other apps here
export declare type PlanType = AmerigroupPlanType | EmpirePlanType;

export const getMemberPlanType = (memberContext: MemberContext): PlanType => {
    const stateSpecificContent = memberContext.stateSpecificContext;
    if (stateSpecificContent.amerigroupPlanType) {
        return stateSpecificContent.amerigroupPlanType;
    } else if (stateSpecificContent.empirePlanType) {
        return stateSpecificContent.empirePlanType;
    }
    return null;
};
