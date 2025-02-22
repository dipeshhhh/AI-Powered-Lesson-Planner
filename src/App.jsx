import './App.css'
import { useLogin } from './contexts/LoginContext'
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

function App() {
  const { loggedInUser } = useLogin();

  return (
    <div className="flex min-h-[100vh] w-full">
      {!loggedInUser ?
        <Login />
        :
        <Dashboard />
      }
    </div>
  )
}

export default App
