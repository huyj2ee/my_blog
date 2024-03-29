import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { BLOG_ID, API_KEY } from '../utils/constant';
import { Link, useSearchParams } from 'react-router-dom';
import NowLoading from './NowLoading';

const dispatchToPropsSearchedBlogsMap = 
  dispatch => {
    return {
      searchBlogs: (query) => {
        dispatch(
          {
            type: 'SEARCH_BLOGS',
            payload: {
              request: {
                method: 'GET',
                url: '/' + BLOG_ID + '/posts/search?q=' + query + '&key=' + API_KEY,
                data: {
                }
              }
            } 
          }
        );
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

const stateToPropsSearchedBlogsMap = (state) => {
  return {
    foundBlogs: state.foundBlogs
  };
};

const SearchedBlogs = connect(stateToPropsSearchedBlogsMap, dispatchToPropsSearchedBlogsMap)(
  function (props) {
    const [searchParams] = useSearchParams();
    let query = searchParams.get('q');
    let start = searchParams.get('start');
    start = parseInt(start ? start : 0);

    useLayoutEffect(()=>{
      if (typeof props.clearFoundBlogs === 'function' && typeof props.searchBlogs === 'function'){
        props.clearFoundBlogs();
        props.searchBlogs(query);
      }
      return () => {
        if (typeof props.clearFoundBlogs === 'function' && props.foundBlogs)
          props.clearFoundBlogs();
      };
    },[query]);// eslint-disable-line react-hooks/exhaustive-deps
  
    let blogItems =[];
    let moreBlogs = null;
    if (props.foundBlogs) {
      let end = props.foundBlogs.length;
      if (end > start + 5) {
        end = start + 5;
        moreBlogs = <Link className="more-blog" to={'/searchedblogs?q=' + query + '&start=' + end}>MORE BLOGS</Link>;
      }
      for (let i = start; i < end; i++) {
        let blog = props.foundBlogs[i];
        blogItems.push(
          <div className="blog-item">
            <h2>{blog.title}</h2>
            <div className="blog-item-brief">
              {blog.brief}
            </div>
            <Link className="blog-detail" to={'/blog?slug=' + blog.slug}>READ MORE</Link>
          </div>
        );
      }
    }

    return props.foundBlogs? (
      <div className="blog-list">
        {blogItems.length === 0 ? <h1>No blog found</h1> : blogItems}
        {moreBlogs}
      </div>
    ) : <NowLoading />;
  }
);

export default SearchedBlogs;
