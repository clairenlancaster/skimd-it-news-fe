import { useParams } from 'react-router-dom';
import styles from '../styles/IndividualArticle.module.css';
import Comments from './Comments';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getArticleById, getUser } from '../utils/api';
import formatDate from '../utils/ArticleCard.utils';
import { upVoteArticle, downVoteArticle } from '../utils/api';
import {
  TfiTag,
  TfiComment,
  TfiAngleDown,
  TfiAngleUp,
  TfiThumbUp,
} from 'react-icons/tfi';

const IndividualArticle = () => {
  const { article_id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [article, setArticle] = useState({});
  const [userVote, setUserVote] = useState(0);
  const [userAvatarImg, setUserAvatarImg] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getArticleById(article_id).then((article) => {
      const { author } = article;
      setArticle(article);
      setIsLoading(false);
      getUser(author).then((userAvatarUrl) => {
        setUserAvatarImg(userAvatarUrl);
      });
    });
  }, [article_id]);

  const downVote = () => {
    setArticle((currentArticle) => {
      return { ...currentArticle, votes: article.votes - 1 };
    });
    setUserVote(1);
    setIsError(false);
    downVoteArticle(article.article_id).catch(() => {
      setUserVote(0);
      setIsError(true);
      setArticle((currentArticle) => {
        return { ...currentArticle, votes: article.votes };
      });
    });
  };

  const upVote = () => {
    setArticle((currentArticle) => {
      return { ...currentArticle, votes: article.votes + 1 };
    });
    setUserVote(1);
    setIsError(false);
    upVoteArticle(article.article_id).catch(() => {
      setUserVote(0);
      setIsError(true);
      setArticle((currentArticle) => {
        return { ...currentArticle, votes: article.votes };
      });
    });
  };
  const linkPathToArticlesByTopic = `/topic/${article.topic}`;

  return isLoading ? (
    <h2>Loading</h2>
  ) : (
    <section className={styles.container}>
      <section className={styles.section__articleContainer}>
        <h2 className={styles.h2__articleTitle}>{article.title}</h2>
        <h3 className={styles.h3__articleAuthor}>{article.author}</h3>
        <h4 className={styles.h4__articleDate}>
          {formatDate(article.created_at)}
        </h4>
        <div className={styles.div__articleImgWrapper}>
          <img
            className={styles.img__articleImg}
            src={article.article_img_url}
            alt={article.title}
          />
        </div>
        <section className={styles.div__articleInfo}>
          <div className={styles.container__articleVotes}>
            <button
              className={styles.btn__downVote}
              aria-label="down vote article"
              onClick={() => downVote()}
              disabled={userVote !== 0}
            >
              <TfiAngleDown className={styles.svg__downVote} />
            </button>
            <span className={styles.counter__numberVote}>{article.votes}</span>
            <button
              className={styles.btn__upVote}
              aria-label="up vote article"
              onClick={() => upVote()}
              disabled={userVote !== 0}
            >
              <TfiAngleUp className={styles.svg__upVote} />
            </button>
          </div>

          <div className={styles.link__commentCount}>
            <TfiComment className={styles.svg__commentCount} />
            <p className={styles.p__commentCount}>{article.comment_count}</p>
          </div>

          <Link
            className={styles.link__articleTopicTag}
            to={linkPathToArticlesByTopic}
          >
            <div className={styles.link__topic}>
              <TfiTag className={styles.svg__topicTag} />
              <h4 className={styles.h4__articleTopic}>{article.topic}</h4>
            </div>
          </Link>

          {isError ? (
            <div className={styles.div__errorMessage}>
              <p className={styles.p__errorMessage}>Vote problemo!</p>
            </div>
          ) : null}

          {userVote ? (
            <div className={styles.div__voteSuccess}>
              <p className={styles.p__voteSuccess} aria-label="vote successful">
                <TfiThumbUp /> for vote!
              </p>
            </div>
          ) : null}
        </section>
        <p className={styles.p__articleBody}>{article.body}</p>
        <div className={styles.div__author}>
          <img
            className={styles.image__user}
            src={userAvatarImg}
            alt="logged in user's avatar"
          />
          <h3 className={styles.h3__articleAuthor}>{article.author}</h3>
        </div>
        <section className={styles.div__articleInfo}>
          <div className={styles.container__articleVotes}>
            <button
              className={styles.btn__downVote}
              aria-label="down vote article"
              onClick={() => downVote()}
              disabled={userVote !== 0}
            >
              <TfiAngleDown className={styles.svg__downVote} />
            </button>
            <span className={styles.counter__numberVote}>{article.votes}</span>
            <button
              className={styles.btn__upVote}
              aria-label="up vote article"
              onClick={() => upVote()}
              disabled={userVote !== 0}
            >
              <TfiAngleUp className={styles.svg__upVote} />
            </button>
          </div>

          <div className={styles.link__commentCount}>
            <TfiComment className={styles.svg__commentCount} />
            <p className={styles.p__commentCount}>{article.comment_count}</p>
          </div>

          <div className={styles.link__topic}>
            <TfiTag className={styles.svg__topicTag} />
            <h4 className={styles.h4__articleTopic}>{article.topic}</h4>
          </div>

          {userVote ? (
            <div className={styles.div__voteSuccess}>
              <p className={styles.p__voteSuccess} aria-label="vote successful">
                <TfiThumbUp /> for vote!
              </p>
            </div>
          ) : null}
        </section>
      </section>
      <Comments article_id={article_id} comment_count={article.comment_count} />
    </section>
  );
};

export default IndividualArticle;
