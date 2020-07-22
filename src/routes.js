import DragDropArea from "./Views/DragDropArea/DragDropArea";
import Dashboard from "./Views/Dashboard/DashBoard";
import menuCRUD from "./Views/MenuCRUD/menuCRUD";
import contetCRUD from "./Views/ContentCRUD/ContentCRUD";
import carouselCRUD from "./Views/CarouselCRUD/CarouselCRUD";
import pageCRUD from "./Views/PageCRUD/PageCRUD";

const routes = [
  { path: "/", exact: true, name: "Home", component: Dashboard },
  { path: "/page", name: "Sayfa Ekle", component: pageCRUD },
  { path: "/drag", name: "DragDropArea", component: DragDropArea },
  { path: "/menu", name: "Menü Ekle", component: menuCRUD },
  { path: "/carousel", name: "Slider Ekle", component: carouselCRUD },
  { path: "/content", name: "İçerik Ekle", component: contetCRUD },
];

export default routes;
