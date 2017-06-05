/**
 * Created by Administrator on 2017/5/26.
 */
import React,{Component} from 'react';
import {
    StyleSheet,View,Text,
    Platform,
    Vibration,
    Animated,
    Easing,
    StatusBar
    } from 'react-native';
import Camera from 'react-native-camera';

export default class QrScanComponent extends Component{

    constructor(props){
        super(props);
        this.state={
            isSaoMiao:false,
            lineMoveAnimated: new Animated.Value(0),
        }
    }
    //配置动画参数
    lineAnimated = () => {
        this.state.lineMoveAnimated.setValue(0);
        Animated.timing(this.state.lineMoveAnimated, {
            toValue: 200,
            duration: 2000,
            easing: Easing.linear,
        }).start(() =>this.lineAnimated());
    }

    componentDidMount() {
        this.lineAnimated();//开启动画
    }

    render(){
        console.log("扫描二维码界面啦");
        console.log(this.props.navigation);
        let contentView=(
            <View style={styles.contentView}>

                <View style={styles.shade}></View>
                <View style={[{flexDirection:'row'}]}>
                    <View style={styles.shade}></View>
                    <View style={styles.qrView}>
                        <Animated.View style={[styles.line,{transform:[{translateY: this.state.lineMoveAnimated}]}]}/>
                    </View>
                    <View style={styles.shade}></View>
                </View>
                <View style={styles.shade}>
                    <Text style={styles.text}>对准二维码/条形码</Text>
                </View>
            </View>
        );
        return(
            <Camera
                style={styles.camera}
                onBarCodeRead={this.QrCodeResult.bind(this)}
                >
                {contentView}
            </Camera>
        );
    }

    //result扫描的数据结果
    QrCodeResult(result){

        if(this.state.isSaoMiao){
            return;
        }
        this.state.isSaoMiao = true;

        //添加震动
        if(Platform.OS==="android"){
            Vibration.vibrate(); //需添加<uses-permission android:name="android.permission.VIBRATE"/>
        }
        let resultData={
            data:result.data,
            type:result.type
        }
        let _callBack=this.props.navigation.state.params._callBack;
        if(_callBack){
            _callBack(resultData);//回调方法回传数据
        }
        this.props.navigation.goBack();//退出
    }

}
const styles=StyleSheet.create(
    {
        contentView:{
            flex:1
        },
        camera:{
            flex:1
        },
        shade:{
            flex: 1,
            backgroundColor: 'rgba(1, 1, 1, 0.65)'
        },
        qrView:{
            width:200,
            height:200
        },
        line:{
            height:2,
            backgroundColor:'green'
        },
        text:{
            color:'white',
            textAlign:'center'
        }
    }
);