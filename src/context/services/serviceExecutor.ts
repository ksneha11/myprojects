import { ServiceException } from 'atlas-services/src/models';
import { ServiceConfig } from 'atlas-services/src/services';
import { ServiceEndpoint } from 'atlas-services/src/services/middleware/serviceEndpoint';
import { merge } from 'atlas-services/src/utils';
import { LoadingIndicatorHandler } from '../../components/common/loadingIndicator';
import serviceExceptions from '../../context/content/serviceExceptions.json';
import { ErrorConfig } from '../../models';
import { Logger } from '../../utils';
import { ErrorModal } from './../../components/errorModal';

const defaultServiceParams: ExecutorParams = {
    errorConfig: {
        showModal: () => true,
    },
    showLoadingIndicator: true,
};

export interface ExecutorParams {
    errorConfig?: ErrorConfig;
    payload?: any;
    showLoadingIndicator?: boolean;
}

export default abstract class ServiceExecutor {
    protected activeCallCount: number;

    constructor(
        protected readonly environment: string,
        protected readonly getMappedException: (exception: ServiceException) => ServiceException,
        protected readonly logger: Logger,
        protected readonly serviceConfig: ServiceConfig
    ) {
        this.activeCallCount = 0;
    }

    // eventually these params should all be an instance of executor params
    // for now, putting in a hack to determine what the params are
    // add back the serviceExecutor type on the params. All services would need to change for the typing to work
    public execute(serviceEndpoint: ServiceEndpoint, serviceParams?: ExecutorParams) {
        const params = merge(defaultServiceParams, serviceParams);
        if (params.showLoadingIndicator) {
            this.activeCallCount++;
            LoadingIndicatorHandler.show();
        }
        return this.routeServiceCall(serviceEndpoint, params)
            .then(response => {
                // TODO: do we want to do a deep clone before returning the response here? might be safer
                return response;
            })
            .catch((exception: ServiceException) => {
                this.logger.warn('caught exception in service executor:', exception);

                exception = this.getMappedException(exception);

                if (
                    params.errorConfig &&
                    params.errorConfig.showModal &&
                    params.errorConfig.showModal(exception.errorCode)
                ) {
                    exception = exception.errorCode ? exception : this.getGenericServiceException();
                    ErrorModal.show(exception, params.errorConfig);
                }
                return Promise.reject(exception);
            })
            .finally(() => {
                if (params.showLoadingIndicator && --this.activeCallCount === 0) {
                    LoadingIndicatorHandler.hide();
                }
            });
    }

    protected getGenericServiceException = (): ServiceException => {
        const genericServiceException = serviceExceptions.find(
            (exception: ServiceException) => exception.errorCode === '500'
        );
        return {
            ...genericServiceException,
        };
    };

    protected abstract routeServiceCall(serviceEndpoint: ServiceEndpoint, params: ExecutorParams): Promise<any>;
}
