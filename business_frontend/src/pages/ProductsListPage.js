

export default function ProductsListPage() {


    return (
        <div className="App">
            <header className="App-header">
                <h1>Nittany Business</h1>
                <p>Products List</p>
            </header>

            <main>
                
                <div className="p-10">
                <h2 className="text-3xl font-semibold mb-6">
                    User List
                </h2>

                <div className="bg-white p-6 shadow rounded-xl min-h-[200px]">
                    This is where a list of products will appear.
                </div>
                </div>


            </main>

            <footer className="App-footer">
                © {new Date().getFullYear()} Team Progress | Penn State
            </footer>
        </div>
    );
}
