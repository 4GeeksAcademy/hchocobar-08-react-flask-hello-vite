import { Outlet } from "react-router-dom/dist"
// Custom components
import ScrollToTop from "../components/ScrollToTop.jsx"
import { Navbar } from "../components/Navbar.jsx"
import { Footer } from "../components/Footer.jsx"
import { Alert } from "../components/Alert.jsx"


export const Layout = () => {
    return (
        <div>
            {/* <ScrollToTop> */}
            <Navbar />
            <Alert />
                <Outlet />
            <Footer />
            {/* </ScrollToTop> */}

        </div>
    )
}