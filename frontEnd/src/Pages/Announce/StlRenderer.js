import React, { Component } from 'react';
import { StlViewer } from 'react-stl-file-viewer';

class StlRenderer extends Component{
    render(){
        return (
            <StlViewer
                width={700} // Original: 675
                height={650} // Original: 600
                url={this.props.file}
                groundColor='rgb(255, 255, 255)'
                objectColor='rgb(50, 255, 255)'
                skyboxColor='rgb(255, 255, 255)'
                gridLineColor='rgb(0, 0, 0)'
                lightColor='rgb(255, 255, 255)'
                volume={(val) => {this.setState({volume:val})}}
            />
        )
    }
}

export default StlRenderer;