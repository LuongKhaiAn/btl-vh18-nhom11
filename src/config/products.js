import { ROUTES } from "./pages";

export const API_BASE = "http://localhost:9999";

export const PRODUCT_TYPES = {
  hotels: {
    api: "hotels",
    listPath: ROUTES.hotels,
    bookLabel: "Đặt phòng ngay",
    detailLabel: "Chi tiết khách sạn",
  },
  tours: {
    api: "tours",
    listPath: ROUTES.tours,
    bookLabel: "Đặt tour ngay",
    detailLabel: "Chi tiết tour",
  },
  cars: {
    api: "cars",
    listPath: ROUTES.cars,
    bookLabel: "Thuê xe ngay",
    detailLabel: "Chi tiết xe",
  },
  flights: {
    api: "flights",
    listPath: ROUTES.flights,
    bookLabel: "Đặt vé ngay",
    detailLabel: "Chi tiết chuyến bay",
  },
};

export const getProductDetailPath = (productKey, id) =>
  `${PRODUCT_TYPES[productKey].listPath}/${id}`;

const getDaysBetween = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return 0;
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 0;
};

export const calculateTotalPrice = (
  item,
  productKey,
  { checkIn, checkOut, numberOfPeople, flightClass },
) => {
  if (!item) return 0;

  if (productKey === "cars") {
    const days = getDaysBetween(checkIn, checkOut) || 1;
    const tier =
      item.pricing?.find(
        (p) =>
          days >= p.minDays &&
          (p.maxDays == null || days <= p.maxDays),
      ) ?? item.pricing?.[item.pricing.length - 1];
    return (tier?.pricePerDay ?? item.priceFrom) * days;
  }

  if (productKey === "flights") {
    const people = numberOfPeople || 1;
    const tiered = item.pricing?.filter((p) => p.minPeople != null);
    let tier = item.pricing?.find((p) => p.class === flightClass);
    if (tiered?.length) {
      tier =
        tiered.find(
          (p) => people >= p.minPeople && people <= p.maxPeople,
        ) ?? tiered[tiered.length - 1];
    } else if (!tier) {
      tier = item.pricing?.[0];
    }
    const unit = tier?.pricePerPerson ?? tier?.price ?? item.priceFrom;
    return unit * people;
  }

  const people = numberOfPeople || 1;
  const tier =
    item.pricing?.find(
      (p) => people >= p.minPeople && people <= p.maxPeople,
    ) ?? item.pricing?.[item.pricing.length - 1];

  return (tier?.pricePerPerson ?? item.priceFrom) * people;
};
