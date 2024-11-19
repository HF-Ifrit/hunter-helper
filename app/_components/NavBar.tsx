import Link from "next/link";

const NAV_ITEMS = ["MONSTER", "WEAPONS", "ARMOR"];
export default function NavBar() {
  return (
    <nav className="flex justify-between items-center border-b-2 border-current px-7">
      <Link href="/" className="flex p-8 rounded-lg hover:bg-amber-300">
        {" "}
        Home
      </Link>
      {/* <div >
                <a href="/" className="">
                    Home
                </a>
            </div>   */}
      <ul className="flex">
        {NAV_ITEMS.map((item) => (
          <li
            key={`navItem-${item}`}
            className="flex underline font-julius hover:bg-amber-300"
          >
            <Link
              href={`/${item !== "MONSTER" ? item.toLowerCase() : ""}`}
              className="my-2 p-8 rounded-lg"
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/collection">Collection</Link>
    </nav>
  );
}
