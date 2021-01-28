import { Provider, ServiceException } from 'atlas-services/src/models';
import { ServiceConfig, ServiceProvider } from 'atlas-services/src/services/middleware';
import { Methods } from 'atlas-services/src/services/middleware/serviceProvider';
import { Platform } from 'react-native';
import { fetch, resetCookies } from 'react-native-ssl-pinning';
import { Logger } from '../../utils';

export default class PinSSLServiceProvider implements ServiceProvider {
    private readonly isSslPinningDisabled: Provider<boolean>;
    private readonly logger: Logger;
    private readonly serviceConfig: ServiceConfig;

    constructor(logger: Logger, serviceConfig: ServiceConfig, isSslPinningDisabled: Provider<boolean>) {
        this.logger = logger;
        this.serviceConfig = serviceConfig;
        this.isSslPinningDisabled = isSslPinningDisabled;
        if (Platform.OS === 'android') {
            resetCookies();
        }
    }

    public callService = (url: string, body: any, headers: any, method: Methods): Promise<any> => {
        this.logger.info(
            `making service call to ${url} with headers {${JSON.stringify(
                headers
            )}} and body ${body} with method ${method} and is isSslPinningDisabled ${this.isSslPinningDisabled.get()}`
        );

        let sslPinning;

        if (!this.isSslPinningDisabled.get()) {
            sslPinning = { certs: this.serviceConfig.certs };
        }

        const timeoutInterval = this.serviceConfig.timeoutInterval ?? 45000;

        return fetch(url, {
            body,
            headers,
            method,
            sslPinning,
            timeoutInterval,
        })
            .then((response: any) => {
                this.logger.info('completed response: ', response); // Perfecto logging
                try {
                    this.logger.info('response body', JSON.parse(response.bodyString)); // Develeper logging
                } catch (error) {
                    this.logger.info('response body not parsable');
                }
                return response;
            })
            .catch((response: any) => {
                // log this in the event log so we can see it immediately alongside the request
                this.logger.warn('error in service call:', response);
                // also log this in implemented logging solution so we can see it from the web
                this.logger.error(`error in service call: ${JSON.stringify(response, null, '\t')}`);
                this.throwError(response);
            });
    };

    /**
     * determines if the given response is an error and throws an ApplicationException if so
     *
     * @param response
     *  {
     *      "status":502,
     *      "statusText":"bad gateway",
     *      "headers": {
     *          ...
     *      },
     *      "bodyString":"{\"error\":true,\"errorCode\":\"reg.502.00\",\"errorMessage\":\"Internal Error\"}",
     *      "url":"https://mma.api.ext.uat1.va.anthem.com/mobile/mad/v1/registration/public/eligibility"
     *  }
     */
    protected throwError(response: any = {}) {
        if (response.bodyString) {
            const serviceException: ServiceException = JSON.parse(response.bodyString);

            throw serviceException || {};
        } else {
            throw {
                errorCode: '1',
                errorMessage: '',
                errorTitle: 'Connectivity Error',
                primaryButtonTitle: 'OK',
            };
        }
    }
}
