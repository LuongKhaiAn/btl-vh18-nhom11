export const ROUTES = {
  home: "/",
  hotels: "/khach-san",
  tours: "/du-lich",
  cars: "/xe-tu-lai",
  flights: "/may-bay",
  myTickets: "/ve-cua-toi",
  myTicketsPending: "/ve-cua-toi/cho-thanh-toan",
  myTicketsPaid: "/ve-cua-toi/da-thanh-toan",
  myTicketsCancelled: "/ve-cua-toi/da-huy",
};

export const MY_TICKET_TABS = [
  { status: "Chờ thanh toán", slug: "cho-thanh-toan", path: ROUTES.myTicketsPending },
  { status: "Đã thanh toán", slug: "da-thanh-toan", path: ROUTES.myTicketsPaid },
  { status: "Đã hủy", slug: "da-huy", path: ROUTES.myTicketsCancelled },
];

export const getTicketTabBySlug = (slug) =>
  MY_TICKET_TABS.find((tab) => tab.slug === slug);

export const isMyTicketsPath = (pathname) =>
  pathname === ROUTES.myTickets || pathname.startsWith(`${ROUTES.myTickets}/`);

const PRODUCT_LIST_PATHS = [
  ROUTES.hotels,
  ROUTES.tours,
  ROUTES.cars,
  ROUTES.flights,
];

export const isProductPath = (pathname) =>
  PRODUCT_LIST_PATHS.some(
    (base) => pathname === base || pathname.startsWith(`${base}/`),
  );

export const NAV_ITEMS = [
  { label: "Trang chủ", path: ROUTES.home },
  { label: "Khách sạn", path: ROUTES.hotels },
  { label: "Du lịch", path: ROUTES.tours },
  { label: "Xe tự lái", path: ROUTES.cars },
  { label: "Máy bay", path: ROUTES.flights },
];

export const SERVICE_PATHS = {
  hotels: ROUTES.hotels,
  tours: ROUTES.tours,
  cars: ROUTES.cars,
  flights: ROUTES.flights,
};

export const LIGHT_HEADER_PATHS = [
  ROUTES.hotels,
  ROUTES.tours,
  ROUTES.cars,
  ROUTES.flights,
  ROUTES.myTickets,
  ROUTES.myTicketsPending,
  ROUTES.myTicketsPaid,
  ROUTES.myTicketsCancelled,
];

export const PAGE_META = {
  home: { title: "Trang chủ" },
  hotels: { title: "Khách sạn", dataKey: "hotels" },
  tours: { title: "Du lịch", dataKey: "tours" },
  cars: { title: "Xe tự lái", dataKey: "cars" },
  flights: { title: "Máy bay", dataKey: "flights" },
  "my-tickets": { title: "Vé của tôi" },
};

export const getNavLabelByPath = (pathname) =>
  NAV_ITEMS.find((item) => item.path === pathname)?.label ?? null;
