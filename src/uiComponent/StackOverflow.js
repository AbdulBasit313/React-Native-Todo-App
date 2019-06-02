import React, { Component } from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';

class StackOverflow extends Component {
   state = {
      todos: [
         { todo: 'go to gym', id: 1 },
         { todo: 'buy a mouse', id: 2 },
         { todo: 'practice hash table', id: 3 },
         { todo: 'iron clothes', id: 4 },
      ]
   }

   keyExtractor = (item) => item.id.toString()

   handleDelete = (id) => {
      const todos = this.state.todos.filter(item => item.id !== id)
      this.setState({ todos })
   }

   renderItems({ item }) {
      return (
         <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 16 }}>{item.todo}</Text>
            <TouchableOpacity onPress={() => this.handleDelete(item.id)} style={{ marginRight: 15 }}>
               <Text style={{ color: 'red' }}>Delete</Text>
            </TouchableOpacity>
         </View>
      )
   }

   // renderItems() {
   //    return this.state.todos.map((item, index) => {
   //       return (
   //          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} key={item.id}>
   //             <Text style={{ fontSize: 16 }}>{item.todo}</Text>
   //             <TouchableOpacity onPress={() => this.handleDelete(item.id)} style={{ marginRight: 15 }}>
   //                <Text style={{ color: 'red' }}>Delete</Text>
   //             </TouchableOpacity>
   //          </View>
   //       )
   //    })
   // }

   render() {
      return (
         <View>
            {/* {this.renderItems()} */}
            <FlatList
               data={this.state.todos}
               keyExtractor={this.keyExtractor}
               renderItem={this.renderItems}
            />
         </View>
      );
   }
}


export default StackOverflow