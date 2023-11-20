import React from "react";
import {Preloader} from "../Preloader";

import styled from "styled-components";

const Overlay = styled.div`
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	width: 100%;
	height: 100%;
	z-index: 100;
`;

export const PagePreloader: React.FC = () => (
	<Overlay>
		<Preloader />
	</Overlay>
);