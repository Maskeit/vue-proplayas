import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

// Layouts 
import AdminRootLayout from "../layouts/AdminRootLayout.vue";
import AdminNodoLayout from "../layouts/AdminNodoLayout.vue";
// paginas
import AdminRootCrud from "../views/adminRoot/Crud.vue";
import AdminRootCMS from "../views/adminRoot/CMS.vue";

import AdminNodoCrud from "../views/adminNodo/Crud.vue";
import AdminNodoCMS from "../views/adminNodo/CMS.vue";

// Components para CMS
import WebinarsCMS from "../components/AdminRoot/CMS/Webinars.vue";
import LibrosCMS from "../components/AdminRoot/CMS/Libros.vue";
import WebSeriesCMS from "../components/AdminRoot/CMS/WebSeries.vue";
import ArticulosCMS from "../components/AdminRoot/CMS/Articulos.vue";

// Rutas para administradores_root
const adminRootRoutes: Array<RouteRecordRaw> = [
  {
    path: 'Crud',
    name: 'CrudRoot',
    component: AdminRootCrud,
  },
  {
    path: 'CMS',
    name: 'CMSRoot',
    component: AdminRootCMS,
    children: [
      { path: 'Webinar', name: 'CMSRootWebinar', component: WebinarsCMS }, // ✅ Asegurar que es CMSRootWebinar
      { path: 'Libros', name: 'CMSRootLibros', component: LibrosCMS },
      { path: 'WebSeries', name: 'CMSRootWebSeries', component: WebSeriesCMS },
      { path: 'Articulos', name: 'CMSRootArticulos', component: ArticulosCMS },
      { path: '', redirect: { name: 'CMSRootWebinar' } }, // ✅ Ahora referencia al nombre correcto
    ],
  }
];
const adminNodoRoutes: Array<RouteRecordRaw> = [
  {
    path: '',
    name: 'CrudNodo',
    component: AdminNodoCrud,
    props: (route) => ({ node_id: route.params.node_id })
  },
  {
    path: 'CMS',
    component: AdminNodoCMS,
    children: [
      { path: 'Webinar', name: 'CMSNodoWebinar', component: WebinarsCMS },
      { path: 'Libros', name: 'CMSNodoLibros', component: LibrosCMS },
      { path: 'WebSeries', name: 'CMSNodoWebSeries', component: WebSeriesCMS },
      { path: 'Articulos', name: 'CMSNodoArticulos', component: ArticulosCMS },
      { path: '', redirect: { name: 'CMSNodoWebinar' } }
    ]
  }
];

const routes: Array<RouteRecordRaw> = [
  {
    path: '/root',
    component: AdminRootLayout,
    children: adminRootRoutes, // 🔹 Esta ruta NO requiere `props: true`
  },
  {
    path: '/nodo/:node_id',
    component: AdminNodoLayout,
    children: adminNodoRoutes,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;