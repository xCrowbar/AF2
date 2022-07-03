import '../design/design.css'
import cube from '../../images/cube-1.png'
import cilindro from '../../images/cilindro.png'
import coniglio from '../../images/Bunny.png'
import portachiavi from '../../images/portachiavi.png'
import { UserNav } from '../../component/Navbar/homeNav'
//import { useNavigate } from 'react-router-dom'
import './myDesignes.css'

export default function MyDesignes(){

    return(
        <div className='designesList'>
        <UserNav/>
        <h1>My designes</h1>
            <div className="flexDesignes">
                
                
                
            <div className='provaFun'>
                <a href="mydesignes/Portachiavi">
                    <div className='designModel'>
                        <img  className="cube"alt="" src={portachiavi}/>
                        <h3>Portachiavi Unime</h3>
                        <p>Questo è un design di test per la stampa 3D di un portachiavi</p>
                    </div>
                </a>
            </div>
                
                
                
                
                
                
                
                
                
                <div className='provaFun'>
                   
                    <a href="mydesignes/cubo">
                    <div className='designModel'>
                        <img className='cube' alt="" src={cube}/>
                        <h3>Cubo</h3>
                        <p>Questo è un design di test per la stampa 3D di un cubo</p>
                    </div>
                    </a>
                </div>


                <div className='provaFun'>
                <a href="mydesignes/Bunny">
                    <div className='designModel'>
                        <img  className="cube"alt="" src={coniglio}/>
                        <h3>Coniglio</h3>
                        <p>Questo è un design di test per la stampa 3D di un coniglio</p>
                    </div>
                </a>
            </div>











                <div className='provaFun'>
                <a href="mydesignes/cilindro">
                    <div className='designModel'>
                        <img  className="cube"alt="" src={cilindro}/>
                        <h3>Cilindro</h3>
                        <p>Questo è un design di test per la stampa 3D di un cilindro</p>
                    </div>
                </a>
            </div>


            </div>
        </div>
    )
}