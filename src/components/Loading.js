import React, { Component } from "react";
import { StyleSheet, ActivityIndicator, View } from 'react-native';

export default class Loading extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.show) {
            return (
                <View style={StyleSheet.loading}>
                    <ActivityIndicator style size="large" color="#000000" />
                </View>);
            } else {
                return null;
            }
        }
    }

    const styles = StyleSheet.create({
        loading: {
            opacity: 0.7,
            backgroundColor: '#FFFFFF',
            position: 'absolute',
            width: '100%',
            height: '100%',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }
    });