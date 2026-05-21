import "../../App.css";

// Danh sach link hien thi tren thanh dieu huong.
const navItems = ["Trang chu", "Dich vu", "Uu dai", "Lien he"];

const Navbar = () => {
  return (
    <header className="navbar">
      <a className="brand" href="#home" aria-label="VietJourney home">
        <span className="brandMark">VJ</span>
        <span>VietJourney</span>
      </a>

      <nav className="navLinks" aria-label="Main navigation">
        {navItems.map((item) => (
          <a key={item} href={`#${item.toLowerCase().replaceAll(" ", "-")}`}>
            {item}
          </a>
        ))}
      </nav>

      <button className="navButton" type="button">
        Dat lich
      </button>
    </header>
  );
};

export default Navbar;
