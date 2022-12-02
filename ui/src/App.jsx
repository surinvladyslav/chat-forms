import React from 'react';
import {Route, Routes, useLocation} from 'react-router-dom';
import {CSSTransition} from 'react-transition-group';

import {useContext} from './store/context';

import {Header} from './components/header';
import {Import} from './pages/import';
import {Chat} from './pages/chat';
import {Share} from './pages/share';
import {Alert} from './components/alert';
import {Loader} from './components/loader';

import './App.scss';

export default function App() {
  const {loader} = useContext();
  let location = useLocation();

  return (
    <>
      <div className="animated">
        <CSSTransition
          key={location.pathname}
          timeout={500}
          in={true}
        >
          <div className={'animated-block'}>
            <Header/>
            {
              loader ?
                <Loader/> :
                <Routes>
                  <Route exact path="/" element={<Import/>}/>
                  <Route exact path="/forms/:id" element={<Chat/>}/>
                  <Route exact path="/share/:id" element={<Share/>}/>
                </Routes>
            }
            <div className="bg"></div>
            <Alert/>
          </div>
        </CSSTransition>
      </div>
    </>
  );
}