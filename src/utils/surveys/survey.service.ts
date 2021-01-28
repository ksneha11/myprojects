export default interface SurveyService {
    /**
     * tells the survey service to launch a survey for the given event
     */
    launchSurvey(eventName?: string): Promise<void>;
}
