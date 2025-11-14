import { useEffect, useState, useRef } from "preact/hooks";
import { supabase } from "../supa-base-client";
import { User } from "@supabase/auth-js";

const Header = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const drawerToggleRef = useRef<HTMLInputElement | null>(null);

  async function signOut() {
    // close drawer first
    if (drawerToggleRef.current) drawerToggleRef.current.checked = false;
    const { error } = await supabase.auth.signOut();
    console.log(error);
  }

  function closeDrawer() {
    if (drawerToggleRef.current) drawerToggleRef.current.checked = false;
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserData(session?.user ?? null);
      console.log(userData);
    });
  }, []);

  if (userData) {
    return (
      <header>
        <div class="drawer z-10">
          <input
            id="my-drawer-2"
            type="checkbox"
            class="drawer-toggle"
            ref={drawerToggleRef}
          />
          <div class="drawer-content flex flex-col justify-evenly">
            {/* Navbar */}
            <div class="navbar bg-base-300 w-full justify-between">
              <div class="flex flex-row">
                <label
                  htmlFor="my-drawer-2"
                  aria-label="open sidebar"
                  class="btn btn-square btn-ghost"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    class="inline-block h-6 w-6 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </label>
                <div class="flex-1 text-left">
                  <a
                    class="btn btn-ghost text-xl "
                    href={"/humor-news"}
                    onClick={closeDrawer}
                  >
                    TCT
                  </a>
                </div>
              </div>
              <div class="flex lg:block">
                <ul class="menu menu-horizontal">
                  {/* Navbar menu content here */}

                  <div class="flex flex-row items-center justify-end flex-none space-x-2 btn-ghost text-xl">
                    <p>Post</p>
                    <a href="/post-news" class="btn btn-square">
                      <svg
                        class="w-6 h-6 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 12h14m-7 7V5"
                        />
                      </svg>
                    </a>
                  </div>
                </ul>
              </div>
            </div>
            {/* Page content here */}
          </div>
          <div class="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              class="drawer-overlay"
            ></label>
            <ul class="menu bg-base-200 min-h-full w-80 p-4">
              {/* Sidebar content here */}
              <li>
                <span onClick={signOut}>
                  Sign out <span class="underline">{userData.email}</span>
                </span>
              </li>
              <li>
                <a href="/user-settings" onClick={closeDrawer}>
                  Settings{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    class="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </header>
    );
  } else {
    return (
      <header>
        <div class="drawer">
          <input
            id="my-drawer-2"
            type="checkbox"
            class="drawer-toggle"
            ref={drawerToggleRef}
          />
          <div class="drawer-content flex flex-col justify-evenly">
            {/* Navbar */}
            <div class="navbar bg-base-300 w-full justify-between">
              <div class="flex flex-row">
                <label
                  htmlFor="my-drawer-2"
                  aria-label="open sidebar"
                  class="btn btn-square btn-ghost"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    class="inline-block h-6 w-6 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </label>
                <div class="flex-1 text-left">
                  <a class="btn btn-ghost text-xl " href={"/humor-news"}>
                    TCT
                  </a>
                </div>
              </div>
              <div class="flex lg:block">
                <ul class="menu menu-horizontal">
                  {/* Navbar menu content here */}

                  <div class="flex flex-row items-center justify-end flex-none space-x-2 btn-ghost text-xl">
                    <p>Post</p>
                    <a
                      href="/post-news"
                      class="btn btn-square"
                      onClick={closeDrawer}
                    >
                      <svg
                        class="w-6 h-6 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 12h14m-7 7V5"
                        />
                      </svg>
                    </a>
                  </div>
                </ul>
              </div>
            </div>
            {/* Page content here */}
          </div>
          <div class="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              class="drawer-overlay"
            ></label>
            <ul class="menu bg-base-200 min-h-full w-80 p-4">
              {/* Sidebar content here */}
              <li>
                <span
                  onClick={() => {
                    closeDrawer();
                  }}
                >
                  Sign out
                </span>
              </li>
              <li>
                <a>Sidebar Item 2</a>
              </li>
            </ul>
          </div>
        </div>
      </header>
    );
  }
};

export default Header;
