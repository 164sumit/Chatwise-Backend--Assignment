// context/AuthContext.tsx
import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { BackendUrl } from '../lib';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any | null;
  login: (user:any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<any | null>(null);
//   const navigation = useNavigate()
  useEffect(()=>{
    const fun=async()=>{
      const token=await localStorage.getItem('token');
      console.log(token);
      
      if(!token){
        setIsAuthenticated(false);
        return;
      }
      setIsLoading(true);
      const {data}=await axios.post(`${BackendUrl}/api/v1/user/me`,{token})
      console.log(data);
      
      if(data){
        setUser(data);
        setIsAuthenticated(true);
        setIsLoading(false);
      }
      else{
        setIsLoading(false);
        setIsAuthenticated(false);
      }
    //   const response=await fetch(`${BackendUrl}/api/v1/user/me`,{
    //     method: 'POST',
    //     body: JSON.stringify({ token: token})
    //   })
    //   if(response.ok){
    //     const data=await response.json();
    //     setUser(data.user);
    //     setIsAuthenticated(true);
    //     setIsLoading(false);
    //   }
    //   else{
    //     setIsLoading(false);
    //     setIsAuthenticated(false);
    //   }
      
    }
    fun()
  },[]);

  const login = (user:any) => {

    setIsAuthenticated(true);
    setUser(user);
    setIsLoading(false);
    // navigation('/posts')

  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
    setIsLoading(false);
    // navigation('/login')

  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout ,user,isLoading}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};