import React, { Component } from 'react'
import ether from '../../static/img/logo.jpg'

export class Home extends Component {
  render() {
    return (
      <div className='container'>
        <h1>Air Factories 2.0</h1>
        <div>
        <img src={ether} />
        </div>
        <div className='paragraph'>
        </div>
        <p>Obiettivo principale del progetto Air Factories 2.0 è relativo alla progettazione,implementazione e testing dei seguenti deliverable: - Air Factories 2.0: nuova piattaforma software basata sull’utilizzo di tecnologie blockchain. Requisito fondamentale è limitare il ruolo degli Air Admin. Potenzialmente tale ruolo dovrebbe sparire per rendere la fabbrica una infrastruttura totalmente decentralizzata e trasparente. - Air Kit: kit universale basato su tecnologie a crypto-processor, per la trasformazione di classiche stampanti 3D in nodi della rete blockchain che costituirà la fabbrica distribuita. - Air Printer: stampante 3D “a basso costo”, modulare e con Air Kit incorporato, che consenta a chiunque di costruire, partendo dalle materie prime, un’entità costituente la fabbrica distribuita, abbattendo costi e tempi di logistica. Ulteriore obiettivo del progetto è l’applicazione di metodologie per l’identificazione remota dei materiali usati in produzione al fine della compatibilità biologica in funzione dei diversi prodotti.</p>
      </div>
      
    )
  }
}

export default Home