import {
    AccountInfo,
    AccountTypes,
    BankAccount,
    CreditCard,
    MemberPreference,
    MemberPreferenceMethods,
    MemberPreferences,
    MemberPreferenceSettings,
    MemberPreferenceTypes,
    PaymentMethod,
    PaymentType,
    TermsOfUseAcceptance,
} from 'atlas-services/src/models';
import {
    CREATE_DIGITAL_ACCOUNT,
    FIND_MY_INFO,
    GET_ACCOUNT_BALANCE,
    GET_CLAIMS,
    GET_SPECIALTY_ACCOUNTS,
    GET_TOU_ACCEPTANCE,
    ServiceEndpoint,
    UPDATE_TOU_ACCEPTANCE,
    VALIDATE_DIGITAL_ACCOUNT,
} from 'atlas-services/src/services/middleware/serviceEndpoint';
import moment, { Moment } from 'moment';
import React from 'react';
import { Alert, Button, SafeAreaView, ScrollView, StyleSheet, Text, TextStyle, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { createBottomTabNavigator } from 'react-navigation';
import {
    ChangePaymentMethodView,
    DialogBox,
    FormField,
    H1,
    H2,
    HorizontalRule,
    Image,
    InlineAlert,
    P,
    PrimaryButton,
    SecondaryButton,
} from '.';
import { PaymentActions, RegistrationActions } from '../context/navigation/actions';
import { IconNames, ImageNames } from '../styles';
import {
    AndroidDatePicker,
    ErrorBanner,
    FlatCard,
    FlatCardContainer,
    H3,
    InputWrapper,
    ListItem,
    ListItemWithButton,
    MenuItem,
    SelectorButton,
} from './common';
import ScreenLevelAlert from './common/alerts/screenLevelAlert';
import AppComponent from './common/appComponent';
import CheckBox from './common/checkBox';
import DatePicker from './common/form/datePicker';
import DropDown from './common/form/dropDown';
import GradientAdvertisement from './common/gradientAdvertisement';
import IconTextLink from './common/iconTextLink';
import InfoModal from './common/infoModal';
import ListExpandable from './common/listExpandable';
import Modal from './common/modal';
import PhoneLink from './common/phoneLink';
import SearchBar from './common/searchBar';
import ShippingAddressCard from './common/shippingAddressCard';
import ShippingOptionsCard from './common/shippingOptionsCard';
import SmallHeader from './common/smallHeader';
import StepProgressor from './common/stepProgressor';
import TextLink from './common/textLink';
import ToggleSwitch from './common/toggleSwitch';
import Filters from './filters';
import PaymentCard from './payments/paymentCard';
import defaultFilters from './pharmacy/pharmacySearch/pharmacySearchFilters';
import { RetailPickup } from './pharmacy/prescriptions';
import { Eligibility } from './registration/eligibility';
import EligibilityView from './registration/eligibility/eligibility.view';
import { PbmReviewView } from './reviewOrder/screens/pbmReview';
import { ShippingOptions } from './shippingOptions';

enum PageTabs {
    EVERYTHING_ELSE,
    SERVICES,
}

const styles = {
    listItem: {
        selectButton: {
            button: {
                height: 30,
            },
            text: {
                fontSize: 14,
                fontWeight: '600',
                paddingBottom: 0,
                paddingTop: 0,
            } as TextStyle,
        },
        subText: {
            fontSize: 14,
            marginTop: 10,
        },
    },
    map: {
        height: 300,
    },
};

interface Props {}

interface State {
    accessible508SwitchValue: boolean;
    autoCompleteItems: string[];
    checkbox2Selected: boolean;
    checkboxSelected: boolean;
    cloudServiceResponse: string;
    dropdownValue: string;
    filterVisible: boolean;
    formFieldText: string;
    isAnyPaymentMethods: boolean;
    isAnySpecialtyPaymentMethods: boolean;
    isCommunicationPresent: boolean;
    isLoadingService: boolean;
    isTermsOfUseAccepted: boolean;
    notAccessible508SwitchValue: boolean;
    predictedSearchResults: string[];
    searchBarText: string;
    selectedDate: string;
    selectedFilters: string[];
    selectedPageTab: PageTabs;
    selectedValues: string[];
    showDialogBox: boolean;
    showModal: boolean;
    switchValue: boolean;
    termsOfUseAcceptance: TermsOfUseAcceptance;
}

export default class TestMapView extends AppComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            accessible508SwitchValue: false,
            autoCompleteItems: [],
            checkbox2Selected: true,
            checkboxSelected: false,
            cloudServiceResponse: 'Cloud service responses will appear here',
            dropdownValue: '',
            filterVisible: false,
            formFieldText: '',
            isAnyPaymentMethods: true,
            isAnySpecialtyPaymentMethods: true,
            isCommunicationPresent: true,
            isLoadingService: false,
            isTermsOfUseAccepted: false,
            notAccessible508SwitchValue: false,
            predictedSearchResults: [],
            searchBarText: '',
            selectedDate: '05/20/2019',
            selectedFilters: [],
            selectedPageTab: PageTabs.EVERYTHING_ELSE,
            selectedValues: [],
            showDialogBox: false,
            showModal: false,
            switchValue: false,
            termsOfUseAcceptance: {} as TermsOfUseAcceptance,
        };
    }

    public causeJSError = () => {
        throw new Error('THIS IS A CUSTOM UNHANDLED JS ERROR');
    };

    public componentDidMount() {
        this.appContext
            .getServiceExecutor()
            .execute(GET_TOU_ACCEPTANCE)
            .then(termsOfUseAcceptance => {
                this.setState({ termsOfUseAcceptance });
            });
    }

    public getConfirmationData = () => [
        {
            content: ['1234 Address Street', 'Atlanta, GA 30076'],
            icon: IconNames.SHIPPING_DETAILS_ICON,
            title: 'Shipping Address',
        },
        {
            content: ['Free Standard Shipping ($0.00)'],
            icon: IconNames.SHIPPING_OPTIONS_ICON,
            style: {
                leftIcon: {
                    fontSize: 27,
                },
            },
            title: 'Shipping Options',
        },
        {
            content: ['Visa ****9837', 'Expires 02/2022'],
            icon: IconNames.PAYMENT_CARD_ICON,
            title: 'Payment Method',
        },
        {
            content: ['Dr. John Smith'],
            icon: IconNames.TOOL_FIND_DOCTOR_ICON,
            title: 'Approving Prescriber',
        },
    ];

    public getTOUAcceptance() {}

    public onUpdateFilter(selectedFilters) {
        this.setState({ selectedFilters });
    }

    public removeCommunication = () => {
        return (
            <View>
                <P>Removes Communications from Member Information when off</P>
                <ToggleSwitch
                    onChangeValue={() => this.onCommunicationSwitched()}
                    value={this.state.isCommunicationPresent}
                />
            </View>
        );
    };

    public render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                {this.renderTabSwitcher()}
                {this.state.selectedPageTab === PageTabs.EVERYTHING_ELSE
                    ? this.renderEverythingElsePage()
                    : renderServicesPage(this.appContext, this.state.cloudServiceResponse, res => {
                          this.setState({ cloudServiceResponse: res });
                      })}
            </SafeAreaView>
        );
    }
    public render508ToggleSwitches = () => {
        return (
            <View>
                <View style={{ padding: 5 }} accessible={true}>
                    <P>In accessible View</P>
                    <ToggleSwitch
                        onChangeValue={() => {
                            this.setState({ accessible508SwitchValue: !this.state.accessible508SwitchValue });
                        }}
                        value={this.state.accessible508SwitchValue}
                    />
                </View>
                <View style={{ padding: 5 }} accessible={true}>
                    <P>Pass label as accesiblityLabel</P>
                    <ToggleSwitch
                        accessibilityLabel={'Set Toggle Value'}
                        onChangeValue={() => {
                            this.setState({ notAccessible508SwitchValue: !this.state.notAccessible508SwitchValue });
                        }}
                        value={this.state.notAccessible508SwitchValue}
                    />
                </View>
            </View>
        );
    };

    public renderComponentListItem() {
        const prescriberSubText: string[] = ['1169 N Military Hwy,\nNorfolk, VA 23502'];
        const prescriberTitle: string = `1. Dr. John Snow`;

        const cvsSubText: string[] = ['1169 N Military Hwy,\nNorfolk, VA 23502', '0.7 miles'];
        const cvsTitle: string = '2. CVS';

        return (
            <>
                <ListItemWithButton
                    buttonLabel="Select"
                    onPressButton={() => {}}
                    subText={prescriberSubText}
                    title={prescriberTitle}
                />
                <ListItemWithButton
                    buttonLabel="Select"
                    onPressButton={() => {}}
                    subText={cvsSubText}
                    title={cvsTitle}
                />
            </>
        );
    }

    public renderEverythingElsePage() {
        return (
            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingTop: 40 }}>
                {/* Testing for 508.. Can be removed */}
                <View style={{ marginBottom: 20 }}>
                    <PrimaryButton
                        onPress={this.testBalanceOnSetUpAutoSpecialtyCreditCard}
                        title={'Test balance on Set Up Auto Specialty credit card'}
                    />
                </View>
                <View style={{ marginBottom: 20 }}>
                    <PrimaryButton
                        onPress={this.testBalanceOnSetUpAutoSpecialtyBankAccount}
                        title={'Test balance on Set Up Auto Specialty bank account'}
                    />
                </View>
                <View style={{ marginBottom: 20 }}>
                    <PrimaryButton
                        onPress={this.onPressTestSpecialtyPayNowZeroBalance}
                        title={'Test Specialty Pay Now Zero Balance'}
                    />
                </View>
                <View style={{ marginBottom: 20 }}>
                    <PrimaryButton
                        onPress={this.onPressTestSpecialtyPaymentConfirmation}
                        title={'Test Specialty Payment Confirmation'}
                    />
                </View>
                <View style={{ marginBottom: 20 }}>
                    <PrimaryButton
                        onPress={this.testZeroBalanceOnSetUpAutoSpecialty}
                        title={'Test zero balance on Set Up Auto Specialty'}
                    />
                </View>
                <View>
                    <PrimaryButton
                        onPress={() => {
                            this.navigate(RegistrationActions.TERMS_OF_USE_PRESSED);
                        }}
                        title={'Terms of use'}
                    />
                </View>
                <View
                    accessible
                    accessibilityRole={'checkbox'}
                    accessibilityStates={[this.state.checkboxSelected ? 'checked' : 'unchecked']}
                    style={{ padding: 20, flexDirection: 'row' }}
                >
                    <CheckBox
                        label={'making parent view accessible'}
                        isChecked={this.state.checkboxSelected}
                        onPress={() => {
                            this.setState(prevState => {
                                return { checkboxSelected: !prevState.checkboxSelected };
                            });
                        }}
                    />
                </View>
                <View style={{ padding: 20 }}>
                    <CheckBox
                        label={'508 testing of checkbox 2'}
                        isChecked={this.state.checkbox2Selected}
                        onPress={() => {
                            this.setState(prevState => {
                                return { checkbox2Selected: !prevState.checkbox2Selected };
                            });
                        }}
                    />
                </View>
                <View style={{ padding: 20 }}>
                    <P>{JSON.stringify(this.state.termsOfUseAcceptance)}</P>
                    <PrimaryButton
                        isDisabled={this.state.isTermsOfUseAccepted}
                        title={'Accept TOU'}
                        onPress={() => {
                            this.appContext
                                .getServiceExecutor()
                                .execute(UPDATE_TOU_ACCEPTANCE, {
                                    payload: this.appState.medicalProfiles[0].memberUid,
                                })
                                .then(res => {
                                    this.setState({ isTermsOfUseAccepted: true });
                                });
                        }}
                    />
                </View>
                <View>
                    <GradientAdvertisement
                        advertisementText={'Buy Now! Buy More! Pay Less'}
                        angle={45}
                        buttonText={'Do stuff'}
                        colors={['#D8A47F', '#DF3B57']}
                    />
                </View>
                {/* Don't take out the toggle or buttons below being used for testing */}
                <View>
                    <P>Toggle Medical Profile Completion</P>
                    {this.renderToggleSwitch()}
                </View>
                <View>
                    <P>Set All Medical Profiles to Incomplete</P>
                    <PrimaryButton
                        onPress={() => {
                            this.appState.medicalProfiles.forEach(medicalProfile => {
                                medicalProfile.isCompleted = false;
                            });
                        }}
                        title={'Set to incomplete'}
                    />
                </View>
                <View>
                    <P>{'Press to set PBM Account balance to zero.'}</P>
                    <PrimaryButton
                        onPress={() => {
                            this.appState.pbmAccountBalance = 0;
                        }}
                        title={'Set PBM Account to 0'}
                    />
                </View>
                <View>
                    {/*Do not comment out or delete this button, needed for QA testing and PO approval*/}
                    <P>{'Remove Default Payment Method from prescription cart'}</P>
                    <PrimaryButton
                        onPress={() => {
                            this.appStateActions.cart.setPaymentMethod(null);
                        }}
                        title={'Remove payment method'}
                    />
                </View>

                <View>
                    {/*Do not comment out or delete this view, needs this for QAtesting on info button*/}
                    <InfoModal>
                        <P>{'Testing infoButton on InfoModal'}</P>
                    </InfoModal>
                </View>
                {this.removeCommunication()}
                {/*
                <View>
                    <P>{'Removes payment Methods when set to off for all PBM payment screens'}</P>
                    <ToggleSwitch
                        onChangeValue={() => this.onPaymentValueChange()}
                        value={this.state.isAnyPaymentMethods}
                    />

                    <P>{'Removes payment Methods when set to off for all specialty payment screens'}</P>
                    <ToggleSwitch
                        onChangeValue={() => this.onSpecialtyValueChange()}
                        value={this.state.isAnySpecialtyPaymentMethods}
                    />
                </View>

                {this.renderInlineAlerts()}

                <View style={{ padding: 20, zIndex: 10 }}>
                    <SearchBar
                        onSubmitEditing={() => {}}
                        onChangeText={searchBarText => {
                            this.setState({
                                predictedSearchResults: searchBarText.length > 2 ? ['Lorem', 'Ipsum', 'Dolor'] : [],
                                searchBarText,
                            });
                        }}
                        textPlaceholder={'noop'}
                        textInputValue={this.state.searchBarText}
                        predictedSearchResults={this.state.predictedSearchResults}
                        onPressPredictedSearchResult={(searchBarText: string) => {
                            this.setState({ searchBarText, predictedSearchResults: [] });
                        }}
                    />
                </View>
                <HorizontalRule />
                <View style={{ padding: 20 }}>
                    <FormField
                        label="Form Field"
                        value={this.state.formFieldText}
                        onChangeText={formFieldText => {
                            this.setState({ formFieldText });
                        }}
                    />
                </View>
                <HorizontalRule />
                <View style={{ padding: 20, zIndex: 9 }}>
                    <FormField
                        autoCompleteItems={this.state.autoCompleteItems}
                        label="Form Field w/ Autocomplete"
                        value={this.state.formFieldText}
                        onChangeText={formFieldText => {
                            this.setState({
                                autoCompleteItems: formFieldText.length > 4 ? ['Lorem', 'Ipsum', 'Dolor'] : [],
                                formFieldText,
                            });
                        }}
                        // tslint:disable-next-line: no-console
                        onPressAutoCompleteItem={item => console.log({ onPressAutoCompleteItem: item })}
                    />
                </View>
                <HorizontalRule />
                <View style={{ padding: 20 }}>
                    <DropDown
                        title="Awesome Dropdown"
                        items={getDrugNames().map(label => ({ label, value: label }))}
                        accessibilityLabel="accessibilityLabel"
                        onChange={value => this.setState({ dropdownValue: value })}
                        value={this.state.dropdownValue}
                        placeholder={'Select Option'}
                    />
                </View>

                {/* <View style={{ padding: 20 }}>
                    <Button
                        title="Remove Specialty from Cart"
                        onPress={() => {
                            this.appState.prescriptionCart = {
                                ...this.appState.prescriptionCart,
                                specialty: {
                                    ...this.appState.prescriptionCart.specialty,
                                    prescriptionRefills: [],
                                    prescriptionRenewals: [],
                                },
                            };
                        }}
                    />
                </View> */}
                {/* buffer to keep stuff from being hidden by bottom navbar */}
                <View style={{ height: 50 }} />
                {/* 
                <RetailPickup />
                <View style={{ marginTop: 20, padding: 20 }}>
                    <FlatCardContainer cards={this.getConfirmationData()} />
                </View>
                <DropDown
                    androidComponent={
                        <AndroidDatePicker
                            date={this.state.selectedDate}
                            dates={['05/20/2019', '05/21/2019', '05/25/2019', '06/13/2019']}
                            onSelectDate={date => this.setState({ selectedDate: date })}
                        />
                    }
                    items={[{ label: '05/20/2019', value: '05/20/2019' }, { label: '05/21/2019', value: '05/21/2019' }]}
                    onChange={({value:selectedDate}) => this.setState({ selectedDate })}
                    value={this.state.selectedDate}
                />
                {/* <View>
                    <MapView
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={styles.map}
                        region={{
                            latitude: 37.78825,
                            latitudeDelta: 0.015,
                            longitude: -122.4324,
                            longitudeDelta: 0.0121,
                        }}
                    />
                </View>

                <ErrorBanner isBannerVisible />


                <View style={{ padding: 20, zIndex: 1 }}>
                    <P>Should be under PredictedSearchResults.</P>
                </View>

                <View style={{ padding: 20 }}>
                    <Filters
                        filterGroup={defaultFilters}
                        onChange={selectedFilters => this.onUpdateFilter(selectedFilters)}
                        selectedValues={this.state.selectedFilters}
                    >
                        {({ toggleModalVisible }) => (
                            <IconTextLink iconName={IconNames.DROPDOWN_ICON} onPress={() => toggleModalVisible(true)}>
                                Filter
                            </IconTextLink>
                        )}
                    </Filters>
                </View>
                <View style={{ padding: 20 }}>
                    <Text>{JSON.stringify(defaultFilters)}</Text>
                </View>
                <View style={{ padding: 20 }}>
                    <Text>{JSON.stringify(this.state.selectedFilters)}</Text>
                </View>
                <StepProgressor
                    data={['Review Pharmacy', 'Review Specialty', 'Specialty Questions', 'Submit Order']}
                    selectedIndex={0}
                />
                <View style={{ paddingVertical: 20 }}>
                    <ListExpandable
                        renderItem={(item, isOpen) => (
                            <>
                                <P>{item.title}</P>
                                {isOpen && <P>Hidden: {item.title}</P>}
                                <P>Other visible stuff.</P>
                            </>
                        )}
                        data={[
                            { title: 'One Thing' },
                            {
                                title:
                                    'Two Thing Two Thing Two Thing Two Thing Two Thing Two Thing Two Thing Two Thing Two Thing Two Thing Two Thing Two Thing Two Thing Two Thing ',
                            },
                            { title: 'Three Thing' },
                        ]}
                    />
                </View>

                <View style={{ paddingHorizontal: 100, paddingVertical: 20 }}>
                    <DatePicker
                        accessibilityLabel="Select a Date"
                        selectedDate={this.state.selectedDate.toDate()}
                        onChange={selectedDate => {
                            this.setState({ selectedDate });
                        }}
                    />
                </View>



                <View style={{ padding: 20 }}>
                    <TextLink onPress={() => this.setState({ showDialogBox: true })}>Show DialogBox</TextLink>
                    <DialogBox
                        title="DialogBox Title"
                        isVisible={this.state.showDialogBox}
                        onClose={() => this.setState({ showDialogBox: false })}
                        primaryText="Primary Button"
                        primaryMethod={() => {}}
                        secondaryText="Secondary Button"
                        secondaryMethod={() => {}}
                    >
                        {({ Buttons }) => (
                            <>
                                <P>This is a DialogBox.</P>
                                <Buttons />
                            </>
                        )}
                    </DialogBox>
                </View>

                <View style={{ padding: 20 }}>
                    <TextLink onPress={() => this.setState({ showModal: true })}>Show Modal</TextLink>
                    <Modal isVisible={this.state.showModal} onClose={() => this.setState({ showModal: false })}>
                        <Text>Hello World</Text>
                    </Modal>
                </View>

                <View style={{ padding: 20 }}>
                    <InfoModal title="This is a tool tip.">
                        <P>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tristique dolor velit, id
                            fringilla urna efficitur sed. Duis eleifend laoreet ipsum sit amet euismod. Pellentesque ut
                            massa mi. Nullam semper elit nec lectus vulputate, vitae sodales velit congue. Donec sodales
                            faucibus neque at scelerisque.
                        </P>
                        <P>
                            Cras eros tortor, viverra et pulvinar ut, laoreet sed ante. Nulla consectetur risus et
                            tincidunt pharetra. Nulla elementum lorem arcu, quis fermentum arcu facilisis ullamcorper.
                            Sed pellentesque, ante eget consectetur congue, magna orci euismod neque, ac luctus diam
                            magna in nisl.
                        </P>
                    </InfoModal>
                </View>

                <View style={{ padding: 20 }}>
                    <Text>Username from Login: {this.appContext.state.userData.userName}</Text>
                </View>

                <View style={{ padding: 20 }}>
                    <PhoneLink>17573380904</PhoneLink>
                </View>
                 */
                /*

                <View style={{ padding: 20 }}>
                    <View>
                        <View style={{ marginBottom: 20 }}>
                            <CheckBox
                                isChecked={this.state.checkboxSelected}
                                onPress={() => {
                                    this.setState(prevState => {
                                        return { checkboxSelected: !prevState.checkboxSelected };
                                    });
                                }}
                            >
                                <Text>
                                    You agree to the{' '}
                                    <TextLink style={{ textLink: { fontSize: 16 } }}>Term of Use</TextLink>
                                </Text>
                            </CheckBox>
                        </View>
                        <CheckBox
                            isChecked={this.state.checkbox2Selected}
                            onPress={() => {
                                this.setState(prevState => {
                                    return { checkbox2Selected: !prevState.checkbox2Selected };
                                });
                            }}
                        >
                            Make this your default shipping address for all your pharmacy orders, including Auto
                            Refills.
                        </CheckBox>
                    </View>

                    <Text>HR below here.</Text>
                    <HorizontalRule />
                    <Text>HR above here.</Text>
                    <View>
                        <Button title={'break'} onPress={() => this.causeJSError()} />
                    </View>
                    <View style={{ paddingVertical: 20 }}>
                        <TextLink onPress={() => this.testUserData('text link works')}>Test Text Link</TextLink>
                        <TextLink href="http://google.com">URL Text Link</TextLink>
                    </View>

                    <View style={{ paddingVertical: 20 }}>
                        <IconTextLink
                            onPress={() => this.testUserData('icon text link works')}
                            iconName={IconNames.LIST_ITEM_ACTIONABLE_ICON}
                        >
                            Test Icon Text Link
                        </IconTextLink>
                    </View>

                   

                    {this.renderScreenLevelAlerts()}

                    {this.renderFormFields()}

                    {this.renderFilters()}

                    {this.renderComponentListItem()}
                </View>
                <View>
                    <ShippingAddressCard
                        shippingAddress={{
                            addressType: AddressType.MAILING_ADDRESS,
                            city: 'Norfolk',
                            id: '3',
                            isDefaultAddress: false,
                            state: 'VA',
                            streetAddress1: '890 Mountain Dr',
                            streetAddress2: 'Apt 603',
                            zipCode: '22222',
                        }}
                    />
                </View> */}
                {/*  <H3>508 Experiments</H3>
                <View style={{ padding: 5 }}>{this.render508ToggleSwitches()}</View>
                <View style={{ padding: 5 }}>{this.render508SecondaryButtons()}</View> */}
            </ScrollView>
        );
    }
    public renderFilters() {
        return (
            <View>
                <View style={{ marginTop: 10, marginBottom: 20 }}>
                    <TextLink onPress={() => this.setState(prevState => ({ filterVisible: !prevState.filterVisible }))}>
                        Show Filter
                    </TextLink>
                    <View>
                        <Text>{JSON.stringify(this.state.selectedValues)}</Text>
                    </View>
                </View>
                <View>
                    <H2>Simple image component</H2>
                    <Image name={ImageNames.EXAMPLE_CHECK} style={{ height: 50, width: '100%' }} />
                </View>
            </View>
        );
    }
    public renderFormFields() {
        return (
            <View>
                <View style={{ paddingVertical: 20 }}>
                    <View style={{ paddingBottom: 15 }}>
                        <FormField label="Form Field" value={'Hello there'} placeholder={'Placeholder text'} />
                    </View>
                    <View style={{ paddingBottom: 15 }}>
                        <FormField
                            label="Form Field 2"
                            placeholder={'Placeholder text'}
                            errorMessage="Error message goes here."
                        />
                    </View>
                    <View style={{ paddingVertical: 20, flexDirection: 'row' }}>
                        <View style={{ width: '50%' }}>
                            <FormField label="Smaller Field 1" />
                        </View>
                        <View style={{ width: '50%' }}>
                            <FormField
                                label="Smaller Field 2"
                                errorMessage="Slightly longer error message for smaller field. Blah Blah Blah."
                            />
                        </View>
                    </View>

                    <View style={{ paddingVertical: 20, flexDirection: 'row' }}>
                        <View style={{ width: '33%' }}>
                            <FormField label="Tiny Field 1" />
                        </View>
                        <View style={{ width: '33%' }}>
                            <FormField label="Tiny Field 2" />
                        </View>
                        <View style={{ width: '33%' }}>
                            <FormField label="Tiny Field 3" />
                        </View>
                    </View>

                    <View style={{ paddingVertical: 20, width: '50%' }}>
                        <FormField
                            label="Smaller Field By Itself"
                            errorMessage="This field is wrapped in a 50% width container."
                        />
                    </View>
                </View>
            </View>
        );
    }
    public renderIconTextLink() {
        return (
            <IconTextLink
                onPress={() => this.testUserData('icon text link works')}
                iconName={IconNames.LIST_ITEM_ACTIONABLE_ICON}
            >
                Test Icon Text Link
            </IconTextLink>
        );
    }
    public renderInlineAlerts() {
        return (
            <View style={{ paddingVertical: 20 }}>
                <InlineAlert useMiniIcon>Error message goes here</InlineAlert>
                <InlineAlert useMiniIcon alertType="info">
                    Error message goes here
                </InlineAlert>
                <InlineAlert useMiniIcon alertType="confirm">
                    Error message goes here
                </InlineAlert>
                <InlineAlert>
                    Your Specialty order is now split by family member to ship different addresses.
                </InlineAlert>
                <InlineAlert alertType="info">
                    Your Specialty order is now split by family member to ship different addresses.
                </InlineAlert>
                <InlineAlert alertType="confirm">
                    Prescription canceled and unenrolled. To restart automatic refills or renewals, visit Auto Refill &
                    Renew.
                </InlineAlert>
            </View>
        );
    }

    public renderScreenLevelAlerts() {
        return (
            <View style={{ paddingVertical: 20 }}>
                <View style={{ paddingBottom: 15 }}>
                    <ScreenLevelAlert alertType="warning" onDismissAlert={() => {}}>
                        Something is wrong and we’re not able to show all of your orders. If you can’t find the order
                        you’re looking for below, please try again later.
                    </ScreenLevelAlert>
                </View>
                <View style={{ paddingBottom: 15 }}>
                    <ScreenLevelAlert alertType="confirm" onDismissAlert={() => {}}>
                        Prescription canceled and unenrolled. To restart automatic refills or renewals, visit Auto
                        Refill & Renew.
                    </ScreenLevelAlert>
                </View>
                <ScreenLevelAlert linkCopy="Undo" onLinkPress={() => {}} onDismissAlert={() => {}}>
                    You removed all your Pharmacy prescritions.
                </ScreenLevelAlert>
            </View>
        );
    }

    public renderTabSwitcher = () => {
        const getBackgroundColor = (tabName): string => {
            if (tabName === this.state.selectedPageTab) {
                return 'dodgerblue';
            } else {
                return 'gray';
            }
        };

        return (
            <View
                style={{
                    backgroundColor: 'lightgoldenrod',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    width: '100%',
                }}
            >
                <Button
                    color={getBackgroundColor(PageTabs.EVERYTHING_ELSE)}
                    onPress={() => this.setState({ selectedPageTab: PageTabs.EVERYTHING_ELSE })}
                    title="Everything Else"
                />
                <Button
                    color={getBackgroundColor(PageTabs.SERVICES)}
                    onPress={() => this.setState({ selectedPageTab: PageTabs.SERVICES })}
                    title="Services"
                />
            </View>
        );
    };

    public renderToggleSwitch = () => {
        return (
            <View>
                <ToggleSwitch onChangeValue={this.onValueChange} value={this.state.switchValue} />
            </View>
        );
    };

    public testUserData = (userName: string) => {
        this.appStateActions.userData.changeUsername(userName);
    };

    protected onCommunicationSwitched = () => {
        const emptyPreferences: MemberPreferences = new MemberPreferences(
            [],
            {
                emailAddress: '',
                phoneNumber: '0',
                smsNumber: '',
                smsRegistrationStatus: '',
            },
            {
                emailAddress: '',
                phoneNumber: '',
                smsNumber: '',
                smsRegistrationStatus: '',
            }
        );
        if (this.state.isCommunicationPresent) {
            this.appStateActions.memberCommunications.setMemberPreferences(emptyPreferences);
        }
        this.setState({ isCommunicationPresent: !this.state.isCommunicationPresent });
    };

    protected onPressTestSpecialtyPaymentConfirmation = () => {
        this.appStateActions.payAccountBalance.setPbmAccountBalance('50');
        this.navigate(PaymentActions.SUBMIT_SPECIALTY_PAYMENT_PRESSED);
    };

    protected onPressTestSpecialtyPayNowZeroBalance = () => {
        const specialtyAccount: AccountInfo = {
            accountBalance: '0',
            accountBalancePaymentInfo: {
                achAuthorizationRequired: false,
                recentPayment: false,
                recentPaymentAmount: '0',
            },
            accountHolder: {
                address: null,
                dob: '09/15/2000',
                emailAddress: '',
                firstName: 'Phillip',
                lastName: 'Fry',
                memberUid: '123',
                middleInitial: '',
                middleName: '',
                participantId: 0,
            },
            accountId: '123',
            accountType: AccountTypes.SPECIALTY,
            memberUid: '',
            paymentMethods: [],
        };

        this.appStateActions.payAccountBalance.setSelectedSpecialtyAccount(specialtyAccount);
        this.appStateActions.payAccountBalance.setAmountDue(0);

        this.navigate(PaymentActions.SPECIALTY_PAY_NOW_PRESSED);
    };

    // protected onSpecialtyValueChange = () => {
    //     if (this.state.isAnySpecialtyPaymentMethods) {
    //         this.appStateActions.payments.setSpecialtyPaymentMethods(null);
    //     } else {
    //         this.appStateActions.payments.setSpecialtyPaymentMethods([]);
    //     }
    //     this.setState({ isAnySpecialtyPaymentMethods: !this.state.isAnySpecialtyPaymentMethods });
    // };

    /* public on508SecondaryButtonPressed = (name: string) => {
        // console.log(`${name} pressed`);
    };

    public render508SecondaryButtons = () => {
        return (
            <>
                <View style={{ margin: 5 }}>
                    <SecondaryButton
                        accessibilityLabel={'Disable Secondary Btn 1'}
                        isDisabled={true}
                        onPress={() => {
                            this.on508SecondaryButtonPressed('1');
                        }}
                        title={'Disable Secondary Btn 1'}
                    />
                </View>
                <View style={{ margin: 5 }}>
                    <SecondaryButton
                        isDisabled={true}
                        onPress={() => {
                            this.on508SecondaryButtonPressed('2');
                        }}
                        title={'Disable Secondary Btn 2'}
                    />
                </View>
            </>
        );
    }; */

    // You need to define your onValuechange
    protected onValueChange = () => {
        // TODO: Remove this when we can login to users with different medical statuses
        this.appState.medicalProfiles.forEach(medicalProfile => {
            medicalProfile.isCompleted = !medicalProfile.isCompleted;
        });
        this.setState({ switchValue: !this.state.switchValue });
    };

    protected testBalanceOnSetUpAutoSpecialtyBankAccount = () => {
        const bankAccount: BankAccount = {
            accountID: '1234',
            accountName: 'World Bank ',
            accountNumber: '123456789',
            companyName: 'Bank of World',
            firstName: 'John',
            isDefaultMethod: false,
            isExclusiveToMember: false,
            lastName: 'Doe',
            paymentType: PaymentType.BANK_ACCOUNT,
            routingNumber: '0000001',
        };
        this.appStateActions.payments.setSelectedPaymentMethod(bankAccount);
        this.appStateActions.payAccountBalance.setSpecialtyAccountBalance('123');
        this.navigate(PaymentActions.MANAGE_AUTO_SPECIALTY_PRESSED);
    };

    protected testBalanceOnSetUpAutoSpecialtyCreditCard = () => {
        const creditCard: CreditCard = {
            accountID: '1234',
            accountName: 'John Doe',
            accountNumber: '987654321',
            companyName: 'Visa',
            expirationDate: '10/21/2025',
            isDefaultMethod: true,
            isExclusiveToMember: true,
            paymentType: PaymentType.CREDIT_CARD,
        };
        this.appStateActions.payments.setSelectedPaymentMethod(creditCard);
        this.appStateActions.payAccountBalance.setSpecialtyAccountBalance('5');
        this.navigate(PaymentActions.MANAGE_AUTO_SPECIALTY_PRESSED);
    };

    protected testZeroBalanceOnSetUpAutoSpecialty = () => {
        this.appStateActions.payAccountBalance.setSpecialtyAccountBalance('7.90');
        this.navigate(PaymentActions.MANAGE_AUTO_SPECIALTY_PRESSED);
    };
}

function getDrugNames() {
    return [
        'Abacavir Sulfate',
        'Abatacept',
        'Abilify',
        'Acamprosate Calcium',
        'Accretropin',
        'Aceon',
        'Aci-Jel',
        'Acthrel',
        'Actimmune',
        'Actisite',
        'Acular',
        'Acular LS',
        'Acuvail',
        'Adagen',
        'Adapalene',
        'Adcirca',
        'Adefovir Dipivoxil',
        'Adenoscan',
        'Adenosine',
        'Adipex-P',
        'AdreView',
        'Advair HFA',
        'Aerospan HFA',
        'Agalsidase Beta',
        'Aggrenox',
        'Akineton',
        'Alamast',
        'Albenza',
        'Aldactazide',
        'Aldactone',
        'Aldoril',
        'Aldurazyme',
        'Alemtuzumab',
        'Alglucosidase Alfa',
        'Allegra-D',
        'Allegra D 24 Hour',
        'Alli',
        'Aloprim',
        'Alora',
        'Alphanate',
        'Altace',
        'Altocor',
        'Altoprev',
        'Alupent',
        'Amantadine Hydrochloride',
        'Amerge',
        'Amifostine',
        'Amiloride',
        'Aminosalicylic Acid',
        'Aminosyn II 8.5%',
        'Amlodipine Besylate',
        'Amoxapine',
        'Amytal Sodium',
        'Anabolic steroids',
        'Anadrol-50',
        'Antithrombin',
        'Antivenin',
        'Antivert',
        'Aredia',
        'Aricept',
        'Armodafinil',
        'Arranon',
        'Artane',
        'Asclera',
        'Ascorbic Acid',
        'Astemizole',
        'Atacand',
        'Atacand HCT',
        'Atazanavir Sulfate',
        'Atomoxetine HCl',
        'Atridox',
        'Atripla',
        'Atropen',
        'Augmentin XR',
        'Avage',
        'Avandia',
        'Avastin',
        'Avinza',
        'Axid',
        'Azasan',
        'Azasite',
        'Azelaic Acid',
        'Azelastine Hydrochloride',
        'Azilect',
        'Azmacort',
        'Balsalazide',
        'Benazepril',
        'Benzocaine',
        'Benzoyl Peroxide Gel',
        'Benzphetamine',
        'Benztropine Mesylate',
        'Bepreve',
        'Betagan',
        'Bethanechol',
        'Betimol',
        'Betoptic S',
        'Bevacizumab',
        'BiCNU',
        'Biperiden',
        'Bismuth Subcitrate Potassium',
        'Bismuth Subsalicylate',
        'Blocadren',
        'Boniva',
        'Bontril',
        'Boostrix',
        'Botulinum Toxin Type A',
        'Bravelle',
        'Brevibloc',
        'Bromocriptine Mesylate',
        'Brovana',
        'Budesonide',
        'Buprenorphine',
        'Buspar',
        'Buspirone',
        'Busulfan',
        'Busulfex',
        'Cabergoline',
        'Caduet',
        'Calcitonin-Salmon',
        'Calcium Chloride',
        'Calcium Disodium Versenate',
        'Calcium Gluconate',
        'Campral',
        'Canasa',
        'Cancidas',
        'Captopril',
        'Carac',
        'Carbatrol',
        'Cardiolite',
        'Carisoprodol',
        'Carmustine',
        'Carvedilol',
        'Casodex',
        'Caspofungin Acetate',
        'Cataflam',
        'Catapres',
        'Catapres-TTS',
        'Caverject',
        'Cedax',
        'Cefditoren Pivoxil',
        'Cefixime',
        'Cefizox',
        'Cefotetan',
        'Ceftazidime',
        'Ceftibuten',
        'Ceftin',
        'Cefzil',
        'Celestone Soluspan',
        'Celexa',
        'CellCept',
        'Cellulose',
        'Celontin',
        'Cephalexin',
        'Cerebyx',
        'Ceretec',
        'Cerubidine',
        'Cerumenex',
        'Cervidil',
        'Cetirizine',
        'Cetraxal',
        'Cetrotide',
        'Cetuximab',
        'Chantix',
        'Chibroxin',
        'Chlorambucil',
        'Chloramphenicol Sodium Succinate',
        'Chloroprocaine',
        'Chlorpheniramine Maleate',
        'Chlorpromazine',
        'Chlorpropamide',
        'Chlorthalidone',
        'Cholera Vaccine',
        'Chorionic Gonadotropin',
        'Ciclopirox Gel',
        'Cilostazol',
        'Cinobac',
        'Cipro',
        'Cipro XR',
        'Cisapride',
        'Clarinex',
        'Clarithromycin',
        'Claritin',
        'Cleocin',
        'Cleviprex',
        'Climara Pro',
        'Clinoril',
        'Clobetasol Propionate',
        'Clocortolone',
        'Clofarabine',
        'Clonidine',
        'Clorazepate Dipotassium',
        'Clorpres',
        'Clotrimazole',
        'Cocaine',
        'Codeine',
        'Cognex',
        'Colazal',
        'Colchicine',
        'Colcrys',
        'Colesevelam Hcl',
        'Combivir',
        'Conjugated Estrogens',
        'Copaxone',
        'Corgard',
        'Cosmegen',
        'Coumadin',
        'Crolom',
        'Cromolyn Sodium',
        'Cubicin',
        'Curosurf',
        'Cuvposa',
        'Cyanocobalamin',
        'Cyclobenzaprine Hcl',
        'Cyclophosphamide',
        'Cyclosporine',
        'Cylert',
        'Cymbalta',
        'Cyproheptadine',
        'Cystadane',
        'Cytogam',
        'Cytomel',
        'Dacarbazine',
        'Daraprim',
        'Darvocet-N',
        'Darvon Compound',
        'Dasatinib',
        'Daunorubicin',
        'Daypro',
        'Daypro Alta',
        'DDAVP Nasal Spray',
        'Demadex',
        'Demeclocycline HCl',
        'Demser',
        'Depacon',
        'DepoDur',
        'Desferal',
        'Desogen',
        'Desonate',
        'DesOwen',
        'Detrol',
        'Detrol LA',
        'Dexlansoprazole',
        'Dexmethylphenidate Hydrochloride',
        'Dexrazoxane',
        'Diamox Sequels',
        'Dicyclomine',
        'Didanosine',
        'Diethylpropion',
        'Differin',
        'Diflucan',
        'Digoxin Immune Fab',
        'Diovan HCT',
        'Diphenhydramine',
        'Diphtheria-Tetanus Vaccine',
        'Diprolene AF',
        'Dipyridamole',
        'Ditropan',
        'Dobutamine',
        'Dofetilide',
        'Dolophine',
        'Donepezil Hydrochloride',
        'Dopamine Hydrochloride',
        'Dopar',
        'Dopram',
        'Doral',
        'Doryx',
        'Dorzolamide',
        'Dovonex',
        'Doxacurium Chloride',
        'Doxapram',
        'Doxazosin Mesylate',
        'Doxepin',
        'Doxercalciferol',
        'Doxil',
        'Doxycycline',
        'Doxycycline Hyclate',
        'Drisdol',
        'Dronabinol',
        'Drospirenone and Estradiol',
        'Duetact',
        'Duraclon',
        'Dynacirc',
        'Dynacirc CR',
        'Dynapen',
        'Dyphylline',
        'Econazole Nitrate',
        'Edrophonium',
        'Efavirenz',
        'Elaprase',
        'Elavil',
        'Eletriptan hydrobromide',
        'Eligard',
        'Ellence',
        'Elmiron',
        'Elspar',
        'Emadine',
        'Emcyt',
        'Emedastine',
        'Empirin',
        'Emsam',
        'Emtricitabine',
        'Emtriva',
        'Endocet',
        'Endometrin',
        'Enflurane',
        'Engerix-B',
        'Entereg',
        'Eovist',
        'Epinephrine',
        'Epipen',
        'Epirubicin hydrochloride',
        'Epivir',
        'Equetro',
        'Eraxis',
        'Erbitux',
        'Ergocalciferol',
        'Erlotinib',
        'Erythrocin Stearate',
        'Esomeprazole Sodium',
        'Essential Amino Acids',
        'Estrace',
        'Estradiol',
        'Estradiol Acetate',
        'Estradiol valerate',
        'Estratest',
        'Estropipate',
        'Eszopiclone',
        'Etanercept',
        'Ethacrynic Acid',
        'Ethambutol',
        'Ethinyl Estradiol',
        'Ethiodol',
        'Ethosuximide',
        'Etidocaine HCl',
        'Etidronate Disodium',
        'Etopophos',
        'Etrafon',
        'Eulexin',
        'Evista',
        'Evoxac',
        'Exelderm',
        'Exjade',
        'Extavia',
        'Factor IX Complex',
        'Factrel',
        'Famciclovir',
        'Famotidine Injection',
        'Famvir',
        'Fansidar',
        'Febuxostat',
        'Feridex I.V.',
        'Fesoterodine Fumarate Extended',
        'Finacea',
        'Flector',
        'Flonase',
        'Florinef',
        'Floxuridine',
        'Fluconazole',
        'Flucytosine',
        'Fludara',
        'Fludarabine Phosphate',
        'Fludrocortisone',
        'Flumazenil',
        'FluMist',
        'Fluocinolone Acetonide',
        'Fluoroplex',
        'Fluorouracil',
        'Fluoxetine Hydrochloride',
        'Flurbiprofen',
        'Fluress',
        'Fluticasone Propionate',
        'Fluvirin',
        'FML',
        'Folic Acid',
        'Follitropin Alfa',
        'Follitropin Beta',
        'Fomepizole',
        'Foradil Aerolizer',
        'Foradil Certihaler',
        'Forane',
        'Fosamax Plus D',
        'Fosamprenavir Calcium',
        'Foscavir',
        'Fosphenytoin Sodium',
        'Fragmin',
        'Frovatriptan Succinate',
        'Fulvestrant',
        'Fungizone',
        'Furadantin',
        'Furosemide',
        'Furoxone',
        'Fuzeon',
        'Gabitril',
        'Gadobenate Dimeglumine',
        'Gadofosveset Trisodium',
        'Galsulfase',
        'Gamunex',
        'Geocillin',
        'Geodon',
        'Gleevec',
        'Glucophage XR',
        'Glucovance',
        'Glyburide',
        'Glycopyrrolate',
        'Glynase',
        'Glyset',
        'Gold Sodium Thiomalate',
        'Gonadorelin',
        'Gonal-F',
        'Gonal-f RFF',
        'Grifulvin V',
        'Griseofulvin',
        'Guanethidine Monosulfate',
        'Gynazole',
        'Haemophilus b Conjugate Vaccine',
        'Halcinonide',
        'Haldol',
        'Halobetasol Propionate',
        'Haloperidol',
        'Healon',
        'HepaGam B',
        'Heparin Lock Flush',
        'HepatAmine',
        'Hepatitis A Vaccine, Inactivated',
        'Hepatitis B Immune Globulin',
        'Hepflush-10',
        'Herceptin',
        'Hexachlorophene',
        'HibTITER',
        'Hivid',
        'Human Secretin',
        'Humira',
        'Humulin N',
        'Hyalgan',
        'Hydrocodone Bitartrate and Acetaminophen',
        'Hydroxyethyl Starch',
        'Hylenex',
        'Hyoscyamine',
        'Hytrin',
        'Ibuprofen Lysine',
        'Idamycin',
        'Idamycin PFS',
        'Ifosfamide',
        'Iloperidone',
        'Imipramine',
        'Imiquimod',
        'Imitrex',
        'Immune Globulin',
        'Immune Globulin Intravenous',
        'Implanon',
        'Inderal LA',
        'Indigo Carmine',
        'InnoPran XL',
        'Insulin',
        'Insulin Aspart',
        'Intelence',
        'Intralipid 20%',
        'Intuniv',
        'Invanz',
        'Invega',
        'Inversine',
        'Ionamin',
        'Irinotecan Hydrochloride',
        'Isentress',
        'Ismo',
        'Isocarboxazid',
        'Isoptin SR',
        'Isopto Carpine',
        'Isopto Hyoscine',
        'Istalol',
        'Isuprel',
        'Ixempra',
        'Jalyn',
        'Janumet',
        'Je-Vax',
        'K-LOR',
        'Kaletra',
        'Kariva',
        'Kenalog',
        'Kinlytic',
        'Klonopin',
        'Kuvan',
        'Kytril',
        'Labetalol',
        'lacosamide',
        'Lamisil',
        'Lamivudine / Zidovudine',
        'Latanoprost',
        'Letairis',
        'Letrozole',
        'Leuprolide Acetate',
        'Leustatin',
        'Levalbuterol',
        'Levaquin',
        'Levemir',
        'Levo-T',
        'Levocabastine',
        'Levofloxacin',
        'Levonorgestrel',
        'Levonorgestrel and Ethinyl Estradiol',
        'Levonorgestrel Implants',
        'Levonorgestrel, Ethinyl Estradiol',
        'Lexapro',
        'Lexiscan',
        'Lexxel',
        'Librium',
        'Lidex',
        'Lidoderm',
        'Linezolid',
        'Lipofen',
        'Liposyn II',
        'Liraglutide',
        'Lisinopril and Hydrochlorothiazide',
        'Locoid',
        'Lodine',
        'Loperamide Hcl',
        'Lopid',
        'Loprox Gel',
        'Loracarbef',
        'Lortab',
        'Lotemax',
        'Lotensin',
        'Lotronex',
        'Lovenox',
        'Loxapine',
        'Loxitane',
        'Lucentis',
        'Luvox CR',
        'Lybrel',
        'M-M-R',
        'Malarone',
        'Malathion',
        'Mandol',
        'Mangafodipir',
        'Maraviroc',
        'Marinol',
        'Maxitrol',
        'Mecasermin',
        'Meclofenamate',
        'Mefloquine',
        'Melphalan',
        'Menactra',
        'Menest',
        'Menotropins',
        'Mephobarbital',
        'Mequinol and Tretinoin',
        'Meropenem',
        'Merrem I.V.',
        'Mesalamine',
        'Mesna',
        'Mestinon',
        'Metadate ER',
        'Metaglip',
        'Metaproterenol Sulfate',
        'Metaxalone',
        'Metformin Hcl',
        'Methadone Hydrochloride',
        'Methadose Oral Concentrate',
        'Methazolamide',
        'Methenamine Hippurate',
        'Methergine',
        'Methohexital Sodium',
        'Methyclothiazide',
        'Methyldopa',
        'Methylene Blue',
        'Methylergonovine Maleate',
        'Methylin',
        'Methyltestosterone',
        'Metipranolol',
        'Metoclopramide',
        'Metoprolol Tartrate',
        'MetroLotion',
        'Metyrapone',
        'Metyrosine',
        'Miacalcin',
        'Micro-K',
        'Micronase',
        'Micronized Glyburide',
        'Midazolam',
        'Midodrine Hydrochloride',
        'Milrinone',
        'Minocin',
        'Minocycline',
        'Minoxidil',
        'Miochol-E',
        'Miostat',
        'Mitomycin',
        'Mobic',
        'Modafinil',
        'Monistat',
        'Monistat-Derm',
        'Morrhuate Sodium',
        'Motrin',
        'Moxatag',
        'Mozobil',
        'Multaq',
        'Multi Vitamin',
        'Multihance',
        'Mustargen',
        'Mutamycin',
        'Myambutol',
        'Mycamine',
        'Mycelex',
        'Mycophenolic Acid',
        'Myfortic',
        'Mykrox',
        'Myobloc',
        'Myochrysine',
        'Nafcillin Sodium',
        'Naftifine Hcl',
        'Nalmefene Hydrochloride',
        'Naltrexone',
        'Naproxen',
        'Nascobal',
        'Natazia',
        'Natrecor',
        'Navelbine',
        'Nebcin',
        'Nebivolol Tablets',
        'Nedocromil',
        'Nelarabine',
        'Nelfinavir Mesylate',
        'NeoProfen',
        'Neostigmine',
        'Nephramine',
        'Nesacaine',
        'Neulasta',
        'Nexavar',
        'Niaspan',
        'Nicotrol',
        'Nicotrol NS',
        'Nilandron',
        'Nilotinib Capsules',
        'Nimbex',
        'Nimotop',
        'Nitroglycerin',
        'NitroMist',
        'Nizatidine',
        'Nizoral',
        'Noctec',
        'Nor-QD',
        'Norethindrone and Ethinyl Estradiol',
        'Noritate',
        'Nortriptyline Hydrochloride',
        'Norvasc',
        'NovoLog Mix 70/30',
        'Novoseven',
        'Numorphan',
        'Nutropin AQ',
        'Nutropin Depot',
        'Nydrazid',
        'Omeprazole',
        'Omnaris',
        'Opana',
        'Opticrom',
        'OptiMARK',
        'Optipranolol',
        'Oracea',
        'Oraqix',
        'Orfadin',
        'Orlaam',
        'Orlistat',
        'Orudis',
        'Ovcon',
        'Ovide',
        'Oxandrolone',
        'Oxaprozin',
        'Oxistat',
        'Oxsoralen-Ultra',
        'Oxycodone HCl',
        'Oxycodone Hydrochloride',
        'Oxycontin',
        'Oxymetholone',
        'Oxymorphone',
        'Oxytetracycline',
        'Paclitaxel',
        'Palifermin',
        'Paliperidone',
        'Palonosetron hydrochloride',
        'Panhematin',
        'Pantoprazole',
        'Parafon Forte',
        'Parnate',
        'Paser',
        'Pataday',
        'Pazopanib',
        'Pediapred',
        'PEG 3350',
        'Pegfilgrastim',
        'Pemirolast Potassium',
        'Penciclovir',
        'Penicillamine',
        'Penlac',
        'Pentetate Zinc Trisodium',
        'Pentobarbital',
        'Pentoxifylline',
        'Perflutren',
        'Perindopril Erbumine',
        'Permax',
        'Persantine',
        'Pfizerpen',
        'Phenazopyridine',
        'Phenelzine',
        'Phenobarbital',
        'Phenoxybenzamine',
        'Phenylephrine HCl',
        'Phenylephrine Hydrochloride',
        'Phenytoin',
        'Phosphate',
        'Photofrin',
        'Pilocarpine Hydrochloride',
        'Pilopine HS',
        'Pindolol',
        'Pipracil',
        'Piroxicam',
        'Plaquenil',
        'PlasmaLyte A',
        'Plavix',
        'Plenaxis',
        'Pletal',
        'Pneumovax',
        'Podophyllin',
        'Polidocanol',
        'Polyethylene Glycol 3350',
        'Polythiazide',
        'Pramipexole',
        'Pred-G',
        'Prednicarbate',
        'Prednisolone Acetate',
        'Prednisone',
        'Prefest',
        'Pregnyl',
        'Premarin',
        'Prepidil',
        'Prevpac',
        'Priftin',
        'Primacor',
        'Primaquine',
        'Primidone',
        'Prinivil',
        'Prinzide',
        'Pristiq',
        'Procainamide',
        'Procalamine',
        'Prochlorperazine Maleate',
        'ProHance',
        'Proleukin',
        'Prolixin',
        'Promethazine HCl',
        'Promethazine Hydrochloride',
        'Prometrium',
        'Propecia',
        'Proquin XR',
        'Prostin VR Pediatric',
        'Protein C Concentrate',
        'Protopic',
        'Protriptyline Hydrochloride',
        'Proventil HFA',
        'Provisc',
        'Provocholine',
        'Pulmicort Flexhaler',
        'Pylera',
        'Pyrazinamide',
        'Pyridium',
        'Pyridostigmine',
        'Qualaquin',
        'Quazepam',
        'Quinidine Sulfate',
        'Quixin',
        'Rabies Vaccine',
        'Raltegravir',
        'Ranexa',
        'Ranitidine Hcl',
        'Rapamune',
        'Rasagiline',
        'Raxar',
        'Rebetol',
        'Remicade',
        'Remifentanil',
        'Renese',
        'ReoPro',
        'Rescriptor',
        'Rescula',
        'Revatio',
        'Revex',
        'Revia',
        'Reyataz',
        'Rezulin',
        'Rhinocort Aqua',
        'Rhogam Ultra-Filtered Plus',
        'RiaSTAP',
        'Rifamate',
        'Riomet',
        'Risperidone',
        'Ritalin',
        'Rituximab',
        'Rivastigmine Tartrate',
        'Robinul',
        'Rosiglitazone Maleate',
        'Rotarix',
        'RotaTeq',
        'Roxicet',
        'Roxicodone',
        'Ryzolt',
        'Sabril',
        'Sacrosidase',
        'Samsca',
        'Sanctura',
        'Santyl',
        'Saphris',
        'Scopolamine',
        'Seasonale',
        'Selegiline Hydrochloride',
        'Selsun',
        'Septra',
        'Serax',
        'Sertraline Hcl',
        'Serzone',
        'Sevoflurane',
        'Sibutramine Hydrochloride Monohydrate',
        'Silenor',
        'Simponi',
        'Sirolimus',
        'Sitagliptin Metformin HCL',
        'Slow-K',
        'Sodium Bicarbonate',
        'Sodium ferric gluconate',
        'Sodium Iodide I 131',
        'Sodium Polystyrene Sulfonate',
        'Sodium Sulfacetamide',
        'Soma Compound',
        'Somatrem',
        'Somatropin',
        'Sonata',
        'Soriatane',
        'Sotradecol',
        'Spiriva',
        'Sporanox',
        'Sprix',
        'Sprycel',
        'Stalevo',
        'Starlix',
        'Stavudine',
        'Streptokinase',
        'Strontium-89',
        'Suboxone',
        'Succimer',
        'Succinylcholine Chloride',
        'Sucralfate',
        'Sulfamylon',
        'Sunitinib Malate',
        'Sutent',
        'Synthroid',
        'Synvisc',
        'Syprine',
        'Tacrolimus',
        'Talacen',
        'Talwin Nx',
        'Tamiflu',
        'Tamoxifen Citrate',
        'Tapazole',
        'Targretin',
        'Tasmar',
        'Tegretol',
        'Tekturna HCT',
        'Telavancin',
        'Telbivudine',
        'Telmisartan',
        'Temovate Scalp',
        'Temozolomide',
        'Temsirolimus',
        'Teniposide',
        'Terazol 3, Terazol 7',
        'Tessalon',
        'Testolactone',
        'Testred',
        'Teveten HCT',
        'Theracys',
        'Thiabendazole',
        'Thiethylperazine',
        'Thiopental Sodium',
        'Thioridazine',
        'Thiothixene Hcl',
        'Thrombin',
        'Thyrolar',
        'Thyrotropin Alfa',
        'Tiazac',
        'Ticarcillin',
        'Tinzaparin',
        'Tirosint',
        'Tizanidine',
        'Tobrex',
        'Tofranil-PM',
        'Tolazamide',
        'Tolmetin Sodium',
        'Tonocard',
        'Topicort',
        'Topiramate',
        'Topotecan Hydrochloride',
        'Toradol',
        'Torsemide',
        'Toviaz',
        'Tramadol Hcl',
        'Tranxene',
        'Trastuzumab',
        'Trasylol',
        'Tretinoin',
        'Trexall',
        'Tri-Sprintec',
        'Triamcinolone Acetonide',
        'Triazolam',
        'Tribenzor',
        'Trientine',
        'Trihexyphenidyl',
        'Trilipix',
        'Trilisate',
        'Trimethadione',
        'Trimethoprim',
        'Trimethoprim and Sulfamethoxazole',
        'Trimetrexate Glucuronate',
        'Trizivir',
        'Trovafloxacin',
        'Trovan',
        'Trusopt',
        'Trypan Blue',
        'Tussionex',
        'Tysabri',
        'Tyvaso',
        'Uloric',
        'Ultiva',
        'Ultram',
        'Ultrase',
        'Ultravate',
        'Unasyn',
        'Urex',
        'Ursodiol',
        'Vagistat-1',
        'Valacyclovir Hydrochloride',
        'Valganciclovir Hcl',
        'Valium',
        'Valproic Acid',
        'Valsartan and Hydrochlorothiazide',
        'Vancomycin Hydrochloride',
        'Vaprisol',
        'Vasocidin',
        'Vasotec',
        'Vasovist',
        'Vectibix',
        'Vectical',
        'Velosulin',
        'Veltin',
        'Venlafaxine Hydrochloride',
        'Veramyst',
        'Vermox',
        'Vesanoid',
        'VESIcare',
        'Vibramycin',
        'Vicodin',
        'Vicodin HP',
        'Vicoprofen',
        'Victoza',
        'Vimovo',
        'Vimpat',
        'Vinblastine Sulfate',
        'Viokase',
        'Vioxx',
        'Viread',
        'VisionBlue',
        'Vistide',
        'Vitamin K1',
        'Vivactil',
        'Vivelle-Dot',
        'Vusion',
        'Vytorin',
        'Winstrol',
        'Xigris',
        'Xolair',
        'Yellow Fever Vaccine',
        'Zaditor',
        'Zalcitabine',
        'Zanosar',
        'Zelnorm',
        'Zemaira',
        'Zemplar',
        'Zestoretic',
        'Zestril',
        'Ziconotide',
        'Zingo',
        'Zmax',
        'Zocor',
        'Zolinza',
        'Zolmitriptan',
        'Zonalon',
        'Zoster Vaccine Live',
        'Zosyn',
        'Zyclara',
        'Zyflo',
        'Zylet',
        'Zyloprim',
        'Zymaxid',
    ];
}

const renderServicesPage = (appContext, cloudServiceResponse, setCloudResponse) => {
    // TODO: include switch to toggle mock mode
    interface TestServiceConfig {
        buttonTitle: string;
        payload: any | null;
        serviceEndpoint: ServiceEndpoint;
    }

    const testServices: TestServiceConfig[] = [
        {
            buttonTitle: 'Create Digital Account',
            payload: {
                dob: '05-22-1981',
                emailAddress: 'jsmith@abc.com',
                firstName: 'John',
                lastName: 'Smith',
                memberUid: '875672',
                password: 'jonsmit',
                username: 'johnm007',
            },
            serviceEndpoint: CREATE_DIGITAL_ACCOUNT,
        },
        {
            buttonTitle: 'Get Claims',
            payload: {
                endDate: '2018-12-31',
                memberUid: '123456',
                startDate: '2018-06-01',
            },
            serviceEndpoint: GET_CLAIMS,
        },
        {
            buttonTitle: 'Find My Info',
            payload: {
                dob: '1988-12-25',
                firstName: 'NATHAN',
                lastName: 'WINCHESTER',
                memberUid: 'YZC037T96001',
            },
            serviceEndpoint: FIND_MY_INFO,
        },
        {
            buttonTitle: 'Validate Digital Account',
            payload: {
                firstName: 'MINOR',
                lastName: 'Manu',
                password: 'support1',
                securityQuestions: [
                    {
                        answer: 'test1',
                        // tslint:disable-next-line: quotemark
                        question: "What is your maternal grandmother's maiden name?",
                    },
                ],
                username: 'h@j0o9tlp',
            },
            serviceEndpoint: VALIDATE_DIGITAL_ACCOUNT,
        },
        {
            buttonTitle: 'Get Account Balance',
            payload: null,
            serviceEndpoint: GET_ACCOUNT_BALANCE,
        },
        {
            buttonTitle: 'Get Specialty Accounts',
            payload: null,
            serviceEndpoint: GET_SPECIALTY_ACCOUNTS,
        },
    ];
    return (
        <View style={{ flex: 1, padding: 20 }}>
            <View style={{ flex: 3 }}>
                <ScrollView style={{ flex: 1 }}>
                    {testServices.map(service => {
                        const { buttonTitle, payload, serviceEndpoint } = service;
                        return (
                            <View key={Math.random().toString()}>
                                <PrimaryButton
                                    key={Math.random().toString()}
                                    title={buttonTitle}
                                    onPress={() => {
                                        appContext
                                            .getServiceExecutor()
                                            .execute(serviceEndpoint, {
                                                payload,
                                            })
                                            .then(res => {
                                                setCloudResponse(JSON.stringify(res, null, 2));
                                            })
                                            .catch(error => {
                                                setCloudResponse(JSON.stringify(error, null, 2));
                                            });
                                    }}
                                />
                                <View style={{ height: 10 }} />
                            </View>
                        );
                    })}
                </ScrollView>
            </View>
            <View style={{ backgroundColor: 'aliceblue', flex: 1 }}>
                <ScrollView>
                    <Text> {cloudServiceResponse}</Text>
                </ScrollView>
            </View>
        </View>
    );
};
