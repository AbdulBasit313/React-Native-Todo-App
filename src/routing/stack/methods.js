import React from 'react';
import { View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import Functions from '../../common/Functions';

export const GradientHeader = (props) => {
   return (
      <LinearGradient
         colors={Functions.gradientColor}
         style={{ flex: 1 }}
         start={{ x: 0, y: 0 }}
         end={{ x: 0, y: 1 }}
      />
   )
}