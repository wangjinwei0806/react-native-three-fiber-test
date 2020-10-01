/*
這個頁面是作為子頁面的路由器
使用TabBar (createBottomTabNavigator)
作為主畫面的進入點使用
*/

import React from 'react';
import {
  Component,
  StyleSheet,
  Platform,
  Image,
  TextInput,
  StatusBar, Alert, AsyncStorage,
  RefreshControl,
  Button, Text, View, ScrollView, TouchableOpacity, Dimensions, SafeAreaView

} from 'react-native';
import { Buffer } from 'buffer';
global.Buffer = Buffer; // very important
import { Shaders, Node, GLSL } from "gl-react";

import { Surface } from "gl-react-native"; // for React Native



const { width, height } = Dimensions.get('window');





const Blue_shader = Shaders.create({
  helloBlue: {
    // uniforms are variables from JS. We pipe blue uniform into blue output color
    frag: GLSL`
precision highp float;
varying vec2 uv;
uniform float blue;
void main() {
  gl_FragColor = vec4(uv.x, uv.y, blue, 1.0);
}
` }
});


// We can make a <HelloBlue blue={0.5} /> that will render the concrete <Node/>


export default class Webgl extends React.Component {

  constructor() {
    super();
    this.state = {
      refreshing: false,
      isLoading: true,
      userToken: "",
      announcement: [
        {

          "detail": "2019/10/1 16:30 ",
          "issueTime": {
            "_seconds": 1552493757,
            "_nanoseconds": 688000000
          },
          "title": "今天完成 74.2km",
          "issuer": "總時間 07:23:54"
        },
      ],
    };
  }
  //页面的组件渲染完毕（render）之后执行
  // componentDidMount() {
  //   // this.JSON_Post();
  //   // this.setState({ refreshing: false, isLoading: false, announcement: jsonData.announcement, });
  //   this.setState({ refreshing: false, isLoading: false, });

  // }
  // componentDidUpdate() {
  //   setTimeout(() => {
  //     this.forceUpdate();
  //   }, 0);
  // }

  // componentDidMount() {
  //   this.componentDidUpdate()
  // }

  static defaultProps = { blue: 0.5 };
  render() {
    return (
      // <Surface width={300} height={300}>
      //   {/* <HelloBlue blue={this.props.blue} /> */}
      // </Surface>
      <Surface width={width} height={height}>
      <Node shader={Blue_shader.helloBlue} uniforms={ this.props.blue } />
    </Surface>
      // <SafeAreaView style={styles.container}>
      //   <View style={styles.container}>
      //     <View style={{ flex: 1 }}>
      //       <Text >
      //         Edit <Text >App.js</Text> to change this
      //         screen and then come back to see your edits.
      //       </Text>
      //       {/* {this.renderScrollableTab()} */}
      //     </View>
      //   </View>
      // </SafeAreaView>
    );
  }
}






const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCF1DB',
    ///下方tab bar 顏色 iphone X 下瀏海 顏色
  }, background: {
    height: 800,
    width: 600,
    position: 'absolute',

  },
  logo: {
    height: 120,
    marginBottom: 16,
    marginTop: 64,
    padding: 10,
    width: 135,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  modules: {
    margin: 20,
  },
  modulesHeader: {
    fontSize: 16,
    marginBottom: 8,
  },
  module: {
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    borderRadius: 5,
    padding: 5,
  },
  navLeft: {
    alignItems: 'center',
    marginLeft: 10,
  },
  navRight: {
    alignItems: 'center',
    marginRight: 10,
  },
  navIcon: {
    height: 20,
    width: 20,
  },
  navText: {
    fontSize: 10,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.7,
    backgroundColor: '#ededed',
    borderRadius: 5,
    height: 30,
  },
  searchIcon: {
    width: 16,
    height: 16,
    marginRight: 6,
  },
  searchContent: {
    color: '#666',
    fontSize: 14,
  },
  tabBarUnderline: {
    backgroundColor: '#b4282d',
    height: 2,
    width: width / 8,
    marginLeft: 6
  }

});




