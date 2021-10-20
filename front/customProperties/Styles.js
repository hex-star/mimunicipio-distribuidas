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
    backgroundColor:'#fff',
    borderWidth: 2,
    borderRadius: 10,
    padding: 5,
    marginTop:20,
    width:181,
    alignItems:'center'
  },
  primaryText:{
    fontSize: 15,
    fontFamily: 'sans-serif',
  },
  invitadoButton:{
    backgroundColor:'#4169E1',
    borderColor:'#fff',
    borderWidth: 2,
    borderRadius: 5,
    padding: 5,
    
  },
  whiteFont:{
    color:'#fff',
    marginTop:20
  },
  whiteFontFooter:{
    color:'#fff',
    fontSize:10,
    top:80,
  }

});

export default style;
