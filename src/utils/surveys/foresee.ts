import foresee from 'react-native-foresee';
import { AppContextInterface } from '../../context';
import SurveyService from './survey.service';

export default class Foresee implements SurveyService {
    constructor(protected readonly appContext: AppContextInterface) { }

    protected get logger() {
        return this.appContext.logger;
    }

    public incrementSignificantEventCountWithKey = async (event: string) => {
        try {
            this.logger.info(`incrementing foresee counter for event: ${event}`);
            let result = await this.asAsync(foresee.incrementSignificantEventCountWithKey(event));
            this.logger.info(`Foresee incrementSignificantEventCountWithKey received ${result}`)
        } catch (error) {
            this.logger.warn(`error incrementing foresee for event ${event}`, error);
        }
    };

    public launchSurvey = async () => {
        try {
            // this shouldn't be required, but foresee survey never launching without this true
            await this.asAsync(foresee.setSkipPoolingCheck(true));
            await this.asAsync(foresee.setDebugLogEnabled(true));
            const stateLob = this.appContext.state.memberContext?.stateLob;
            if (stateLob) {
                this.logger.info(`attempting to set state {${stateLob}} on the foresee survey`);
                await this.asAsync(foresee.setCppValue(stateLob, 'stateLob'));
            }
            this.logger.info('attempting to check if member is eligible for foresee:');
            await this.asAsync(foresee.checkIfEligibleForSurvey());
            this.logger.info('successfully determined if eligible or prompted for foresee survey');
        } catch (error) {
            this.logger.warn('error launching foresee survey', error);
        }
    };

    /*
     * the try/catch doesn't work with .then, only with await

     * using the try/catch on a .then, the promise will resolve after the code block has been executed and the .reject will fire after
     * the calling function has left the try/catch block and you'll end up with an uncaught exception
     * 
     * since we don't have control over the react-native bridge, we cannot make an assumption that native calls that return promises are
     * async functions, it is 100% absolutely not safe to await them.  we need to meticulously go through each function and do a .then/.catch
     * on each function (or just let the uncaught exception handler handle it, which we don't want to do)
     * 
     * this is a simple executor that wraps the promise and turns it into an async function so it can be awaited and the code can be structured
     * in an easy way.  this is a little bit janky, but given that we have conditional statements in our foresee logic we really don't want to 
     * have to use .then/.catch everywhere and manage branching into if conditions
     */
    protected asAsync = async (promise: Promise<void>): Promise<boolean> => {
        return promise
            .then(() => {
                return Promise.resolve(true);
            })
            .catch(() => {
                return Promise.reject(false);
            });
    };
}
