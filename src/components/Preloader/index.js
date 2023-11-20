import React from "react";
import styled, {keyframes} from "styled-components";
import {ReactComponent as Loader} from "../../assets/images/icons/loader.svg";

const spin = keyframes`
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
`;

const PreloaderWrapper = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;

	svg {
		animation: 2s linear 0s infinite normal none running ${spin};
	}
`;

interface IProps {
	color?: string;
}

export const Preloader: React.FC<IProps> = ({color = "#000"}) => (
	<PreloaderWrapper className="preloader">
		<Loader fill={color} width="52" height="48" />
	</PreloaderWrapper>
);
