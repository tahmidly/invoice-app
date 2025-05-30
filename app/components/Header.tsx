'use client'
import { Bot, Menu } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="bg-[#011221] px-8 py-4">
            <div className="flex items-center justify-between mx-auto relative">
                <div className="flex items-center gap-2">
                    <Link href="/" className="text-white text-xl  font-bold font-poppins flex items-center gap-5"> <span className='text-fuchsia-400'><Bot /></span> Tivoize</Link>
                </div>
                {/* Hamburger for mobile */}

                {/* Desktop nav */}
                <nav className="flex-1 flex justify-center">
                    <ul className="md:flex gap-8 text-white font-poppins text-base hidden">
                        <li><Link href="/" className="hover:text-fuchsia-400 transition">Home</Link></li>
                        <li><Link href="/receipts" className="hover:text-fuchsia-400 transition">Extract Invoices</Link></li>
                        <li><Link href="/coming" className="hover:text-fuchsia-400 transition">Pricing</Link></li>
                        <li><Link href="/coming" className="hover:text-fuchsia-400 transition">Contact</Link></li>
                        <li><Link href="/coming" className="hover:text-fuchsia-400 transition">Blog</Link></li>
                    </ul>
                </nav>
                <div className="flex items-center gap-4">
                    <Link href="/coming" >
                        <button className="px-8 py-3 hidden md:block rounded-full text-[14px] text-white bg-white/20 backdrop-blur-md border border-white/30 shadow-lg hover:bg-white/30 transition duration-300">
                            Login
                        </button>
                    </Link>


                </div>

                <button
                    className="md:hidden flex flex-col justify-center items-center w-5 h-10 z-20"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <Menu />
                </button>
                {/* Mobile nav overlay */}
                <div
                    className={`fixed inset-0 bg-black/60 z-10 transition-opacity duration-300 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                    onClick={() => setMenuOpen(false)}
                ></div>
                <nav
                    className={`fixed top-0 right-0 h-full w-64  bg-[#01122175] backdrop-blur-md    z-20 transform transition-transform duration-300 ${menuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden flex flex-col`}
                >
                    <ul className="flex flex-col gap-6 mt-24 px-8 text-white font-poppins text-lg">
                        <li><Link href="/" className="hover:text-fuchsia-400 transition" onClick={() => setMenuOpen(false)}>Home</Link></li>
                        <li><Link href="/receipts" className="hover:text-fuchsia-400 transition" onClick={() => setMenuOpen(false)}>Extract Invoices</Link></li>
                        <li><Link href="/coming" className="hover:text-fuchsia-400 transition" onClick={() => setMenuOpen(false)}>Pricing</Link></li>
                        <li><Link href="/coming" className="hover:text-fuchsia-400 transition" onClick={() => setMenuOpen(false)}>Contact</Link></li>
                        <li><Link href="/coming" className="hover:text-fuchsia-400 transition" onClick={() => setMenuOpen(false)}>Blog</Link></li>
                        <li><Link href="/coming" onClick={() => setMenuOpen(false)}>
                            <button className="w-full px-8 py-3 rounded-full text-[14px] text-white bg-white/20 backdrop-blur-md border border-white/30 shadow-lg hover:bg-white/30 transition duration-300">
                                Login
                            </button>
                        </Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;