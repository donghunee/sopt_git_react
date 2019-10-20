import React from 'react';
import './App.css';
import {HorizontalBar} from 'react-chartjs-2';
import Modal from 'react-modal';
import ReactDOM from 'react-dom';
import GitHubLogin from 'react-github-login';
import { GithubLoginButton } from "react-social-login-buttons";
const data = {
  labels: ['donghunee', 'leego', 'gofu', 'gpgp','donghunee', 'leego', 'gofu', 'gpgp', 'donghunee', 'leego', 'gofu', 'gpgp', 'donghunee', 'leego', 'gofu', 'gpgp','donghunee', 'leego', 'gofu', 'gpgp','donghunee', 'leego', 'gofu', 'gpgp','donghunee', 'leego', 'gofu', 'gpgp','donghunee', 'leego', 'gofu', 'gpgp'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [5, 9, 10, 84, 65, 19, 40, 81, 65, 59, 8, 82, 65, 59, 80, 1, 65, 79, 81, 81, 65, 159, 80, 5, 62, 59, 80, 84, 65, 29, 80, 10].sort(function(a, b) { // 오름차순
        return b - a;
    })
    }
  ]
};

const onSuccess = response => {
  console.log(response.code)
  fetch("http://localhost:5000/git",{
    method:"POST",
    headers: {
      'Access-Control-Allow-Origin':'*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({code:response.code})
  })
    .then(response => response.json())
    .then(json => {
      console.log(json)
    })
    .catch(err => console.log(err))
};
const onFailure = response => console.error(response);

Modal.setAppElement('#root')

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

const fet = () => {
  var date = new Date(); 
  var year = date.getFullYear(); 
  var month = String(date.getMonth()+1); 
  var day = String(date.getDate()); 

  if(month.length === 1){ 
    month = "0" + month; 
  } 
  if(day.length === 1){ 
    day = "0" + day; 
  } 

  const today = year + "-" + month + "-" + day
  fetch("https://github-contributions-api.now.sh/v1/donghunee")
    .then(response => response.json())
    .then(json => {
      var contributions = json.contributions
      for(var key in contributions){
        if(contributions[key].date === today) {
          console.log(today)
          if(contributions[key].count >0){
            console.log("커밋했당")
          }
        }
      }
    })
    .catch(err => console.log(err))
}

class App extends React.Component {
  constructor() {
    super();
 
    this.state = {
      modalIsOpen: true
    };
 
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
 
  openModal() {
    this.setState({modalIsOpen: true});
  }
 
  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }
 
  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    return( 
      <div className="App">
        <button onClick={fet}>요요</button>
            <HorizontalBar
              data={data}
              options={{ 
                aspectRatio: 1,
                }}
            />
            <button onClick={this.openModal}>Open Modal</button>
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <h2 ref={subtitle => this.subtitle = subtitle}>Github login</h2>

            <GitHubLogin 
                className="github"
                clientId="ffe80cd809142964f1bf"
                redirectUri=""
                onSuccess={onSuccess}
                onFailure={onFailure} />           
          </Modal>
          
     </div>
     
    )
   
  }
}

export default App;
