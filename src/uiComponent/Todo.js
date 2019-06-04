import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, TouchableHighlight, TouchableOpacity, FlatList, Keyboard } from 'react-native';
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
         todos: [
            //    { todo: 'go to gym', id: 1 },
            //    { todo: 'buy a mouse', id: 2 },
            //    { todo: 'practice hash table', id: 3 },
            //    { todo: 'go to gym', id: 4 },
            //    { todo: 'buy a mouse', id: 5 },
            //    { todo: 'practice hash table', id: 6 },
            //    { todo: 'go to gym', id: 7 },
            //    { todo: 'buy a mouse', id: 8 },
            //    { todo: 'practice hash table', id: 9 },
         ]
      }
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      // this.handleDelete = this.handleDelete.bind(this)
      this.showTodoInput = this.showTodoInput.bind(this)
   }

   keyExtractor = (item) => item.id.toString()

   handleChange(text) {
      this.setState({ text })
   }

   // FIXME: id is not working
   handleSubmit() {
      this.setState({
         todos: [...this.state.todos, { todo: this.state.text, id: Math.random() }],
         text: '',
         showInput: !this.state.showInput
      })
   }

   async componentDidMount() {
      this.setState({
         todos: JSON.parse(await AsyncStorage.getItem('todos'))
      })
      console.log('componetDidMount', this.state)
   }

   // Store data
   storeData = async () => {
      const todos = [...this.state.todos, { todo: this.state.text, id: Math.random() }]
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
      console.log('state', this.state)
   }

   // // Delete data
   // deleteData = async () => {
   //    try {
   //       AsyncStorage.removeItem('myKey', async () => {
   //          console.log('deleted')
   //          this.setState({
   //             data: await AsyncStorage.getItem('myKey')
   //          })
   //       })
   //    }
   //    catch (e) {
   //       console.log('error', e)
   //    }
   //    console.log('state', this.state)
   // }

   showTodoInput() {
      this.setState({ showInput: !this.state.showInput })
   }

   handleDelete = (id) => {
      const todos = this.state.todos.filter(item => item.id !== id)
      console.log('todo', todos)
      this.setState({ todos })
   }

   renderItems = ({ item }) => {
      console.log('id', item.id)
      return (
         <View
            style={{ borderBottomColor: 'rgba(0,0,0,0.08)', borderBottomWidth: 1, borderBottomColor: '#fff', padding: 8, paddingVertical: 15, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
         >
            <Text style={{ fontFamily: 'Karla-Regular', fontSize: 18, fontWeight: '400', color: '#F8F8F8' }}>{item.todo}</Text>
            <TouchableOpacity onPress={() => this.handleDelete(item.id)} style={{ marginRight: 10 }}>
               <Icon
                  name="delete" size={25} color="rgb(180, 150, 150)"
               />
            </TouchableOpacity>
         </View>
      )
   }

   render() {
      const { text, showInput, todos } = this.state
      return (
         // <ViewContainer source={require('../assets/images/background-pattern2.jpg')} resizeMode='cover'>
         <ViewContainer>
            <View style={{ flex: 1, position: 'relative' }}>
               <FlatList
                  data={todos}
                  keyExtractor={this.keyExtractor}
                  renderItem={this.renderItems}
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
         </ViewContainer>
      );
   }
}


export default Todo