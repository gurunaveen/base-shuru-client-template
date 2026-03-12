import { useState, useEffect } from "react";
import { api } from "../services/api";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";

const Page1 = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = posts.slice(startIndex, startIndex + postsPerPage);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postData = await api.get("/posts");
        const userData = await api.get("/users");
        const modifiedData = postData.map((post) => ({
          ...post,
          userName: userData.find((user) => user.id === post.userId)?.name,
        }));
        setPosts(modifiedData);
      } catch (err) {
        console.error(err);
        setError("Failed while fetch post");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <>
      <div class="container">
        <h2>Post List</h2>
        <Link
          to={"/post/create"}
          className="col-md-12 d-flex justify-content-end mb-3"
        >
          <button className="btn btn-primary">Create</button>
        </Link>

        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Id</th>
                <th>UserName</th>
                <th>Title</th>
                <th>Body</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((post) => (
                <tr key={post.id}>
                  <th>{post.id}</th>
                  <th>{post.userName}</th>
                  <th>{post.title}</th>
                  <th>{post.body}</th>
                  <th>
                    <Link to={`/post/update/${post.id}`}>Edit</Link>
                    <Link to={`/post/view/${post.id}`}>View</Link>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <nav>
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
                Previous
              </button>
            </li>
            {[...Array(totalPages)].map((_, i) => (
              <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Page1;
