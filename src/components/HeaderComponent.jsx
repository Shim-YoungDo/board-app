import React from 'react';

function HeaderComponent() {
    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="http://localhost:3000" className="navbar-brand"> 게시판</a></div>
                </nav>
            </header>
        </div>
    );
}

export default HeaderComponent;