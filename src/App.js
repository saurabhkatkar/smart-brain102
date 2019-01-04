import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/navigation/Navigation'
import Logo from './components/Logo/Logo'
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'

import particlesOption from "./bgstyle.json"

import './App.css';
import 'tachyons';




const initialState = {
      input:'',
      imageUrl:'',
      box:{},
      route:'signin',
      isSignedIn: false,
       user:{    
               id:0,
               name:'',
               email:'',
               entries: 0,
               date : ''
                }
    }

class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }

calculateFaceLocation = (data) =>{
     const clarifaiFace=data.outputs[0].data.regions[0].region_info.bounding_box;
     const image= document.getElementById('imageurl');
     const width= Number(image.width);
     const height= Number(image.height);
     return{
      topRow: clarifaiFace.top_row*height,
      rightCol: width-clarifaiFace.right_col*width,
      bottomRow: height-clarifaiFace.bottom_row*height,
      leftCol: clarifaiFace.left_col*width
     }
}
displayFB=(box)=>{
  
  this.setState({box: box});
}

 onInputChange=(event)=>{
    this.setState({input: event.target.value});
    
  }
  onSubmit=()=>{
    this.setState({imageUrl: this.state.input});
    
    fetch('https://rocky-eyrie-90382.herokuapp.com/imageurl',{
            method: 'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
               input : this.state.input
            })
         })
    .then(response => response.json())
    .then(response =>
      {
        if(response){
                     fetch('https://rocky-eyrie-90382.herokuapp.com/image',{
                      method: 'put',
                      headers:{'Content-Type':'application/json'},
                      body:JSON.stringify({
                         id : this.state.user.id
                      })
                   })
                     .then(response=> response.json())
                     .then(data=> {
                      this.setState(Object.assign(this.state.user,{entries:Number(data)}));
                    })
                     .catch(console.log);
            }
          this.displayFB(this.calculateFaceLocation(response))
            }
        ).catch(err => console.log(err));
    
  }

onrouteChange = (route) =>{
     if(route ==='signin'){
           this.setState(initialState);
         }
     else if(route === 'home'){
           this.setState({isSignedIn: true})
         }
this.setState({route: route})
}

loadUser=(user)=>{
   this.setState({user:{
    id: user.id,
    name: user.name,
    email:user.email,
    entries:user.entries ,
    date : user.joined
   }});
}
onSigned=(user)=>{
   this.setState({user:{
    id: Number(user.id),
    name: user.name,
    entries : user.entries,
  }});
}
  render() {
   const {isSignedIn,box,imageUrl,route}=this.state;
    const {name,entries} = this.state.user;
    return (
      <div className="App">
        <Particles className='particles' params={particlesOption}/>
         <Navigation isSignedIn={isSignedIn} onrouteChange={this.onrouteChange}/>
       {route ==='home'
               ?<div>
                  <Logo />
                  <Rank 
                  name={name} 
                  entries={entries} />
                  <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
                  <FaceRecognition box={box} imageUrl={imageUrl}/>
                 </div> 
         :(  route ==='signin'
                ?<SignIn  onSigned={this.onSigned} onrouteChange={this.onrouteChange}/>
                :<Register loadUser={this.loadUser} onrouteChange={this.onrouteChange}/>
         )     
      }
      </div>
    );
  }
}

export default App;

//