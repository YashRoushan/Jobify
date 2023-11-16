import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
import Wrapper from '../assets/wrappers/ThemeToggle';
import { useDashboardContext } from '../pages/DashboardLayout';

// this will change the toggle theme bar's image and text if you click on the toggle theme icon 
// on the top right of the page
const ThemeToggle = () => {
    const { isDarkTheme, toggleDarkTheme } = useDashboardContext();
    return <Wrapper onClick={toggleDarkTheme}>
        {isDarkTheme ? (<BsFillSunFill className='toggle-icon' />) : (<BsFillMoonFill />)}
    </Wrapper>
}

export default ThemeToggle
