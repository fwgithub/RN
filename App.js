/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, FlatList} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'android platform is '+Platform.Version,
});

type Props = {};

var REQUEST_URL ="https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json";
var URL2 ="http://personalchain.vip/www/index.php?m=sms&f=sms&v=test";
  
export default class App extends Component<Props> {
	constructor(props) {
    super(props);
    this.state = {
      data: [],
	  data2: [],
      loaded: false
    };
    // 在ES6中，如果在自定义的函数里使用了this关键字，则需要对其进行“绑定”操作，否则this的指向会变为空
    // 像下面这行代码一样，在constructor中使用bind是其中一种做法（还有一些其他做法，如使用箭头函数等）
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData(REQUEST_URL);
	this.fetchData2(URL2);
  }
  
  fetchData(url) {
    fetch(url)
      .then(response => response.json())
      .then(responseData => {
        // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
        this.setState({
          data: this.state.data.concat(responseData.movies),
          loaded: true
        });
      });
  }
  
   fetchData2(url) {
    fetch(url)
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          data2: this.state.data2.concat(responseData),
          loaded: true
        });
		console.log("YellowBox is disabled.");
      });
  }
  
  render() {
	 if (!this.state.loaded) {
      return this.renderLoadingView();
    }
	
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to RN!!!!</Text>
        <Text style={styles.instructions}>To get started App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
		
	   <FlatList
        data={this.state.data2}
        renderItem={this.renderMovie2}
        style={styles.list}
       />
	   <FlatList
        data={this.state.data}
        renderItem={this.renderMovie}
        style={styles.list}
       />
      </View>
    );
  }
  
  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>Loading movies...</Text>
      </View>
    );
  }

  renderMovie({ item }) {
    // { item }是一种“解构”写法，请阅读ES2015语法的相关文档
    // item也是FlatList中固定的参数名，请阅读FlatList的相关文档
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: item.posters.thumbnail }}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.year}>{item.year}</Text>
        </View>
      </View>
		);
	  }
		renderMovie2({ item }) {
		return (
		  <View style="flex: 1,justifyContent: 'center',alignItems: 'center',backgroundColor: '#000'">
			  <Text>{item.title}</Text>
		  </View>
			);
		  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
  
  rightContainer: {
    flex: 1
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: "center"
  },
  year: {
    textAlign: "center"
  },
  thumbnail: {
    width: 53,
    height: 81
  },
  list: {
    paddingTop: 20,
    backgroundColor: "#F5FCFF"
  }
});
