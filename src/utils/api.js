import axios from 'axios';

const newsApi = axios.create({
  baseURL: 'https://news-project-8i4e.onrender.com/api',
});

export const getArticles = () => {
  return newsApi.get('/articles').then(({ data }) => {
    return data.articles;
  });
};

export const getArticleById = (article_id) => {
  return newsApi.get(`/articles/${article_id}`).then(({ data }) => {
    return data.articles;
  });
};

export const getUser = (author) => {
  return newsApi.get(`/users/${author}`).then(({ data }) => {
    return data.users.avatar_url;
  });
};
