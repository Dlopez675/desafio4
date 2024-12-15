const { Pool } = require('pg');

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "1234",
    database: "likeme",
    allowExitOnIdle: true,
});

const agregarPosts = async (titulo, url, descripcion) =>{
    try {
        const consulta = "INSERT INTO posts values (DEFAULT, $1, $2, $3)";
        const values = [titulo, url, descripcion];
        const result = await pool.query(consulta, values);
        console.log("Posts agregado");  
    } catch (error) {
        throw new Error("No se pudo agregar Posts")
    }
};
 
const obtenerPosts = async () =>{
    try {
        const { rows } = await pool.query("SELECT * FROM posts");
        console.log(rows);
        return rows;
    } catch (error) {
        throw new Error("Problema al obtener los Posts")
    }
};


const modificarPosts = async (id, titulo) =>{
    try {
        const consulta = "UPDATE posts SET titulo = $2 WHERE id = $1";
        const values = [id, titulo];
        const result = await pool.query(consulta, values);
        if(result.rowCount != 0){
            return true
        }else{
            throw new Error("No se pudo modificar Posts")
        }
    } catch (error) {
        throw new Error(error);
    }

};

const eliminarPosts = async (id) =>{
    try {
        const consulta = "DELETE FROM posts WHERE id=$1"
        const values = [id]
        const result = await pool.query(consulta, values)
        if(result.rowCount != 0){
            return true
        }else{
            throw new Error("No se pudo eliminar Posts")
        }
    } catch (error) {
        throw new Error(error);
    }

}

module.exports = { 
    agregarPosts, 
    obtenerPosts,
    modificarPosts,
    eliminarPosts,
 };
