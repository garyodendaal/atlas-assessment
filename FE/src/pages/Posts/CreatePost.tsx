import { useState } from 'react';
import type { FormEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { createPost } from '../../api';
import Editor from '../../components/Editor';
import { useAuth } from '../../context/AuthContext';
import {
  buttonClassName,
  buttonGroupClassName,
  feedbackErrorClassName,
  formClassName,
  formFieldClassName,
  inputClassName,
  labelClassName,
  panelClassName,
} from '../../ui';

const CreatePost = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!user) {
    return <Navigate to='/login' replace />;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!title.trim() || !content.trim()) {
      setError('Both a title and content are required.');
      return;
    }

    setIsSubmitting(true);
    try {
      const post = await createPost({
        title: title.trim(),
        content,
      });
      navigate(`/posts/${post.id}`);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Unable to create the post at the moment.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setTitle('');
    setContent('');
    setError(null);
  };

  return (
    <section className={panelClassName}>
      <div className='space-y-2'>
        <p className='text-sm font-semibold uppercase tracking-wide text-blue-500'>
          Write a post
        </p>
        <h1 className='text-3xl font-bold tracking-tight text-slate-900'>
          Create a new post
        </h1>
        <p className='text-base text-slate-600'>
          Draft your story with the rich text editor and share it with the
          community.
        </p>
      </div>
      <form className={formClassName} onSubmit={handleSubmit}>
        <div className={formFieldClassName}>
          <label className={labelClassName} htmlFor='title'>
            Title
          </label>
          <input
            id='title'
            name='title'
            type='text'
            className={inputClassName}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder='Give your post a compelling title'
            disabled={isSubmitting}
          />
        </div>
        <div className={formFieldClassName}>
          <label className={labelClassName} htmlFor='content-editor'>
            Content
          </label>
          <Editor
            id='content-editor'
            value={content}
            onChange={setContent}
            className='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-inner'
          />
        </div>
        {error && <p className={feedbackErrorClassName}>{error}</p>}
        <div className={buttonGroupClassName}>
          <button
            type='submit'
            className={buttonClassName()}
            disabled={isSubmitting}>
            {isSubmitting ? 'Publishing…' : 'Publish post'}
          </button>
          <button
            type='button'
            className={buttonClassName('secondary')}
            onClick={handleReset}
            disabled={isSubmitting}>
            Clear
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
