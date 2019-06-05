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
         todos: []
      }
      this.handleChange = this.handleChange.bind(this)
      // this.handleSubmit = this.handleSubmit.bind(this)
      // this.handleDelete = this.handleDelete.bind(this)
      this.showTodoInput = this.showTodoInput.bind(this)
   }

   keyExtractor = (item) => item.id.toString()

   handleChange(text) {
      this.setState({ text })
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

   // Delete data
   removePost = async (id) => {
      try {
         const todos = await AsyncStorage.getItem('todos');
         let todoFav = JSON.parse(todos);
         const todoItem = todoFav.filter(todo => todo.id !== id);
         console.log('remove post', todoItem)
         // updating 'posts' with the updated 'postsItems'
         JSON.parse(await AsyncStorage.setItem('todos', JSON.stringify(todoItem)))
         this.setState({
            todos: JSON.parse(await AsyncStorage.getItem('todos'))
         })
         console.log('state', this.state)
      } catch (error) {
         console.log('error: ', error);
      }
   };

   showTodoInput() {
      this.setState({ showInput: !this.state.showInput })
   }

   handleDelete = (id) => {
      const todos = this.state.todos.filter(item => item.id !== id)
      console.log('todo', todos)
      this.setState({ todos })
   }

   renderItems = ({ item }) => {
      // console.log('id', item.id)s
      return (
         <View
            style={{ borderBottomColor: 'rgba(241, 231, 254, 1)', borderBottomWidth: 0.2, paddingVertical: 13, paddingHorizontal: 12, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 5 }}
         >
            <Text style={{ fontFamily: 'Karla-Regular', fontSize: 18, fontWeight: '400', color: '#F8F8F8' }}>{item.todo}</Text>
            <TouchableOpacity onPress={() => this.removePost(item.id)} style={{ marginRight: 10 }}>
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