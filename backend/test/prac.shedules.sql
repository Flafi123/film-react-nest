INSERT INTO schedules (id, daytime, hall, rows, seats, price, taken, film_id) VALUES
('f2e429b0-685d-41f8-a8cd-1d8cb63b99ce', '2026-07-31T12:00:00+03:00', 0, 5, 10, 350, '', '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf'),
('a5e829b0-125d-41f8-a8cd-1d8cb63b99aa', '2026-07-31T15:30:00+03:00', 1, 6, 12, 400, '', '1469e8bf-6b3a-4467-bc1f-8cb069f1f009'),
('b3d429b0-685d-41f8-b3cd-1d8cb63b99bb', '2026-07-31T18:00:00+03:00', 2, 5, 10, 450, '', '2950d9ef-5e2a-4318-ad1d-65cb18a4d11b'),
('c4e429b0-685d-41f8-c4cd-1d8cb63b99cc', '2026-07-31T21:00:00+03:00', 0, 5, 10, 500, '', '35bf6d34-7a1a-4c28-98e3-bbbc3d7d8e64'),
('d5f429b0-685d-41f8-d5cd-1d8cb63b99dd', '2026-08-01T12:00:00+03:00', 1, 6, 12, 350, '', '4e28c7f9-21a7-4bb0-8e61-65d7e5effec1'),
('e6a429b0-685d-41f8-e6cd-1d8cb63b99ee', '2026-08-01T16:00:00+03:00', 2, 5, 10, 450, '', '5a18d3ef-2e2a-4318-ad1d-65cb18a4d112')
ON CONFLICT (id) DO UPDATE SET daytime = EXCLUDED.daytime;