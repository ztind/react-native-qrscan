/**
 * Created by Administrator on 2017/5/26.
 * 基于react-native-camera库实现的一个二维码/条形码扫描器
 * react-native-cli: 2.0.1
 * react-reace: 0.44.0
 * 安装react-native-camera：
 * 1.npm install react-native-camera@https://github.com/lwansbrough/react-native-camera.git --save
 * 2.react-native link react-native-camera
 * 注意：rn 0.44版本后移除里Navigator。此处采用新的导航器进行页面切换 react-navigation ,自动处理Android的back返回
 * 1.npm install react-navigation --save
 * 2.导入import {StackNavigator}  from 'react-navigation';
 */
import React,{Component} from 'react';
import {
    StyleSheet,View,Text,
    TouchableHighlight,
    StatusBar,
    ToastAndroid,BackAndroid,Alert
    } from 'react-native';
import {StackNavigator}  from 'react-navigation';
import QrScanComponent from './QrScanComponent.js';

class Main extends Component{

    render(){
        return (
            <View style={styles.container}>

                <StatusBar
                    translucent={true}
                    backgroundColor="transparent"
                    barStyle="light-content"
                    />
                <Text style={styles.title}>二维码/条形码扫描demo</Text>
                <TouchableHighlight
                    onPress={this._buttonClick}
                    underlayColor="gray"
                    style={styles.button}
                    >
                        <Text style={styles.text}>扫描二维码/条形码</Text>
                </TouchableHighlight>
            </View>
        );
    }

    _callBack = (result)=>{
        let message="type: "+result.type+"\n"+"data: "+result.data;
        Alert.alert('扫描结果',message,
            [
                {text:'取消',onPress:() => {}},
                {text:'确定',onPress:() => {}}
            ]);
    }
    _buttonClick = ()=>{
        this.props.navigation.navigate("QrScanComponent",{_callBack:this._callBack});
    }

    //***********************Android Back**************************

    //组件安装完
    componentDidMount(){
        BackAndroid.addEventListener('androidBack', this._customAlertHandleBack.bind(this));
    }
    //组件卸载
    componentWillUnmount(){
        BackAndroid.removeEventListener('androidBack', this._customAlertHandleBack.bind(this));
    }

    _customAlertHandleBack(){
        if(this.props.navigation.state.routeName === "home"){
            //2s内按back退出
            if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
                return false;
            }
            this.lastBackPressed = Date.now();
            ToastAndroid.show('再按一次退出应用',ToastAndroid.SHORT);
            return true;
        }
    }
}
const styles=StyleSheet.create(
    {
        container:{
            flex:1
        },
        button:{
            height:35,
            backgroundColor:'green',
            borderRadius:5,
            marginTop:10,
            marginLeft:5,
            marginRight:5,
            justifyContent:'center'
        },
        title:{
            color:'red',
            fontSize:15,
            textAlign:'center',
            marginTop:15
        },
        text:{
            textAlign:'center',
            color:'white'
        }
    }
);
const  Root = StackNavigator(
    {
        home:{screen:Main},
        QrScanComponent:{screen:QrScanComponent}
    },
    {
        navigationOptions:{
            header:null
        }
    }
);
export default Root;