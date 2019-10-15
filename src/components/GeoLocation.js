import React, { PureComponent } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, CardItem } from "native-base";

export default class GeoLocation extends PureComponent {

    render() {
        if (this.props.latitude && this.props.longitude) {
            return (
                <CardItem>
                    <TouchableOpacity onPress={this.props.onPress} >
                        <Text note>{this.props.latitude.toFixed(2)},
                            {this.props.longitude.toFixed(2)}</Text>
                    </TouchableOpacity>
                </CardItem>);
        } else {
            return null;
        }   
    }
}