import React, { Component } from "react";
import { StyleSheet, Image, Platform, NativeModules } from 'react-native';
import {
    Container, Header, Content, Item, Label,
    Input, Form, Button, Text, Body, Title, Icon, Right, Switch, ListItem, Left
} from "native-base";
import ImagePicker from "react-native-image-picker";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addReview } from '../actions/ReviewActions'
import RNFetchBlob from 'rn-fetch-blob';
import uuid from 'uuid';
import Remote from '../services/Remote'
import Loading from "./Loading";

class ReviewForm extends Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => {
            return (<Icon name="create" style={{ color: tintColor }} />);
        }
}
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            imageUri: '',
            remote: false,
            loading: false
        };
}

addImage() {
    const options = {
        title: 'Escolha uma imagem'
    };
    ImagePicker.showImagePicker(options, (resp) => {
        this.setState({ imageUri: resp.uri });
    }) 
}

save() {
    if (this.state.remote) {
        this.remoteSave();
    } else {
        this.localSave();
    }
}

postSave() {
    this.setState({
        title: '',
        description: '',
        imageUri: '',
        remote: false,
        loading: false
});
    this.props.navigation.navigate('ReviewList');
}

localSave() {
    const { title, description } = this.state;

    NativeModules.DeviceName.getDeviceName().then(deviceName => {
        if (this.state.imageUri) {
            let filePath = this.state.imageUri;
            if (Platform.OS === 'ios') {
                filePath = filePath.replace('file://', '');
            }
            const imageUri = RNFetchBlob.fs.dirs.DocumentDir + '/' + uuid() + '.jpg';
            RNFetchBlob.fs.cp(filePath, imageUri).then(() => {
                this.props.addReview({
                    title, description, imageUri: `file://${imageUri}`, deviceName });
                this.postSave();
            });
        } else {
            this.props.addReview({ title, description, deviceName });
            this.postSave();
        }
    });       
}

async remoteSave() {
    this.setState({ loading: true });
    try {
        let filename = null;
        if (this.state.imageUri) {
            filename = await Remote.uploadImage(this.state.imageUri);
        }
        const deviceName = await NativeModules.DeviceName.getDeviceName();
        await Remote.saveReview({
            title: this.state.title,
            description: this.state.description,
            imageUri: filename,
            deviceName
        });
        this.setState({
            loading: false,
            title: '',
            description: '',
            imageUri: '',
            remote: false });
        alert('Opinião gravada com sucesso');

    } catch{
        alert('Erro ao submeter imagem');
        this.setState({ loading: false });
    } 
}

drawImage() {
    if (this.state.imageUri) {
        return (
            <Image
                style={{ marginTop: 20, height: 300, width: null }}
                source={{ uri: this.state.imageUri }} />
); } else {
        return null;
    }
}

render() {
    return (
            <Container>
                <Header>
                    <Body><Title>Nova Opinião</Title></Body>
                    <Right>
                        <Button transparent onPress={() => {
                            this.addImage();
                        }}>
                            <Icon name="camera" />
                        </Button>
                    </Right>
                </Header>
                <Content padder>
                <Form>
                        <Item fixedLabel>
                            <Label>Título</Label>
                            <Input
                                onChangeText={(title) => this.setState({ title })}
                                value={this.state.title}
                                />
                        </Item>
                        <Item fixedLabel>
                            <Label>Descrição</Label>
                            <Input
                                onChangeText={
                                    (description) => this.setState({ description })
                                }
                                value={this.state.description}
                                />
                        </Item>
                        <ListItem>
                            <Left><Label>Remoto</Label></Left>
                            <Right>
                                <Switch
                                    onValueChange={(remote) => this.setState({ remote })}
                                    value={this.state.remote} />
                            </Right>
                        </ListItem>
                </Form>
                {this.drawImage()}
                <Button block style={styles.saveButton} onPress={() => {
                    this.save()
                }}>
                    <Text>Salvar</Text>
                        </Button>
                    </Content>
                    <Loading show={this.state.loading} />
                </Container>
            ); 
        }
}

const styles = StyleSheet.create({
    saveButton: {
        marginTop: 30
    }
})

const mapsDispatchToProps = (dispatch) => {
    return bindActionCreators({ addReview }, dispatch);
}
export default connect(null, mapsDispatchToProps)(ReviewForm);