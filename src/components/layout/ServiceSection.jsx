import "../../App.css";

// Du lieu cho 4 the dich vu tren trang home.
const services = [
  {
    id: 1,
    icon: "🏨",
    title: "Khách sạn",
    description: "Nghỉ dưỡng cao cấp",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    icon: "✈️",
    title: "Du lịch",
    description: "Tour trọn gói",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    icon: "🚗",
    title: "Xe tự lái",
    description: "Tự do khám phá",
    image: "https://images.unsplash.com/photo-1533473359331-35acda7ce341?w=600&h=400&fit=crop",
  },
  {
    id: 4,
    icon: "✈️",
    title: "Máy bay",
    description: "Bay tiện lợi",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop",
  },
];

const ServiceSection = () => {
  return (
    <section className="services" id="dich-vu">
      <div className="sectionHeader">
        <h2 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
          Dịch Vụ Của Chúng Tôi
        </h2>
        <p style={{ color: "#6b7280", fontSize: "1rem" }}>
          Đa dạng lựa chọn cho mọi hành trình, từ nghỉ dưỡng đến phiêu lưu
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "2rem",
          padding: "3rem 0",
        }}
      >
        {/* Render tung the dich vu tu mang services. */}
        {services.map((service) => (
          <article
            key={service.id}
            style={{
              borderRadius: "0.75rem",
              overflow: "hidden",
              cursor: "pointer",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
            }}
          >
            {/* Image container */}
            <div
              style={{
                position: "relative",
                height: "250px",
                overflow: "hidden",
                backgroundColor: "#f3f4f6",
              }}
            >
              <img
                src={service.image}
                alt={service.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              />
              {/* Icon badge */}
              <div
                style={{
                  position: "absolute",
                  bottom: "1rem",
                  left: "1rem",
                  width: "48px",
                  height: "48px",
                  backgroundColor: "#fbbf24",
                  borderRadius: "0.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                }}
              >
                {service.icon}
              </div>
            </div>

            {/* Content */}
            <div style={{ padding: "1.5rem", backgroundColor: "white" }}>
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  color: "#1f2937",
                  marginBottom: "0.5rem",
                }}
              >
                {service.title}
              </h3>
              <p
                style={{
                  color: "#6b7280",
                  fontSize: "0.95rem",
                }}
              >
                {service.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ServiceSection;
