import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from 'react-router-dom';
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
          <img src="static/img/CaKiengPhongThuy.jpg" alt="CaKiengPhongThuy" className="project-img"/>
          <div className="project-body">
            <h3 className="project-heading">Simple Store</h3>
            <p className="project-brief-desc">A simple store web application deployed in Blogspot platform.</p>
            <a href="#1" className="project-view-detail">View detail</a>
          </div>  
        </div>
        <div className="project-item">
          <img src="https://www.w3schools.com/w3images/paris.jpg" alt="project 2" className="project-img"/>
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

function HomePage() {
  return (
    <div className="content-section">
      <h2 className="section-heading">Huy Pham</h2>
      <p className="section-sub-heading">I love software engineering.</p>
      <img className="about-photo" src="https://avatars.githubusercontent.com/u/44170390?v=4" alt="huypham"/>
      <p className="about-content">I'm an experienced software engineer who constantly seeks out solutions to software and firmware problems. In my 7 years in this industry, I have honed my analyst, design and coding skills. I love software engineering, I have 3.5 years experience in software developing and 3.5 years in firmware developing, I also have experience in software, firmware porting. My current goal is becoming a technical architecture to have more chance to analyze and design, I also implement some simple projects to fulfill my goal. You can explore my projects on projects page.</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div id="main">
        <div id="header">
          {/* Begin: nav */}
          <nav style={{display: "inline-block"}}><ul id="nav">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/projs">Projects</Link></li>
            <li><a href="#1">Blogs</a></li>
            <li><Link to="/contact">Contact</Link></li>
            <li>
              <a href="#1">
                More
                <i className="nav-expanding-arrow"></i>
              </a>
              <ul className="subnav">
                <li><a href="#1">CV</a></li>
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
            <Route path="/contact" element={<Contact/>} />
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

ReactDOM.render(<App />, document.getElementById('root'));

