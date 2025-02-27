const NavBar = () => {
  return (
    <div className="flex items-center text-sm">
      <nav className="flex justify-around navbar">
        <a className="link link-hover pt-0">World</a>
        <a className="link link-hover">National</a>
        <a className="link link-hover">Regional</a>
        <a className="link link-hover">Sports</a>
        <a className="link link-hover">Humor</a>
      </nav>
    </div>
  );
};

export default NavBar;
