import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

// Layouts 
import AdminRootLayout from "@layout/AdminRootLayout.vue";
import AdminNodoLayout from "@layout/AdminNodoLayout.vue";
import BlankLayout from "@layout/BlankLayout.vue";
import UserLayout from "@layout/UserLayout.vue";
import PublicLayout from "@layout/PublicLayout.vue";
// paginas
import AdminRootCrud from "@view/adminRoot/Crud.vue";
import AdminRootCMS from "@view/adminRoot/CMS.vue"; //vista

import AdminNodoCrud from "@view/adminNodo/Crud.vue";
import AdminNodoCMS from "@/views/adminNodo/CMS.vue"; //vista

import Profile from "@view/user/Profile.vue";
import UserCMS from "@view/user/CMS.vue"; //vista

// paginas publicas 
import Login from "@view/public/Login.vue";
import Register from "@view/public/Register.vue";
import Home  from "@view/public/Home.vue";

import PublicProfile from "@view/public/PublicProfile.vue";
// Components para CMS
import WebinarsCMS from "@components/shared/CMS/Webinars.vue";
import LibrosCMS from "@components/shared/CMS/Libros.vue";
import WebSeriesCMS from "@components/shared/CMS/WebSeries.vue";
import ArticulosCMS from "@components/shared/CMS/Articulos.vue";


const generateCmsRoutes = (prefix: string): Array<RouteRecordRaw> => [
  { path: 'Webinar', name: `${prefix}CMSWebinar`, component: WebinarsCMS },
  { path: 'Libros', name: `${prefix}CMSLibros`, component: LibrosCMS },
  { path: 'WebSeries', name: `${prefix}CMSWebSeries`, component: WebSeriesCMS },
  { path: 'Articulos', name: `${prefix}CMSArticulos`, component: ArticulosCMS },
];

// Rutas para administradores_root
const adminRootRoutes: Array<RouteRecordRaw> = [
  {
    path: 'nodos',
    name: 'CrudRoot',
    component: AdminRootCrud,
  },
  {
    path: '',
    component: AdminRootCMS,
    children: generateCmsRoutes('root'),
  },
];

// Rutas para usuarios normales
const userRoutes: Array<RouteRecordRaw> = [
  {
    path: 'Profile',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '',
    component: UserCMS,
    children: generateCmsRoutes('user'),
  },
];

// Rutas para administradores de nodo
const adminNodoRoutes: Array<RouteRecordRaw> = [
  {
    path: '',
    name: 'CrudNodo',
    component: AdminNodoCrud,
    props: (route) => ({ node_id: route.params.node_id }),
  },
  {
    path: '',
    component: AdminNodoCMS,
    children: generateCmsRoutes('nodo'),
  },
];


const blankPages = [
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/:pathMatch(.*)*', component: BlankLayout }, // Para cualquier ruta que no coincida con las anteriores
  { path: '', redirect: { name: 'Login' } }, // Para redireccionar a /login al inicio de la app.
]

const publicRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: { name: 'Home' } // Redirige el path vacío a Home
  },
  {
    path: "/Home",
    name: "Home",
    component: Home,
  },
  {
    path: "profile/:username",
    name: "PublicProfile",
    component: PublicProfile,
    props: true,
  },
  { 
    path: '/:pathMatch(.*)*', 
    redirect: { name: 'Home' } // Redirige cualquier ruta no encontrada a Home
  }
];

const routes: Array<RouteRecordRaw> = [
  {
    path: '/User',
    component: UserLayout,
    children: userRoutes,
    //meta: { requiresAuth: true },
  },
  {
    path: '/root',
    component: AdminRootLayout,
    children: adminRootRoutes,
  },
  {
    path: '/nodo/:node_id',
    component: AdminNodoLayout,
    children: adminNodoRoutes,
  },
  {
    path: '/login',
    component: BlankLayout,
    children: blankPages,
  },
  {
    path: '/',
    component: PublicLayout,
    children: publicRoutes,
  },

];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

// ✅ Middleware para restringir el perfil privado solo a usuarios autenticados
// router.beforeEach((to, from, next) => {
//   const isAuthenticated = !!localStorage.getItem("authToken"); // Simulación de autenticación
//   if (to.meta.requiresAuth && !isAuthenticated) {
//     next({ name: "Login" });
//   } else {
//     next();
//   }
// });

export default router;