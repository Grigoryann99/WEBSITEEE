import Image from 'next/image';

export default function Footer() {
    return (
        <footer id="footer" className="bg-brand-dark pt-24 pb-12 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="md:col-span-2">
                        <div className="flex items-center space-x-3 mb-6">
                            <Image
                                src="/logo_final.png"
                                alt="Velora Logo"
                                width={64}
                                height={64}
                                className="w-16 h-auto mb-[2px]"
                            />
                            <div className="font-montserrat text-3xl tracking-widest text-brand-light flex items-center">
                                VELORA<span className="text-brand-accent">.</span>
                            </div>
                        </div>
                        <p className="font-sans text-brand-light/60 font-light max-w-sm leading-relaxed">
                            Curating the world&apos;s most exclusive sanctuaries for discerning travelers.
                            Elevating escapism into an art form.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-sans uppercase tracking-widest text-xs text-brand-light mb-6">Explore</h4>
                        <ul className="space-y-4 font-sans font-light text-brand-light/60 text-sm">
                            <li><span className="opacity-80 cursor-default">Our Story</span></li>
                            <li><span className="opacity-80 cursor-default">Destinations</span></li>
                            <li><span className="opacity-80 cursor-default">Journal</span></li>
                            <li><span className="opacity-80 cursor-default">Contact</span></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-sans uppercase tracking-widest text-xs text-brand-light mb-6">Connect</h4>
                        <ul className="space-y-4 font-sans font-light text-brand-light/60 text-sm">
                            <li><span className="opacity-80 cursor-default">Instagram</span></li>
                            <li><span className="opacity-80 cursor-default">Pinterest</span></li>
                            <li><span className="opacity-80 cursor-default">LinkedIn</span></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs font-sans text-brand-light/40 tracking-wider">
                    <p>&copy; {new Date().getFullYear()} VeloraTravel. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <span className="opacity-60 cursor-default">Privacy Policy</span>
                        <span className="opacity-60 cursor-default">Terms of Service</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
