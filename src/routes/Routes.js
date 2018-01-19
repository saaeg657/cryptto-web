import React from 'react';
import Particles from 'react-particles-js';
import { Route, Switch, withRouter } from 'react-router-dom';
// import Landing from '../components/Main/Landing';
import Footer from '../components/Footer';
import Howto from "../components/Main/Howto";
import About from "../components/Main/About";
import NavBar from '../components/NavBar';
import Play from '../components/Main/Play';
import SmartContract from '../components/Main/SmartContract';
import Contact from '../components/Main/Contact';
import GameHistory from '../components/Main/GameHistory';
import Question from '../components/Main/Question';

class Routes extends React.Component {
  render() {
    return (
      <div>
        <Particles
          params={{
            "particles": {
              "number": {
                "value": 7,
                "density": {
                  "enable": true,
                  "value_area": 394.57382081613633
                }
              },
              "color": {
                "value": "#ffffff"
              },
              "shape": {
                "type": "edge",
                "stroke": {
                  "width": 0,
                  "color": "#000000"
                },
                "polygon": {
                  "nb_sides": 5
                },
                "image": {
                  "src": "img/github.svg",
                  "width": 100,
                  "height": 100
                }
              },
              "opacity": {
                "value": 0.6012795228245711,
                "random": false,
                "anim": {
                  "enable": false,
                  "speed": 1,
                  "opacity_min": 0.1,
                  "sync": false
                }
              },
              "size": {
                "value": 3,
                "random": false,
                "anim": {
                  "enable": false,
                  "speed": 40,
                  "size_min": 0.1,
                  "sync": false
                }
              },
              "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
              },
              "move": {
                "enable": true,
                "speed": 6,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "bounce",
                "bounce": false,
                "attract": {
                  "enable": true,
                  "rotateX": 600,
                  "rotateY": 1200
                }
              }
            },
            "interactivity": {
              "detect_on": "canvas",
              "events": {
                "onhover": {
                  "enable": true,
                  "mode": "grab"
                },
                // "onclick": {
                //   "enable": true,
                //   "mode": "push"
                // },
                "resize": true
              },
              "modes": {
                "grab": {
                  "distance": 400,
                  "line_linked": {
                    "opacity": 1
                  }
                },
                "bubble": {
                  "distance": 400,
                  "size": 40,
                  "duration": 2,
                  "opacity": 8,
                  "speed": 3
                },
                "repulse": {
                  "distance": 200,
                  "duration": 0.4
                },
                "push": {
                  "particles_nb": 4
                },
                "remove": {
                  "particles_nb": 2
                }
              }
            },
            "retina_detect": true
          }}
          style={{
            width: '100%',
            backgroundColor: '#b1b1b1',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: -1,
            position: 'fixed'
          }} />
        <NavBar />
        <Switch>
          <Route exact path='/' component={Play} />
          <Route exact path='/play' component={Play} />
          <Route exact path='/about' component={About} />
          <Route exact path='/howtoplay' component={Howto} />
          <Route exact path='/smartcontract' component={SmartContract} />
          <Route exact path='/contact' component={Contact} />
          <Route exact path='/gamehistory' component={GameHistory} />
          <Route exact path='/question' component={Question} />
        </Switch>
        <Footer />
      </div>
    );
  }
};

export default withRouter(Routes);