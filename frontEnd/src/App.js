//import User from './SmartContracts/Users/Users';
//import { ethers } from "ethers";
import './App.css';
import Homepage from './Pages/Homepage/Homepage';
import {BrowserRouter,Route,Routes} from "react-router-dom";
import MyDesignes from './Pages/Mydesignes/mydesignes';
import DesignInfo from './Pages/myDesigneInfo/DesignInfo';
import MyPrinters from './Pages/Myprinters/MyPrinters';
import MetamaskLogin from './Pages/metamaskLogin/metamaskLogin';
import PrinterDetails from './Pages/Myprinters/PrinterDetails/PrinterDetails'
import SignIn from './Pages/signin/SignIn';
import WalletConnected from './component/WalletCheck/WalletConnected';
import LoadPrinter from './Pages/LoadPrinter/LoadPrinter';

/*export const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42, 56, 97,1337] });

 export function WalletConnected(){
  const { active: networkActive, error: networkError, activate: activateNetwork } = useWeb3React()
  const [loaded, setLoaded] = useState(false)
  
  useEffect(() => {
    injected
      .isAuthorized()
      .then((isAuthorized) => {
        setLoaded(true)
        if (isAuthorized && !networkActive && !networkError) {
          activateNetwork(injected)
        }
      })
      .catch(() => {
        setLoaded(true)
      })
  }, [activateNetwork, networkActive, networkError])

  if(loaded && networkActive)
    return <Outlet></Outlet>
  else if(loaded && !networkActive)
    return <Navigate to="login"></Navigate>
  else 
    return <span>Loading</span>


}*/





function App() {

  return(

    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage/>}></Route>
      <Route path="/login" element={<MetamaskLogin/>}></Route>
      <Route path="/signin" element={<SignIn/>}></Route>

      
          <Route path="myprinters"element={<WalletConnected>    <MyPrinters/>  </WalletConnected>   }/>
          <Route path='myprinters/:printerDetails' element={<WalletConnected> <PrinterDetails/> </WalletConnected> }/>
          <Route path="mydesignes" element={<WalletConnected>   <MyDesignes/>   </WalletConnected> }/>
          <Route path="mydesignes/:designInfo" element={ <WalletConnected> <DesignInfo/> </WalletConnected> }/>
          <Route path="addprinter" element={<LoadPrinter/>}/>

    </Routes>
    </BrowserRouter>

  )
}

export default App;








