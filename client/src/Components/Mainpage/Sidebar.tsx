import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import announcement from '../../Icons/announcement.png';
import group from '../../Icons/group.png';
import settings from '../../Icons/settings.png';
import './Sidebar.css';


interface CustomLinkProps {
    inactiveImg?: any;
    activeImg?: any;
    to?: any;
    children?: any;
    isSelectedFunction?: any;
}

function CustomLink({ inactiveImg, activeImg, to, children, isSelectedFunction, ...props }: CustomLinkProps) {
    // const path = window.location.pathname;
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true }); //뭐지 이거 잘 모름 특히 'end', 'true'

    return (
        <li className={isActive ? 'active' : ''}>
            <Link to={to} {...props}>
                <div className={isActive ? "active-line" : ''}></div>
                <img onClick={() => {
                    isSelectedFunction();
                }} src={isActive ? inactiveImg : inactiveImg} className="icon" alt='icon'></img>
                <span className="tooltip">{children}</span>
            </Link>
        </li>
    )
}

interface sidebarProps {
    isSelectedFunction: () => void;
}

function Sidebar({ isSelectedFunction }: sidebarProps) {
    return (
        <div className="sidebar">
            <ul className="nav_list">
                <CustomLink inactiveImg={group} activeImg={group} to="/lobby" isSelectedFunction={isSelectedFunction}>Lobby</CustomLink>
                <CustomLink inactiveImg={announcement} activeImg={announcement} to="/wordSetMain" isSelectedFunction={isSelectedFunction}>Word Sets</CustomLink>
                <CustomLink inactiveImg={settings} activeImg={settings} to="/setting" isSelectedFunction={isSelectedFunction}>Settings</CustomLink>
            </ul>
        </div>

    );
}

export default Sidebar;