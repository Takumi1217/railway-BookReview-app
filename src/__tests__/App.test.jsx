// __tests__/App.test.jsx

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

describe('App Component', () => {
  it('renders email input', () => {
    render(<App />);
    const emailInput = screen.getByLabelText(/メールアドレス/i);
    expect(emailInput).toBeInTheDocument();
  });

  it('renders password input', () => {
    render(<App />);
    const passwordInput = screen.getByLabelText(/パスワード/i);
    expect(passwordInput).toBeInTheDocument();
  });

  it('renders login button', () => {
    render(<App />);
    const loginButton = screen.getByRole('button', { name: /ログイン/i });
    expect(loginButton).toBeInTheDocument();
  });
});
