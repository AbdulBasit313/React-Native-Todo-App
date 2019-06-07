import React, { Component } from 'react';
import { Platform, Text, View, TextInput, TouchableHighlight, TouchableOpacity, FlatList, Keyboard } from 'react-native';
import AddButton from '../../uiComponent/addButton/AddButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import ViewContainer from '../../uiComponent/viewContainer/ViewContainer';
import { HeaderTitleStyle } from '../../routing/stack/methods';
import AsyncStorage from '@react-native-community/async-storage';
import EmptyList from '../../uiComponent/emptyList/EmptyList';
import Loading from '../../uiComponent/loading/Loading';
import TodoStyle from './TodoStyle';


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
         todos: []
      }
      this.handleChange = this.handleChange.bind(this)
      this.showTodoInput = this.showTodoInput.bind(this)
   }

   keyExtractor = (item) => item.id.toString()

   handleChange(text) {
      this.setState({ text })
   }

   async componentDidMount() {
      let values = JSON.parse(await AsyncStorage.getItem('todos'))
      this.setState({
         todos: values,
         isLoading: false
      })
      // }
      console.log('componetDidMount', this.state)
   }

   // Store data
   storeData = async () => {
      let notEmpty = this.state.text.trim().length > 0;
      if (!notEmpty) {
         alert('Can not submit empty todo')
      }
      else {
         let newTodo = { todo: this.state.text, id: Math.random() }
         const todos = !this.state.todos ? [newTodo] : [...this.state.todos, newTodo]
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

   showTodoInput() {
      this.setState({ showInput: !this.state.showInput })
   }

   renderItems = ({ item }) => {
      return (
         <View
            style={TodoStyle.todoStyle}
         >
            <Text style={TodoStyle.todoTextStyle}>{item.todo}</Text>
            <TouchableOpacity
               onPress={() => this.removeTodo(item.id)}
               style={TodoStyle.todoDeleteIcon}
            >
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
         <ViewContainer>
            <View style={{ flex: 1, position: 'relative' }}>
               {
                  isLoading && <Loading />
               }
               <FlatList
                  data={todos}
                  keyExtractor={this.keyExtractor}
                  renderItem={this.renderItems}
                  ListEmptyComponent={<EmptyList />}
               />
               {showInput ? <View style={{}}>
                  <TextInput
                     style={TodoStyle.textInputStyle}
                     placeholder='Type your todo here!'
                     onChangeText={this.handleChange}
                     value={text}
                     autoFocus={true}
                     onSubmitEditing={this.storeData}
                  />
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