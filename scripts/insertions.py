import pandas as pd
import mysql.connector
import json
import bcrypt
from datetime import datetime

# Leer CSV
df = pd.read_csv("nodos.csv")

# Conexión a MySQL
conn = mysql.connector.connect(
    host='localhost',
    port=3306,
    user='proplayas_user',
    password='password',
    database='proplayas'
)
cursor = conn.cursor()
# Abrir archivo de log
log_file = open("registro_usuarios.txt", "a", encoding="utf-8")

def normalizar_tipo(tipo: str) -> str:
    tipo = tipo.lower()
    if "cientifico" in tipo:
        return "cientifico"
    elif "empresarial" in tipo:
        return "empresarial"
    elif "funcion" in tipo:
        return "funcion_publica"
    elif "civil" in tipo or "activista" in tipo:
        return "sociedad_civil"
    else:
        return "individual"

for _, row in df.iterrows():
    node_type = normalizar_tipo(row["type"])
    code = row["code"]
    name = row["name"]
    country = row["country"]
    joined_in = int(row["joined_in"]) if not pd.isna(row["joined_in"]) else 2024
    city = row["city"]
    leader_name = row["leader_id"]
    leader_email = row["email"]
    social_url = row["social_media"]

    # Buscar líder por correo
    cursor.execute("SELECT id FROM users WHERE email = %s", (leader_email,))
    result = cursor.fetchone()

    if result:
        leader_id = result[0]
    else:
        password = bcrypt.hashpw("Contra123@".encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
        # Generar username base
        # Generar username base
        base_username = leader_email.split("@")[0].lower().replace(".", "_")
        username = base_username
        suffix = 1
 
        # Verificar y ajustar si el username ya existe
        cursor.execute("SELECT id FROM users WHERE username = %s", (username,))
        while cursor.fetchone():
            username = f"{base_username}_{suffix}"
            suffix += 1
            cursor.execute("SELECT id FROM users WHERE username = %s", (username,))
        cursor.execute("""
            INSERT INTO users (name, email, username, password, role, status, created_at, updated_at)
            VALUES (%s, %s, %s, %s, 'node_leader', 'activo', %s, %s)
        """, (
            leader_name,
            leader_email,
            username,
            password,
            datetime.now(),
            datetime.now()
        ))
        conn.commit()
        leader_id = cursor.lastrowid
        print(f"🆕 Usuario creado: {leader_name} ({leader_email}) → ID {leader_id}")
        log_file.write(f"{leader_name} | {leader_email} | {username}\n")

    # Preparar JSON social
    social_json = json.dumps({"url": social_url}) if pd.notna(social_url) and social_url != 'N/A' else None

    # Insertar nodo
    cursor.execute("""
        INSERT INTO nodes (
            leader_id, code, type, name, country, city, joined_in, social_media, status, created_at, updated_at
        )
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, 'activo', %s, %s)
    """, (
        leader_id,
        code,
        node_type,
        name,
        country,
        city,
        joined_in,
        social_json,
        datetime.now(),
        datetime.now()
    ))
    print(f"✅ Nodo insertado: {code} - {name}")

conn.commit()
log_file.close()
cursor.close()
conn.close()