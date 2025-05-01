import pandas as pd
import mysql.connector
import json
import bcrypt
from datetime import datetime

# Leer CSV
df = pd.read_csv("NodosCompletos.csv")

# El CSV tiene esta forma en sus cabezeras:
# type,code,leader_name,email,username,password,role,degree,postgraduate,expertise_area,research_work,facebook,instagram,whatsapp,twitter,linkedin,researchgate,youtube,node_name,country,city,coordinates,alt_places,joined_in,members_count,website,email_nodo
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

def safe_value(value):
    return value if pd.notna(value) else None

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
    code = safe_value(row["code"])
    node_name = safe_value(row["node_name"])
    country = safe_value(row["country"])
    joined_in = int(row["joined_in"]) if not pd.isna(row["joined_in"]) else 2024
    city = safe_value(row["city"])
    leader_name = row["leader_name"]
    leader_email = row["email"]
    username = row["username"]
    if pd.isna(username) or not username.strip():
        base_username = leader_email.split("@")[0].lower().replace(".", "_")
        username = base_username
        suffix = 1
        # Asegurar que el username sea único
        cursor.execute("SELECT id FROM users WHERE username = %s", (username,))
        while cursor.fetchone():
            username = f"{base_username}_{suffix}"
            suffix += 1
            cursor.execute("SELECT id FROM users WHERE username = %s", (username,))
    raw_password = row["password"]
    password_hash = bcrypt.hashpw(raw_password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8").replace("$2b$", "$2y$")
    social_fields = ["facebook", "instagram", "phone", "twitter", "linkedin", "researchgate", "youtube"]
    social_list = []
    for field in social_fields:
        value = row[field]
        if pd.notna(value) and str(value).strip().lower() != "nan":
            social_list.append({"platform": field, "url": str(value).strip()})
    social_media = json.dumps(social_list) if social_list else None

    # Buscar líder por correo
    cursor.execute("SELECT id FROM users WHERE email = %s", (leader_email,))
    result = cursor.fetchone()

    if result:
        leader_id = result[0]
    else:
        degree = safe_value(row["degree"])
        postgraduate = safe_value(row["postgraduate"])
        expertise_area = safe_value(row["expertise_area"])
        research_work = safe_value(row["research_work"])
        cursor.execute("""
            INSERT INTO users (name, email, username, password, role, degree, postgraduate, expertise_area, research_work, social_media, status, created_at, updated_at)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, 'activo', %s, %s)
        """, (
            leader_name,
            leader_email,
            username,
            password_hash,
            safe_value(row["role"]),
            degree,
            postgraduate,
            expertise_area,
            research_work,
            social_media,
            datetime.now(),
            datetime.now()
        ))
        conn.commit()
        leader_id = cursor.lastrowid
        print(f"🆕 Usuario creado: {leader_name} ({leader_email}) → ID {leader_id}")
        print(f"👤 Username asignado: {username}")
        log_file.write(f"{leader_name} | {leader_email} | {username}\n")


    coordinates = safe_value(row["coordinates"])
    alt_places = safe_value(row["alt_places"])
    members_count = int(row["members_count"]) if pd.notna(row["members_count"]) else None
    email_nodo = safe_value(row["email_contacto_nodo"])
    social_node_fields = {
        "facebook_nodo": "facebook",
        "instagram_nodo": "instagram",
        "twitter_nodo": "twitter",
        "linkedin_page_nodo": "linkedin",
        "youtube_nodo": "youtube"
    }
    social_list = []
    for field, platform in social_node_fields.items():
        value = row[field]
        if pd.notna(value) and str(value).strip().lower() != "nan":
            social_list.append({"platform": platform, "url": str(value).strip()})
    node_social_media = json.dumps(social_list) if social_list else None
    # node_social_media = None  # si no hay datos aún, se queda en null
    # Insertar nodo en la tabla
    cursor.execute("""
        INSERT INTO nodes (
            leader_id, code, type, name, 
            country, city, coordinates, 
            alt_places, joined_in, members_count, 
            social_media, status, created_at, updated_at
        )
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, 'activo', %s, %s)
    """, (
        leader_id,
        code,
        node_type,
        node_name,
        country,
        city,
        coordinates,
        alt_places,
        joined_in,
        members_count,
        node_social_media,
        datetime.now(),
        datetime.now()
    ))
    print(f"✅ Nodo insertado: {code} - {node_name}")

conn.commit()
log_file.close()
cursor.close()
conn.close()