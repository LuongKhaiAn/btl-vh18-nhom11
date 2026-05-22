import React from "react";
import { Bed, Globe2, Car, Plane } from "lucide-react";

const services = [
  {
    icon: <Bed />,
    title: "Khách sạn",
    description: "Nghỉ dưỡng cao cấp",
  },
  {
    icon: <Globe2 />,
    title: "Du lịch",
    description: "Tour trọn gói",
  },
  {
    icon: <Car />,
    title: "Xe tự lái",
    description: "Tự do khám phá",
  },
  {
    icon: <Plane />,
    title: "Máy bay",
    description: "Bay tiện lợi",
  },
];

const ServiceSection = () => {
  return (
    <section className="service-section" id="services">
      <h2 className="section-heading">Dịch Vụ Của Chúng Tôi</h2>
      <p className="section-subtitle">
        Đa dạng lựa chọn cho mọi hành trình, từ nghỉ dưỡng đến phiêu lưu
      </p>
      <div className="service-grid">
        {services.map((service) => (
          <article className="service-card" key={service.title}>
            <div className="service-card-top">
              <div className="service-icon">{service.icon}</div>
            </div>
            <div className="service-card-body">
              <h3 className="service-card-title">{service.title}</h3>
              <p className="service-card-text">{service.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ServiceSection;