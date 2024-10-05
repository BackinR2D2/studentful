import { Route, Routes } from 'react-router-dom';
import { Spacer, IconButton, Image, useDisclosure } from '@chakra-ui/react'
import {
  AppShell,
  Sidebar as SidebarComp,
  SidebarSection,
  SidebarOverlay,
  NavItem,
  NavGroup,
} from '@saas-ui/react'
import {
  FiHome,
  FiStar,
  FiChevronsLeft,
  FiChevronsRight,
} from 'react-icons/fi'
import Homepage from './pages/Homepage';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Nav from './components/static/Navbar';
import useAuth from './hooks/useAuth';
import Auth from './components/static/Auth';

function App() {   
  const { isOpen, onToggle } = useDisclosure({
    defaultIsOpen: true,
  })
  const {user} = useAuth();
  
  if(!user) {
    return (
      <>
        <Routes>
            <Route path={'/'} element={
              <Auth>
                <Homepage />
              </Auth>
              } />            
          </Routes>
          <Routes>
            <Route path={'/register'} element={<Register />} />            
         </Routes>
         <Routes>
           <Route path={'/login'} element={<Login />} />            
        </Routes>
     </>
    );
  }

  return (
      <AppShell
      sidebar={
        <SidebarComp
          toggleBreakpoint={false}
          variant={isOpen ? 'default' : 'compact'}
          transition="width"
          transitionDuration="normal"
          width={isOpen ? '280px' : '14'}
          minWidth="auto"
        >
          <SidebarSection direction={isOpen ? 'row' : 'column'}>
            <Image
              src="https://saas-ui.dev/favicons/favicon-96x96.png"
              boxSize="6"
              mb="1"
              display={isOpen ? 'block' : 'none'}
            />
            <Spacer />
            <IconButton
              onClick={onToggle}
              variant="ghost"
              size="sm"
              icon={isOpen ? <FiChevronsLeft /> : <FiChevronsRight />}
              aria-label="Toggle Sidebar"
            />
          </SidebarSection>

          <SidebarSection flex="1" overflowY="auto" overflowX="hidden">
            <NavGroup>
              <NavItem icon={<FiHome />}>
                All users
              </NavItem>
              <NavItem icon={<FiStar />}>Favourite users</NavItem>
            </NavGroup>
          </SidebarSection>
          <SidebarOverlay zIndex="1" />
        </SidebarComp>
      }
    >
        <Nav />
        <Route path={'/'} element={
              <Auth>
                <Homepage />
              </Auth>
              } />     
         <Routes>
           <Route path={'/register'} element={<Register />} />            
         </Routes>
         <Routes>
           <Route path={'/login'} element={<Login />} />            
         </Routes>
    </AppShell>
  )
}

export default App
