\connect project_db
--
-- PostgreSQL database dump
--

\restrict o4aIfOpErizrRr1mE4X5jgZji2AQJG8pFrIQ0ZlEaAK5avWTzxeFNhEcST0f8kq

-- Dumped from database version 16.4 (Debian 16.4-1.pgdg120+2)
-- Dumped by pg_dump version 16.14

-- Started on 2026-07-27 15:45:23 UTC

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 16385)
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- TOC entry 3382 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 16404)
-- Name: films; Type: TABLE; Schema: public; Owner: project_user
--

CREATE TABLE public.films (
    id uuid NOT NULL,
    rating double precision NOT NULL,
    director character varying NOT NULL,
    tags text NOT NULL,
    image character varying NOT NULL,
    cover character varying NOT NULL,
    title character varying NOT NULL,
    about character varying NOT NULL,
    description character varying NOT NULL
);


ALTER TABLE public.films OWNER TO project_user;

--
-- TOC entry 218 (class 1259 OID 16411)
-- Name: orders; Type: TABLE; Schema: public; Owner: project_user
--

CREATE TABLE public.orders (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "filmId" uuid NOT NULL,
    schedule_id uuid NOT NULL,
    day character varying NOT NULL,
    "time" character varying NOT NULL,
    email character varying NOT NULL,
    tickets jsonb NOT NULL
);


ALTER TABLE public.orders OWNER TO project_user;

--
-- TOC entry 216 (class 1259 OID 16396)
-- Name: schedules; Type: TABLE; Schema: public; Owner: project_user
--

CREATE TABLE public.schedules (
    id uuid NOT NULL,
    daytime character varying NOT NULL,
    hall integer NOT NULL,
    rows integer NOT NULL,
    seats integer NOT NULL,
    price integer NOT NULL,
    taken text DEFAULT ''::text NOT NULL,
    film_id uuid
);


ALTER TABLE public.schedules OWNER TO project_user;

--
-- TOC entry 3374 (class 0 OID 16404)
-- Dependencies: 217
-- Data for Name: films; Type: TABLE DATA; Schema: public; Owner: project_user
--

INSERT INTO public.films (id, rating, director, tags, image, cover, title, about, description) VALUES ('0e33c7f6-27a7-4aa0-8e61-65d7e5effecf', 2.9, 'Итан Райт', 'Документальный', 'content/afisha/bg1s.jpg', 'content/afisha/bg1c.jpg', 'Архитекторы общества', 'Документальный фильм об ИИ.', 'Подробное описание фильма про ИИ...');
INSERT INTO public.films (id, rating, director, tags, image, cover, title, about, description) VALUES ('1469e8bf-6b3a-4467-bc1f-8cb069f1f009', 4.3, 'Майкл Бэй', 'Экшен, Фантастика', 'content/afisha/bg2s.jpg', 'content/afisha/bg2c.jpg', 'Звездный рейд', 'Фантастический боевик.', 'Описание космического боевика...');
INSERT INTO public.films (id, rating, director, tags, image, cover, title, about, description) VALUES ('2950d9ef-5e2a-4318-ad1d-65cb18a4d11b', 4.8, 'Кристофер Нолан', 'Драма, Триллер', 'content/afisha/bg3s.jpg', 'content/afisha/bg3c.jpg', 'Иллюзия реальности', 'Глубокий психологический триллер.', 'Описание триллера Нолана...');
INSERT INTO public.films (id, rating, director, tags, image, cover, title, about, description) VALUES ('35bf6d34-7a1a-4c28-98e3-bbbc3d7d8e64', 3.5, 'Джеймс Кэмерон', 'Приключения', 'content/afisha/bg4s.jpg', 'content/afisha/bg4c.jpg', 'Забытый океан', 'Приключения в глубинах океана.', 'Описание подводных приключений...');
INSERT INTO public.films (id, rating, director, tags, image, cover, title, about, description) VALUES ('4e28c7f9-21a7-4bb0-8e61-65d7e5effec1', 4.1, 'Дени Вильнёв', 'Фантастика', 'content/afisha/bg5s.jpg', 'content/afisha/bg5c.jpg', 'Хроники Марса', 'Эпическая фантастика на Красной планете.', 'Описание марсианских хроник...');
INSERT INTO public.films (id, rating, director, tags, image, cover, title, about, description) VALUES ('5a18d3ef-2e2a-4318-ad1d-65cb18a4d112', 4.5, 'Квентин Тарантино', 'Криминал', 'content/afisha/bg6s.jpg', 'content/afisha/bg6c.jpg', 'Криминальный Город', 'Запутанная гангстерская история.', 'Описание криминальной драмы...');


--
-- TOC entry 3375 (class 0 OID 16411)
-- Dependencies: 218
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: project_user
--



--
-- TOC entry 3373 (class 0 OID 16396)
-- Dependencies: 216
-- Data for Name: schedules; Type: TABLE DATA; Schema: public; Owner: project_user
--

INSERT INTO public.schedules (id, daytime, hall, rows, seats, price, taken, film_id) VALUES ('f2e429b0-685d-41f8-a8cd-1d8cb63b99ce', '2024-06-28T10:00:53+03:00', 0, 5, 10, 350, '', '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf');
INSERT INTO public.schedules (id, daytime, hall, rows, seats, price, taken, film_id) VALUES ('a5e829b0-125d-41f8-a8cd-1d8cb63b99aa', '2024-06-28T14:30:00+03:00', 1, 6, 12, 400, '', '1469e8bf-6b3a-4467-bc1f-8cb069f1f009');
INSERT INTO public.schedules (id, daytime, hall, rows, seats, price, taken, film_id) VALUES ('b3d429b0-685d-41f8-b3cd-1d8cb63b99bb', '2024-06-28T18:00:00+03:00', 2, 5, 10, 450, '', '2950d9ef-5e2a-4318-ad1d-65cb18a4d11b');
INSERT INTO public.schedules (id, daytime, hall, rows, seats, price, taken, film_id) VALUES ('c4e429b0-685d-41f8-c4cd-1d8cb63b99cc', '2024-06-28T21:00:00+03:00', 0, 5, 10, 500, '', '35bf6d34-7a1a-4c28-98e3-bbbc3d7d8e64');
INSERT INTO public.schedules (id, daytime, hall, rows, seats, price, taken, film_id) VALUES ('d5f429b0-685d-41f8-d5cd-1d8cb63b99dd', '2024-06-29T12:00:00+03:00', 1, 6, 12, 350, '', '4e28c7f9-21a7-4bb0-8e61-65d7e5effec1');
INSERT INTO public.schedules (id, daytime, hall, rows, seats, price, taken, film_id) VALUES ('e6a429b0-685d-41f8-e6cd-1d8cb63b99ee', '2024-06-29T16:00:00+03:00', 2, 5, 10, 450, '', '5a18d3ef-2e2a-4318-ad1d-65cb18a4d112');


--
-- TOC entry 3226 (class 2606 OID 16410)
-- Name: films PK_697487ada088902377482c970d1; Type: CONSTRAINT; Schema: public; Owner: project_user
--

ALTER TABLE ONLY public.films
    ADD CONSTRAINT "PK_697487ada088902377482c970d1" PRIMARY KEY (id);


--
-- TOC entry 3228 (class 2606 OID 16418)
-- Name: orders PK_710e2d4957aa5878dfe94e4ac2f; Type: CONSTRAINT; Schema: public; Owner: project_user
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY (id);


--
-- TOC entry 3224 (class 2606 OID 16403)
-- Name: schedules PK_7e33fc2ea755a5765e3564e66dd; Type: CONSTRAINT; Schema: public; Owner: project_user
--

ALTER TABLE ONLY public.schedules
    ADD CONSTRAINT "PK_7e33fc2ea755a5765e3564e66dd" PRIMARY KEY (id);


--
-- TOC entry 3229 (class 2606 OID 16419)
-- Name: schedules FK_e4b69f6e65b933dd08d9af7f78d; Type: FK CONSTRAINT; Schema: public; Owner: project_user
--

ALTER TABLE ONLY public.schedules
    ADD CONSTRAINT "FK_e4b69f6e65b933dd08d9af7f78d" FOREIGN KEY (film_id) REFERENCES public.films(id) ON DELETE CASCADE;


--
-- TOC entry 3381 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

GRANT ALL ON SCHEMA public TO project_user;


-- Completed on 2026-07-27 15:45:23 UTC

--
-- PostgreSQL database dump complete
--

\unrestrict o4aIfOpErizrRr1mE4X5jgZji2AQJG8pFrIQ0ZlEaAK5avWTzxeFNhEcST0f8kq

