CREATE TABLE IF NOT EXISTS modules (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  prerequisites TEXT,
  icon VARCHAR(2048) DEFAULT 'book',
  image_url VARCHAR(2048) NULL,
  background_color CHAR(7) NOT NULL DEFAULT '#EAF2FF',
  order_index INT DEFAULT 0,
  INDEX idx_order_index (order_index),
  INDEX idx_created_at (id)
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
    ON DELETE CASCADE,
  INDEX idx_module_id (module_id),
  INDEX idx_module_order (module_id, lesson_order)
);

CREATE TABLE IF NOT EXISTS app_content (
  id INT PRIMARY KEY,
  welcome_title VARCHAR(255) NOT NULL,
  welcome_description TEXT NOT NULL,
  motivation_text TEXT NOT NULL,
  motivation_quote TEXT NOT NULL
);

-- Ensure app_content row exists
INSERT INTO app_content (id, welcome_title, welcome_description, motivation_text, motivation_quote)
VALUES (1, 'Master React Native', 'A practical React Native course app to help you master app development step by step.', 'Daily Motivation', 'Keep up the great work!')
ON DUPLICATE KEY UPDATE id = id;
