
function Layout({ children }) {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="
            w-full 
            max-w-md
            sm:max-w-lg
            md:max-w-xl
            bg-blue-200 
            rounded-2xl 
            shadow-xl 
            p-6
            sm:p-8
            flex flex-col
            items-center 
            space-y-6   
            ">
                {children}
            </div>
        </div>
    );
}

export default Layout;
