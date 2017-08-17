import React, { Component } from 'react';
import {AppRegistry, StyleSheet, Text, TouchableHighlight, View,} from 'react-native';
import {LoginButton, ShareDialog} from 'react-native-fbsdk';

class FBLoginTest extends Component {
  constructor(props) {
    super(props);
    const shareLinkContent = {
      contentType: 'link',
      contentUrl: 'https://www.genk.vn',
      contentDescription: 'Mạnh Xấu Trai'
    };

    this.state = {shareLinkContent: shareLinkContent,};
  }

  shareLinkWithShareDialog() {
    var tmp = this;
    ShareDialog.canShow(this.state.shareLinkContent).then(
      function(canShow) {
        if (canShow) {
          return ShareDialog.show(tmp.state.shareLinkContent);
        }
      }
    ).then(
      function(result) {
        if (result.isCancelled) {
          alert('Share cancelled');
        } else {
          alert('Chia sẻ thành công ID : ' + result.postId);
        }
      },
      function(error) {
        alert('Share fail with error: ' + error);
      }
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <LoginButton
          publishPermissions={["publish_actions"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("Login failed with error: " + error.message);
              } else if (result.isCancelled) {
                alert("Login was cancelled");
              } else {
                alert("Login was successful with permissions: " + result.grantedPermissions)
              }
            }
          }
          onLogoutFinished={() => alert("User logged out")}/>
        <TouchableHighlight onPress={this.shareLinkWithShareDialog.bind(this)}>
          <Text style={styles.shareText}>Share link with ShareDialog</Text>
        </TouchableHighlight>
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
  shareText: {
    fontSize: 20,
    margin: 10,
  },
});


AppRegistry.registerComponent('FBLoginTest', () => FBLoginTest);
