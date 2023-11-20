import React, {Suspense, Fragment} from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import styled from "styled-components";

import {
    PagePreloader, UsersList, Header
} from "./components";

import {
    UsersPosts
} from "./pages/UsersPosts";
import {
    UsersAlbums
} from "./pages/UsersAlbums";

import {
    Album
} from "./pages/Album";


import './index.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
const Content = styled.div`
  flex: auto;
  max-width: 1440px;
  margin: 0 auto;
`;

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Suspense fallback={<PagePreloader/>}>
                <Header/>
                <Content>
                    <Routes>
                        <Fragment>
                            <Route path="/" element={<UsersList/>}/>
                            <Route
                                path="/users-posts/:userId"
                                element={<UsersPosts/>}
                            />
                            <Route
                                path="/users-albums/:userId"
                                element={<UsersAlbums/>}
                            />
                            <Route
                                path="/albums/:albumId"
                                element={<Album/>}
                            />
                        </Fragment>
                    </Routes>
                </Content>
            </Suspense>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
