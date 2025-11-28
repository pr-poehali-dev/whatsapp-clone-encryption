CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    avatar VARCHAR(500),
    online BOOLEAN DEFAULT false,
    last_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS chats (
    id SERIAL PRIMARY KEY,
    is_group BOOLEAN DEFAULT false,
    name VARCHAR(255),
    avatar VARCHAR(500),
    encrypted BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS chat_participants (
    id SERIAL PRIMARY KEY,
    chat_id INTEGER REFERENCES chats(id),
    user_id INTEGER REFERENCES users(id),
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(chat_id, user_id)
);

CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    chat_id INTEGER REFERENCES chats(id),
    sender_id INTEGER REFERENCES users(id),
    text TEXT NOT NULL,
    delivered BOOLEAN DEFAULT false,
    read BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_messages_chat_id ON messages(chat_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);
CREATE INDEX IF NOT EXISTS idx_chat_participants_chat_id ON chat_participants(chat_id);
CREATE INDEX IF NOT EXISTS idx_chat_participants_user_id ON chat_participants(user_id);

INSERT INTO users (name, avatar, online) VALUES 
('Анна Смирнова', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna', true),
('Михаил Петров', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mikhail', false),
('Елена Васильева', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena', true),
('Дмитрий Козлов', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dmitry', false),
('Мария Иванова', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria', false);

INSERT INTO chats (is_group, name, avatar, encrypted) VALUES 
(false, 'Анна Смирнова', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna', true),
(true, 'Команда разработки', 'https://api.dicebear.com/7.x/avataaars/svg?seed=DevTeam', true),
(false, 'Михаил Петров', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mikhail', true),
(false, 'Елена Васильева', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena', true),
(true, 'Семья', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Family', true);

INSERT INTO chat_participants (chat_id, user_id) VALUES 
(1, 1), (2, 1), (2, 2), (2, 3), (2, 4), (3, 2), (4, 3), (5, 1), (5, 5);

INSERT INTO messages (chat_id, sender_id, text, delivered, read, created_at) VALUES 
(1, 1, 'Привет! Как дела?', true, true, NOW() - INTERVAL '5 minutes'),
(1, 2, 'Отлично, спасибо! А у тебя?', true, false, NOW() - INTERVAL '3 minutes'),
(2, 2, 'Встреча в 15:00', true, true, NOW() - INTERVAL '1 hour'),
(3, 2, 'Отправил файлы', true, true, NOW() - INTERVAL '1 day'),
(4, 3, 'Спасибо!', true, true, NOW() - INTERVAL '2 days');