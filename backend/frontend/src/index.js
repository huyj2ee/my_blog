import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import App from './components/App';
import './style.css';

const reducer = (state = 0, action) => {
  let getBlogs = function(posts) {
    let blogs = [];
    for(let i = 0; i < posts.length; i++) {
      if(posts[i].title.startsWith('[blog] ')) {
        let blog = {};
        blog['title'] = posts[i].title.substring('[blog] '.length);
        blog['brief'] = JSON.parse(posts[i].content).brief;
        blog['slug'] = posts[i].id;
        blogs.push(blog);
      }
    }
    return blogs;
  }

  let obj = null;
  switch (action.type) {
    case 'LOAD_ROOT_FAIL':
    case 'LOAD_HOME_FAIL':
    case 'LOAD_PROJECTS_LIST_FAIL':
    case 'LOAD_PROJECT_FAIL':
    case 'LOAD_BLOGS_LIST_FAIL':
    case 'LOAD_BLOG_FAIL':
    case 'LOAD_CV_FAIL':
    case 'SEARCH_BLOGS_FAIL':
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

    case 'CLEAR_BLOGS_LIST':
      return Object.assign(
        {},
        state,
        {
          blogsList: undefined
        }
      );

    case 'CLEAR_FOUND_BLOGS':
      return Object.assign(
        {},
        state,
        {
          foundBlogs: undefined
        }
      );

    case 'CLEAR_BLOG':
      return Object.assign(
        {},
        state,
        {
          blog: undefined
        }
      );

    case 'CLEAR_CV':
      return Object.assign(
        {},
        state,
        {
          CV: undefined
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

    case 'LOAD_BLOG_SUCCESS':
    obj = JSON.parse(action.payload.data.content);
    return Object.assign(
      {},
      state,
      {
         blog: obj.content
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

    case 'SEARCH_BLOGS_SUCCESS':
      obj = action.payload.data.items;
      return Object.assign(
        {},
        state,
        {
           foundBlogs: getBlogs(obj)
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

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);

