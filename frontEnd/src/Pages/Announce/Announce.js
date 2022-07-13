import React, { useState } from 'react';
import { Outlet } from "react-router-dom";
import UploadSTL from './UploadSTL';
import STLRenderer from './STLRenderer';
import './Announce.css'

const Layout = ({ account }) => {

  const [selectedFile, onChangeFile] = useState('undefined');
  const [volume, onChangeVolume] = useState('undefined');

  return (
    <>
      <nav className="navbar navbar-dark bg-dark shadow mb-5">
        <div nav className="nav-left">
          <ul class="background">
            <div class="rendererCanvas">
              <STLRenderer file={selectedFile}/>
            </div>
            <div class="rendererButtons">
              <UploadSTL changeFile={(val) => {onChangeFile(val)}}/>
            </div>
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  )
};

export default Layout;