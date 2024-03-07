const API_KEY = 'live_36f955f95257f137db8894064765c79be7c5e62d22c06e0580a553df72278b57302398df0e2e4451b4ca1a80eaf3ac6e';

//유저의 기본 정보를 불러오는 함수
/**
 * @param {*} ouid 
 * @returns ouid, 닉네임, 레벨
 */
export const basic = async (ouid) => {
	const userOuid = ouid.ouid;
	const urlString = `https://open.api.nexon.com/fconline/v1/user/basic?ouid=${userOuid}`;

	try {
		const response = await fetch(urlString, {
			headers: {
				"x-nxopen-api-key": API_KEY,
			}
		});

		const data = await response.json();
		return data;
	} catch (err) {
		console.log(err);
	}
}

//유저의 역대최고 등급과 달성일자를 조회합니다.
/**
 * @param {*} ouid 
 * @returns matchType, division, achievementDate
 */
export const maxDivision = async (ouid) => {
	const userOuid = ouid.ouid;
	const urlString = `https://open.api.nexon.com/fconline/v1/user/maxdivision?ouid=${userOuid}`;

	try {
		const response = await fetch(urlString, {
			headers: {
				"x-nxopen-api-key": API_KEY,
			}
		})

		const data = await response.json();
		return data;
	} catch (err) {
		console.log(err);
	}
}

// 매치타입 데이터를 반환해주는 함수입니다.
let matchTypeData = [];

//매치 타입 메타데이터를 조회합니다.
export const matchType = async () => {
	const urlString = "https://open.api.nexon.com/static/fconline/meta/matchtype.json";

	try {
		const response = await fetch(urlString);

		const data = await response.json();
		matchTypeData = data;
	} catch (err) {
		console.log(err);
	}
}

// 매치타입을 조회하는 함수입니다.
export const matchTypeMatching = (getmatchType) => {
	const findmatchtype = matchTypeData.find(item => item.matchtype === getmatchType);
	return findmatchtype.desc;
}

// 등급 식별자 데이터를 반환해주는 함수입니다.
let divisionData = [];

//등급 식별자(division) 메타데이터를 조회합니다.
export const division = async () => {
	const urlString = "https://open.api.nexon.com/static/fconline/meta/division.json";

	try {
		const response = await fetch(urlString);

		const data = await response.json();
		divisionData = data;
	} catch (err) {
		console.log(err);
	}
}

//등급 식별자를 조회하는 함수입니다.
export const divisionMatching = (disision) => {
	const finddivision = divisionData.find(item => item.divisionId === disision);
	return finddivision.divisionName;
}

//최고등급을 달성한 날짜를 반환해주는 함수입니다.
export const achievement = (getAchievementDate) => {
	const achievementDate = new Date(getAchievementDate);

	const year = achievementDate.getFullYear();
	const month = achievementDate.getMonth() + 1;
	const day = achievementDate.getDate();

	const returnData = `${year} / ${month} /  ${day}`;

	return returnData;
}

//유저의 매치 데이터를 조회하는 함수입니다.
let matchid = [];
let matchDetailData = [];

//유저의 매치 데이터를 반환하는 함수입니다.
export const setMatchDetailData = async (ouid) => {
  const matchDataBox = [];
	await userMatch(ouid);

	for (const matchId of matchid) {
		const urlString = `https://open.api.nexon.com/fconline/v1/match-detail?matchid=${matchId}`;
		try {
			const response = await fetch(urlString, {
				headers: {
					'x-nxopen-api-key': API_KEY
				}
			});
			const data = await response.json();
			matchDataBox.push(data);
		} catch (err) {
			console.log(`오류가 발생하였습니다: ${err}`);
		}
	}

	matchDetailData = matchDataBox;
	return matchDetailData;
}
//유저의 매치 아이디를 조회하는 함수입니다.
export const userMatch = async (ouid) => {
	const matchType = '50',
		userOuid = ouid.ouid,
		offset = 0,
		limit = 20,
		urlString = `https://open.api.nexon.com/fconline/v1/user/match?ouid=${userOuid}&matchtype=${matchType}&offset=${offset}&limit=${limit}`;

	try {
		const response = await fetch(urlString, {
			headers: {
				'x-nxopen-api-key': API_KEY
			}
		});

		const data = await response.json();
		matchid = data;
	} catch (err) {
		console.log(err);
	}
}

//유저의 매치 날짜를 반환해주는 함수입니다.
export const matchDate = (getMatchDate) => {
	const achievementDate = new Date(getMatchDate);

	const month = achievementDate.getMonth() + 1;
	const day = achievementDate.getDate();
	const hour = achievementDate.getHours();

	const returnData = `${month}월 ${day}일 ${hour}시`;

	return returnData;
}

//유저의 matchEndType에 따라 background-color의 색상을 변경합니다.
export const changeBackgroundColor = (endType, matchResult) => {

  if(endType === 1 && matchResult === '승') return 'blue';

  if(endType === 2 && matchResult === '패') return 'gray';

  if(endType === 0 && matchResult === '승') return 'blue';

  if(endType === 0 && matchResult === '패') return 'red'; 

  if(endType === 0 && matchResult === '무') return 'green';
}