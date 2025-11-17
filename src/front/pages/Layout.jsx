import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop.jsx"
import { Navbar } from "../components/Navbar.jsx"
import { Footer } from "../components/Footer.jsx"
import { Alert } from "../components/Alert.jsx"

// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const Layout = () => {
    return (
        <ScrollToTop>
            <Navbar />
            <Alert/>
                <Outlet />
            <Footer />
        </ScrollToTop>
    )
}