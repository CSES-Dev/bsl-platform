import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navigationLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Events", href: "/events" },
    { label: "Apply", href: "/apply" },
  ];

  return (
    <footer className="mt-16 bg-gray-50 border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold text-black">BIG STRATEGY LABS</h3>
            <p className="text-sm text-gray-600">
              An invite-only hub for innovation, leadership, and strategic growth.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-gray-900">Navigation</h4>
            <nav className="flex flex-row flex-wrap gap-4">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-gray-600 hover:text-black transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-gray-900">Contact</h4>
            <a
              href="mailto:hello@bigstrategylabs.com"
              className="text-sm text-gray-600 hover:text-black transition-colors"
            >
              hello@bigstrategylabs.com
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-8">
          {/* Copyright */}
          <p className="text-center text-sm text-gray-600">
            © {currentYear} Big Strategy Labs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
