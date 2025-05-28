import Link from 'next/link';
import React from 'react';

const Header = () => {
    return (
        <header className="bg-[#011221]	 px-8 py-4">
            <div className="flex items-center justify-between  mx-auto">
                <div className="flex items-center gap-2">
                    <Link href="/" className="text-white text-2xl font-bold font-poppins ">Invoice Extractor</Link>
                </div>
                <nav className="flex-1 flex justify-center">
                    <ul className="flex gap-8 text-white font-poppins text-base">
                        <li><Link href="/" className="hover:text-fuchsia-400 transition">Home</Link></li>
                        <li><Link href="/receipts" className="hover:text-fuchsia-400 transition">Extract Invoices</Link></li>
                        <li><Link href="/coming" className="hover:text-fuchsia-400 transition">Pricing</Link></li>
                        <li><Link href="/coming" className="hover:text-fuchsia-400 transition">Contact</Link></li>
                        <li><Link href="/coming" className="hover:text-fuchsia-400 transition">Blog</Link></li>
                    </ul>
                </nav>
                <div className="flex items-center gap-4">

                    <Link href="/coming" >
                        <button className="px-8 py-3 rounded-full text-[14px]  text-white bg-white/20 backdrop-blur-md border border-white/30 shadow-lg hover:bg-white/30 transition duration-300">
                            Login
                        </button>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;