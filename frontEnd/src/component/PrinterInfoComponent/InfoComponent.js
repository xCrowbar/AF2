import Select from 'react-select';
import Web3 from "web3";


export  function InfoComponent(props){

    //const noMountArray=["0x0000000000000000000000000000000000000000000000000000000000000000","0","0","0","0","0","0" ];
    const web3=new Web3();
    console.log(props.printer);
    return (
        <div className="Info">
            <div className="fieldInfo">
                <h3>Printer Name:</h3> <p>{web3.utils.toUtf8( props.printer['name'])}</p>
            </div>
            <div className="fieldInfo">

                <h3>Soluble:</h3> {props.printer['soluble']?(<p>Si</p>):(<p>No</p>)}
            </div>
            <div className="fieldInfo">

                <h3>Food Safety:</h3> {props.printer['foodSafety']?(<p>Si</p>):(<p>No</p>)}
            </div>
            <div className="fieldInfo">

                <h3>Volume:</h3> <p>{ props.printer['volume']}m<sup>3</sup> </p>
            </div>
            <div className="fieldInfo">            
                <h3>Number nozzles mounted:</h3> <p >{ props.printer['mountedNozzles']}</p>
            </div>
            <div className="fieldInfo">
                <h3>Maximum Printer temperature:</h3> <p >{ props.printer['maxPrintTemperature']}&#8451;</p>
            </div>
            <div className="fieldInfo">

                <h3>Maximum bed temperature:</h3> <p>{ props.printer['maxBedTemperature']}&#8451;</p>
            </div>
        </div>
    )
}



export function RemoveComponent(){
    return(
        <div></div>
    )
}


export function UpdateComponent(){
    return(
        <div></div>
    )
}


export function AddComponent(){
    const material=[
        {value:"0" , label:"ABS"},
        {value:"1",label:"PLA"},
        {value:"2",label:"PETG"}];
    const color=[
        {value:"1" , label:"BLACK"},
        {value:"2",label:"WHITE"},
        {value:"3",label:"BROWN"},
        {value:"4",label:"GRAY"},
        {value:"5",label:"YELLOW"},
        {value:"6",label:"ORANGE"},
        {value:"7",label:"RED"},
        {value:"8",label:"PINK"},
        {value:"9",label:"PURPLE"},
        {value:"10",label:"BLUE"},
        {value:"11",label:"GREEN"}];

    
    const handleSubmit=()=>{

    }

    
    return(
        <div className="Info">
          
                <form  className="formMaterial"onSubmit={handleSubmit}>
                <div className="fieldInfoAdd">
                    <div className='element'>
                    <label>
                            <p>Material Name</p>
                            <input type="text" className="addressData"style={{display:'inline'}} name="address" onChange={(event) =>{ }} autoComplete="off" required minLength="4" maxLength="90"></input>
                    </label>
                    </div>
                    <div className='element'>
                    <label>
                        <p>Material Print Temperature</p>
                        <input type="number" id="tentacles" name="tentacles"
                            min="40" max="90" onChange={event => {}}/>
                    </label>
                    </div>

                </div>

                <div className="fieldInfoAdd">
                <div className='element'>
                <label>
                    <p>Material Bed Temperature</p>
                    <input type="number" id="tentacles" name="tentacles"
                        min="40" max="90" onChange={event => {}}/>
                </label>
                </div>
                <div className='element'>
                <label>
                    <p>Quantity (Kg)</p>
                    <input type="number" id="tentacles" name="tentacles"
                        min="1" max="10" onChange={event => {}}/>
                </label>
                </div>
                </div>

                <div className="fieldInfoAdd">
                <div className='element'>
                <label>
                    <p>Material</p>
                        <div style={{
                            width:"200px"
                            }}>
                    <Select  isMulti 
                        options={material}
                        getOptionValue={(option)=>option.value}
                        onChange={(option)=>{}}/>
                        </div>
                    </label>
                </div>
                <div className='element'>
                <label>
                    <p>Material Color</p>
                        <div style={{
                            width:"200px",
                            }}>
                    <Select  isMulti 
                        options={color}
                        getOptionValue={(option)=>option.value}
                        onChange={(option)=>{}}/>
                        </div>
                    </label>
                </div>
                <button className="next2" type='submit'>Aggiungi</button>
                </div>
                    </form>
            
        </div>
    )
}