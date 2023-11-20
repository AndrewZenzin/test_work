import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import {media} from "../../assets/css/media";

const HeaderWrapper = styled.div`
  background-color: #000;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  height: 80px;
`;

const HeaderContent = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
`;


const HomeLeft = styled.div`
  height: 40px;
  background: #fff;
  cursor: pointer;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  border-radius: 10px;
`;

const LogosWrapper = styled.div`
  display: flex;
  height: 50px;
  justify-content: flex-start;
  align-items: center;
  @media (max-width: ${media.tablet}) {
    height: 30px;
  }
`;

export function Header() {
    const navigate = useNavigate();
    const onLeftLogoClick = () => navigate('/');
    return (
        <HeaderWrapper>
            <HeaderContent>
                <LogosWrapper>
                    <HomeLeft onClick={onLeftLogoClick}> Home </HomeLeft>
                </LogosWrapper>
            </HeaderContent>
        </HeaderWrapper>
    )

}

export default Header;