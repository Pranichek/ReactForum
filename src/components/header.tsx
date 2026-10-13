interface HeaderProps {
    title: string,
    description: string
}

export function Header({title, description}: HeaderProps){
    return (
        <header className="header">
            <h1 className="header-title">{title}</h1>
            <p className="header-description">{description}</p>
        </header>
    )
}