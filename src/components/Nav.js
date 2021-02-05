import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'gatsby';
import '../styles/navbar.scss';

const Nav = props => {
  const [navShow, setNavShow] = useState('hide');
  const [showMobileNav, setShowMobileNav] = useState('-400px');
  const [navToogleClass, setNavToggleClass] = useState('');
  const [activeTab, setActiveTab] = useState(null);
  const navbarRef = useRef(null);
  
  const {menuLinks, siteTitle } = props;

  const handleNavTransition = () => {
    if (props.navStyle === 'homeNav') {
      setTimeout(() => {
        setNavShow('navBar');
      }, 100);
    } else {
      setNavShow('navBar');
    }
  }

  const handleMobileNavToggle = () => {
    if (showMobileNav === '0') {
      setShowMobileNav('-400px');
      setNavToggleClass('')
    } else {
      setShowMobileNav('0');
      setNavToggleClass('open')
    }
  }

  const handleActiveTab = () => {
    const tabName = window ? window.location.href.match(/\/[-\w]*?\/?$/ig)[0] : undefined;
    setActiveTab(tabName);
  }

  const checkWindowAndRef = () => {
    if (window === 'undefined' && !navbarRef.current.style) {
      return false;
    }
    return true;
  }

  const changeNavBackground = () => {
    if (!checkWindowAndRef()) return;
    if ( window.scrollY > 0 ) {
      navbarRef.current.style.backgroundColor = '#fcdfa6f6';
    } else {
      navbarRef.current.style.backgroundColor = 'transparent';
    }
  }

  const hideNavOnScroll = () => {
    if (!checkWindowAndRef()) return;
    let prevScrollY = window.scrollY;
    window.onscroll  = () => {
      changeNavBackground();
      const currentScrollY = window.scrollY;
      if (prevScrollY < currentScrollY && currentScrollY > 50) {
        navbarRef.current.classList.add('scrollNav');
      } else {
        navbarRef.current.classList.remove('scrollNav');
      }
      prevScrollY = currentScrollY;
    }
  }

  useEffect(() => {
    hideNavOnScroll();
    handleNavTransition();
    handleActiveTab();
    changeNavBackground();
  });

    return (
      <>
        <div className='navContainer'>
          <button className='mobileNavButton' onClick={handleMobileNavToggle}>
            <div id='nav-icon2' className={navToogleClass}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
        <nav className={navShow}  ref={navbarRef} style={{marginRight: showMobileNav}} role='navigation'>
          <ul className={`defaultNav ${props.navStyle}`} >
            {menuLinks.map(link => {
              console.log(activeTab, link.name)
              return (
                <li className={ activeTab === link.link ? 'activeTab' : ''} key={link.name}>
                  <Link to={link.link}>
                    {link.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </>
    );
}

export default Nav;
