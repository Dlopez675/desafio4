const express = require("express");
const cors = require("cors")
const { obtenerPosts, agregarPosts, modificarPosts, eliminarPosts,} = require("./consultas");
const app = express();
app.use(express.json());
app.use(cors());


//Rutas

//Obtener todos los Posts
app.get("/posts", async (req, res) =>{
    try {
        const posts = await obtenerPosts();
        res.json(posts);
    } catch (error) {
        res.send(error.message)
    }
});


//Agregar un nuevo Posts
app.post("/posts", async (req, res) =>{
    try {
        const { titulo, url, descripcion } = req.body;
        await agregarPosts (titulo, url, descripcion);
        res.send("Post agregado correctamente")
    } catch (error) {
        res.send(error.message)
    }

}); 

//Modificar un Posts
app.put ("/posts/:id", async (req, res) =>{
    try {
        const {id} = req.params;
        const {titulo} = req.body;
        const response = await modificarPosts (id, titulo)
        res.status(200).send("Post modificado con exito")
    } catch (error) {
        res.send(error.message)
    }

})

//Eliminar un Posts
app.delete("/posts/:id", async(req, res,) =>{
    try {
        const {id} = req.params
        await eliminarPosts(id)
        res.status(200).send("Post Eliminado con Exito")
    } catch (error) {
        res.send(error.message)
    }

})

app.listen(3000, console.log("¡Servidor encendido!"));