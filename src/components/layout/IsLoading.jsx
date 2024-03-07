import React from "react";
import loadingImg from "../../assest/images/ball.png"

import '../../scss/isLoading.scss'

export const IsLoading = () => {
	return (
		<div className="loading_container">
			<div className="title">
				<span>로딩중...</span>
			</div>
			<div className="loading_main">
				<div className="animation_container">
					<img src={loadingImg} alt="로딩아이콘" />
					<img src={loadingImg} alt="로딩아이콘" />
					<img src={loadingImg} alt="로딩아이콘" />
				</div>
			</div>
		</div>
	)
}

export default IsLoading;