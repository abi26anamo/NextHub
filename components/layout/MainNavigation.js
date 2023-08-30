import styles from "./MainNavigation.module.css"; 
import Link from "next/link";

const MainNavigation = ()=>{

    return (
        <header className={styles.header}>
            <div className={styles.logo}>NextHub</div>
            <nav >
                <ul>
                    <li>
                     <Link href='/'>All Meetups</Link>
                    </li>
                    <li>
                     <Link href='/new-meetup'>Add New Meetup</Link>
                    </li>
                </ul>
            </nav>

        </header>
    )

}

export default MainNavigation;