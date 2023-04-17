import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BLOG_ID, API_KEY } from '../utils/constant';

const dispatchToPropsHomeMap =
  dispatch => {
    return {
      loadHome: (homePageId) => {
        dispatch(
          {
            type: 'LOAD_HOME',
            payload: {
              request: {
                method: 'GET',
                url: '/' + BLOG_ID + '/posts/' + homePageId + '?key=' + API_KEY,
                data: {
                }
              }
            } 
          }
        )
      }
    }
  };

const stateToPropsHomeMap = (state) => {
   return {
      homePageId: state.homePageId,
      homePage: state.homePage
   };
};

const HomePage = connect(stateToPropsHomeMap, dispatchToPropsHomeMap)(
  function (props) {
    useEffect(()=>{
      if (typeof props.loadHome === "function" && props.homePageId && !props.homePage)
        props.loadHome(props.homePageId);
    },[props]);

    return props.homePage ? (
      <div className="content-section">
        <h2 className="section-heading">{props.homePage.name}</h2>
        <p className="section-sub-heading">{props.homePage.quote}</p>
        <img className="about-photo" src={props.homePage.img} alt={props.homePage.name} />
        <p className="about-content">{props.homePage.content}</p>
      </div>
    ) : null;
  }
);

export default HomePage;
