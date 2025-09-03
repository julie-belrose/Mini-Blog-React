import { NavLink } from 'react-router-dom';

export function Navigation() {
    const style = ({ isActive }: { isActive: boolean }) => ({
        fontWeight: isActive ? "bold" : "normal",
        textDecoration: "none",
    });

    //TODO internalization (i18n)
    return (
        <nav style={{ marginBottom: "1rem" }}>
            <NavLink to="/" style={style}>
                Posts
            </NavLink>{" "}
            |{" "}
            <NavLink to="/create" style={style}>
                Create
            </NavLink>
        </nav>
    );
}
