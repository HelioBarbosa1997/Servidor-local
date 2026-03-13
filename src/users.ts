import db from "./lib/db.js"


export async function getUsers() {
    const [rows] = await db.execute("SELECT * FROM tbl_utilizadores")

    return rows;
}
export async function getUserById(id: string) {
    const [rows] = await db.execute("SELECT * FROM tbl_utilizadores WHERE tbl_utilizadores.id = [id]")

    if (Array.isArray(rows) && rows.length === 0) return null
    return Array.isArray(rows) ? rows[0] : null
}

export async function userInside(users: any) {
    try {
    const body = `
    INSERT INTO tbl_utilizadores 
    (id, nome, numero_identificacao, data_nascimento, email, telefone, pais, localidade, password, enabled, create_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
        users.id,
        users.nome,
        users.numero_identificacao,
        users.data_nascimento,
        users.email,
        users.telefone,
        users.pais,
        users.localidade,
        users.password,
        users.enabled,
        new Date(),
        new Date()
    ];

    const [results] = await db.execute(body, values);

    return results;
    } catch(err) {
        return null
    }
}