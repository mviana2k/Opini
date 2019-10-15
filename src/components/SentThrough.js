import React from 'react';
import { Text, CardItem } from "native-base";

export default (props) => {
    if (props.deviceName) {
        return (
            <CardItem>
                <Text note>Enviado através:{props.deviceName}</Text>
            </CardItem>);
    } else {
        return null;
    } 
};