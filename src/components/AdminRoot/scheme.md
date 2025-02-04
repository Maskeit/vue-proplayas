src/
└── components/
    └── AdminRoot/
        ├── Crud/
        │   ├── CrudHeader.vue      // Encabezado del CRUD: título, botón de "Nuevo", buscador, filtros
        │   ├── CrudTable.vue       // Tabla que muestra el listado de registros
        │   ├── CrudTableRow.vue    // (Opcional) Cada fila de la tabla (especialmente si la lógica es compleja)
        │   ├── CrudForm.vue        // Formulario para crear/editar un registro
        │   ├── CrudModal.vue       // Modal para mostrar el formulario o confirmación de eliminación
        │   └── CrudActions.vue     // (Opcional) Componentes o botones para acciones como editar y eliminar
        └── Card.vue                // Otros componentes de AdminRoot (como tarjetas informativas, etc.)