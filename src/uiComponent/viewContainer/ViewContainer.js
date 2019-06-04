import React, { Component } from 'react'
import { Text, View, ImageBackground } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Functions from '../../common/Functions';


export default ViewContainer = ({ children, style, source, resizeMode }) => {
   return (
      <LinearGradient
         // colors={['#0F2027', '#203A43', '#2C5364']}
         // colors={['#000000', '#434343']}
         colors={Functions.gradientBackgroundColor}
         style={{ flex: 1 }}
         start={{ x: 0, y: 0 }}
         end={{ x: 0, y: 1 }}>
         {children}
      </LinearGradient>
      // <ImageBackground source={source} resizeMode={resizeMode} style={{ flex: 1 }}>
      //    {children}
      // </ImageBackground>
   )
}
