import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-gray-200 dark:border-gray-800 py-6">
      <div className="flex flex-col items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
        <Link href="/" className="font-medium text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors">
          Playmate
        </Link>
        <p>&copy; {new Date().getFullYear()} Playmate. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
