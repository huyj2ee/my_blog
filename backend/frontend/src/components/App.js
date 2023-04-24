import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AiOutlineDown, AiOutlineSearch } from "react-icons/ai";
import {
  Route,
  Routes,
  Link,
  useLocation,
  useNavigate
} from 'react-router-dom';
import { BLOG_ID, ROOT_ID, API_KEY } from '../utils/constant';
import HomePage from './HomePage';
import Contact from './Contact';
import CV from './CV';
import ProjectsList from './ProjectsList';
import Project from './Project';
import BlogsList from './BlogsList';
import Blog from './Blog';
import SearchedBlogs from './SearchedBlogs';

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
      clearProjectsList: () => {
        dispatch(
          {
            type: 'CLEAR_PROJECTS_LIST'
          }
        )
      },
      clearBlogsList: () => {
        dispatch(
          {
            type: 'CLEAR_BLOGS_LIST'
          }
        )
      },
      clearFoundBlogs: () => {
        dispatch(
          {
            type: 'CLEAR_FOUND_BLOGS'
          }
        )
      }
    }
  };

const stateToPropsAppMap = (state) => {
  return {
      projectsList: state.projectsList,
      blogsList: state.blogsList,
      foundBlogs: state.foundBlogs
  };
};

const App = connect(stateToPropsAppMap, dispatchToPropsAppMap)(
  function (props) {
    let [searchInput, setSearchInput] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    function onSearchClick() {
      navigate('/searchedblogs?q=' + searchInput);
      setSearchInput('');
    }

    function onSearchInput(e) {
      setSearchInput(e.target.value);
    }

    function onSearchKeyDown(e) {
      if (e.keyCode === 13) {
        onSearchClick();
      }
    }

    if(location.pathname !== '/projs' && location.pathname !== '/proj' && props.projectsList && typeof props.clearProjectsList === 'function')
      props.clearProjectsList();

    if(location.pathname !== '/blogs' && location.pathname !== '/blog' && props.blogsList && typeof props.clearBlogsList === 'function')
      props.clearBlogsList();

    if(location.pathname !== '/searchedblogs' && location.pathname !== '/blog' && props.foundBlogs && typeof props.clearFoundBlogs === 'function')
      props.clearFoundBlogs();

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
              <span>
                More
                <AiOutlineDown className="nav-more-icon"/>
              </span>
              <ul className="subnav">
                <li><Link to="/cv">CV</Link></li>
              </ul>
            </li>
          </ul></nav>
          {/* End: nav */}

          {/* Begin: search blogs */}
          <div className="search-container">
            <input value={searchInput} onChange={onSearchInput} onKeyDown={onSearchKeyDown} placeholder="Search blogs..." className="search-input" />
            <AiOutlineSearch onClick={onSearchClick} className="search-button"/>
          </div>
          {/* End: search blogs */}
        </div>

        <div id="content">
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/projs" element={<ProjectsList/>} />
            <Route path="/proj"  element={<Project/>} />
            <Route path="/blogs" element={<BlogsList/>} />
            <Route path="/blog" element={<Blog/>} />
            <Route path="/searchedblogs" element={<SearchedBlogs/>} />
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

export default App;
