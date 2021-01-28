import { Address } from 'atlas-services/src/models';
import React from 'react';
import { View } from 'react-native';
import { BodyCopy, H5, TextLink } from '.';
import StyledComponent, { StyleProps } from '../styledComponent';
import defaultStyle, { ShippingDetailsStyleSchema } from './shippingDetails.style';

export interface Props extends StyleProps {
    shippingAddress: Address;
}

const defaultProps = {};

export default class ShippingDetails extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'ShippingDetails';
    public style: ShippingDetailsStyleSchema;

    public render = () => {
        const labels = this.labels.pharmacy.shippingAddressCard;
        const shippingAddress =
            this.props.shippingAddress ||
            this.logger.warn('no shipping address given to shipping address card') ||
            ({} as Address);
        return (
            <>
                <View>
                    <H5 style={{ h5: this.style.shippingDetailsHeader }}>{labels.shippingDetails}</H5>
                </View>
                <View>
                    {/* TODO: Home icon goes here */}
                    <H5 style={{ h5: this.style.shippingLabel }}>{labels.title}</H5>

                    <BodyCopy>{shippingAddress.streetAddress1}</BodyCopy>
                    <BodyCopy style={{ bodyCopy: this.style.shippingState }}>
                        {shippingAddress.city} {shippingAddress.state}, {shippingAddress.zipCode}
                    </BodyCopy>
                </View>
                <View>
                    <BodyCopy>
                        {labels.shippedOn}
                        {/* TODO: Shipping Date has to be displayed below */}
                        <H5>{'MM/DD/YYYY'}</H5>
                    </BodyCopy>
                    <BodyCopy style={{ bodyCopy: this.style.trackShipment }}>
                        {labels.tracking}
                        <TextLink
                            // TODO: navigate to track shipment
                            onPress={() => {}}
                        >
                            {labels.trackingShipment}
                        </TextLink>
                    </BodyCopy>
                </View>
            </>
        );
    };
}
