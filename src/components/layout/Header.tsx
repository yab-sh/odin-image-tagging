import './Header.css'
// TODO: Replace with actual timer component

export default function Header() {
    return (
    <>
        <div className="header">
            <h1>Timer: 0</h1>
            <h1>Odin Image Tagging</h1>
            <ul className="action-buttons">
                <li><a href="/">Home</a></li>
                <li><a href="/leaderboard">Leader Board</a></li>
                <li><a href="/about">About</a></li>
            </ul>
        </div>
    </>    
    )
}
