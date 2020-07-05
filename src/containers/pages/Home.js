import React, { useEffect, useState } from 'react'
import {View, Text, Image, TouchableOpacity} from 'react-native'
import axios from 'axios'
import BiodataItem from '../../components/molecules/BiodataItem'
import { FlatList } from 'react-native-gesture-handler'

const Home = ({navigation})=>{
    const [state, setState] = useState({
        biodata: null,
        err: false,
        refreshing: false
    })

    

    const toDetail = data =>{
        const datas = {
            ...data,
            getData: getData
        }
        navigation.navigate('Detail', {data: datas})
    }

    const refreshData = () =>{
        setState({
          ...state,
          refreshing: true
        })
      }
    
    const getData = ()=>{
        setState({
            ...state,
            refreshing: true
        })
        axios.get('https://phonegrafi.com/biodata/all.php')
                .then(function (response) {
                    setState({
                        biodata: response.data,
                        err: false,
                        refreshing: false
                    })
                })
                .catch(function (error) {
                    setState({
                        ...state,
                        err: true,
                        refreshing: false
                    })
        });
        console.log('getdata')
    }

    useEffect(()=>{
        if(state.biodata === null && !state.refreshing){
            getData()
        }
    })

    return(
        <View style={{flex: 1}}>
            {state.errMsg ? <Text style={{textAlign: 'center', margin: 6}}>Error get data API</Text>: null}

            {state.refreshing ? <Text style={{padding: 6, textAlign: 'center'}}>Get data...</Text> : null}
            <FlatList 
                data={state.biodata}
                renderItem={
                    ({item, index}) => <BiodataItem data={item} index={index} key={item.id} onPress={data => toDetail(data)}/>
                }
                keyExtractor={ (item, index) => index.toString() }
                refreshing={state.refreshing}
                onRefresh={()=> refreshData()}/>

            <View style={{position: 'absolute', bottom: 22, right: 22}}>
                <TouchableOpacity onPress={() => navigation.navigate('Add', {getData: getData})} style={{backgroundColor: '#2fa342', padding: 14, borderRadius: 32}}>
                    <Image source={require('../../assets/icons/add.png')} style={{width: 20, height: 20}}/>
                </TouchableOpacity>
            </View>
            
        </View>
    )
}

export default Home
