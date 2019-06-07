import { StyleSheet } from 'react-native'

export default TodoStyle = StyleSheet.create({
   todoStyle: {
      borderBottomColor: 'rgba(241, 231, 254, 1)',
      borderBottomWidth: 0.2,
      paddingVertical: 13, paddingHorizontal: 12,
      display: 'flex', flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 5
   },
   todoTextStyle: {
      fontFamily: 'Karla-Regular',
      fontSize: 18,
      fontWeight: '400',
      color: '#F8F8F8'
   },
   todoDeleteIcon: {
      marginRight: 10
   },
   textInputStyle: {
      height: 42,
      padding: 10,
      fontSize: 16,
      fontFamily: 'Karla-Regular',
      borderTopWidth: 1.2,
      borderColor: 'rgba(108, 122, 137, 0.7)',
      backgroundColor: '#fff',
   }
})