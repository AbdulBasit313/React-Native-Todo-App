import React from 'react'
import { Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Functions from '../../common/Functions';


export default ViewContainer = ({ children, style }) => {
   return (
      <LinearGradient
         colors={Functions.gradientBackgroundColor}
         style={{ flex: 1 }}
         start={{ x: 0, y: 0 }}
         end={{ x: 0, y: 1 }}>
         {children}
      </LinearGradient>
   )
}
