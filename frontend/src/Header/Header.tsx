import './Header.css';

function Header() {
    return (
        <header className="header">
            <h1 className="header-title">My website</h1>
            <nav className="header-nav">
                <ul className="header-nav-list">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Contact</a></li>
                    <li><a href="#">Services</a></li>
                    <li><a href="#">About</a></li>
                </ul>
            </nav>
            <hr className="header-divider" />
        </header>
    );
}

export default Header;