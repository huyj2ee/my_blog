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
import './style.css';


function Contact() {
  return(
    <div className="content-section">
      <h2 className="section-heading">Contact</h2>
      <div className="contact-content">
        <div className="col col-half">
          <p>Email: huyj2ee@outlook.com</p>
          <p>Skype: huyj2ee</p>
          <p>GitHub: <a href="https://github.com/huyj2ee" target="_blank" rel="noopener noreferrer">https://github.com/huyj2ee</a></p>
        </div>
        <div className="col col-half">
          <p>Address: 31 DX087 Hiep An ward</p>
          <p>Thu Dau Mot city</p>
          <p>Binh Duong province</p>            
        </div>
      </div>
      <div className="google-map">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.1631922677434!2d106.63043451381655!3d11.026379992152187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d189722a17df%3A0xfe32f984c8f959a9!2zQ8OhIEtp4buDbmcgUGhvbmcgVGjhu6d5!5e0!3m2!1sen!2s!4v1678700647407!5m2!1sen!2s" width="686" height="450" style={{border:"0"}} title="cakiengphongthuy" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
  );
}

function Projects() {
  return (
    <div className="content-section">
      <div className="project-list">
        <div className="project-item">
          <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg-rLKfh_LgEhpIoq0cJMGFNHV2EcDwnL0hPCZ4zDZxhe5uY8fPRuU15X6LMq0XtlEQ-RxtgFop5zFKJHpWKyhZxNg1IVQ4DLGZA16iO98u_T6itNBGicj33uyKz0ELT0kcHj7exDC0Ljq_fU0Ix_rWap-SYBj_xLeaTWzh6G9jvzJN-yfRvXPoxwRKBQ/s1600/CaKiengPhongThuy.jpg" alt="CaKiengPhongThuy" className="project-img"/>
          <div className="project-body">
            <h3 className="project-heading">Simple Store</h3>
            <p className="project-brief-desc">A simple store web application deployed in Blogspot platform.</p>
            <a href="#1" className="project-view-detail">View detail</a>
          </div>  
        </div>
        <div className="project-item">
          <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhxFcH84XTJCKoj06QzhsQoJsri1ANz6dZxqlyngvaTd3umzpKSe5lno6GWUICDk-ZrBH2J0r-1nHZfH4KXShn3UCyDOeKNJkbi4QUJeE1-_U9YRRa5YjpGDfQPizqxqAyO0FUi1Bw0q2icG3KE4t2FVWOCYgunqF8ZjVzx0iyzFzkxdw-D1EsZAJrv7Q/s16000/Line98.jpg" alt="project 2" className="project-img"/>
          <div className="project-body">
            <h3 className="project-heading">Project 2</h3>
            <p className="project-brief-desc">Project description 2</p>
            <a href="#1" className="project-view-detail">View detail</a>
          </div>  
        </div>
        <div className="project-item">
          <img src="https://www.w3schools.com/w3images/sanfran.jpg" alt="project 3" className="project-img"/>
          <div className="project-body">
            <h3 className="project-heading">Project 3</h3>
            <p className="project-brief-desc">Project description 3</p>
            <a href="#1" className="project-view-detail">View detail</a>
          </div>  
        </div>
        <div class="project-item">
          <img src="https://www.w3schools.com/w3images/sanfran.jpg" alt="project 3" className="project-img"/>
          <div className="project-body">
            <h3 className="project-heading">Project 4</h3>
            <p className="project-brief-desc">Project description 4</p>
            <a href="#1" className="project-view-detail">View detail</a>
          </div>  
        </div>
      </div>
    </div>
  );
}

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

function CV() {
  return (
    <div className="cv-container">
      <h2>Hello world</h2>
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
              <Route path="/projs" element={<Projects/>} />
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
    case "LOAD_ROOT_FAIL":
    case "LOAD_HOME_FAIL":
      alert(JSON.stringify(action));
      return Object.assign(
        {},
        state,
        {
        }
      );

    case "LOAD_ROOT_SUCCESS":
      obj = JSON.parse(action.payload.data.content);
      return Object.assign(
        {},
        state,
        obj
      );
      
    case "LOAD_HOME_SUCCESS":
      obj = JSON.parse(action.payload.data.content);
      return Object.assign(
        {},
        state,
        {
           homePage: obj
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

