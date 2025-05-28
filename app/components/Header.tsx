import React from 'react';

const Header = () => {
    return (
        <header className="bg-[#011221]	 px-8 py-4">
            <div className="flex items-center justify-between  mx-auto">
                <div className="flex items-center gap-2">
                    <img src="/logo.png" alt="Logo" className="h-8 w-8" />
                    <span className="text-white text-2xl font-bold font-poppins">extract invoice</span>
                </div>
                <nav className="flex-1 flex justify-center">
                    <ul className="flex gap-8 text-white font-poppins text-base">
                        <li><a href="#" className="hover:text-fuchsia-400 transition">Home</a></li>
                        <li><a href="#" className="hover:text-fuchsia-400 transition">Invoices</a></li>
                        <li><a href="#" className="hover:text-fuchsia-400 transition">Pricing</a></li>
                        <li><a href="#" className="hover:text-fuchsia-400 transition">Contact</a></li>
                        <li><a href="#" className="hover:text-fuchsia-400 transition">Blog</a></li>
                    </ul>
                </nav>
                <div className="flex items-center gap-4">

                    <button className="px-8 py-3 rounded-full text-[14px]  text-white bg-white/20 backdrop-blur-md border border-white/30 shadow-lg hover:bg-white/30 transition duration-300">
                        My Receipts
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;