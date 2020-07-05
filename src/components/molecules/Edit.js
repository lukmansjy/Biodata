import React, { useState } from 'react'
import {View, TextInput, Button, ToastAndroid} from 'react-native'
import axios from 'axios'

const Edit = (props)=>{
    const [state, setState] = useState({
        name: props.data.name,
        address: props.data.address,
        phone: props.data.phone
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

    const edit = ()=>{
        axios.post('https://phonegrafi.com/biodata/update.php', {
                id: props.data.id,
                name: state.name,
                address: state.address,
                phone: state.phone
            })
            .then(function (response) {
                props.backHome()
                ToastAndroid.show("Edit data success", ToastAndroid.SHORT)
            })
            .catch(function (error) {
                console.log(error)
                ToastAndroid.show("Edit data failed, try again leter", ToastAndroid.SHORT)
        });
    }
    return(
        <View style={{flex: 1}}>
            <View style={{margin: 6}}>
                <TextInput onChangeText={(value)=>setValue(value, 'name')} placeholder="Nama" value={state.name} style={{borderWidth: .6, borderColor: '#ddd', borderRadius: 4, height: 38, marginBottom: 6, marginTop: 6}}/>
                <TextInput onChangeText={(value)=>setValue(value, 'address')} placeholder="Alamat" value={state.address} style={{borderWidth: .6, borderColor: '#ddd', borderRadius: 4, height: 38, marginBottom: 6, marginTop: 6}}/>
                <TextInput onChangeText={(value)=>setValue(value, 'phone')} placeholder="No Hp" value={state.phone} keyboardType="numeric" style={{borderWidth: .6, borderColor: '#ddd', borderRadius: 4, height: 38, marginBottom: 6, marginTop: 6}}/>
                <View style={{marginTop: 12}}>
                    <Button title="Edit" onPress={()=>edit()}/>
                </View>
            </View>
        </View>
    )
}

export default Edit
