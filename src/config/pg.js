import pg from 'pg'

const pool = new pg.Pool({
    connectionString: process.env.PG_CONNECTION_STRING,
})
    
async function db (query, ...params) {
    const client = await pool.connect()
    try {
        const { rows } = await client.query(query, params.length ? params : null)
        return rows
    } catch (error) {
        console.log('Database error:', error.message)
        throw new Error(error.message)
    } finally {
        client.release()
    }
}

export default db
