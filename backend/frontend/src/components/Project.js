import React, { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { BLOG_ID, API_KEY } from '../utils/constant';
import NowLoading from './NowLoading';

const dispatchToPropsProjectMap =
  dispatch => {
    return {
      loadProject: (slug) => {
        dispatch(
          {
            type: 'LOAD_PROJECT',
            payload: {
              request: {
                method: 'GET',
                url: '/' + BLOG_ID + '/posts/' + slug + '?key=' + API_KEY,
                data: {
                }
              }
            } 
          }
        )
      },
      clearProject: () => {
        dispatch(
          {
            type: 'CLEAR_PROJECT'
          }
        )
      }
    }
  };

const stateToPropsProjectMap = (state) => {
  return {
     project: state.project
  };
};

const Project = connect(stateToPropsProjectMap, dispatchToPropsProjectMap)(
  function (props) {
    const [searchParams] = useSearchParams();
    let slug = searchParams.get('slug');  
    let projectContainer = useRef();
    useEffect(()=>{
      if (typeof props.loadProject === 'function' && !props.project)
        props.loadProject(slug);
      if (props.project) {
        projectContainer.current.innerHTML = props.project;
      }
      return () => {
        if (typeof props.clearProject === 'function' && props.project)
          props.clearProject();
      };
    },[props, slug]);

    return props.project ? (
      <div className="document-container">
        <div ref={projectContainer} className="document"></div>
      </div>
    ) : <NowLoading />;
  }
);

export default Project;