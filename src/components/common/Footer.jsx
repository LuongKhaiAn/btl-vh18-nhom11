import React from "react";
import { Plane, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="footer-block">
      <div className="footer-inner">
        <div className="footer-column">
          <a className="footer-logo" href="#">
            <span className="footer-logo-icon" aria-hidden="true">
              <Plane />
            </span>
            <span className="footer-logo-text">TravelGo</span>
          </a>
          <p className="footer-copy">
            Nền tảng đặt vé du lịch hàng đầu Việt Nam, mang đến trải nghiệm sang trọng và tiện lợi cho hành trình của bạn.
          </p>
        </div>

        <div className="footer-column">
          <h3 className="footer-title">Liên hệ</h3>
          <p className="footer-text">
            <Phone className="footer-icon" /> 1900 1234
          </p>
          <p className="footer-text">
            <Mail className="footer-icon" /> support@travelgo.vn
          </p>
        </div>

        <div className="footer-column">
          <h3 className="footer-title">Dịch vụ</h3>
          <ul className="footer-list">
            <li>Đặt phòng khách sạn</li>
            <li>Tour du lịch</li>
            <li>Thuê xe tự lái</li>
            <li>Vé máy bay</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
