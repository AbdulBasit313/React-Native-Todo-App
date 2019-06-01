import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import LinearGradient from 'react-native-linear-gradient';


const AddButton = ({ onPress, title, style }) => {
   return (
      <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']}>
         <TouchableOpacity onPress={onPress} activeOpacity={0.6} style={style}>
            <Icon
               name="pluscircle" size={52} color='#1ba39c'
            />
         </TouchableOpacity>
      </LinearGradient>
   )
}


export default AddButton