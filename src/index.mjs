import express from 'express';

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

const mockUsers = [{id : 1, username : "anson", displayName: "Anson"},
{id : 2, username : "jack", displayName : "Jack"},
{id : 3, username : "queen", displayName : "Queen"}
];

app.get("/", (request, response)=>{
    response.status(201).send("Hello");
});

app.get("/api/users", (request, response)=>{
    console.log(request.query);
    const { query: { filter , value}} = request;
    if (filter && value){
        return response.send(
            mockUsers.filter((user)=> user[filter].includes(value))
        );
    };
    return response.send(mockUsers);
});

app.post("/api/users", (request, response)=>{
    console.log(request.body);
    return response.send(200);
})

app.get("/api/product", (request, response)=>{
    response.send([{id : 123, name : "chicken wings", price: 2.99},
                   {id: 1, name : "JESUS", price : "free" }]);
});

app.get("/api/users/:id", (request, response)=>{
    console.log(request.params);
    const parsedId = parseInt(request.params.id);
    if (isNaN(parsedId)){
        return response.status(400).send({ msg: "Invalid ID Number. Enter a value for the ID"});
    };
    
    const findUser = mockUsers.find((user) => user.id === parsedId);
    if (!findUser) return response.sendStatus(404);
    return response.send(findUser);

})

app.listen(PORT, function(){
    console.log(`Running on Port {PORT}`);
})