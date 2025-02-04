import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

// Layouts 
import AdminRootLayout from "../layouts/AdminRootLayout.vue";
import AdminRootCrud from "../views/adminRoot/Crud.vue";
import AdminRootCMS from "../views/adminRoot/CMS.vue";
import WebinarsCMS from "../components/AdminRoot/CMS/Webinars.vue";
import LibrosCMS from "../components/AdminRoot/CMS/Libros.vue";
import WebSeriesCMS from "../components/AdminRoot/CMS/WebSeries.vue";
import ArticulosCMS from "../components/AdminRoot/CMS/Articulos.vue";

// Rutas para administradores_root
const adminRootRoutes: Array<RouteRecordRaw> = [
  {
    path: 'Crud',
    name: 'Crud',
    component: AdminRootCrud,
  },
  {
    path: 'CMS',
    name: 'CMS',
    component: AdminRootCMS,
    children: [
      {
        path: 'Webinar',
        name: 'CMSWebinar',
        component: WebinarsCMS,
      },
      {
        path: 'Libros',
        name: 'CMSLibros',
        component: LibrosCMS,
      },
      {
        path: 'WebSeries',
        name: 'CMSWebSeries',
        component: WebSeriesCMS,
      },
      {
        path: 'Articulos',
        name: 'CMSArticulos',
        component: ArticulosCMS,
      },
      // Ruta por defecto en el CMS (por ejemplo, mostrar Webinars)
      {
        path: '',
        redirect: { name: 'CMSWebinar' },
      },
    ],
  }
]

const routes: Array<RouteRecordRaw> = [
  {
    path: '/root',
    component: AdminRootLayout,
    children: adminRootRoutes,
  },
  // Otras rutas o redirecciones
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'Crud' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;