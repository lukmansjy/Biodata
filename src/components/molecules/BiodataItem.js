import React from 'react'
import {View, Text, Image, TouchableOpacity} from 'react-native'

const BiodataItem = ({data, onPress})=>{
    return(
        <TouchableOpacity onPress={()=>onPress(data)} style={{flexDirection: 'row', margin: 4, padding: 4, backgroundColor: '#ddd', borderRadius: 4}}>
            <View style={{marginRight: 6}}>
                <Image source={require('../../assets/icons/person.png')} style={{width: 40, height: 40}}/>
            </View>
            <View>
                <Text style={{fontWeight: '700', fontSize: 16}}>{data.name}</Text>
                <Text style={{fontSize: 14}}>{data.address}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default BiodataItem
