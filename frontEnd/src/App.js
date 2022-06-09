
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
import Mymaterials from './Pages/Mymaterials/MyMaterials';
import AddMaterial from './Pages/AddMaterial/AddMaterial';

function App() {

  return(

    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage/>}></Route>
      <Route path="/login" element={<MetamaskLogin/>}></Route>
      <Route path="/signin" element={<SignIn/>}></Route>

          <Route path="mymaterials" element={<WalletConnected> <Mymaterials/> </WalletConnected>}/>      
          <Route path="myprinters"element={  <WalletConnected><MyPrinters/></WalletConnected>      }/>
          <Route path='myprinters/:printerDetails' element={<WalletConnected> <PrinterDetails/> </WalletConnected> }/>
          <Route path="mydesignes" element={<WalletConnected>   <MyDesignes/>   </WalletConnected> }/>
          <Route path="mydesignes/:designInfo" element={ <WalletConnected> <DesignInfo/> </WalletConnected> }/>
          <Route path="addprinter" element={<WalletConnected> <LoadPrinter/> </WalletConnected>}/>
          <Route path="addMaterial" element={<WalletConnected> <AddMaterial/> </WalletConnected>}/>
          <Route path="updateMaterial/:materialInfo" element={<WalletConnected> <AddMaterial type="update"/> </WalletConnected>}/>
    </Routes>
    </BrowserRouter>

  )
}

export default App;








