import { useState, useEffect } from 'react';

export function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);

  const totalPosts = posts.length;
  const pageSize = 20;
  const pages = Math.floor(totalPosts / pageSize);

  const goToPrev = () => {
    const prevPage = Math.max(currentPage - 1, 1);
    setCurrentPage(prevPage);
  };

  const goToNext = () => {
    const nextPage = Math.min(currentPage + 1, pages);
    setCurrentPage(nextPage);
  };

  const start = pageSize * (currentPage - 1);
  const end = pageSize * currentPage;
  const postsPerPage = posts.slice(start, end);

  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < pages;

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts/')
      .then((response) => response.json())
      .then((posts) => {
        setPosts(posts);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      <div className='flex'>
        <button disabled={!canGoPrev} onClick={goToPrev}>
          prev
        </button>
        <p>
          {currentPage} of {pages}
        </p>
        <button disabled={!canGoNext} onClick={goToNext}>
          next
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : posts ? (
        <div>
          {postsPerPage.map((item, index) => (
            <div key={index}>
              <h2>{item.title}</h2>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
}
