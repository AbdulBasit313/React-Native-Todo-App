import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import LoadingStyle from './LoadingStyle';

const Loading = () => {
   return (
      <View style={LoadingStyle.loadingContainer}>
         <ActivityIndicator size="large" color="#bad555" />
      </View>
   )
}


export default Loading
