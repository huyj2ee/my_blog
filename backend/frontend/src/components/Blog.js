import React, { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { BLOG_ID, API_KEY } from '../utils/constant';
import NowLoading from './NowLoading';
import hljs  from 'highlight.js';

const dispatchToPropsBlogMap =
  dispatch => {
    return {
      loadBlog: (slug) => {
        dispatch(
          {
            type: 'LOAD_BLOG',
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
      clearBlog: () => {
        dispatch(
          {
            type: 'CLEAR_BLOG'
          }
        )
      }
    }
  };

const stateToPropsBlogMap = (state) => {
  return {
     blog: state.blog
  };
};

const Blog = connect(stateToPropsBlogMap, dispatchToPropsBlogMap)(
  function (props) {
    const [searchParams] = useSearchParams();
    let slug = searchParams.get('slug');  
    let blogContainer = useRef();
    useEffect(()=>{
      if (typeof props.loadBlog === 'function' && !props.blog)
        props.loadBlog(slug);
      if (props.blog) {
        blogContainer.current.innerHTML = props.blog;
        const blocks = document.querySelectorAll('pre code');
        blocks.forEach((block)=>block.classList.remove('language-plaintext'));
        hljs.highlightAll();
      }
      return () => {
        if (typeof props.clearBlog === 'function' && props.blog)
          props.clearBlog();
      };
    },[props, slug]);

    return props.blog ? (
      <div className="document-container">
        <div ref={blogContainer} className="document"></div>
      </div>
    ) : <NowLoading />;
  }
);

export default Blog;