import { Apptentive, ApptentiveConfiguration } from 'apptentive-react-native';
import { Platform } from 'react-native';
import { default as atlasConfig } from '../../../generated/serviceConfig.json';
import { AppContextInterface } from '../../context';
import SurveyService from './survey.service';

export default class ApptentiveService implements SurveyService {
    constructor(private readonly appContext: AppContextInterface) {
        this.initialize();
    }

    public initialize() {
        const credentials = Platform.select({
            android: {
                apptentiveKey: atlasConfig.apptentive.android.apiKey,
                apptentiveSignature: atlasConfig.apptentive.android.signature,
            },
            ios: {
                apptentiveKey: atlasConfig.apptentive.ios.apiKey,
                apptentiveSignature: atlasConfig.apptentive.ios.signature,
            },
        });
        const configuration = new ApptentiveConfiguration(credentials.apptentiveKey, credentials.apptentiveSignature);
        Apptentive.register(configuration)
            .then(() => {
                this.appContext.logger.info('successfully registered apptentive');
            })
            .catch(error => {
                this.appContext.logger.warn(`unable to register apptentive with credentials ${credentials}:`, error);
            });
    }

    public launchSurvey = (eventName?: string): Promise<void> => {
        return new Promise((resolve, reject) => {
            Apptentive.engage(eventName)
                .then(engaged => {
                    this.appContext.logger.info(
                        `Event ${eventName} engaged successfully - engagementStatus=${engaged}`
                    );
                    resolve(engaged);
                })
                .catch(error => {
                    reject(error);
                });
        });
    };
}
