import React, { useContext, useEffect, useState } from "react";
import { OuidContext } from "../../../context/ouidContext";
import { changeBackgroundColor, matchDate, setMatchDetailData } from "../../../api/basic";

const UsermatchData = () => {
  const { ouid } = useContext(OuidContext);

  const [matchData, setMatchData] = useState([]);

  useEffect(() => {
    const fetchMatchData = async () => {
      try {
        const data = await setMatchDetailData(ouid);
        setMatchData(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMatchData();
  }, [ouid]);
  
  console.log(matchData);

  return (
      <ul className="match_container_wrap">
        { matchData.length > 0 ? (
          matchData.map((item, idx) => (
            <li key={ idx } className="match_container">
              <p className="match_date">{ matchDate(item.matchDate) }</p>

              <div className="match_main">
                <div className={ `home_container container background_${changeBackgroundColor(item.matchInfo[0].matchDetail.matchEndType, item.matchInfo[0].matchDetail.matchResult)}` }>
                  <div className="home_left">

                    <div className="home_nickname_container">
                      <span className="home_player_nickname player_nickname">{ item.matchInfo[0].nickname }</span>
                      <span className="away_player_controller player_controller">{ 
                        item.matchInfo[0].matchDetail.controller === 'gamepad' ? '패드' : '키보드'
                      }</span>
                    </div>

                    <div className="home_averagerating_container">
                      <span>매치 평점 : { item.matchInfo[0].matchDetail.matchEndType === 2 ? '0' : item.matchInfo[0].matchDetail.averageRating }</span>
                    </div>

                  </div>

                  <div className="home_rigth">
                    <strong className="matchResult">{ 
                      item.matchInfo[0].matchDetail.matchEndType === 2 ? '몰수패' :
                      item.matchInfo[0].matchDetail.matchEndType === 1 ? '몰수승' :
                      item.matchInfo[0].matchDetail.matchResult
                    }</strong>
                  </div>
                </div>

                <div className="versus_container">
                  <div className="home_score_container">
                    <p className="home_score">{ 
                      item.matchInfo[0].matchDetail.matchEndType === 2 ? '0' :
                      item.matchInfo[0].matchDetail.matchEndType === 1 ? '3' : 
                      item.matchInfo[0].shoot.goalTotal
                    }</p>
                  </div>
                  <strong>vs</strong>
                  <div className="away_score_container">
                    <p className="away_score">{ 
                      item.matchInfo[1].matchDetail.matchEndType === 2 ? '0' :
                      item.matchInfo[1].matchDetail.matchEndType === 1 ? '3' : 
                      item.matchInfo[1].shoot.goalTotal
                  }</p>
                  </div>
                </div>

                <div className={ `away_container container background_${changeBackgroundColor(item.matchInfo[1].matchDetail.matchEndType, item.matchInfo[1].matchDetail.matchResult)}` }>

                  <div className="away_left">
                    <strong className="matchResult">
                      <strong className="matchResult">{ 
                        item.matchInfo[1].matchDetail.matchEndType === 2 ? '몰수패' :
                        item.matchInfo[1].matchDetail.matchEndType === 1 ? '몰수승' :
                        item.matchInfo[1].matchDetail.matchResult
                      }</strong>
                    </strong>
                  </div>

                  <div className="away_rigth">

                    <div className="away_nickname_container">
                      <span className="away_player_controller player_controller">{ 
                        item.matchInfo[1].matchDetail.controller === 'gamepad' ? '패드' : '키보드'
                      }</span>
                      <span className="away_player_nickname player_nickname">{ item.matchInfo[1].nickname }</span>
                    </div>

                    <div className="away_averagerating_container">
                      <span>매치 평점 : { item.matchInfo[1].matchDetail.matchEndType === 2 ? '0' : item.matchInfo[1].matchDetail.averageRating }</span>
                    </div>
                  </div>

                </div>
              </div>

              <div className="detail_btn">
                <span>자세히보기</span>
              </div>
            </li>
          ))
        ) : (
          <p></p>
        ) }
      </ul>
  );
};

export default UsermatchData;
