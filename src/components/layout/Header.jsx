import React from "react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
	const navigate = useNavigate();
	const goHome = () => {
		navigate('/')
	}
	return (
		<header>
			<span onClick={goHome}>Home</span>
		</header>
	)
}

export default Header;