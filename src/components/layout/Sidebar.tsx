import { NavLink } from 'react-router-dom'
import { appRoutes } from '../../app/routes'

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">AdvocacyTest</div>
      <nav>
        {appRoutes.map((route) => (
          <NavLink
            key={route.path}
            to={`/${route.path}`}
            className={({ isActive }) => (isActive ? 'sidebar-link active' : 'sidebar-link')}
          >
            {route.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
