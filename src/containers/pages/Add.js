import React, { useState } from 'react'
import {View, TextInput, Button, ToastAndroid} from 'react-native'
import axios from 'axios'

const Add = ({route, navigation})=>{
    const getData = route.params.getData

    const [state, setState] = useState({
        name: '',
        address: '',
        phone: ''
    })

    const setValue = (value, name)=>{
        switch(name){
            case 'name':
                setState({
                    ...state,
                    name: value
                })
                break
            case 'address':
                setState({
                    ...state,
                    address: value
                })
                break
            case 'phone':
                setState({
                    ...state,
                    phone: value
                })
                console.log('masuk')
                break
            default:
                console.log('failed')
        }
        console.log(state)
        
    }

    const save = ()=>{
        axios.post('https://phonegrafi.com/biodata/add.php', {
                name: state.name,
                address: state.address,
                phone: state.phone
            })
            .then(function (response) {
                getData()
                ToastAndroid.show("Add data success", ToastAndroid.SHORT)
                navigation.goBack()
            })
            .catch(function (error) {
                console.log(error)
                ToastAndroid.show("Add data failed, try again leter", ToastAndroid.SHORT)
        });
    }
    return(
        <View style={{flex: 1}}>
            <View style={{margin: 6}}>
                <TextInput onChangeText={(value)=>setValue(value, 'name')} placeholder="Nama" style={{borderWidth: .6, borderColor: '#ddd', borderRadius: 4, height: 38, marginBottom: 6, marginTop: 6}}/>
                <TextInput onChangeText={(value)=>setValue(value, 'address')} placeholder="Alamat" style={{borderWidth: .6, borderColor: '#ddd', borderRadius: 4, height: 38, marginBottom: 6, marginTop: 6}}/>
                <TextInput onChangeText={(value)=>setValue(value, 'phone')} placeholder="No Hp" keyboardType="numeric" style={{borderWidth: .6, borderColor: '#ddd', borderRadius: 4, height: 38, marginBottom: 6, marginTop: 6}}/>
                <View style={{marginTop: 12}}>
                    <Button title="Save" onPress={()=>save()}/>
                </View>
            </View>
        </View>
    )
}

export default Add
