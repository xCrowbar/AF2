
import './homeNav.css';
import {Link} from 'react-router-dom';
import logo from '../../images/air.jpg'
//import Dropdown from '../dropdown/dropdown';
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
                </div>
                </nav>
            </div>

    )
}

export function MakerNav(){
    return(
        <div>
        <div className="Nav">     
        <nav>
            <div className='logoa'>
            <Link className="prova" to="/"><img className='logo' alt="" src={logo}/></Link>
            <Link className="section"to="/mydesignes" >My Design</Link>
            <Link className='section' to="/myprinters">My printers</Link>
            <Link className='section' to="/mymaterials">My materials</Link>
            </div>
        </nav>
        </div>

       
    </div>

    )
}



/*
 <div class="dropdown">
  <button class="dropbtn">Dropdown</button>
  <div class="dropdown-content">
  <a href="#">Link 1</a>
  <a href="#">Link 2</a>
  <a href="#">Link 3</a>
  </div>
</div>
        


*/