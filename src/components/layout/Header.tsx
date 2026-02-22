import './Header.css'
import Timer from './Timer'

export default function Header() {
    return (
    <>
        <div className="header">
            <h1>Find'em</h1>
            <Timer />
            <ul className="action-buttons">
                <li><a href="/">Home</a></li>
                <li><a href="/leaderboard">Leader Board</a></li>
                <li><a href="/about">About</a></li>
            </ul>
        </div>
    </>    
    )
}
