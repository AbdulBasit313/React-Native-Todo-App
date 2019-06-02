import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, TouchableHighlight, TouchableOpacity, FlatList, Keyboard } from 'react-native';
import AddButton from './addButton/AddButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import ViewContainer from './viewContainer/ViewContainer';

class Todo extends Component {
   static navigationOptions = {
      headerTitleStyle: {
         textAlign: 'center',
         flex: 1,
         color: 'white'
      },
      headerTitle: 'Todo App'
   }
   constructor(props) {
      super(props)
      this.state = {
         text: '',
         showInput: false,
         todos: [
            { todo: 'go to gym', id: 1 },
            { todo: 'buy a mouse', id: 2 },
            { todo: 'practice hash table', id: 3 },
            { todo: 'go to gym', id: 4 },
            { todo: 'buy a mouse', id: 5 },
            { todo: 'practice hash table', id: 6 },
            { todo: 'go to gym', id: 7 },
            { todo: 'buy a mouse', id: 8 },
            { todo: 'practice hash table', id: 9 },
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
         text: ''
      })
   }

   showTodoInput() {
      this.setState({ showInput: !this.state.showInput })
   }

   // FIXME: handle delete is not working
   handleDelete = () => {
      // alert('hello')
      const todos = this.state.todos.filter(item => item.id !== id)
      console.log('todo', todos)
      this.setState({ todos })
   }

   renderItems({ item }) {
      console.log('id', item.id)
      return (
         <View
            style={{ borderBottomColor: 'rgba(0,0,0,0.08)', borderBottomWidth: 1, padding: 10, paddingVertical: 15, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
         >
            <Text style={{ fontSize: 16 }}>{item.todo}</Text>
            <TouchableOpacity onPress={() => alert('del')} style={{ marginRight: 10 }}>
               <Icon
                  name="delete" size={25} color="rgb(180, 100, 100)"
               />
            </TouchableOpacity>
         </View>
      )
   }

   render() {
      const { text, showInput, todos } = this.state
      return (
         <ViewContainer source={require('../assets/images/background-pattern1.jpg')} resizeMode='cover'>
            <View style={{ flex: 1, position: 'relative' }}>
               <FlatList
                  data={todos}
                  keyExtractor={this.keyExtractor}
                  renderItem={this.renderItems}
               />
               {showInput ? <View style={{}}>
                  <TextInput
                     style={{ height: 40, borderBottomWidth: 1, borderBottomColor: 'grey' }}
                     placeholder='Type your todo here!'
                     onChangeText={this.handleChange}
                     value={text}
                     autoFocus={true}
                  />
                  <TouchableOpacity onPress={this.handleSubmit}>
                     <Text style={{ fontSize: 20 }}>Send</Text>
                  </TouchableOpacity>
               </View> : null}
               <AddButton
                  onPress={this.showTodoInput}
                  style={{ position: 'absolute', bottom: 15, right: 15, zIndex: 1 }}
               />
            </View>
         </ViewContainer>
      );
   }
}


export default Todo