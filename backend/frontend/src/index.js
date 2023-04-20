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
  Link
} from 'react-router-dom';
import { BLOG_ID, ROOT_ID, API_KEY } from './utils/constant';
import HomePage from './components/HomePage';
import Contact from './components/Contact';
import CV from './components/CV';
import ProjectsList from './components/ProjectsList';
import Project from './components/Project';
import './style.css';

function Blogs() {
  return (
    <div className="blog-list">
      <div className="blog-item">
        <h2>Blog 1</h2>
        <div className="blog-item-brief">
          React uses lifting state up to share state between components. The truthful source of state is lifted and stored in the higher level component. If we change the class hierarchy, the state redesign may be need. Redux is a framework support decouple the state to an independence truthful source to make state source is more predictable. This blog entry shares some concepts and how to implement an application powered by React, Redux framework. Audience : software engineer with Javascript knowledge
        </div>
        <div className="blog-detail">
          READ MORE
        </div>
      </div>
      <div className="blog-item">
        <h2>Blog 2</h2>
        <div className="blog-item-brief">
        Taiga is a free and open-source project management system for startups. Its frontend is written in AngularJS and CoffeeScript; backend, in Django and Python. Exploring Taiga source code is helpfull for improving Django and AngularJS programming skills. This blog entry shares steps to setup a developing environment for such exploring. Audience: software engineer – Topic: Django, AngularJS programming I. Introduction Taiga is composed by two mandatory components: Taiga back-end and Taiga front-end. The back-end one provides services as REST apis.
        </div>
        <div className="blog-detail">
          READ MORE
        </div>
      </div>
      <div className="blog-item">
        <h2>Blog 3</h2>
        <div className="blog-item-brief">
          Taiga is a free and open-source project management system for startups. Its frontend is written in AngularJS and CoffeeScript; backend, in Django and Python. Exploring Taiga source code is helpfull for improving Django and AngularJS programming skills. This blog entry shares steps to setup a developing environment for such exploring. Audience: software engineer – Topic: Django, AngularJS programming I. Introduction Taiga is composed by two mandatory components: Taiga back-end and Taiga front-end. The back-end one provides services as REST apis.
        </div>
        <div className="blog-detail">
          READ MORE
        </div>
      </div>
      <div className="more-blog">
        MORE BLOGS
      </div>
    </div>
  );
}

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
      }
    }
  };

const stateToPropsAppMap = null;

const App = connect(stateToPropsAppMap, dispatchToPropsAppMap)(
  function (props) {
    useEffect(()=>{
      if (typeof props.loadRoot === "function")
        props.loadRoot();
    },[props]);

    return (
      <Router>
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
                  <li><a href="#1">Portfolio</a></li>
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
              <Route path="/blogs" element={<Blogs/>} />
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
      </Router>
    );
  }
);

const reducer = (state = 0, action) => {
  let obj = null;
  switch (action.type) {
    case 'LOAD_ROOT_FAIL':
    case 'LOAD_HOME_FAIL':
    case 'LOAD_CV_FAIL':
    case 'LOAD_PROJECTS_LIST_FAIL':
    case 'LOAD_PROJECT_FAIL':
      alert(JSON.stringify(action));
      return Object.assign(
        {},
        state,
        {
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
    <App />
  </Provider>,
  document.getElementById('root')
);

