import DragDropArea from "./Views/DragDropArea/DragDropArea";
import Dashboard from "./Views/Dashboard/DashBoard";
import menuCRUD from "./Views/MenuCRUD/menuCRUD";
import contetCRUD from "./Views/ContentCRUD/ContentCRUD";
import carouselCRUD from "./Views/CarouselCRUD/CarouselCRUD";
import pageCRUD from "./Views/PageCRUD/PageCRUD";

const routes = [
  { path: "/", exact: true, name: "Home", component: Dashboard },
  { path: "/page", name: "PageCRUD", component: pageCRUD },
  { path: "/drag", name: "DragDropArea", component: DragDropArea },
  { path: "/menu", name: "menuCRUD", component: menuCRUD },
  { path: "/carousel", name: "carouselCRUD", component: carouselCRUD },
  { path: "/content", name: "contentCRUD", component: contetCRUD },
];

export default routes;
