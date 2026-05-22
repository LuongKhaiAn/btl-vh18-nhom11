import React, { useState } from "react";
import { Bed, Globe2, Car, Plane, ChevronRight } from "lucide-react";
import DataBase from "../../DataBase.json";

const ServiceSection = ({ onNavigate }) => {
  const [_selectedService, setSelectedService] = useState(null);

  const services = [
    {
      key: "hotels",
      icon: <Bed />,
      title: "Khách sạn",
      description: "Nghỉ dưỡng cao cấp",
      data: DataBase.hotels.slice(0, 1),
    },
    {
      key: "tours",
      icon: <Globe2 />,
      title: "Du lịch",
      description: "Tour trọn gói",
      data: DataBase.tours.slice(0, 1),
    },
    {
      key: "cars",
      icon: <Car />,
      title: "Xe tự lái",
      description: "Tự do khám phá",
      data: DataBase.cars.slice(0, 1),
    },
    {
      key: "flights",
      icon: <Plane />,
      title: "Máy bay",
      description: "Bay tiện lợi",
      data: DataBase.flights.slice(0, 1),
    },
  ];

  const handleViewMore = (serviceKey) => {
    setSelectedService(serviceKey);
    onNavigate?.(serviceKey);
  };

  return (
    <section className="service-section" id="services">
      <h2 className="section-heading">Dịch Vụ Của Chúng Tôi</h2>
      <p className="section-subtitle">
        Đa dạng lựa chọn cho mọi hành trình, từ nghỉ dưỡng đến phiêu lưu
      </p>
      <div className="service-grid">
        {services.map((service) => (
          <article className="service-card" key={service.key}>
            <div className="service-card-top">
              {service.data.length > 0 && (
                <img
                  src={service.data[0].image}
                  alt={service.title}
                  className="service-card-image"
                />
              )}
              <div className="service-icon">{service.icon}</div>
            </div>
            <div className="service-card-body">
              <h3 className="service-card-title">{service.title}</h3>
              <p className="service-card-text">{service.description}</p>
              <button
                className="service-view-btn"
                onClick={() => handleViewMore(service.key)}
              >
                Xem thêm
                <ChevronRight size={18} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ServiceSection;
