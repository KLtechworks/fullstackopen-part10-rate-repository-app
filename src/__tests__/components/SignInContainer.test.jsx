// Exercise 10.18: testing the sign in form
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { SignInContainer } from '../../components/SignInContainer';  

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {     
      const mockOnSubmit = jest.fn();
     
      render(<SignInContainer onSubmit={mockOnSubmit} />);
     
      fireEvent.changeText(screen.getByTestId('usernameField'), 'kalle');
      fireEvent.changeText(screen.getByTestId('passwordField'), 'password123');      
      fireEvent.press(screen.getByTestId('submitButton'));
      
      await waitFor(() => {       
        expect(mockOnSubmit).toHaveBeenCalledTimes(1);      
        expect(mockOnSubmit).toHaveBeenCalledWith(
          {
            username: 'kalle',
            password: 'password123',
          },         
          expect.any(Object)
        );
      });
    });
  });
});