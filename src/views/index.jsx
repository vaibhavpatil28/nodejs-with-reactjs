const React = require('react');
const firebase = require('firebase');

const DefaultLayout = require('./layouts/default');


 // Your web app's Firebase configuration
//  const firebaseConfig = {
//   apiKey: "AIzaSyC6HvMKHLFxeo5j6nJ4N3U-6pQqTGR7pl8",
//   authDomain: "nodejswithreactjs.firebaseapp.com",
//   databaseURL: "https://nodejswithreactjs.firebaseio.com",
//   projectId: "nodejswithreactjs",
//   storageBucket: "",
//   messagingSenderId: "937810269817",
//   appId: "1:937810269817:web:baa08fa16c4a2e77"
// };
const firebaseConfig = {
  apiKey: "AIzaSyC6HvMKHLFxeo5j6nJ4N3U-6pQqTGR7pl8",
  authDomain: "nodejswithreactjs.firebaseapp.com",
  databaseURL: "https://nodejswithreactjs.firebaseio.com",
  projectId: "nodejswithreactjs",
  storageBucket: "",
  messagingSenderId: "937810269817",
  appId: "1:937810269817:web:baa08fa16c4a2e77"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

class HelloMessage extends React.Component {
  render() {
    return (
      <DefaultLayout title={this.props.title}>
        <div>Hello {this.props.name}</div>
      </DefaultLayout>
    );
  }
}
module.exports = HelloMessage;