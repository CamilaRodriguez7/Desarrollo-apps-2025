import reflex as rx

config = rx.Config(
    app_name="S08_Ejercicio1",
    plugins=[
        rx.plugins.SitemapPlugin(),
        rx.plugins.TailwindV4Plugin(),
    ]
)