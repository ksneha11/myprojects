import { render as rtlRender } from '@testing-library/react-native';
import React, { ReactElement } from 'react';
import { TestContext } from '.';
import { AppContext } from '../App';

export interface CustomRenderOptions {
    customAppContext?: object;
    customAppState?: object;
}

const testComponentRenderer = (ui: ReactElement, options = {} as any) => {
    function AppContextProvider(props) {
        const testContext = { ...new TestContext() };
        const testContextWithCustomState = {
            ...testContext,
            appContext: {
                ...testContext.appContext,
                ...options.customAppContext,
                state: { ...testContext.appContext.state, ...options?.customAppState },
            },
        };

        return <AppContext.Provider value={testContextWithCustomState} {...props} />;
    }
    return rtlRender(ui, { wrapper: AppContextProvider, ...options });
};

// re-export everything
export * from '@testing-library/react-native';

// override render method
export { testComponentRenderer as render };
