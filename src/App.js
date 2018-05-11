import React, { Component } from 'react';
import './App.css';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Particles from 'react-particles-js';

const particleOptions = {
  particles: {
    number: {
      value:30,
      density:{
        enable:true,
        value_area:800
      }
    }
  }
}

const initialState = {
  input : '',
  imageURL : '',
  box : {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }

  // componentDidMount = () => {
  //   fetch('http://localhost:3000')
  //   .then(response => response.json())
  //   .then(data => console.log(data))
  //   .catch(console.log)
  // }

  calculateFaceBox = (data) => {
    const faceData = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const imageWidth = Number(image.width);
    const imageHeight = Number(image.height);
    return {
      leftCol : faceData.left_col * imageWidth,
      topRow : faceData.top_row * imageHeight,
      rightCol : imageWidth - (faceData.right_col * imageWidth),
      bottomRow : imageHeight - (faceData.bottom_row * imageHeight)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onButtonSubmit = (event) => {
    this.setState({imageURL: this.state.input})
    fetch('https://shielded-sands-48480.herokuapp.com/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input 
      })
    })
    .then(response => response.json())
    .then(response => {
      if(response) {
        fetch('https://shielded-sands-48480.herokuapp.com/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id 
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user,{entries: count}))
        })
        .catch(console.log);
      }
      this.displayFaceBox(this.calculateFaceBox(response))
    })
    .catch(err => console.log(err));
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState(initialState);  
    } else if (route === 'home') {
      this.setState({isSignedIn : true});
    }
    this.setState({route : route});
  }

  loadUser= (data) => {
    this.setState({user:
      {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    });
  }

  render() {
    return (
      <div className="App">
        <Particles className = 'particles'
          params={particleOptions}
        />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        { this.state.route === 'signin'
        ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        : (
            this.state.route === 'home'
            ? 
              <div> 
                <Logo />
                <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onButtonSubmit={this.onButtonSubmit}
                />
                <FaceRecognition box={this.state.box} imageURL = {this.state.imageURL}/>
              </div>
            :
              <Register loadUser={this.loadUser} onRouteChange= {this.onRouteChange}/>
          ) 
        }
      </div>
    );
  }
}

export default App;
