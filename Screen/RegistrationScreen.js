import {
  StyleSheet,
  TextInput,
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native'
import { useState } from 'react'
import { authSignUpUser } from '../redux/auth/authOperations'
import { useDispatch } from 'react-redux'

const initialState = {
  login: '',
  email: '',
  password: '',
}

const RegistrationScreen = ({ navigation }) => {
  const [auth, setAuth] = useState(initialState)
  const [showPassword, setShowPassword] = useState(true)
  const [isFocusedLogin, setIsFocusedLogin] = useState(false)
  const [isFocusedEmail, setIsFocusedEmail] = useState(false)
  const [isFocusedPassword, setIsFocusedPassword] = useState(false)

  const dispatch = useDispatch()

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState)
  }

  const hendleSubmit = () => {
    dispatch(authSignUpUser(auth))
    setAuth(initialState)
  }

  return (
    <ImageBackground
      style={styles.imageBg}
      source={require('../assets/images/nativeBackground.jpg')}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : null}
          keyboardVerticalOffset={Platform.OS == 'ios' ? -70 : 50}
          style={{ flex: 1 }}>
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <View style={styles.form}>
              <View>
                <Text style={styles.registrTitle}>Регистрация</Text>
              </View>
              <View style={styles.registrInputWrapper}>
                <View style={styles.fedbackFormGroup}>
                  <TextInput
                    style={[
                      styles.inputLogRegistr,
                      {
                        borderColor: isFocusedLogin ? '#FFA500' : '#ccc',
                        borderWidth: isFocusedLogin ? 2 : 1,
                      },
                    ]}
                    placeholder="Логин"
                    onFocus={() => setIsFocusedLogin(true)}
                    onBlur={() => setIsFocusedLogin(false)}
                    onChangeText={(value) =>
                      setAuth((prevState) => ({ ...prevState, login: value }))
                    }
                    value={auth.login}
                  />
                </View>
                <View style={styles.fedbackFormGroup}>
                  <TextInput
                    style={[
                      styles.inputLogRegistr,
                      {
                        borderColor: isFocusedEmail ? '#FFA500' : '#ccc',
                        borderWidth: isFocusedEmail ? 2 : 1,
                      },
                    ]}
                    placeholder="Адрес электронной почты"
                    onFocus={() => setIsFocusedEmail(true)}
                    onBlur={() => setIsFocusedEmail(false)}
                    onChangeText={(value) =>
                      setAuth((prevState) => ({ ...prevState, email: value }))
                    }
                    value={auth.email}
                  />
                </View>
                <View style={[styles.passwordInputWrapper]}>
                  <TextInput
                    style={[
                      styles.inputLogRegistr,
                      {
                        borderColor: isFocusedPassword ? '#FFA500' : '#ccc',
                        borderWidth: isFocusedPassword ? 2 : 1,
                      },
                    ]}
                    placeholder="Пароль"
                    secureTextEntry={showPassword}
                    onFocus={() => setIsFocusedPassword(true)}
                    onBlur={() => setIsFocusedPassword(false)}
                    onChangeText={(value) =>
                      setAuth((prevState) => ({
                        ...prevState,
                        password: value,
                      }))
                    }
                    value={auth.password}
                  />
                  <TouchableOpacity
                    style={styles.showPasswordWrap}
                    activeOpacity={0.7}
                    onPress={toggleShowPassword}>
                    <Text style={styles.showPasswordTitle}>Показать</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.btnRegister}
                  onPress={() => hendleSubmit()}>
                  <Text style={styles.btnTitle} activeOpacity={0.7}>
                    Зарегистрироваться
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btnLogIn}
                  onPress={() => navigation.navigate('LogIn')}>
                  <Text style={styles.btnTitleLogIn} activeOpacity={0.7}>
                    Уже есть аккаунт? Войти
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  imageBg: {
    backgroundColor: '#fff',
    flex: 1,
    resizeMode: 'cover',
  },
  form: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 92,
    paddingBottom: 45,
  },
  fedbackFormGroup: {
    marginBottom: 16,
  },
  registrTitle: {
    fontFamily: 'Medium',
    fontSize: 30,
    fontWeight: 500,
    lineHeight: 35,
    textAlign: 'center',
    letterSpacing: 0.01,
    color: '#212121',
    marginBottom: 33,
  },
  registrInputWrapper: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 45,
  },
  passwordInputWrapper: {
    position: 'relative',
  },
  showPasswordWrap: {
    position: 'absolute',
    top: 18,
    right: 16,
  },
  inputLogRegistr: {
    width: 345,
    height: 50,
    borderColor: '#E8E8E8',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#F6F6F6',
    padding: 16,
  },
  btnRegister: {
    backgroundColor: '#FF6C00',
    borderRadius: 100,
    fontFamily: 'Regular',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 16,
  },
  btnTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 19,
  },
  btnLogIn: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  btnTitleLogIn: {
    color: '#1B4371',
    fontFamily: 'Regular',
    fontSize: 16,
    lineHeight: 19,
  },
})

export default RegistrationScreen
