import React from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import Todo from '../../uiComponent/Todo';
import Functions from '../../common/Functions';


export const RootStack = createStackNavigator({
   Home: {
      screen: Todo
   }
}, {
      defaultNavigationOptions: {
         ...Functions.header
      }
   }
)

export const Root = createAppContainer(RootStack)