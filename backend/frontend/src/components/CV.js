import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { BLOG_ID, API_KEY } from '../utils/constant';
import NowLoading from './NowLoading';

const dispatchToPropsCVMap =
  dispatch => {
    return {
      loadCV: (cvPageId) => {
        dispatch(
          {
            type: 'LOAD_CV',
            payload: {
              request: {
                method: 'GET',
                url: '/' + BLOG_ID + '/posts/' + cvPageId + '?key=' + API_KEY,
                data: {
                }
              }
            } 
          }
        )
      },
      clearCV: () => {
        dispatch(
          {
            type: 'CLEAR_CV'
          }
        )
      }
    }
  };

const stateToPropsCVMap = (state) => {
  return {
     cvPageId: state.cvPageId,
     CV: state.CV
  };
};

const CV = connect(stateToPropsCVMap, dispatchToPropsCVMap)(
  function (props) {
    let cvContainer = useRef();
    useEffect(()=>{
      if (typeof props.loadCV === 'function' && props.cvPageId && !props.CV)
        props.loadCV(props.cvPageId);
      if (props.CV) {
        cvContainer.current.innerHTML = props.CV;
      }
      return () => {
        if (typeof props.clearCV === 'function' && props.CV)
          props.clearCV();
      };
    },[props]);

    return props.CV ? (
      <div className="document-container">
        <div ref={cvContainer} className="document"></div>
      </div>
    ) : <NowLoading />;
  }
);

export default CV;