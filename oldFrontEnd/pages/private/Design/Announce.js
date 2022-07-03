import React, { useState } from 'react';
import { Outlet } from "react-router-dom";
import UploadSTL from './UploadSTL';
import StlRenderer from './StlRenderer';
import { create } from 'ipfs-http-client';

const Layout = ({ account }) => {

  const ipfs = create('/ip4/127.0.0.1/tcp/5001');  
  const [selectedFile, onChangeFile] = useState('undefined');
  const [volume, onChangeVolume] = useState('undefined');

  return (
    <>
      <nav className="navbar navbar-dark bg-dark shadow mb-5">
        <div nav className="nav-left">
          <ul>
            <UploadSTL changeFile={(val) => {onChangeFile(val)}}/>
            <div class="canvas">
              <StlRenderer file={selectedFile}/>
            </div>
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  )
};

export default Layout;