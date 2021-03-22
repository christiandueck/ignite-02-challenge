import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import './styles/global.scss';
import { MoviesProvider } from './contexts/MoviesContext';

export function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <MoviesProvider>
        <SideBar />
        <Content />
      </MoviesProvider>
    </div>
  )
}