import STLViewer from 'stl-viewer'



export function Stl(props){

  return(  <STLViewer className="viewerPosition"
    model={props.design_path}
    width={200}
    height={200}
    lights={[[1, 1, -1], [-1, -1,1]]}
    modelColor='yellow'
    backgroundColor='white'
    orbitControls={true}
    rotate={true}/>)
}
