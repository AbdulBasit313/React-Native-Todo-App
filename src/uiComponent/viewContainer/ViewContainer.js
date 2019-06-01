import React, { Component } from 'react'
import { Text, View, ImageBackground } from 'react-native'

export default ViewContainer = ({ children, style, source, resizeMode }) => {
   return (
      <ImageBackground source={source} resizeMode={resizeMode} style={{ flex: 1 }}>
         {children}
      </ImageBackground>
   )
}
