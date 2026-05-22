export const NAV_ITEMS = [
  { label: "Trang chủ", page: "home" },
  { label: "Khách sạn", page: "hotels" },
  { label: "Du lịch", page: "tours" },
  { label: "Xe tự lái", page: "cars" },
  { label: "Máy bay", page: "flights" },
];

export const PAGE_META = {
  home: { title: "Trang chủ" },
  hotels: { title: "Khách sạn", dataKey: "hotels" },
  tours: { title: "Du lịch", dataKey: "tours" },
  cars: { title: "Xe tự lái", dataKey: "cars" },
  flights: { title: "Máy bay", dataKey: "flights" },
  "my-tickets": { title: "Vé của tôi" },
};

export const getNavLabelByPage = (page) =>
  NAV_ITEMS.find((item) => item.page === page)?.label ?? null;
