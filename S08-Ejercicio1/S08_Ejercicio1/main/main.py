import reflex as rx
from typing import List

# --- Datos de ejemplo para las tareas ---
# (Estos datos simulan lo que tendríamos en un tablero real)
tareas_pendientes = [
    {"titulo": "Revisar la Guía N° 08", "estado": "Pendiente"},
    {"titulo": "Hacer el ejercicio 1", "estado": "Pendiente"},
]

tareas_en_progreso = [
    {"titulo": "Estudiar componentes de Reflex", "estado": "En Progreso"},
]

tareas_completadas = [
    {"titulo": "Instalar Reflex", "estado": "Completada"},
    {"titulo": "Leer la introducción de la guía", "estado": "Completada"},
]

# --- 1. Clase de Estado (State) ---
class KanbanState(rx.State):
    """Estado para manejar el filtro del tablero Kanban."""
    
    # a) Variable de estado para controlar el filtro 
    mostrar_solo_pendientes: bool = False

    # b) Método para el botón "Mostrar Pendientes"
    def mostrar_pendientes(self):
        """Activa el filtro para ver solo tareas pendientes."""
        self.mostrar_solo_pendientes = True

    def mostrar_todas(self):
        """Desactiva el filtro y muestra todas las tareas."""
        self.mostrar_solo_pendientes = False

# --- 2. Componentes de la Interfaz ---

def tarjeta_tarea(tarea: dict):
    """Componente para mostrar una sola tarjeta de tarea."""
    return rx.box(
        rx.text(tarea["titulo"], font_weight="bold", color="#5d1725"), # Texto más oscuro
        rx.text(f"Estado: {tarea['estado']}", font_size="0.8em", color="#8c3e53"),
        
        # --- Estilos de la Tarjeta ---
        bg="#ffebf0",  # Fondo de tarjeta
        border="1px solid #ffb6c1", # Borde para contraste
        border_radius="5px", # Estilo de borde
        padding="10px",      # Estilo de margen interno
        margin_y="5px",      # Estilo de margen externo
        width="100%"
    )

def columna_kanban(nombre: str, tareas: List[dict]):
    """Componente para una columna (Pendiente, En Progreso, etc.)."""
    
    # --- c) Lógica de Filtrado ---
    
    # 1. Creamos el componente para "todas las tareas"
    todas_las_tareas_componente = rx.vstack(
        [tarjeta_tarea(t) for t in tareas],
        align_items="stretch",
        width="100%"
    )
    
    # 2. Creamos la lista filtrada (esto sí es Python normal)
    tareas_pendientes_filtradas = [t for t in tareas if t["estado"] == "Pendiente"]
    
    # 3. Creamos el componente para "solo pendientes"
    solo_pendientes_componente = rx.vstack(
        [tarjeta_tarea(t) for t in tareas_pendientes_filtradas],
        align_items="stretch",
        width="100%"
    )

    return rx.box(
        # Título de la columna
        rx.heading(nombre, size="4", color="#333"),
        
        # 4. Usamos rx.cond para ELEGIR cuál componente mostrar
        rx.cond(
            KanbanState.mostrar_solo_pendientes,
            solo_pendientes_componente,
            todas_las_tareas_componente
        ),
        
        # --- Estilos de la Columna ---
        bg="#f9f9f9", # Fondo de columna
        padding="10px",
        border_radius="5px", 
        width="300px",
        height="100%",
        box_shadow="rgba(0, 0, 0, 0.05) 0px 1px 2px 0px" # Sombra suave
    )

# --- 3. Página Principal ---

@rx.page(route="/")
def index():
    """Página principal que muestra el tablero."""
    return rx.vstack(
        # Título principal
        rx.heading("Mi Tablero Kanban", size="6", color="#d63384"), 
        
        # Contenedor horizontal para los botones
        rx.hstack(
            rx.button(
                "Mostrar Solo Pendientes",
                # Vinculamos el clic al método del estado
                on_click=KanbanState.mostrar_pendientes,
                color_scheme="pink"
            ),
            rx.button(
                "Mostrar Todas",
                on_click=KanbanState.mostrar_todas,
                color_scheme="gray"
            ),
            spacing="4"
        ),
        
        # Contenedor horizontal para las columnas
        rx.hstack(
            columna_kanban("Pendiente", tareas_pendientes),
            columna_kanban("En Progreso", tareas_en_progreso),
            columna_kanban("Completadas", tareas_completadas),
            spacing="5",
            margin_top="20px",
            align_items="flex-start" # Alinea las columnas arriba
        ),
        
        spacing="5",
        padding="20px",
        
        # --- Fondo de la Página ---
        # Forzamos un fondo de color claro para anular el modo oscuro.
        bg="#FFF0F5", 
        min_height="100vh" # Para que ocupe toda la pantalla
    )

# --- 4. Configuración de la App ---
app = rx.App()
app.add_page(index)