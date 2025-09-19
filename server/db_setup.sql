
-- Create the database
CREATE DATABASE IF NOT EXISTS ticketara;

USE ticketara;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Games table
CREATE TABLE IF NOT EXISTS games (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  date DATETIME NOT NULL,
  venue VARCHAR(255) NOT NULL,
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  game_id INT NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (game_id) REFERENCES games(id)
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  seat_number INT NOT NULL,
  seat_category VARCHAR(50) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- Reserved seats table
CREATE TABLE IF NOT EXISTS reserved_seats (
  id INT AUTO_INCREMENT PRIMARY KEY,
  game_id INT NOT NULL,
  seat_number INT NOT NULL,
  UNIQUE KEY game_seat (game_id, seat_number),
  FOREIGN KEY (game_id) REFERENCES games(id)
);

-- Insert some sample games
INSERT INTO games (title, date, venue, image_url) VALUES
('Morocco vs. Brazil', '2024-06-15 19:00:00', 'Mohammed V Stadium, Casablanca', '/lovable-uploads/f3c0216f-c271-49c7-88f8-87616e547aca.png'),
('Morocco vs. Spain', '2024-07-20 20:00:00', 'Grand Stadium, Rabat', '/lovable-uploads/f3c0216f-c271-49c7-88f8-87616e547aca.png'),
('Morocco vs. Argentina', '2024-08-10 18:30:00', 'Hassan II Stadium, Fes', '/lovable-uploads/f3c0216f-c271-49c7-88f8-87616e547aca.png');
