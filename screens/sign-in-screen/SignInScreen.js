import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation, useRoute } from '@react-navigation/native'
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    StatusBar,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from 'react-native-paper';
import Toast from 'react-native-toast-message'

import { AuthContext } from '../../components/context';

import LoginActions from '../../modules/login/login.reducer'

import styles from './SignInScreen.styles'

const SignInScreen = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const { account } = useSelector(state => state.login)
    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });

    const { colors } = useTheme();

    const { signIn } = React.useContext(AuthContext);

    const textInputChange = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if( val.trim().length >= 8 ) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleValidUser = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }

    const loginHandle = async (userName, password) => {
        dispatch(LoginActions.loginRequest(userName, password));
    }

    useEffect(() => {
        if(account) {
            signIn(account._id)
        }
    }, [account])

    return (
        <>
            <View style={styles.container}>
                <StatusBar backgroundColor='#FF6347' barStyle="light-content"/>
                <View style={styles.header}>
                    <Text style={styles.text_header}>Xin chào!</Text>
                </View>
                <Animatable.View 
                    animation="fadeInUpBig"
                    style={[styles.footer, {
                        backgroundColor: colors.background
                    }]}
                >
                    <Text style={[styles.text_footer, {
                        color: colors.text
                    }]}>Tài khoản</Text>
                    <View style={styles.action}>
                        <FontAwesome 
                            name="user-o"
                            color={colors.text}
                            size={20}
                        />
                        <TextInput 
                            placeholder="Tên đăng nhập"
                            placeholderTextColor="#666666"
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            autoCapitalize="none"
                            onChangeText={(val) => textInputChange(val)}
                            onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                        />
                        {data.check_textInputChange ? 
                        <Animatable.View
                            animation="bounceIn"
                        >
                            <Feather 
                                name="check-circle"
                                color="green"
                                size={20}
                            />
                        </Animatable.View>
                        : null}
                    </View>
                    { data.isValidUser ? null : 
                    <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>Tên đăng nhập phải có trên 4 kí tự.</Text>
                    </Animatable.View>
                    }
                    

                    <Text style={[styles.text_footer, {
                        color: colors.text,
                        marginTop: 35
                    }]}>Mật khẩu</Text>
                    <View style={styles.action}>
                        <Feather 
                            name="lock"
                            color={colors.text}
                            size={20}
                        />
                        <TextInput 
                            placeholder="Mật khẩu"
                            placeholderTextColor="#666666"
                            secureTextEntry={data.secureTextEntry ? true : false}
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            autoCapitalize="none"
                            onChangeText={(val) => handlePasswordChange(val)}
                        />
                        <TouchableOpacity
                            onPress={updateSecureTextEntry}
                        >
                            {data.secureTextEntry ? 
                            <Feather 
                                name="eye-off"
                                color="grey"
                                size={20}
                            />
                            :
                            <Feather 
                                name="eye"
                                color="grey"
                                size={20}
                            />
                            }
                        </TouchableOpacity>
                    </View>
                    { data.isValidPassword ? null : 
                    <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>Mật khẩu phải có trên 8 kí tự.</Text>
                    </Animatable.View>
                    }
                    

                    <TouchableOpacity>
                        <Text style={{color: '#FF6347', marginTop:15}}>Quên mật khẩu?</Text>
                    </TouchableOpacity>
                    <View style={styles.button}>
                        <TouchableOpacity
                            style={styles.signIn}
                            onPress={() => {
                                loginHandle( data.username, data.password )
                            }}
                        >
                        <LinearGradient
                            colors={['#FFA07A', '#FF6347']}
                            style={styles.signIn}
                        >
                            <Text style={[styles.textSign, {
                                color:'#fff'
                            }]}>Đăng nhập</Text>
                        </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('SignUpScreen')}
                            style={[styles.signIn, {
                                borderColor: '#FF6347',
                                borderWidth: 1,
                                marginTop: 15
                            }]}
                        >
                            <Text style={[styles.textSign, {
                                color: '#FF6347'
                            }]}>Đăng ký</Text>
                        </TouchableOpacity>
                    </View>
                </Animatable.View>
            </View>
      </>
    );
};

export default SignInScreen;
