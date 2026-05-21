import "../../App.css";

// Footer xanh navy dung chung cho trang home.
const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <h2>VietJourney</h2>
        <p>Kết nối hành trình nghỉ dưỡng, di chuyển và trải nghiệm Việt Nam.</p>
      </div>

      <div className="footerLinks">
        <a href="#dich-vu">Dịch vụ</a>
        <a href="#uu-dai">Ưu đãi</a>
        <a href="#lien-he">Liên hệ</a>
      </div>
    </footer>
  );
};

export default Footer;
