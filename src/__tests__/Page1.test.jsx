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

//Template 2 - Form Component

// describe('FormComponent', () => {
//   test('renders form fields', () => {
//     render(<FormComponent />);
//     expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
//     expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
//   });
  
//   test('handles form submission', async () => {
//     const mockSubmit = jest.fn();
//     render(<FormComponent onSubmit={mockSubmit} />);
    
//     fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John' } });
//     fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    
//     expect(mockSubmit).toHaveBeenCalledWith({ name: 'John' });
//   });
  
//   test('shows validation errors', async () => {
//     render(<FormComponent />);
//     fireEvent.click(screen.getByRole('button', { name: /submit/i }));
//     expect(screen.getByText(/required/i)).toBeInTheDocument();
//   });
// });


//Template 3: Simple Display Components
// describe('DisplayComponent', () => {
//   test('renders with props', () => {
//     const props = { title: 'Test Title', content: 'Test Content' };
//     render(<DisplayComponent {...props} />);
//     expect(screen.getByText('Test Title')).toBeInTheDocument();
//     expect(screen.getByText('Test Content')).toBeInTheDocument();
//   });
  
//   test('handles missing props gracefully', () => {
//     render(<DisplayComponent />);
//     // Should not crash, maybe show defaults
//     expect(screen.getByText(/default/i)).toBeInTheDocument();
//   });
// });


//Template 4: Interactive Components (buttons, modals, etc.)
// describe('InteractiveComponent', () => {
//   test('handles user interactions', () => {
//     const mockClick = jest.fn();
//     render(<InteractiveComponent onClick={mockClick} />);
    
//     fireEvent.click(screen.getByRole('button'));
//     expect(mockClick).toHaveBeenCalled();
//   });
  
//   test('updates state on interaction', () => {
//     render(<InteractiveComponent />);
//     fireEvent.click(screen.getByRole('button'));
//     expect(screen.getByText(/clicked/i)).toBeInTheDocument();
//   });
// });
