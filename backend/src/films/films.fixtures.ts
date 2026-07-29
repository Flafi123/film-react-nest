export const mockFilmEntity = {
  id: 'film-123',
  title: 'Интерстеллар',
  director: 'Кристофер Нолан',
  rating: 8.6,
  tags: ['фантастика', 'драма'],
  image: 'content/afishabg_interstellar.jpg',
  cover: 'content/afishabg_interstellar_cover.jpg',
  about: 'О фильме',
  description: 'Длинное описание',
  schedule: [
    {
      id: 'session-1',
      daytime: '14:30',
      price: 350,
    },
  ],
};

const expectedFilmDto = {
  id: 'film-123',
  title: 'Интерстеллар',
  director: 'Кристофер Нолан',
  rating: 8.6,
  tags: ['фантастика', 'драма'],
  image: '/content/afisha/bg_interstellar.jpg',
  cover: '/content/afisha/bg_interstellar_cover.jpg',
  about: 'О фильме',
  description: 'Длинное описание',
};

const expectedSessions = [
  {
    id: 'session-1',
    time: '14:30',
    price: 350,
  },
];

export const fixtures = {
  mockFilmEntity,
  expectedFilmDto,
  expectedSessions,
};