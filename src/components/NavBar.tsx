const NavBar = () => {
  return (
    <div class="flex items-center text-sm">
      <nav class="flex justify-around navbar">
        <a class="link link-hover pt-0">World</a>
        <a class="link link-hover">National</a>
        <a class="link link-hover">Regional</a>
        <a class="link link-hover">Sports</a>
        <a href="/humor-news" class="link link-hover">
          Humor
        </a>
      </nav>
    </div>
  );
};

export default NavBar;
