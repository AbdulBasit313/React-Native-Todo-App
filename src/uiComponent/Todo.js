import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, TouchableHighlight, TouchableOpacity, FlatList, Keyboard, ActivityIndicator } from 'react-native';
import AddButton from './addButton/AddButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import ViewContainer from './viewContainer/ViewContainer';
import { HeaderTitleStyle } from '../routing/stack/methods';
import AsyncStorage from '@react-native-community/async-storage';


class Todo extends Component {
   static navigationOptions = {
      headerStyle: {
         height: 44,
      },
      headerTitle: <HeaderTitleStyle />
   }
   constructor(props) {
      super(props)
      this.state = {
         text: '',
         showInput: false,
         isLoading: true,
         todos: [
            { todo: 'fdsf', id: 1 }
         ]
      }
      this.handleChange = this.handleChange.bind(this)
      // this.showTodoInput = this.showTodoInput.bind(this)
   }

   keyExtractor = (item) => item.id.toString()

   handleChange(text) {
      this.setState({ text })
   }

   async componentDidMount() {
      // let values = JSON.parse(await AsyncStorage.getItem('todos'))
      this.setState({
         todos: JSON.parse(await AsyncStorage.getItem('todos')),
         isLoading: false
      })
      // }
      console.log('componetDidMount', this.state)
   }

   // Store data
   storeData = async () => {
      // console.log('runs store data function')
      // console.log('length', this.state.todos)
      let notEmpty = this.state.text.trim().length > 0;
      if (!notEmpty) {
         alert('Can not submit empty todo')
      }
      else {
         let todos = !this.state.todos ? [{ todo: this.state.text, id: Math.random() }] : [...this.state.todos, { todo: this.state.text, id: Math.random() }]
         // let todos = [{ todo: this.state.text, id: Math.random() }]
         // const todos = [...this.state.todos, { todo: this.state.text, id: Math.random() }]
         try {
            await AsyncStorage.setItem('todos', JSON.stringify(todos))
            this.setState({
               todos: JSON.parse(await AsyncStorage.getItem('todos')),
               text: '',
               showInput: !this.state.showInput
            })
         } catch (e) {
            console.log('error', e)
         }
      }
      console.log('state', this.state)
   }

   // Delete data
   removeTodo = async (id) => {
      try {
         const todos = await AsyncStorage.getItem('todos');
         let todoFav = JSON.parse(todos);
         const todoItem = todoFav.filter(todo => todo.id !== id);
         console.log('remove post', todoItem)
         // updating 'todos' with the updated 'todoItem'
         JSON.parse(await AsyncStorage.setItem('todos', JSON.stringify(todoItem)))
         this.setState({
            todos: JSON.parse(await AsyncStorage.getItem('todos'))
         })
         console.log('state', this.state)
      } catch (error) {
         console.log('error: ', error);
      }
   };

   showTodoInput = () => {
      this.setState({ showInput: !this.state.showInput })
   }

   renderItems = ({ item }) => {
      return (
         <View
            style={{ borderBottomColor: 'rgba(241, 231, 254, 1)', borderBottomWidth: 0.2, paddingVertical: 13, paddingHorizontal: 12, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 5 }}
         >
            <Text style={{ fontFamily: 'Karla-Regular', fontSize: 18, fontWeight: '400', color: '#F8F8F8' }}>{item.todo}</Text>
            <TouchableOpacity onPress={() => this.removeTodo(item.id)} style={{ marginRight: 10 }}>
               <Icon
                  name="delete" size={25} color="rgb(180, 150, 150)"
               />
            </TouchableOpacity>
         </View>
      )
   }

   render() {
      const { text, showInput, todos, isLoading } = this.state
      return (
         // <ViewContainer source={require('../assets/images/background-pattern2.jpg')} resizeMode='cover'>
         <ViewContainer>
            <View style={{ flex: 1, position: 'relative' }}>
               {
                  isLoading ? (
                     <View
                        style={{
                           ...StyleSheet.absoluteFill,
                           alignItems: 'center',
                           justifyContent: 'center'
                        }}
                     >
                        <ActivityIndicator size="large" color="#bad555" />
                     </View>
                  ) : null
               }
               <FlatList
                  data={todos}
                  keyExtractor={this.keyExtractor}
                  renderItem={this.renderItems}
                  ListEmptyComponent={() => (
                     <View style={{
                        flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 50
                     }}>
                        <Text style={{ fontFamily: 'Karla-Regular', fontSize: 18, fontWeight: '400', color: '#F8F8F8' }}>You don't have any todo saved</Text>
                     </View>
                  )}
               />
               {showInput ? <View style={{}}>
                  <TextInput
                     style={{
                        height: 42, padding: 10, fontSize: 16, fontFamily: 'Karla-Regular', borderTopWidth: 1.2, borderColor: 'rgba(108, 122, 137, 0.7)', backgroundColor: '#fff',
                     }}
                     placeholder='Type your todo here!'
                     onChangeText={this.handleChange}
                     value={text}
                     autoFocus={true}
                     onSubmitEditing={this.storeData}
                  />
                  {/* <TouchableOpacity onPress={this.handleSubmit}>
                     <Text style={{ fontSize: 20 }}>Send</Text>
                  </TouchableOpacity> */}
               </View> : null}
               {!showInput ? <AddButton
                  onPress={this.showTodoInput}
                  style={{ position: 'absolute', bottom: 15, right: 15, zIndex: 1 }}
               /> : null}
            </View>
         </ViewContainer >
      );
   }
}


export default Todo