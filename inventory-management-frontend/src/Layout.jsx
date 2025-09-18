import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

export default function Layout(){
    return (
        <div className="min-h-screen">
            {/* Sparkle elements */}
            <div className="sparkle"></div>
            <div className="sparkle"></div>
            <div className="sparkle"></div>
            <div className="sparkle"></div>
            <div className="sparkle"></div>
            
            <NavBar />
            <main className="min-h-screen">
                <Outlet />
            </main>
        </div>
    )
}