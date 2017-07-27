import {StyleSheet} from 'react-native';

export default StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 160
  },
  form: {
    height:40,
    width: 150,
    padding: 10,
    marginBottom: 4
  },
  backGround:{
    flex: 1,
    alignSelf: 'stretch',
    width: null,
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashRow:{
    flexDirection: 'row',
    marginBottom: 65
  },
  buttonStyle:{
    width: 70,
    height:40,
    backgroundColor: '#37A4E5',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 4,
    marginLeft: 4
  },
  logoutButton:{
    marginLeft: 10,
    height:40,
    width: 70,
    backgroundColor: '#1FE4AD',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }

})
