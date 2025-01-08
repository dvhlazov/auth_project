import server from "../server.js";


const port = process.env.PORT || 3030;
server.listen(port, ()=> {
    console.log(`Server listen at port ${port} `)
})


export {port};