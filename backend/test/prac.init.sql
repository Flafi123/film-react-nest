CREATE TABLE IF NOT EXISTS films (
    id UUID PRIMARY KEY,
    rating NUMERIC(3,1),
    director VARCHAR(255),
    tags TEXT,
    image VARCHAR(255),
    cover VARCHAR(255),
    title VARCHAR(255),
    about TEXT,
    description TEXT
);

CREATE TABLE IF NOT EXISTS schedules (
    id UUID PRIMARY KEY,
    daytime VARCHAR(255),
    hall INT,
    rows INT,
    seats INT,
    price INT,
    taken TEXT DEFAULT '',
    film_id UUID REFERENCES films(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    film_id UUID,
    schedule_id UUID,
    day VARCHAR(50),
    time VARCHAR(50),
    email VARCHAR(255),
    tickets JSONB
);