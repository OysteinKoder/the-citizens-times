import { useEffect, useState } from "preact/hooks";
import { supabase } from "../supa-base-client";
import { User } from "@supabase/auth-js";

const Header = () => {
  const [userData, setUserData] = useState<User | null>(null);

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    console.log(error);
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
        <div className="drawer">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col justify-evenly">
            {/* Navbar */}
            <div className="navbar bg-base-300 w-full justify-between">
              <div className="flex flex-row">
                <label
                  htmlFor="my-drawer-2"
                  aria-label="open sidebar"
                  className="btn btn-square btn-ghost"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-6 w-6 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </label>
                <div className="flex-1 text-left">
                  <a className="btn btn-ghost text-xl " href={"/humor-news"}>
                    TCT
                  </a>
                </div>
              </div>
              <div className="flex lg:block">
                <ul className="menu menu-horizontal">
                  {/* Navbar menu content here */}

                  <div className="flex flex-row items-center justify-end flex-none space-x-2 btn-ghost text-xl">
                    <p>Post</p>
                    <a href="/post-news" className="btn btn-square">
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
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 min-h-full w-80 p-4">
              {/* Sidebar content here */}
              <li>
                <span onClick={signOut}>
                  Sign out <span className="underline">{userData.email}</span>
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
  } else {
    <header>
      <div className="drawer">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col justify-evenly">
          {/* Navbar */}
          <div className="navbar bg-base-300 w-full justify-between">
            <div className="flex flex-row">
              <label
                htmlFor="my-drawer-2"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
              <div className="flex-1 text-left">
                <a className="btn btn-ghost text-xl " href={"/humor-news"}>
                  TCT
                </a>
              </div>
            </div>
            <div className="flex lg:block">
              <ul className="menu menu-horizontal">
                {/* Navbar menu content here */}

                <div className="flex flex-row items-center justify-end flex-none space-x-2 btn-ghost text-xl">
                  <p>Post</p>
                  <a href="/post-news" className="btn btn-square">
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
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <li>
              <span onClick={signOut}>Sign out</span>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
          </ul>
        </div>
      </div>
    </header>;
  }
};

export default Header;
