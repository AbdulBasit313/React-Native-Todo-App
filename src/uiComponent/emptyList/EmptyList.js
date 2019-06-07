import React from 'react'
import { Text, View } from 'react-native'
import EmptyListStyle from './EmptyListStyle';

const EmptyList = () => {
   return (
      <View style={EmptyListStyle.container}>
         <Text style={EmptyListStyle.emptyListText}>You don't have any todo saved</Text>
      </View>
   )
}


export default EmptyList
