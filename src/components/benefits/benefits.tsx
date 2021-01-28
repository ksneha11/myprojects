import React from 'react';
import { BenefitsActions } from '../../context/navigation/actions';
import { SurveyEvents } from '../../utils/surveys';
import AppComponent from '../common/appComponent';
import { BenefitsView, ViewProps } from './';

interface State {}
interface Props extends ViewProps {}

const defaultProps = {};

export default class Benefits extends AppComponent<Props, State> {
    public static defaultProps = defaultProps;

    constructor(props: any) {
        super(props);

        this.state = {};
    }

    public componentDidMount() {
        this.launchSurvey(SurveyEvents.BENEFITS);
    }

    public render() {
        return <BenefitsView onPressBenefitsWebview={this.onPressBenefitsWebview} {...this.props} style={this.style} />;
    }

    protected onPressBenefitsWebview = (url: string) => {
        this.navigate(BenefitsActions.BENEFITS_WEBVIEW_PRESSED, { url });
    };
}
