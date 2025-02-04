src/
├── assets/
├── components/         // Componentes reutilizables (botones, inputs, etc.)
├── layouts/            // Layouts específicos para cada rol
│   ├── AdminRootLayout.vue       // Para administradores_root
│   ├── AdminNodoLayout.vue       // Para administradores_nodo
│   ├── NodoUserLayout.vue        // Para usuarios pertenecientes a nodos (si requieren un layout especial)
│   └── PublicLayout.vue          // Para usuarios de visita común
├── views/              // Vistas o páginas agrupadas por secciones
│   ├── adminRoot/      // Vistas exclusivas para administradores_root
│   ├── adminNodo/      // Vistas para administradores_nodo
│   ├── user/           // Vistas para usuarios de nodos
│   └── public/         // Vistas para usuarios sin privilegios
├── router/             // Configuración del router
│   └── index.ts
└── main.ts

Administrador Raíz
- Tener listo el rol y autenticacion
- CRUD Nodos
- CRUD para publicaciones