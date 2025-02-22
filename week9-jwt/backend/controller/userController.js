import mysql from "mysql2/promise"

const config = {
    host: 'localhost',
    user: 'admin',
    password: 'admin',
    database: 'jwt',
}

const query = async (sql, params) => {
    const connection = await mysql.createConnection(config)
    const [rows] = await connection.query(sql, params)
    return rows
}

const emptyOrRows = (rows) => {
    if (rows === undefined || rows.length === 0) return []
    return rows
}

export const addNewUser = async ({ username, password, role_id }) => {
    const sql = 'INSERT INTO users (username, password, role_id) VALUE (?,?,?)'
    const params = [username, password, role_id]

    try {
        const result = await query(sql, params)
        const message = 'User creat failed'
        if (result.affectedRows > 0) {
            return "success"
        } else {
            return "error"
        }
    } catch (error) {
        throw error
    }

}

export const getUserByUsername = async ({ username }) => {
    const sql = 'SELECT * FROM users WHERE username =?'
    const params = [username]
    try {
        // return emptyOrRows(await query(sql, params))
        const result = emptyOrRows(await query(sql, params))
        return result
    } catch (error) {
        throw (error)
    }
}

export const getUserWithRoleById = async ({ id }) => {

    const sql = 'SELECT users.id AS id, roles.name AS role FROM users RIGHT JOIN roles ON users.role_id = roles.id WHERE users.id = ?';
    const params = [id]
    try {
        return emptyOrRows(await query(sql, params))
    } catch (error) {
        throw error
    }

}

export const getListUserByAdmin = async () => {
    const sql = `
      SELECT users.id AS id, roles.name AS role, users.username AS username 
      FROM users RIGHT JOIN roles ON users.role_id = roles.id
      WHERE roles.name IN ('Admin', 'Manager', 'Worker')
      ORDER BY roles.name ASC;
    `
    return emptyOrRows(await query(sql))
}

export const getListUserByManager = async () => {
    const sql = `
    SELECT users.id AS id, roles.name AS role, users.username AS username 
    FROM users RIGHT JOIN roles ON users.role_id = roles.id
    WHERE roles.name = 'Manager' OR roles.name = 'Worker'
    ORDER BY roles.name ASC;
  `
  return emptyOrRows(await query(sql))
}