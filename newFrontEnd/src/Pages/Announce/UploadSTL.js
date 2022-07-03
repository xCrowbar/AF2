import React, { Component } from 'react';
import { create } from 'ipfs-http-client';
import './Announce.css';
var file = null;
var photo = null;

class UploadSTL extends Component {

  constructor({changeFile}) {
    super();
    this.state = {file: undefined, photo: undefined, Taur: undefined, Taup: undefined, Component: undefined};
    this.changeFile = changeFile;
    this.ipfs = create('https://ipfs.infura.io:5001');
  } 
  
	onChange(event) {
    if(event.target.files[0] === undefined) return;
    let reader = new FileReader();
    reader.readAsArrayBuffer(event.target.files[0]);
    reader.onload = () => {
      this.setState({file : reader.result}); console.log(event.target.files[0])
    }
    let reader2 = new FileReader();
    reader2.readAsDataURL(event.target.files[0]);
    reader2.onload = () => {
      this.changeFile(reader2.result);
    }
  }

  getFrame() {
    if(!this.state.file) {
      alert('Carica un STL prima di fare una foto!');
      return;
    }
    let canvas = document.getElementsByTagName('canvas')[0];
    this.setState({photo: canvas.toDataURL()});
  }

  async submitForm(event) {
    if(!this.state.file || !this.state.photo) {
      alert('Carica un STL e fai una foto prima di Annunciare!');
      return;
    }
    file = await this.ipfs.add(this.state.file);
    photo = await this.ipfs.add(this.state.photo);
    if(file && file.path && photo && photo.path) {
      alert('Operazione completata!');
      console.log('DEBUG: Hash File -> ' + file.path);
      console.log('DEBUG: Hash Foto -> ' + photo.path);
      console.log('DEBUG: Component ' + this.state.Component + ' Taur ' + this.state.Taur + ' Taup ' + this.state.Taup);
    }
  }

  async downloadDesign(event) {
    if(file == null) {
      alert('Devi prima caricare il tuo file!');
      return;
    }
    var nomefile = 'prova.stl';
    var link = document.createElement('a');
    link.download = 'test';
    link.href = 'https://ipfs.infura.io/ipfs/' + file.path + '?filename=' + nomefile;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  async returnHash(event) {
    if(file == null) {
      alert('Devi prima caricare il tuo file!');
      return;
    }
    else return file.path;
    //Test Branch
  }

	render() {
		return(
      <>
        {/*<img class="screenshotDiv" src={this.state.photo}/>*/}
        <div class="announceDiv">
          <input class="announceFile" type="file" onChange={(event) => this.onChange(event)}/>
          <input class="announceParam" type="number" placeholder="Component" onWheel={(event) => event.target.blur()} onChange={(event) => this.setState({Component: event.target.value})}/>
          <input class="announceParam" type="number" placeholder="Taur" onWheel={(event) => event.target.blur()} onChange={(event) => this.setState({Taur: event.target.value})}/>
          <input class="announceParam" type="number" placeholder="Taup" onWheel={(event) => event.target.blur()} onChange={(event) => this.setState({Taup: event.target.value})}/>
          <button class="announceButton" onClick={(event) => this.getFrame(event)}>Take a snap!</button>
          <button class="announceButton" onClick={(event) => this.submitForm(event)}>Announce Design</button>
          <button class="announceButton" onClick={(event) => this.downloadDesign(event)}>Download your Design</button>
        </div>
      </>
		)
	}
}

export default UploadSTL;