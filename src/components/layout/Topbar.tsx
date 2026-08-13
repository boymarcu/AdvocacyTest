import { useAuth } from '../../features/auth/useAuth'

export function Topbar() {
  const { session, signOut } = useAuth()

  return (
    <header className="topbar">
      <span className="topbar-user">{session?.user.email}</span>
      <button type="button" className="btn-secondary" onClick={() => signOut()}>
        Sair
      </button>
    </header>
  )
}
