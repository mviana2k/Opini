import React, { PureComponent } from 'react';
import { Text, Body, Card, CardItem } from "native-base";

export default class ReviewItem extends PureComponent {
    
    render() {
        return (
            <Card>
                <CardItem header>
                    <Text>{this.props.item.title}</Text>
                </CardItem>
                {this.props.renderImage ?
                    this.props.renderImage(this.props.item)
                    : null}
                <CardItem>
                    <Body>
                        <Text>
                            {this.props.item.description}
                        </Text>
                    </Body>
                </CardItem>
                {this.props.children}
            </Card>
        ); 
    }
}