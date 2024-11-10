const express = require("express"); // boilerplate code 
const FileSystem = require('fs');
const users = require("./MOCK_DATA.json");

const app = express(); // boilerplate creating app
const PORT = 8000;

//Middleware -- plug-in
app.use(express.urlencoded({ extended: false }));


// routes
app.get("/users", (req, res) => {
    const html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join('')}
    </ul>
    `;
    res.send(html);
});

//REST SPI
app.get("/api/users", (req, res) => {
    return res.json(users); // corrected to res.json
});

//DYNAMIC PATH PARAMETERS
app.get("/api/users/:id", (req, res) => {
    const id = req.params.id;
    const user = users.find((user) => user.id === parseInt(id));
    return res.json(user);

})

//reacting the route and using the put, patch, and delete methods
app.route("api/users/:id")
.get((req, res) => {
    const id = req.params.id;
    const user = users.find((user) => user.id === parseInt(id));
    return res.json(user);
    })
    .patch((req, res) => {
        //Edit user with id
        return res.json({status: "Pending"});
    })
    .delete((req, res) => {
        //Delete user with id
        return res.json({status: "Pending"});
    });

app.route("api/users").post((req, res) => {
    //Create new user
    const body = req.body;
    users.push({...body, id: users.length + 1});
    FileSystem.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.json({ status: "success", id: users.length});
    });
    
});

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));
 