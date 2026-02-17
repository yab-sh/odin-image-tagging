import './List.css'

type ListProps = {
    items: any[];
}

export default function List({ items } : ListProps ) {
    return (
    <>
        <ul className="list">
            {items.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
        </ul>
    </>
    )
}