import React from "react"
export default function NavBar() {
    const NAV_ITEMS = ["MONSTER", "WEAPONS", "ARMOR"]
    return (
        <nav className="flex justify-between items-center border-b-2 border-current px-7">
            <div className="flex p-8 rounded-lg hover:bg-amber-300">
                <a href="/" className="">
                    Home
                </a>
            </div>  
            <ul className="flex">
                {NAV_ITEMS.map(item => <>
                    <li key={`navItem-${item}`} className="flex underline font-julius hover:bg-amber-300">
                        <a href={"/" + item.toLowerCase()} className="my-2 p-8 rounded-lg">{item}</a>
                    </li>
                </>)}
            </ul>
            <div>
                <a href="/collection">
                    Collection
                </a>
            </div>
        </nav>
    )
}