import { FaUserCircle, FaCaretDown } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/LogoutContainer';
import { useState } from 'react';
import { useDashboardContext } from '../pages/DashboardLayout';

// this is the logout container, this will prop up when you click the username button on
// the top right of the page.
const LogoutContainer = () => {
    const [showLogout, setShowLogout] = useState(false);
    const { user, logoutUser } = useDashboardContext();

    return (
        <Wrapper>
            <button type='button' className='btn logout-btn'
                onClick={() => { setShowLogout(!showLogout) }}>
                <FaUserCircle />
                {user?.name}
                <FaCaretDown />
            </button>
            <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
                <button type='button'
                    className='dropdown-btn'
                    onClick={logoutUser}>
                    logout
                </button>

            </div>
        </Wrapper>
    )
}

export default LogoutContainer;
