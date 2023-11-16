import React, { useContext, useState, createContext } from 'react'
import { Outlet } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Dashboard';
import { BigSidebar, Navbar, SmallSidebar } from '../components';
import { checkDefaultTheme } from '../App';

// importing the state values
const DashboardContext = createContext();



const DashboardLayout = ({ isDarkThemeEnabled }) => {

    // before dashboard layout, checking the showSidebar and isDarkTheme functions
    const user = { name: 'john' }
    const [showSidebar, setShowSidebar] = useState(false)
    const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());

    // function to toggle dark theme.
    const toggleDarkTheme = () => {
        const newDarkTheme = !isDarkTheme;
        setIsDarkTheme(newDarkTheme);
        document.body.classList.toggle('dark-theme', newDarkTheme);
        localStorage.setItem('darkTheme', newDarkTheme);
    };

    // function to toggle sidebar
    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    const logoutUser = async () => {
        console.log('logout user');
    }
    return (
        // return the state values
        <DashboardContext.Provider value={{
            user,
            showSidebar,
            isDarkTheme,
            toggleDarkTheme,
            toggleSidebar,
            logoutUser,
        }}>
            <Wrapper>
                <main className="dashboard">
                    <SmallSidebar />
                    <BigSidebar />
                    <div>
                        <Navbar />
                        <div className="dashboard-page">
                            <Outlet />
                        </div>
                    </div>
                </main>
            </Wrapper>
        </DashboardContext.Provider>
    )
}

export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;
