import React, {useState} from 'react'
import {View, Text, Image, TouchableOpacity, Alert, ToastAndroid} from 'react-native'
import axios from 'axios'
import Edit from '../../components/molecules/Edit'

const Detail = ({route, navigation})=>{
    const data = route.params.data
    const [state, setSate]= useState({edit: false})

    const edit = ()=>{
        setSate({
            ...state,
            edit: true
        })
    }

    console.log(data)
    const deleteData = () =>{
        axios.post('https://phonegrafi.com/biodata/delete.php', {
                id: data.id
            })
            .then(function (response) {
                data.getData()
                ToastAndroid.show("Delete data success", ToastAndroid.SHORT)
                navigation.goBack()
            })
            .catch(function (error) {
                console.log(error)
                ToastAndroid.show("Delete data failed, try again leter", ToastAndroid.SHORT)
        });
    }

    const backHome = ()=>{
        data.getData()
        navigation.goBack()
    }


    const deleteDataAlert = () =>
    Alert.alert(
        "Delete Data",
        `Are you sure to delete ${data.name}?`,
        [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            },
            { text: "OK", onPress: () => deleteData() }
        ],
            { cancelable: false }
    );

    return(
        <View style={{flex: 1}}>
            {
                state.edit ? <Edit data={data} backHome={backHome}/> :
            
                <View>
                    <View style={{backgroundColor: '#ddd', padding: 48, position: 'relative'}}>
                        <View style={{alignItems: 'center', marginTop: 8}}>
                            <Image source={require('../../assets/icons/person.png')} style={{width: 90, height: 90}}/>
                        </View>
                        <View style={{alignItems: 'center', marginTop: 6}}>
                            <Text style={{fontSize: 27, fontWeight: '700'}}>{data.name}</Text>
                            <Text style={{fontSize: 18, marginTop: 4}}>{data.address}</Text>
                            <Text style={{fontSize: 18, marginTop: 4}}>{data.phone}</Text>
                        </View>
                    </View>
                    <View style={{alignSelf: 'center', flexDirection: 'row', position: 'absolute', bottom: -28}}>
                        <TouchableOpacity onPress={edit} style={{margin: 6}}>
                            <View style={{backgroundColor: '#2fa342', padding: 14, borderRadius: 32}}>
                                <Image source={require('../../assets/icons/edit.png')} style={{width: 20, height: 20}}/>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={deleteDataAlert} style={{margin: 6}}>
                            <View style={{backgroundColor: '#d35050', padding: 14, borderRadius: 32}}>
                                <Image source={require('../../assets/icons/delete.png')} style={{width: 20, height: 20}}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </View>
    )
}

export default Detail
