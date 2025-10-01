"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface DashboardHeaderProps {
  user: User;
}

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActiveLink = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard" || pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const getNavLinkClasses = (href: string, isMobile = false) => {
    const isActive = isActiveLink(href);
    const baseClasses = isMobile
      ? "block px-3 py-2 text-base font-medium rounded-md"
      : "px-3 py-2 text-sm font-medium rounded-md";

    if (isActive) {
      return `${baseClasses} bg-indigo-100 text-indigo-700`;
    }
    return `${baseClasses} text-gray-700 hover:text-gray-900 hover:bg-gray-50`;
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/dashboard" className="text-xl font-bold text-gray-900">
              💰 ExpenseTracker
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link
                href="/dashboard"
                className={getNavLinkClasses("/dashboard")}
              >
                Dashboard
              </Link>
              <Link href="/expenses" className={getNavLinkClasses("/expenses")}>
                Expenses
              </Link>
              <Link
                href="/categories"
                className={getNavLinkClasses("/categories")}
              >
                Categories
              </Link>
              <Link
                href="/analytics"
                className={getNavLinkClasses("/analytics")}
              >
                Analytics
              </Link>
              <Link href="/budgets" className={getNavLinkClasses("/budgets")}>
                Budgets
              </Link>
              <Link href="/goals" className={getNavLinkClasses("/goals")}>
                Goals
              </Link>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700 hover:text-gray-900 p-2"
                aria-label="Toggle menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      isMobileMenuOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16M4 18h16"
                    }
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-3">
            <span className="text-sm text-gray-700 truncate">
              {user?.name || user?.email}
            </span>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-2">
            <nav className="px-2 pt-2 pb-3 space-y-1 bg-white">
              <Link
                href="/dashboard"
                className={getNavLinkClasses("/dashboard", true)}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/expenses"
                className={getNavLinkClasses("/expenses", true)}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Expenses
              </Link>
              <Link
                href="/categories"
                className={getNavLinkClasses("/categories", true)}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Categories
              </Link>
              <Link
                href="/analytics"
                className={getNavLinkClasses("/analytics", true)}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Analytics
              </Link>
              <Link
                href="/budgets"
                className={getNavLinkClasses("/budgets", true)}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Budgets
              </Link>
              <Link
                href="/goals"
                className={getNavLinkClasses("/goals", true)}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Goals
              </Link>
              {/* Mobile User Info and Sign Out */}
              <div className="border-t pt-2 mt-2">
                <div className="px-3 py-2 flex flex-col space-y-2">
                  <div className="text-sm text-gray-500 truncate">
                    {user?.name || user?.email}
                  </div>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-md text-sm font-medium w-full text-left"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
