import React, { Component } from "react";
import uuid from 'uuid';
import { FlatList } from 'react-native';
import {
    Container, Header, Content,
    Text, Body, Title, Icon, Card, CardItem
} from "native-base";

export default class ReviewList extends Component {

    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => {
            return (<Icon name="list" style={{ color: tintColor }} />);
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            reviews: [
                { id: uuid(), title: 'Matrix', description: 'Muito Bom!' },
                { id: uuid(), title: 'Clube da Luta', description: 'Excelente!'},
                { id: uuid(), title: 'O Poderoso Chefão', description: 'Obra-prima!' },
            ]
        }
    }

_renderItem({ item }) {
    return (
        <Card>
            <CardItem header>
                <text>{item.title}</text>
            </CardItem>
            <CardItem>
                <Body>
                    <text>
                        {item.description}
                    </text>
                </Body>
            </CardItem>
        </Card>
    );
}

    render() {
        return (
            <Container>
                <Header>
                    <Body><Title>Lista de Opiniões</Title></Body>
                </Header>
                <Content padder>
                    <FlatList
                        data={this.state.reviews}
                        keyExtractor={(review) => review.id}
                        renderItem={(item) => this._renderItem(item)}
                    />
                </Content>
            </Container>
        );
    }    
}