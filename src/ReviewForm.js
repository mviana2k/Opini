import React, { Component } from "react";
import { StyleSheet } from 'react-native';
import {
    Container, Header, Content, Item, Label, Root,
    Input, Form, Button, Text, Body, Title, Toast, Icon
} from "native-base";

export default class ReviewForm extends Component {

    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => {
            return (<Icon name="create" style={{ color: tintColor }} />);
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: ''
        };
    }

save() {
    Toast.show({
        text: `${this.state.title}-${this.state.description}`
    });
    this.setState({
        title: '',
        description: ''
    });
}

    render() {
        return (
                <Container>
                    <Header>
                        <Body><Title>Nova Opinião</Title></Body>
                    </Header>
                    <Content padder>
                        <Form >
                            <Item floatingLabel>
                                <Label>Título</Label>
                                <Input
                                    onChangeText={(title) => this.setState({ title })} />
                            </Item>
                            <Item floatingLabel>
                                <Label>Descrição</Label>
                                <Input
                                    onChangeText={
                                        (description) => this.setState({ description })
                                    } />
                            </Item>
                        </Form>
                        <Button block style={styles.saveButton} onPress={() => {
                            this.save()
                        }}>
                            <Text>Salvar</Text>
                        </Button>
                        </Content>
                    </Container>
            );
        }
    }
    const styles = StyleSheet.create({
        saveButton: {
            marginTop: 30
        }
    })