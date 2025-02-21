import './App.css'
import { useLogin } from './contexts/LoginContext'
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

function App() {
  const {loggedInUser} = useLogin();

  return (
    <div className="flex min-w-[100vw] min-h-[100vh]">
    {!loggedInUser ?
    <Login />
    :
    <Dashboard />
    }
    </div>
  )
}

export default App
