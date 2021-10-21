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

// FONTS

  whiteFont:{
    color:'#fff',
    marginTop:20
  },
  whiteFontFooter:{
    color:'#fff',
    fontSize:10,
    top:80,
  },
  blueFont:{
    color:'#34bdeb',
    fontSize:10,
  },

  menuImage:{
    backgroundColor:'#1a4472',
    padding:13,
    marginBottom:5,
    marginLeft:30,
    marginRight:30,
    borderRadius:20
  },
  menuContainer:{
    marginTop:130,
    flexDirection:'row',
    flexWrap:'wrap',
    alignItems:'center',
    justifyContent:'center'
  },
  menuItem:{
    flexDirection: 'column',
     alignItems: 'center',
     marginBottom:20,
  }

});

export default style;
