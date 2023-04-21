import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BLOG_ID, API_KEY } from '../utils/constant';
import { Link, useSearchParams } from 'react-router-dom';
import NowLoading from './NowLoading';

const dispatchToPropsBlogsListMap = 
  dispatch => {
    return {
      loadBlogsList: (blogsListId) => {
        dispatch(
          {
            type: 'LOAD_BLOGS_LIST',
            payload: {
              request: {
                method: 'GET',
                url: '/' + BLOG_ID + '/posts/' + blogsListId + '?key=' + API_KEY,
                data: {
                }
              }
            } 
          }
        )
      }
    }
  };

const stateToPropsBlogsListMap = (state) => {
  return {
    blogsListId: state.blogsListId,
    blogsList: state.blogsList
  };
};

const BlogsList = connect(stateToPropsBlogsListMap, dispatchToPropsBlogsListMap)(
  function (props) {
    const [searchParams] = useSearchParams();
    let start = searchParams.get('start');
    start = parseInt(start ? start : 0);

    useEffect(()=>{
      if (typeof props.loadBlogsList === 'function' && props.blogsListId && !props.blogsList)
      props.loadBlogsList(props.blogsListId);
    },[props]);
  
    let blogItems =[];
    let moreBlogs = null;
    if (props.blogsList) {
      let end = props.blogsList.length;
      if (end > start + 5) {
        end = start + 5;
        moreBlogs = <Link className="more-blog" to={'/blogs?start=' + end}>MORE BLOGS</Link>;
      }
      for (let i = start; i < end; i++) {
        let blog = props.blogsList[i];
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

    return props.blogsList? (
      <div className="blog-list">
        {blogItems}
        {moreBlogs}
      </div>
    ) : <NowLoading />;
  }
);

export default BlogsList;