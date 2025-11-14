import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { getPosts } from '../../api/posts';
import type { Post } from '../../types';
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

export const POSTS_PAGE_SIZE = 5;

type LoaderData = {
  posts: Post[];
  total: number;
};

export const loader = async () => {
  const data = await getPosts({ page: 1, limit: POSTS_PAGE_SIZE });
  return data;
};

const Posts = () => {
  const { posts: initialPosts, total } = useLoaderData() as LoaderData;
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(initialPosts.length < total);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const loadMorePosts = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;
    setIsLoadingMore(true);
    try {
      const nextPage = currentPage + 1;
      const { posts: nextPosts } = await getPosts({
        page: nextPage,
        limit: POSTS_PAGE_SIZE,
      });

      setPosts((prev) => {
        const updated = [...prev, ...nextPosts];
        setHasMore(updated.length < total);
        return updated;
      });
      setCurrentPage(nextPage);
    } finally {
      setIsLoadingMore(false);
    }
  }, [currentPage, hasMore, isLoadingMore, total]);

  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadMorePosts();
          }
        });
      },
      { rootMargin: '200px' }
    );

    const target = sentinelRef.current;
    if (target) {
      observer.observe(target);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasMore, loadMorePosts]);

  return (
    <section className={panelClassName}>
      <div className={panelHeaderClassName}>
        <h1 className='text-3xl font-bold tracking-tight text-slate-900'>
          Posts
        </h1>
        <Link className={buttonClassName()} to='/posts/create'>
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
                  By {post.userId ?? 'Unknown author'}
                  {post.createdAt
                    ? ` on ${new Date(post.createdAt).toLocaleString()}`
                    : ''}
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
      <div ref={sentinelRef} className='mt-4 flex justify-center'>
        {isLoadingMore && hasMore && (
          <p className='text-sm text-slate-500'>Loading more posts…</p>
        )}
        {!hasMore && posts.length > 0 && (
          <p className='text-sm text-slate-500'>You&#39;re all caught up.</p>
        )}
      </div>
    </section>
  );
};

export default Posts;
