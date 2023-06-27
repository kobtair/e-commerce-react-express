
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    imgUrl VARCHAR(255) NOT NULL,
    stock INTEGER NOT NULL,
	description VARCHAR(1000)
);




ALTER TABLE users RENAME COLUMN id TO userid;

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(userid),
    product_id INTEGER REFERENCES products(prodid),
    quantity INTEGER,
    total FLOAT,
    FOREIGN KEY (product_id) REFERENCES products(prodid) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(userid) ON DELETE CASCADE
);

CREATE TRIGGER calculate_total
AFTER INSERT OR UPDATE ON orders
FOR EACH ROW
EXECUTE FUNCTION
    UPDATE orders
    SET total = (SELECT price FROM products WHERE products.id = NEW.product_id) * NEW.quantity
    WHERE id = NEW.id;



CREATE TRIGGER subtract_quantity
AFTER INSERT OR UPDATE ON orders
FOR EACH ROW
EXECUTE FUNCTION
    UPDATE products
    SET stock = stock - NEW.quantity
    WHERE id = NEW.product_id;
