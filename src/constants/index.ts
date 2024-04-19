export enum HTTP_STATUSES {
  OK_200 = 200,
  CREATED_201 = 201,
  NO_CONTENT_204 = 204,
  BAD_REQUEST = 205,
  NOT_FOUND_404 = 404,
  BAD_REQUEST_400 = 400,
  UNAUTHORIZED = 401,
}

export enum AVAILABLE_RESOLUTIONS {
  P2160 = 'P2160',
  P1440 = 'P1440',
  P1080 = 'P1080',
  P720 = 'P720',
  P480 = 'P480',
  P360 = 'P360',
  P240 = 'P240',
  P144 = 'P144',
}

export const RouterPaths = {
  videos: '/videos',
  testing: '/testing',
  blogs: '/blogs',
  posts: '/posts',
};

export const username = 'admin';
export const password = 'qwerty';
