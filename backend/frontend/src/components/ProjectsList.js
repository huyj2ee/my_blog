import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BLOG_ID, API_KEY } from '../utils/constant';
import NowLoading from './NowLoading';
import { Link } from 'react-router-dom';

const dispatchToPropsProjectsMap = 
  dispatch => {
    return {
      loadProjectsList: (projectsListId) => {
        dispatch(
          {
            type: 'LOAD_PROJECTS_LIST',
            payload: {
              request: {
                method: 'GET',
                url: '/' + BLOG_ID + '/posts/' + projectsListId + '?key=' + API_KEY,
                data: {
                }
              }
            } 
          }
        )
      }
    }
  };

const stateToPropsProjectsMap = (state) => {
  return {
      projectsListId: state.projectsListId,
      projectsList: state.projectsList
  };
};

const ProjectsList = connect(stateToPropsProjectsMap, dispatchToPropsProjectsMap)(
  function (props) {
    useEffect(()=>{
      if (typeof props.loadProjectsList === 'function' && props.projectsListId && !props.projectsList)
        props.loadProjectsList(props.projectsListId);
    },[props]);
  
    let projectItems =[];
    if (props.projectsList)
      projectItems = props.projectsList.map((projectItem)=>(
        <div className="project-item">
          <img src={projectItem.img} alt={projectItem.name} className="project-img"/>
          <div className="project-body">
            <h3 className="project-heading">{projectItem.name}</h3>
            <p className="project-brief-desc">{projectItem.brief}</p>
            <Link className="project-view-detail" to={"/proj?slug=" + projectItem.slug}>View detail</Link>
          </div>  
        </div>
      ));

    return props.projectsList ? (
      <div className="content-section">
        <div className="project-list">
          {projectItems}
        </div>
      </div>
    ) : <NowLoading />;
  }
);

export default ProjectsList;
