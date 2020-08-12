const express = require("express");
const app = express();
var cors = require('cors');
app.use(cors());
app.use(express.json());
app.listen(8080, () => {
    console.log("Server running on port 8080");
});


//--------------------------role
const Roles = [
    {
        id: 1,
        name: 'ROLE_ADMIN',
    },
    {
        id: 2,
        name: 'ROLE_USER',
    }
];

//-----------------------account
const Accounts = [
    {
        id: 1,
        username: 'tuan',
        password: 'tuan',
        email: 'tuan@gmail',
        phone: '098',
        age: 30,
        address: 'hn',
        IdNumber: '17',
        passpord: null,
        Roles : {
            id: 1,
            name: 'ROLE_ADMIN',
        }
    },
    {
        id: 2,
        username: 'admin',
        password: 'admin',
        email: 'admin@gmail',
        phone: '097',
        age: 40,
        address: 'sg',
        IdNumber: '17',
        passpord: null,
        Roles: {
            id: 2,
            name: 'ROLE_USER',
        }
    },
    {
        id: 3,
        username: 'test',
        password: 'test',
        email: 'test@gmail',
        phone: '096',
        age: 30,
        address: 'hn',
        IdNumber: '17',
        passpord: null,
        Roles: {
            id: 1,
            name: 'ROLE_ADMIN',
        }
    }
];
//------------------------product
const Products = [
    {
        id: 1,
        name: 'nha mat da',
        location: 'hn',
        status: true,
        Detail: {
            id: 2,
            Room: 1,
            Pool: true,
            garden: true,
            Balcony: true,
            Types: {
                id: 2,
                name: 'du thuyen'
            }
        },

        Accounts: {
            id: 1,
            username: 'tuan',
            password: 'tuan',
            email: 'tuan@gmail',
            phone: '098',
            age: 30,
            address: 'hn',
            IdNumber: '17',
            passpord: null,
            Roles: {
                id: 1,
                name: 'ROLE_ADMIN',
            }
        }
    },

    {
        id: 2,
        name: 'nha chung cu',
        location: 'hn',
        status: true,
        Detail: {
            id: 1,
            Room: 1,
            Pool: true,
            garden: true,
            Balcony: true,
            Types: {
                id: 1,
                name: 'nha pho'
            }
        },
        Accounts: {
            id: 1,
            username: 'tuan',
            password: 'tuan',
            email: 'tuan@gmail',
            phone: '098',
            age: 30,
            address: 'hn',
            IdNumber: '17',
            passpord: null,
            Roles: {
                id: 2,
                name: 'ROLE_USER',
            }
        }
    },
];

// ---------------------------------------------------------
const Detail = [
    {
        id: 1,
        Room: 1,
        Pool: true,
        garden: true,
        Balcony: true,
        Types: {
            id: 1,
            name: 'nha pho'
        }
    },

    {
        id: 2,
        Room: 1,
        Pool: true,
        garden: true,
        Balcony: true,
        Types: {
            id: 2,
            name: 'du thuyen'
        }
    }
];

const Types = [
    {
        id: 1,
        name: 'nha pho'
    },
    {
        id: 2,
        name: 'du thuyen'
    },

    {
        id: 3,
        name: 'nha dat'
    },

];

// --------------------------------------------------------
const Image = [
    {
        id: 1,
        url: 'tuan',
        Products:  {
            id: 1,
            name: 'nha mat da',
            location: 'hn',
            status: true,
            Detail: {
                id: 1,
                name: 'co vuon'
            },

            Accounts: {
                id: 1,
                username: 'tuan',
                password: 'tuan',
                email: 'tuan@gmail',
                phone: '098',
                age: 30,
                address: 'hn',
                IdNumber: '17',
                passpord: null,
                role: {
                    id: 1,
                    name: 'ROLE_ADMIN',
                }
            }
        },
    }
];
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------

app.get("/products", (req, res, next) => {
    res.json(Products);
});
app.get("/products/:id", (req, res, next) => {
    const id = +req.params.id;
    const index = findProductIndex(id);
    if(index !== -1) {
        res.json(Products[index]);
    } else {
        res.status(404).json({message: 'Not found'});
    }
});

app.post("/products/create", (req, res, next) => {
    const product = {
        id: (new Date()).getTime(),
        name: req.body.name,
        location: req.body.location,
        price: req.body.price,
        status: req.body.status,
        // product.Detail = req.body.Detail,
        Detail: {
            id: 1,
            Room: 1,
            Pool: true,
            garden: true,
            Balcony: true,
            Types: {
                id: 1,
                name: 'nha pho'
            }
        }
    };
    Products.push(product);
    res.json(product);
});

app.delete("/products/:id/delete", (req, res, next) => {
    const id = +req.params.id;
    const index = findProductIndex(id);
    if(index !== -1) {
        Products.splice(index, 1);
        res.json({message: 'Product deleted', id: id});
    } else {
        res.status(404).json({message: 'Not found'});
    }
});

app.put("/products/:id/update", (req, res, next) => {
    const id = +req.params.id;
    const index = findProductIndex(id);
    if(index !== -1) {
        const product = Products[index];
        product.name = req.body.name,
        product.location = req.body.location,
        product.price = req.body.price,
        product.status = req.body.status,
        // product.Detail = req.body.Detail,
        product.Detail = {
            id: 1,
            Room: 1,
            Pool: true,
            garden: true,
            Balcony: true,
            Types: {
                id: 1,
                name: 'nha pho'
        }
    },
    res.json(product);
    } else {
        res.status(404).json({message: 'Not found'});
    }
});

function findProductIndex(id) {
    for(let i = 0; i < Products.length; i++) {
        if(Products[i].id === id) {
            return i;
        }
    }
    return -1;
}

// -------------------------------Account--------------------------------------
// -------------------------------Account--------------------------------------
// -------------------------------Account--------------------------------------
// -------------------------------Account--------------------------------------
// -------------------------------Account--------------------------------------
// -------------------------------Account--------------------------------------

app.get("/accounts", (req, res, next) => {
    res.json(Accounts);
});
app.get("/accounts/:id", (req, res, next) => {
    const id = +req.params.id;
    const index = findAccountIndex(id);
    if(index !== -1) {
        res.json(Accounts[index]);
    } else {
        res.status(404).json({message: 'Not found'});
    }
});

app.post("/accounts/create", (req, res, next) => {
    const account = {
        id: (new Date()).getTime(),
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age,
        address: req.body.address,
        IdNumber: req.body.IdNumber,
        passport: req.body.passport,
        Roles: {
            id: 1,
            name: "ROLE_USER"
        }
    };
    Accounts.push(account);
    res.json(account);
});

app.delete("/accounts/:id/delete", (req, res, next) => {
    const id = +req.params.id;
    const index = findAccountIndex(id);
    if(index !== -1) {
        Accounts.splice(index, 1);
        res.json({message: 'account deleted', id: id});
    } else {
        res.status(404).json({message: 'Not found'});
    }
});

app.put("/accounts/:id/update", (req, res, next) => {
    const id = +req.params.id;
    const index = findAccountIndex(id);
    if(index !== -1) {
        const account = Accounts[index];
        account.username =  req.body.username,
        account.password = req.body.password,
        account.email = req.body.email,
        account.phone = req.body.phone,
        account.age = req.body.age,
        account.address = req.body.address,
        account.IdNumber = req.body.IdNumber,
        account.passport = req.body.passport,
        account.Roles = {
            id: 1,
            name: "ROLE_USER"
        }
        res.json(account);
    } else {
        res.status(404).json({message: 'Not found'});
    }
});

function findAccountIndex(id) {
    for(let i = 0; i < Accounts.length; i++) {
        if(Accounts[i].id === id) {
            return i;
        }
    }
    return -1;
}
