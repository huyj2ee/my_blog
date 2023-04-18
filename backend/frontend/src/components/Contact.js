import React from 'react';

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

export default Contact;