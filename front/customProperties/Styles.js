import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  homeContainer: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4169E1',
  },
  formsContainer: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f9fd',
  },
  buttonPrimary: {
    backgroundColor:'#1A4472',
    borderColor:'#1A4472',
    borderWidth: 2,
    borderRadius: 5,
    padding: 5,
  },
  buttonLogIn: {
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
    padding: 5,
  },
  primaryText:{
    fontSize: 15,
    fontFamily: 'sans-serif',
  },

});

export default style;
