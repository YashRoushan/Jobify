import { FaUserCircle, FaCaretDown } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/LogoutContainer';
import { useState } from 'react';
import { useDashboardContext } from '../pages/DashboardLayout';

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

// todo tomorrow I will work on the theme toggle container, I can watch the previous video if I want for a better understanding of the project. Skip all the css videos as it can be done through chatgpt too. video 50 theme toggle
