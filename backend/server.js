const express = require('express');
const { Client } = require('pg');
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const cors = require('cors')
const app = express();

app.use(cors());
const client = new Client({
    host: 'localhost',
    user: 'postgres',
    password: 'admin',
    database: 'ecommerce',
  });

  client.connect();

  app.use(bodyParser.json());

  app.post('/register', (req, res) => {
    const { name, email, password, address } = req.body;
    const saltRounds = 10;
  
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      client.query(
        'INSERT INTO users (name, email, password, address) VALUES ($1, $2, $3,   $4)',
        [name, email, hash, address],
        (error, result) => {
          if (error) {
            console.log(error);
            return res.status(500).json({ error: 'Internal server error' });
          }
          res.status(201).json({ message: 'User registered successfully' });
        }
      );
    });
  });

  app.post('/cart', (req, res) => {
    const {userId,products} = req.body;
    const query = `INSERT INTO orders (user_id, product_id, quantity, total) 
    VALUES ( $1, $2, $3, (SELECT price FROM products WHERE id = $2) * $3)`;
    products.forEach((product) => {
        client.query(query, [userId, product.id, product.quantity], (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.send({
                    message: 'Order has been placed!',
                    result: result.rows
                });
            }
        });
    });
});

  app.post('/users', async (req, res) => {
    const userId = req.body.id;
    try {
        const result = await client.query('SELECT * FROM users WHERE userid = $1', [userId]);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Error fetching user data'});
    }
});
  
app.get('/products', (req, res) => {
    const query = `SELECT * FROM products`;
    client.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.send({
                products: result.rows
            });
        }
    });
});

  app.post('/login', (req, res) => {
    const { email, password } = req.body;
    client.query(`SELECT * FROM users WHERE email = '${email}'`, (err, result) => {
      if (err) {
        console.log(err)
        return res.status(500).json({ error: 'Internal server error' });
      }
      if (result.rows.length === 0) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      const user = result.rows[0];
      bcrypt.compare(password, user.password, (err, match) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (match) {
        return res.status(200).json(result.rows[0]);
        } else {
        return res.status(401).json({ error: 'Invalid email or password' });
        }
        });
        });
        });

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
