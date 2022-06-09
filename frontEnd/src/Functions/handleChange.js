export function handleChange(option,type){


        let values=[];
        option.map((value)=>{
            return values.push(parseInt(value.value));
            
        })
        
        //objInfo[type]=values;
        //console.log(values);
        if(values.length===0)
            return undefined;
        return values;
    
}