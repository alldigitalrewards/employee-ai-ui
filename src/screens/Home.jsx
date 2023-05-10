import React from "react";

// Pass User
const Home = ({user}) => {
    const [data, setData] = React.useState([]);
    const [query, setQuery] = React.useState('');
    const [responseItems, setResponseItems] = React.useState([]);

    const queryItem = (query) => {
        setQuery(query);
    }

    const logout = () => {
        localStorage.removeItem("user");
        window.location.reload();
    };

    const handleInputChange = () => {
        document.getElementById("query").value = "";
        fetch(`${process.env.REACT_APP_API_URL}/openai/query`,
            {
                method: 'POST',
                headers: {"Content-Type": "application/json",},
                body: JSON.stringify({query: query})
            }
        )
            .then(response => response.json())
            .then(responseData => {
                console.log(responseData);
                let newData = data;
                responseData.forEach((item) => {
                    newData.push(item.text);
                });
                setData(newData);
                setResponseItems(data.map(item =>
                    <li style={{whiteSpace: "pre-wrap"}}>
                        {item}
                    </li>)
                );
            });
    };

    return (
        <>
            <header>
                <nav className="navbar navbar-expand-md navbar-dark fixed-bottom bg-dark">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">ADR ChatGPT</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarCollapse" aria-controls="navbarCollapse"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarCollapse">
                            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/">Link</a>
                                </li>
                            </ul>
                            <input className="form-control me-2" type="search" id="query"
                                   onChange={(e) => queryItem(e.target.value)}
                                   placeholder="Query" aria-label="Search"/>
                            <button className="btn btn-outline-success"
                                    onClick={handleInputChange}
                                    type="submit">Query
                            </button>
                        </div>
                    </div>
                </nav>
            </header>
            <main className="flex-shrink-0">
                <div className="container">
                    <div className="row mt-5">
                        <div className="col">
                            <ul>
                                {responseItems}
                            </ul>
                        </div>
                    </div>

                    <div style={{textAlign: "center", margin: "3rem"}}>
                        <h1>Dear {user?.email}</h1>
                        <p>You are viewing this page because you are logged in or you just signed up</p>
                        <div>
                            <button
                                onClick={logout}
                                style={{
                                    color: "red",
                                    border: "1px solid gray",
                                    backgroundColor: "white",
                                    padding: "0.5rem 1rem",
                                    cursor: "pointer",
                                }}>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Home;
