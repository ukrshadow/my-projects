import { Outlet } from "react-router-dom"
import Header from "../Header"
import Footer from "../Footer"

function Layout() {
  return (
    <>
      <Header />
      <main>
        <div className="container mx-auto">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Layout