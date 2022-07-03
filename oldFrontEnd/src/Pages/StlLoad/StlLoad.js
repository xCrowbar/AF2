import { useState } from "react";
import { create } from "ipfs-http-client";


const client=create({host:"https://127.0.0.1'",port: '5001',protocol: 'https', apiPath: ''})

export default function StlLoad(){
    
    const [file,setFile]=useState();
    const [urlArray,setUrlArray]=useState([])

    const retrieveFile=(e)=>{
        const data = e.target.files[0];
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);
        reader.onloadend = () => {
          console.log("Buffer data: ", Buffer(reader.result));
          setFile(Buffer(reader.result));
        }
        e.preventDefault();
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const created =await client.add(file);
            const url= "https://ipfs.infura.io/ipfs/"+created.path;
            setUrlArray((prev)=>[...prev,url])
        }
        catch(erorr){
            console.log("error.message");
        }
    }

    return (
        <div className="StlLoad">
        <form className="form" onSubmit={handleSubmit}>
          <input type="file" name="data" onChange={retrieveFile} />
          <button type="submit" className="btn">Upload file</button>
        </form>

        <div className="display">
        {urlArray.length !== 0
          ? urlArray.map((el) => <img src={el} alt="nfts" />)
          : <h3>Upload data</h3>}
      </div>
      </div>
    );
}