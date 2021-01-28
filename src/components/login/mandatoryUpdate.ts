import { Linking, Platform } from 'react-native';
import serviceConfig from '../../../generated/serviceConfig.json';
import { Labels } from '../../context/abstractAppContext';
import { Deeplinks } from '../../models';
import { Logger } from '../../utils';
import { GlobalModalHandler } from '../globalModal/globalModal';

export const shouldDisplayMandatoryUpdateModal = (
    labels: Labels,
    links: Deeplinks,
    logger,
    supportedVersions: string[]
): boolean => {
    if (shouldDisplayModal(supportedVersions)) {
        const updateLabels = labels.login.mandatoryUpdateModal;
        GlobalModalHandler.show({
            bodyText: updateLabels.body,
            onPressBackdrop: () => {},
            onPressPrimaryButton: () => onPressMandatoryUpdateModalButton(links, logger),
            primaryButtonTitle: updateLabels.primaryButton,
            title: updateLabels.title,
        });
        return true;
    }
    return false;
};

const onPressMandatoryUpdateModalButton = (links: Deeplinks, logger: Logger) => {
    // TODO: This just goes to the app store, once we have the app ids they should link in the format below
    // const appStoreLink = 'itms://itunes.apple.com/us/app/apple-store/id[APP_ID]';
    // const playStoreLink = 'http://play.google.com/store/apps/details?id=APP_ID';

    const link = Platform.OS === 'ios' ? links.appStore : links.playStore;
    Linking.openURL(link).catch(error => logger.warn(`Unable to go to store, ${error}`));
};

const shouldDisplayModal = (supportedVersions: string[]): boolean => {
    const versionNumber = serviceConfig.headers['X-MADT-AppVersion'];
    // If the app's version isn't in appInit's supportedVersions array, display the modal
    // In lower environments this array should be empty, so all app versions are supported
    return supportedVersions && supportedVersions.length && !supportedVersions.includes(versionNumber.toString());
};
