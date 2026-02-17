import Header from "../components/layout/Header"
import { Outlet } from "react-router-dom"
import './MainLayout.css'

export default function MainLayout() {
  return (
    <>
    <div className="layout">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
    </>
  )
}
