import React from 'react';
import { Link} from 'react-router';
//import './menu.scss';

class Menu extends React.Component {
    render() {
        return (
            <div>
                <header id="header">
                    <section id="menu">
                        <nav id="menu_gral">
                            <ul className="menu">
                                <li><Link to="home">HOME</Link></li>
                                <li><Link to="moviesPage">MOVIES</Link>
                                    <ul className="sub-menu">
                                        <li><Link to="moviesPage">Search</Link></li>
                                    </ul>
                                </li>

                                <li><Link to="help" >HELP</Link></li>
                                <li><Link to="about" >ABOUT</Link></li>
                                <li><Link to="contactUs" >CONTACT</Link></li>
                            </ul>
                        </nav>

                    </section>
                </header>
            </div>

        );
    }
}


export default Menu;