"use client"

import { Link } from "@heroui/link";
import dynamic from 'next/dynamic';
const Navbar = dynamic(() => import('../navbar').then(mod => mod.default), {
  ssr: false
});
const Providers = dynamic(() => import('../providers').then(mod => mod.default), {
  ssr: false,
});

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body>
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="h-screen w-screen flex justify-center overflow-hidden bg-background antialiased">
            <div className="max-w-[2000px] w-full overflow-y-auto overflow-x-hidden">
              <div className={"flex min-h-[calc(100vh-20px)] sm:min-h-[calc(100vh-40px)] flex-col rounded-3xl mx-2.5 sm:mx-[30px] my-2.5 sm:my-5 z-20 top-0 left-0 right-0 bottom-0 relative w-[calc(100vw - 9px] max-w-[2000px] 4xl:mx-auto layout-background-image border-2 border-gray-500 overflow-y-auto"}
              >
                <div className="w-full h-full backdrop-blur-lg backdrop-contrast-125 dark:backdrop-brightness-50 p-5 sm:p-10 flex flex-col flex-1 bg-hero bg-center bg-no-repeat bg-cover">
                  <Navbar />
                  {children}
                  <footer className="w-full flex items-center justify-center py-3">
                    <Link
                      isExternal
                      className="flex items-center gap-1 text-current"
                      href="https://coinbase.com"
                      title="profile risk homepage"
                    >
                      <span className="text-default-600">Built in</span>
                      <p className="text-primary">Coinbase</p>
                    </Link>
                  </footer>
                </div>
              </div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
