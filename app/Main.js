/**
 * Created by Administrator on 2017/5/26.
 * 基于react-native-camera库实现的一个二维码/条形码扫描器
 * react-native-cli: 2.0.1
 * react-reace: 0.44.0
 * 安装react-native-camera：
 * 1.npm install react-native-camera@https://github.com/lwansbrough/react-native-camera.git --save
 * 2.react-native link react-native-camera
 * 注意：rn 0.44版本后移除里Navigator
 * 1.可通过以管理员身份cmd安装：npm install --save react-native-deprecated-custom-components
 * 2.导入import {Navigator}  from 'react-native-deprecated-custom-components';
 */
import React,{Component} from 'react';
import {
    StyleSheet,View,Text,
    TouchableHighlight,
    ToastAndroid,BackAndroid,Alert
    } from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';
import QrScanComponent from './QrScanComponent.js';
export default class Main extends Component{
    render(){
        let defaultName="DefComponent";
        let defaultComponent=DefComponent;
        return(
            <Navigator
                initialRoute={{name:defaultName,component:defaultComponent}}
                renderScene={
                    (route,navigator)=>{
                     let Component=route.component;
                     return <Component {...route.params} navigator={navigator}/>;
                    }
                }
                />
        );
    }
}
class DefComponent extends Component{

    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.title}>二维码/条形码扫描demo</Text>
                <TouchableHighlight
                    onPress={this._buttonClick.bind(this)}
                    underlayColor="gray"
                    style={styles.button}
                    >
                        <Text style={styles.text}>扫描二维码/条形码</Text>
                </TouchableHighlight>
            </View>
        );
    }

    _buttonClick(){
        let navigator=this.props.navigator;

        if(navigator!==null){
            navigator.push(
                {
                    name:'QrScanComponent',
                    component:QrScanComponent,
                    params:{
                        getResultData:function(result){
                            let message="type: "+result.type+"\n"+"data: "+result.data;
                            Alert.alert('扫描结果',message,
                                [
                                    {text:'取消',onPress:() => {}},
                                    {text:'确定',onPress:() => {}}
                                ]);
                        }
                    }
                }
            );
        }
    }

    //***********************Android Back*************************
    //组件安装完
    componentDidMount(){
        BackAndroid.addEventListener('androidBack', this._customAlertHandleBack.bind(this));
    }
    //组件卸载
    componentWillUnmount(){
        BackAndroid.removeEventListener('androidBack', this._customAlertHandleBack.bind(this));
    }
    _customAlertHandleBack(){
        let navigator=this.props.navigator;
        if(navigator!==null){
            let routes=navigator.getCurrentRoutes();//获取路由数组
            if(routes.length>1){
                const top=routes[routes.length-1];
                //直接退出此层
                navigator.pop();
                return true;
            }else{
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
            marginTop:10
        },
        text:{
            textAlign:'center',
            color:'white',
        }
    }
);