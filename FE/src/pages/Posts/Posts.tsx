import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  buttonClassName,
  buttonGroupClassName,
  panelClassName,
  panelHeaderClassName,
  postDescriptionClassName,
  postItemClassName,
  postListClassName,
  postMetaClassName,
} from '../../ui';

const Posts = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Gary',
      title: 'A Post',
      createdAt: Date.now(),
    },
  ]);

  return (
    <section className={panelClassName}>
      <div className={panelHeaderClassName}>
        <h1 className='text-3xl font-bold tracking-tight text-slate-900'>
          Posts
        </h1>
        <Link className={buttonClassName()} to='/posts/new'>
          New post
        </Link>
      </div>
      {posts.length === 0 ? (
        <p className='text-slate-700'>
          No posts yet. Start by creating your first entry.
        </p>
      ) : (
        <ul className={postListClassName}>
          {posts.map((post) => {
            return (
              <li key={post.id} className={postItemClassName}>
                <h2 className='text-2xl font-semibold text-slate-900'>
                  {post.title}
                </h2>
                <p className={postMetaClassName}>
                  By TODO on {new Date(post.createdAt).toLocaleString()}
                </p>
                <p className={postDescriptionClassName}>Preview goes here</p>
                <div className={buttonGroupClassName}>
                  <Link
                    className={buttonClassName('secondary')}
                    to={`/posts/${post.id}`}>
                    View
                  </Link>
                  <Link
                    className={buttonClassName('secondary')}
                    to={`/posts/${post.id}/edit`}>
                    Edit
                  </Link>
                  <Link
                    className={buttonClassName('danger')}
                    to={`/posts/${post.id}/delete`}>
                    Delete
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default Posts;
