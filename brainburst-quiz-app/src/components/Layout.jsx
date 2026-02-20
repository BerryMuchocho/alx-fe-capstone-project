
function Layout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center space-y-6">
                {children}
            </div>
        </div>
    );
}

export default Layout;
