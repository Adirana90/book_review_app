import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Toaster } from "react-hot-toast";
import { Logout } from "./auth/logout";
import { User } from "./auth/user";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Dashboard", href: "/dashboard" },
];

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const location = useLocation();

  return (
    <div className="bg-gradient-to-br from-[#E7D4B5] to-[#EBE3D5] min-h-screen flex flex-col">
      <Disclosure as="nav" className="bg-[#A0937D] shadow-lg">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <Link to="/" className="flex-shrink-0">
                    <img
                      className="h-16 w-auto rounded-full"
                      src="../../../public/logo.png"
                      alt="Your App"
                    />
                  </Link>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={clsx(
                            location.pathname === item.href
                              ? "text-[#3C3633]"
                              : "text-white hover:bg-[#B6C7AA] hover:text-black",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                          aria-current={
                            location.pathname === item.href ? "page" : undefined
                          }
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <MenuButton className="relative flex max-w-xs items-center rounded-full bg-[#B6C7AA] text-sm focus:outline-none focus:ring-0 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#E9EED9]">
                          <span className="sr-only">Open user menu</span>
                          <UserCircleIcon
                            className="h-8 w-8 rounded-full text-black"
                            aria-hidden="true"
                          />
                          <User />
                        </MenuButton>
                      </div>
                      <Transition
                        as={React.Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <MenuItem>
                            <a className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-[#242324] hover:text-white">
                              <Logout />
                            </a>
                          </MenuItem>
                        </MenuItems>
                      </Transition>
                    </Menu>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  <DisclosureButton className="inline-flex items-center justify-center rounded-md bg-[#D6C0B3] p-2 text-black hover:bg-[#B17457] hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#B17457]">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </DisclosureButton>
                </div>
              </div>
            </div>

            <DisclosurePanel className="md:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                {navigation.map((item) => (
                  <DisclosureButton
                    key={item.name}
                    as={Link}
                    to={item.href}
                    className={clsx(
                      location.pathname === item.href
                        ? "bg-[#B6C7AA] text-white"
                        : "text-black",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={
                      location.pathname === item.href ? "page" : undefined
                    }
                  >
                    {item.name}
                  </DisclosureButton>
                ))}
              </div>
              <div className="border-t border-[#3C3D37] pb-3 pt-4">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <UserCircleIcon
                      className="h-10 w-10 rounded-full text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-white">
                      <User />
                    </div>
                    <div className="text-sm font-medium leading-none text-gray-300">
                      user@example.com
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  <DisclosureButton
                    as="a"
                    href="#"
                    className="block rounded-md px-3 py-2 text-base font-medium text-black"
                    onClick={() => {
                      console.log("Logout clicked");
                      // Add logout logic here
                    }}
                  >
                    Sign out
                  </DisclosureButton>
                </div>
              </div>
            </DisclosurePanel>
          </>
        )}
      </Disclosure>

      <main className="flex-1 py-12 px-6">
        <div className="mx-auto max-w-7xl">{children}</div>
        <Toaster />
      </main>

      <footer className="bg-[#B6C7AA] text-white shadow-inner mt-auto">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-black">The Book Shelf</h2>
            <p className="text-sm text-black">
              Find new and classic book all in one place.
            </p>
          </div>
          <div>
            <p className="text-sm text-black">
              © 2024 The Book Shelf. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
