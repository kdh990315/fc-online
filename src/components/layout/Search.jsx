import React, { useContext, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { OuidContext } from "../../context/ouidContext";

const Search = () => {
	const userNickName = useRef('');

	const { setOuid } = useContext(OuidContext);
	
	useEffect(() => {
		userNickName.current.focus();
	}, []);

	const navigate = useNavigate();

	//submit
	const submitNickname = async (e) => {
		e.preventDefault();

		const API_KEY = 'test_36f955f95257f137db8894064765c79b4006b31d1f7b504f7476a51db027f39851a423603c9961e4cd20b47fa104ec1f';
		const nickname = userNickName.current.value;
		const urlString = `https://open.api.nexon.com/fconline/v1/id?nickname=${nickname}`;

		try {
			const response = await fetch(urlString, {
				headers: {
					"x-nxopen-api-key" : API_KEY,
				}
			})

			const data = await response.json();
			setOuid(data);
			navigate('/UserdataSection/UserbasicData');
			userNickName.current.value = '';
		} catch (err) {
			console.log(err);
		}
	}

    return (
		<div className="searchForm_container">
			<form onSubmit={submitNickname} className="searchForm">
				<input type="text" ref={userNickName} placeholder="닉네임을 입력해주세요"/>
				<button type="submit">검색하기</button>
			</form>

			<div className="basic_userdata">

			</div>
		</div>
	)
}

export default Search;
