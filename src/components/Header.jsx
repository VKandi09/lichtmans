import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 bg-white w-full shadow z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">Lichtman's Wine & Liquor Store Inc.</Link>
        <nav className="flex items-center gap-4">
          <Link to="/products" className="hover:underline">Explore Products</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header