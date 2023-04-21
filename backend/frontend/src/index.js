import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation
} from 'react-router-dom';
import { BLOG_ID, ROOT_ID, API_KEY } from './utils/constant';
import HomePage from './components/HomePage';
import Contact from './components/Contact';
import CV from './components/CV';
import ProjectsList from './components/ProjectsList';
import Project from './components/Project';
import BlogsList from './components/BlogsList';
import './style.css';

const dispatchToPropsAppMap =
  dispatch => {
    return {
      loadRoot: () => {
        dispatch(
          {
            type: 'LOAD_ROOT',
            payload: {
              request: {
                method: 'GET',
                url: '/' + BLOG_ID + '/posts/' + ROOT_ID + '?key=' + API_KEY,
                data: {
                }
              }
            } 
          }
        )
      },
      clearProjectList: () => {
        dispatch(
          {
            type: 'CLEAR_PROJECTS_LIST'
          }
        )
      }
    }
  };

const stateToPropsAppMap = (state) => {
  return {
      projectsList: state.projectsList
  };
};

const App = connect(stateToPropsAppMap, dispatchToPropsAppMap)(
  function (props) {
    const location = useLocation();

    if(location.pathname !== '/projs' && location.pathname !== '/proj' && props.projectsList && typeof props.clearProjectList === 'function')
      props.clearProjectList();

    useEffect(()=>{
      if (typeof props.loadRoot === 'function')
        props.loadRoot();
    },[props]);

    return (
      <div id="main">
        <div id="header">
          {/* Begin: nav */}
          <nav style={{display: "inline-block"}}><ul id="nav">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/projs">Projects</Link></li>
            <li><Link to="/blogs">Blogs</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li>
              <a href="#1">
                More
                <i className="nav-expanding-arrow"></i>
              </a>
              <ul className="subnav">
                <li><Link to="/cv">CV</Link></li>
              </ul>
            </li>
          </ul></nav>
          {/* End: nav */}

          {/* Begin: search button */}
          <div className="search-btn">
            <i className="search-icon ti-search"></i>
          </div>
          {/* End: search button */}
        </div>

        <div id="content">
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/projs" element={<ProjectsList/>} />
            <Route path="/proj"  element={<Project/>} />
            <Route path="/blogs" element={<BlogsList/>} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/cv" element={<CV/>} />
          </Routes>
        </div>

        <div id="footer">
          <div>
            Powered by ReactJS
          </div>
          <div>
              &copy; huyj2ee.blogspot.com
          </div>
        </div>
      </div>
    );
  }
);

const reducer = (state = 0, action) => {
  let obj = null;
  switch (action.type) {
    case 'LOAD_ROOT_FAIL':
    case 'LOAD_HOME_FAIL':
    case 'LOAD_PROJECTS_LIST_FAIL':
    case 'LOAD_PROJECT_FAIL':
    case 'LOAD_BLOGS_LIST_FAIL':
    case 'LOAD_CV_FAIL':
      alert(JSON.stringify(action));
      return Object.assign(
        {},
        state,
        {
        }
      );

    case 'CLEAR_PROJECTS_LIST':
      return Object.assign(
        {},
        state,
        {
          projectsList: undefined
        }
      );

    case 'CLEAR_PROJECT':
      return Object.assign(
        {},
        state,
        {
          project: undefined
        }
      );

    case 'LOAD_ROOT_SUCCESS':
      obj = JSON.parse(action.payload.data.content);
      return Object.assign(
        {},
        state,
        obj
      );
      
    case 'LOAD_HOME_SUCCESS':
      obj = JSON.parse(action.payload.data.content);
      return Object.assign(
        {},
        state,
        {
           homePage: obj
	      }
      );

    case 'LOAD_PROJECTS_LIST_SUCCESS':
      obj = JSON.parse(action.payload.data.content);
      return Object.assign(
        {},
        state,
        {
           projectsList: obj
	      }
      );

    case 'LOAD_CV_SUCCESS':
      obj = JSON.parse(action.payload.data.content);
      return Object.assign(
        {},
        state,
        {
           CV: obj
	      }
      );

    case 'LOAD_PROJECT_SUCCESS':
    obj = JSON.parse(action.payload.data.content);
    return Object.assign(
      {},
      state,
      {
         project: obj
      }
    );

    case 'LOAD_BLOGS_LIST_SUCCESS':
    obj = JSON.parse(action.payload.data.content);
    return Object.assign(
      {},
      state,
      {
        blogsList: obj
      }
    );

    default:
      return state;
  }
};

const client = axios.create({
  baseURL: 'https://www.googleapis.com/blogger/v3/blogs/',
  responseType: 'json'
});

const store = createStore(
  reducer,
  {
  },
  applyMiddleware(
    axiosMiddleware(client)
  )
);

ReactDOM.render(
  <Provider store = {store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

