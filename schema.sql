CREATE DATABASE IF NOT EXISTS course_learning;
USE course_learning;

CREATE TABLE IF NOT EXISTS modules (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  prerequisites TEXT,
  icon VARCHAR(100) DEFAULT 'book',
  order_index INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS lessons (
  id INT AUTO_INCREMENT PRIMARY KEY,
  module_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  content LONGTEXT,
  read_time INT DEFAULT 5,
  lesson_order INT DEFAULT 0,
  CONSTRAINT fk_lessons_module
    FOREIGN KEY (module_id)
    REFERENCES modules(id)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS app_content (
  id INT PRIMARY KEY,
  welcome_title VARCHAR(255) NOT NULL,
  welcome_description TEXT NOT NULL,
  motivation_text TEXT NOT NULL,
  motivation_quote TEXT NOT NULL
);
