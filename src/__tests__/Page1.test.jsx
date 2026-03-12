import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Page1 from '../pages/Page1';
import { api } from '../services/api';

jest.mock('../services/api');
jest.mock('../components/shared/Loading', () => () => <div>Loading...</div>);

const mockPosts = [
  { id: 1, userId: 1, title: 'Post 1', body: 'Body 1' },
  { id: 2, userId: 2, title: 'Post 2', body: 'Body 2' },
];

const mockUsers = [
  { id: 1, name: 'User 1' },
  { id: 2, name: 'User 2' },
];

const renderPage1 = () => {
  return render(
    <BrowserRouter>
      <Page1 />
    </BrowserRouter>
  );
};

describe('Page1', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state', () => {
    api.get.mockImplementation(() => new Promise(() => {}));
    renderPage1();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders posts after successful fetch', async () => {
    api.get.mockImplementation((url) => {
      if (url === '/posts') return Promise.resolve(mockPosts);
      if (url === '/users') return Promise.resolve(mockUsers);
    });

    renderPage1();

    await waitFor(() => {
      expect(screen.getByText('Post List')).toBeInTheDocument();
      expect(screen.getByText('Post 1')).toBeInTheDocument();
      expect(screen.getByText('User 1')).toBeInTheDocument();
    });
  });

  test('renders error message on fetch failure', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    api.get.mockRejectedValue(new Error('API Error'));

    renderPage1();

    await waitFor(() => {
      expect(screen.getByText('Failed while fetch post')).toBeInTheDocument();
    });

    consoleErrorSpy.mockRestore();
  });

  test('displays pagination controls', async () => {
    const largeMockPosts = Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      userId: 1,
      title: `Post ${i + 1}`,
      body: `Body ${i + 1}`,
    }));

    api.get.mockImplementation((url) => {
      if (url === '/posts') return Promise.resolve(largeMockPosts);
      if (url === '/users') return Promise.resolve(mockUsers);
    });

    renderPage1();

    await waitFor(() => {
      expect(screen.getByText('Previous')).toBeInTheDocument();
      expect(screen.getByText('Next')).toBeInTheDocument();
    });
  });
});
