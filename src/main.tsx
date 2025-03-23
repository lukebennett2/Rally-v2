import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { UserProvider } from './contexts/UserContext.tsx';

<UserProvider>
    <App />
</UserProvider>

createRoot(document.getElementById("root")!).render(<App />);
