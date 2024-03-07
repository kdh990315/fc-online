import React, { useContext, useEffect, useState } from "react";
import { OuidContext } from "../../../context/ouidContext";
import { achievement, basic, divisionMatching, matchTypeMatching, maxDivision } from "../../../api/basic";

const UserbasicData = () => {
	const { ouid } = useContext(OuidContext);
	const [basicData, setBasicData] = useState(null);
	const [maxDivisionData, setMaxDivisionData] = useState([]);


	useEffect(() => {
		const fetchData = async () => {

			try {
				// 기본 데이터 가져오기
				const basicData = await basic(ouid);
				setBasicData(basicData);
			} catch (error) {
				console.error(error);
			}

			try {
				// 최고 등급 데이터 가져오기
				const maxDivisionData = await maxDivision(ouid);
				setMaxDivisionData(maxDivisionData);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, [ouid]);

	return (
		<div className="usebasicdata_wrap">
			{basicData && (
				<div className="nickname_container">
					<span className="nickname">{basicData.nickname}</span>
					<span className="level">{basicData.level}</span>
				</div>
			)}
			<div className="user_match_division_container">
				{maxDivisionData.length > 0 ? (
					maxDivisionData.map((item, idx) => (
						<div key={idx}>
							<span className="user_match_division">
								{matchTypeMatching(item.matchType)} 최고티어 :{" "}
								{divisionMatching(item.division)}
							</span>
							<span className="division_achievementdate">
								{achievement(item.achievementDate)}
							</span>
						</div>
					))
				) : (
					<p></p>
				)}
			</div>
		</div>
	);
};

export default UserbasicData;
