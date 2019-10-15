import React, { Component } from "react";
import { FlatList, Image } from 'react-native';
import {
    Container, Header, Content,
    Text, Body, Title, Icon, Card, CardItem
} from "native-base";
import { connect } from 'react-redux';
import ReviewItem from "./ReviewItem";

class RemoteList extends Component {
    
    static navigationOptions = {
        title: 'Mundo',
        tabBarIcon: ({ tintColor }) => {
        return (<Icon name="globe" style={{ color: tintColor }} />);
        } 
    }

    constructor(props) {
        super(props);
        this.state = {
            reviews: []
        } 
    }

    componentDidMount() {
        fetch('https://us-central1-opini-ad71d.cloudfunctions.net/api/reviews').then(resp => {
            resp.json().then(reviews => {
                this.setState({ reviews });
            }); 
        });
    }

    _renderImage(item) {
    if (item.imageUri) {
        const uri='https://firebasestorage.googleapis.com/v0/b/opini-ad71d.appspot.com/o/images%2F'
            +item.imageUri
            +'?alt=media';
            return (
                <CardItem cardBody>
                    <Image source={{uri}} style={{ height: 200, width: null, flex: 1 }} />
                </CardItem>);
        } else {
            return null;
        } 
    }

    _renderItem({ item }) {
        return (
            <ReviewItem item={item} renderImage={(item) => this._renderImage(item)} />
        );
    }

    render() {
        return (
            <Container>
                <Header>
                    <Body><Title>Lista de Opiniões do Mundo</Title></Body>
                </Header>
                <Content padder>
                    <FlatList
                        data={this.state.reviews}
                        keyExtractor={(_, index) => `${index}`}
                        renderItem={(item) => this._renderItem(item)}
                    />
                </Content>
            </Container>
        );
    } 
}

const mapsStateToProps = ({ reviews }) => {
  return { reviews };
}

export default connect(mapsStateToProps)(RemoteList);