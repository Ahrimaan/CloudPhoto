import {
    useState,
    useEffect
  } from 'react';
  import { Amplify, Auth, Hub } from 'aws-amplify';
  import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
  import { authenticationConfiguration } from './AuthenticationConfiguration';
  import { IUser } from '../components/common';
  import { AuthenticationContext } from './AuthenticationContext';
  
  Amplify.configure({
    Auth: authenticationConfiguration
  });
  
  
  interface IAuthenticationProviderProps {
    children: React.ReactNode;
  }
  
  const AuthenticationProvider = ({ children }: IAuthenticationProviderProps) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  
    const getCurrentUser = async () => {
      try {
        console.debug('Fetching current user');
        const curUser = await Auth.currentAuthenticatedUser();
        const { picture, email, preferred_username } = curUser.attributes;
        setIsAuthenticated(curUser);
        setUser({
          avatarUrl: picture,
          email: email,
          username: preferred_username,
        });
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
      }
    };
  
    const federatedSignIn = async (provider: CognitoHostedUIIdentityProvider) => {
      try {
        await Auth.federatedSignIn({ provider });
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      if(!user) {
        getCurrentUser();
      }
      const authListener = Hub.listen(
        'auth',
        async ({ payload: { event, data } }) => {
          console.debug('Auth Status Changed Event: ', event);
          console.debug('Auth Status Changed Data: ', data);
          switch (event) {
            case 'signIn':
              await getCurrentUser();
              break;
            case 'signOut':
              setUser(null);
              break;
            case 'signIn_failure':
            case 'signUp_failure':
              if (user) {
                setUser(null);
              }
              break;
            case 'signUp':
            case 'forgotPassword':
            case 'forgotPasswordSubmit':
            case 'forgotPasswordSubmit_failure':
            case 'forgotPassword_failure':
              break;
            default:
              await getCurrentUser();
          }
        }
      );
  
      // cleanup
      return () => {
        authListener();
      };
    }, [user]);
  
    const signOut = async () => Auth.signOut();
  
    const value = {
      user,
      isAuthenticated,
      signOut,
      federatedSignIn,
    };
  
    return (
      <AuthenticationContext.Provider
        value={value} children={children}
      ></AuthenticationContext.Provider>
    );
  };
  
  export { AuthenticationProvider };