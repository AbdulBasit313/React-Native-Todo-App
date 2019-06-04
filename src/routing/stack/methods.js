import React from 'react';
import { View, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import Functions from '../../common/Functions';

export const GradientHeader = (props) => {
   return (
      <LinearGradient
         colors={Functions.gradientHeaderColor}
         style={{ flex: 1 }}
         start={{ x: 0, y: 0 }}
         end={{ x: 0, y: 1 }}
      />
   )
}


export const HeaderTitleStyle = () => {
   return (
      <Text style={{ fontFamily: 'Pacifico-Regular', fontSize: 19, fontWeight: '400', color: '#4d4d4d', flex: 1, textAlign: 'center' }}>Todo App</Text>
   )
}