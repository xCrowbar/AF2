
import './homeNav.css';
import {Link} from 'react-router-dom';
import logo from '../../images/air.jpg'

export  function HomeNav(props){
    return(
            <div className="Nav">
                <nav>
                <div className='logoa'>
                <Link className="prova" to="/"><img className='logo' alt="" src={logo}/></Link>
                <Link className='section' to="/login">Login</Link>
                <Link className="section" to="/signin">Sign In</Link>
                </div>
                </nav>
            </div>

    )
}

export  function UserNav(){

    return (
        <div className="Nav">
                <nav>
                <div className='logoa'>
                
                <Link className="prova" to="/"><img className='logo' alt="" src={logo}/></Link>
                <Link className="section"to="/mydesignes" >My Design</Link>
                <Link className='section' to="/myprinters">My printers</Link>
                <Link className='section' to="/addprinter">Add printers</Link>

                
                </div>
                </nav>
            </div>

    )
}

export function MakerNav(){
    return(
        <div className="Nav">
        <nav>
        <div className='logoa'>
        
        <Link className="prova" to="/"><img className='logo' alt="" src={logo}/></Link>
        <Link className="section"to="/mydesignes" >My Design</Link>
        <Link className='section' to="/myprinters">My printers</Link>
        <div className='dropdown'>
        <button className='dropdown-btn'>Printer</button>
        <div className='dropdown'>
            <Link className='dropdown-content' to ="/addprinter">Add</Link>
        </div>
        </div>
        
        
        </div>
        </nav>
    </div>

    )
}