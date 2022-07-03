import cube from '../../images/cube.png'
import Bunny from '../../images/Bunny.png'
import cilindro from '../../images/cilindro.png'
import torre from '../../images/eifel_tower.png'
import portachiavi from '../../images/portachiavi.png'
import './design.css'


export default function Design(){

    return(
        <div className='designesList'>
            <h1>Designes</h1>
        <div className="flexDesignes">
            


            <div>
                    <div className='designModel'>
                        <img className='cube'style={{width:'150px',height:'150px'}} alt="" src={torre}/>
                        <h3>Eifel tower</h3>
                        <p>Questo è un design di test per la stampa 3D della torre Eifel</p>
                    </div>
            </div>
            
            <div>
                <div className='designModel'>
                    <img className='cube' alt="" src={cube}/>
                    <h3>Cubo</h3>
                    <p>Questo è un design di test per la stampa 3D di un cubo</p>
                </div>
            </div>
            <div>
                <div className='designModel'>
                    <img  className="cube"alt="" src={cilindro}/>
                    <h3>Cilindro</h3>
                    <p>Questo è un design di test per la stampa 3D di un cilindro</p>
                </div>
            </div>
            <div>
                <div className='designModel'>
                    <img  className="cube" alt="" src={Bunny}/>
                    <h3>Coniglio</h3>
                    <p>Questo è un design di test per la stampa 3D di un coniglio </p>
                </div>
            </div>

            <div>
                <div className='designModel'>
                    <img  className="cube" alt="" src={portachiavi}/>
                    <h3>Portachiavi Unime</h3>
                    <p>Questo è un design di test per la stampa 3D di un portachiavi </p>
                </div>
            </div>
            
        </div>
        </div>
    )

}