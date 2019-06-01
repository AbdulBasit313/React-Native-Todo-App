import React from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import Todo from '../../uiComponent/Todo';
import Functions from '../../common/Functions';
import { GradientHeader } from './methods';


export const RootStack = createStackNavigator({
   Home: {
      screen: Todo
   }
}, {
      defaultNavigationOptions: {
         headerBackground: <GradientHeader />,
         headerTitleStyle: { color: '#fff' }
         // ...Functions.header
      }
   }
)

export const Root = createAppContainer(RootStack)