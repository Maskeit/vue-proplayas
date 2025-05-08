import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { decodeJWT } from "@/services/system";
import Cookies from "js-cookie";
// Layouts 
import AdminRootLayout from "@layout/AdminRootLayout.vue";
import AdminNodoLayout from "@layout/AdminNodoLayout.vue";
import BlankLayout from "@layout/BlankLayout.vue";
import UserLayout from "@layout/UserLayout.vue";
import PublicLayout from "@layout/PublicLayout.vue";
// paginas
import NodosPrivadoRoot from "@view/adminRoot/NodosPrivado.vue";
import NodoPrivadoRoot from "@view/adminRoot/NodoPrivado.vue";
import Users from "@view/adminRoot/Users.vue";
//import AdminRootCMS from "@view/adminRoot/CMS.vue"; //vista

import NodoPrivado from "@view/adminNodo/NodoPrivado.vue";
//import AdminNodoCMS from "@/views/adminNodo/CMS.vue"; //vista

import Profile from "@view/user/Profile.vue";
import UserCMS from "@view/user/CMS.vue"; //vista

// paginas publicas 
import Login from "@view/public/Login.vue";
import Register from "@view/Public/Register.vue";
import RecoverPassword from "@view/Public/RecoverPassword.vue";
import SetPassword from "@view/Public/SetPassword.vue";
import Home from "@view/public/Home.vue";
import NodosPublico from "@view/public/NodosPublico.vue";
import NodoPublico from "@view/public/NodoPublico.vue";
import PublicProfile from "@view/public/PublicProfile.vue";
import Content from "@view/public/Content.vue";
import History from "@view/public/History.vue";
// Components para CMS
import WebinarsCMS from "@components/shared/CMS/Webinars.vue";
import LibrosCMS from "@components/shared/CMS/Libros.vue";
import WebSeriesCMS from "@components/shared/CMS/WebSeries.vue";
import ArticulosCMS from "@components/shared/CMS/Articulos.vue";
import ProyectosCMS from "@components/shared/CMS/Proyectos.vue";

//Panel de contenido dinamico
import Articulos from "@components/Public/Content/Articulos.vue";
import Libros from "@components/Public/Content/Libros.vue";
import WebSeries from "@components/Public/Content/WebSeries.vue";
import Webinars from "@components/Public/Content/Webinars.vue";
import Proyects from "@components/Public/Content/Proyectos.vue";

const generateCmsRoutes = (): Array<RouteRecordRaw> => [
  { path: '', name: '', component: WebinarsCMS },
  { path: '/User/Content/Webinar', name: 'CMSWebinar', component: WebinarsCMS },
  { path: '/User/Content/Libros', name: 'CMSLibros', component: LibrosCMS },
  { path: '/User/Content/WebSeries', name: 'CMSWebSeries', component: WebSeriesCMS },
  { path: '/User/Content/Articulos', name: 'CMSArticulos', component: ArticulosCMS },
  { path: '/User/Content/Proyectos', name: 'CMSProyectos', component: ProyectosCMS },
];

const contentPanels = (): Array<RouteRecordRaw> => [
  { path: '', name:'', component: Webinars },
  { path: 'articulos', name: 'Articulos', component: Articulos },
  { path: 'webinars', name: 'Webinars', component: Webinars },
  { path: 'libros', name: 'Libros', component: Libros },
  { path: 'webseries', name: 'WebSeries', component: WebSeries },
  { path: 'proyectos', name: 'Proyectos', component: Proyects },
];

// Rutas para administradores_root
const adminRootRoutes: Array<RouteRecordRaw> = [
  {
    path: 'nodos',
    name: 'CrudRoot',
    component: NodosPrivadoRoot,
    meta: { requiresAuth: true, role: "admin" },

  },
  {
    path: 'nodo/:code', // Ruta dinámica con el código del nodo
    name: '',
    component: NodoPrivadoRoot,
    props: true, // Permite pasar el código del nodo como prop
    meta: { requiresAuth: true, role: "admin" },
  },
  {
    path: 'users',
    name: 'Users',
    component: Users,
    meta: { requiresAuth: true, role: "admin" },
  }
  // {
  //   path: '',
  //   component: AdminRootCMS,
  //   children: generateCmsRoutes('root'),
  //   meta: { requiresAuth: true, role: "admin" },
  // },
];
// Rutas para administradores de nodo
const nodeLeaderRoutes: Array<RouteRecordRaw> = [
  {
    path: '/lider/:code',
    name: 'NodoDetalleNodeLeader',
    component: NodoPrivado,
    props: true,
    meta: { requiresAuth: true, role: "node_leader" },
  },
  // {
  //   path: '',
  //   component: AdminNodoCMS,
  //   children: generateCmsRoutes('lider'),
  // },
];
// Rutas para usuarios normales
const userRoutes: Array<RouteRecordRaw> = [
  {
    path: 'Profile',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/User/Content',
    component: UserCMS,
    children: generateCmsRoutes(),
  },
];
const blankPages = [
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/RecoverPassword', component: RecoverPassword },
  { path: '/SetPassword', component: SetPassword },
  { path: '/:pathMatch(.*)*', component: BlankLayout }, // Para cualquier ruta que no coincida con las anteriores
  { path: '', redirect: { name: 'Login' } }, // Para redireccionar a /login al inicio de la app.
]
const publicRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: { name: 'Home' } // Redirige el path vacío a Home
  },
  {
    path: '/Content',
    component: Content,
    children: contentPanels(),
  },
  {
    path: "/Home",
    name: "Home",
    component: Home,
  },
  {
    path: "/History",
    name: "History",
    component: History,
  },
  {
    path: '/Nodos',
    name: 'Nodos',
    component: NodosPublico,
  },
  {
    path: '/nodo/:code', // Ruta dinámica con el código del nodo
    name: 'NodoPublico',
    component: NodoPublico,
    props: true, // Permite pasar el código del nodo como prop
    meta: { requiresAuth: false }, // No requiere autenticación
  },
  {
    path: "/:username",
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
    path: '/lider',
    component: AdminNodoLayout,
    children: nodeLeaderRoutes,
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

router.beforeEach((to, from, next) => {
  const token = Cookies.get("Authorization") || localStorage.getItem("Authorization");

  // Si el token no existe y la ruta NO requiere autenticación, permitir acceso
  if (!token) {
    if (!to.meta.requiresAuth) {
      return next();
    }
    console.warn("No hay token válido, redirigiendo al login.");
    return next({ path: "/Login" });
  }

  const decodedData = decodeJWT(token);

  // Si el token es inválido, también redirigir al Login
  if (!decodedData) {
    console.warn("Token inválido, redirigiendo al Login.");
    return next({ path: "/Login" });
  }

  // Si la ruta requiere autenticación y no hay usuario autenticado, redirigir
  if (to.meta.requiresAuth && !decodedData) {
    console.warn("Intento de acceso sin autenticación.");
    return next({ path: "/Login" });
  }

  // Verificar si el rol del usuario coincide con la meta de la ruta
  if (to.meta.role && to.meta.role !== decodedData.role) {
    console.warn(`Acceso denegado: se requiere rol '${to.meta.role}', pero el usuario tiene '${decodedData.role}'`);
    return next({ path: "/Login" });
  }

  next(); // Permitir acceso si todas las validaciones pasan
});


export default router;