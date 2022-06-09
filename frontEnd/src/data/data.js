let designes=[{
    name:"cubo",
    path:"images/cube.png",
    fileName:'Cube_3d.stl',
    info:"Questo è un design di test per la stampa 3D di un cubo"
},
{name:"cilindro",
path:"/home/mike/Scrivania/provaFrontEnd/af2_front_end_test/src/images/cilindro",
fileName:"Cilindro.stl",
info:"Questo è un design di test per la stampa 3D di un cilindro"
},
{name:"Bunny",
path:"/home/mike/Scrivania/provaFrontEnd/af2_front_end_test/src/images/Bunny.png",
fileName:"Bunny.stl",
info:"Questo è un design di test per la stampa 3D di un coniglio"},
{name:"Portachiavi",
path:"/home/mike/Scrivania/provaFrontEnd/af2_front_end_test/src/images/portachiavi_unime.stl",
fileName:"portachiavi_unime.stl",
info:"Questo è un design di test per la stampa 3D di un portachiavi unime"
}
]

let myPrinters={printers:[
    {
    address:"0x9b8bb1E03e2d5D0dD7cE536A975730903177B37f",
    name:"testPrinter-1",
    nozzlesMounted:'Brass',
    soluble:'yes',
    foodSafety:'no'

},
{
    address:"0x1a22BCB21fde9924EbfD414D2099c6Fe5C13FDb8",
    name:"testPrinter-2",
    nozzlesMounted:'Brass',
    soluble:'yes',
    foodSafety:'no'
},

{
    address:"0xa5ffbB8932d3E7ECe2fC6142951CB58168114b28",
    name:"testPrinter-3",
    nozzlesMounted:'Brass',
    soluble:'yes',
    foodSafety:'no'
}]}



const material=[
    {value:0 , label:"ABS"},
    {value:1,label:"PLA"},
    {value:2,label:"PETG"}];
    
const color=[0,"BLACK","WHITE","BROWN","GRAY","YELLOW",
    "ORANGE","RED","PINK","PURPLE","BLUE","GREEN"];

const selectColors=[
    {value:1,label:"BLACK"},
    {value:2,label:"WHITE"},
    {value:3,label:"BROWN"},
    {value:4,label:"GRAY"},
    {value:5,label:"YELLOW"},
    {value:6,label:"ORANGE"},
    {value:7,label:"RED"},
    {value:8,label:"PINK"},
    {value:9,label:"PURPLE"},
    {value:10,label:"BLUE"},
    {value:11,label:"GREEN"}
];
const nozzles=[
        {value:"1" , label:"1mm"},
        {value:"2",label:"2mm"},
        {value:"3",label:"3mm"},
        {value:"4",label:"4mm"},
        {value:"5",label:"5mm"},
        {value:"6",label:"6mm"}]

export function getNozzles(){
            return nozzles;
        }
        

export function getPrinters(){
    return myPrinters;
}

export function getPrinter(val){
    return myPrinters.printers.find((elem)=>elem.address===val);
}



export function getDesignes(){
    return designes;
}

export function getDesigne(designe){
    return designes.find((val)=>val.name===designe);
}


export function getColor(){
    return selectColors;

}

export function getConstMaterials(){
    return material;
}