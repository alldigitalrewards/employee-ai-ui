import React from "react";

// Pass User
const Home = ({user}) => {
    const [data, setData] = React.useState([]);
    const [prompt, setPrompt] = React.useState('');
    const [responseItems, setResponseItems] = React.useState([]);
    const [currentPromptId, setCurrentPromptId] = React.useState('');

    const promptItem = (prompt) => {
        setPrompt(prompt);
    }

    const logout = () => {
        localStorage.removeItem("user");
        window.location.reload();
    };

    const handleInputChange = () => {
        document.getElementById("prompt").value = "";
        fetch(`${process.env.REACT_APP_API_URL}/openai/prompt`,
            {
                method: 'POST',
                headers: {"Content-Type": "application/json",},
                body: JSON.stringify({promptID: currentPromptId, prompt: prompt})
            }
        )
            .then(response => response.json())
            .then(responseData => {
                setCurrentPromptId(responseData.promptId)
                formatResponseData(responseData);
            });
    };

    const onKeyDownHandler = e => {
        if (e.keyCode === 13) {
            handleInputChange();
        }
    };

    const formatResponseData = (responseData) => {
        let newData = data;
        newData.push({
            prompt: responseData.prompt,
            completion: responseData.completion
        });
        setData(newData);
        setResponseItems(data.map(item =>
            <>
                <div className="row" style={{whiteSpace: "pre-wrap"}}>
                    <div className="col">
                        {item.prompt}
                    </div>
                </div>
                <div className="row bg-light" style={{whiteSpace: "pre-wrap"}}>
                    <div className="col">
                        {item.completion}
                    </div>
                </div>
            </>)
        );
    }

    return (
        <>
            <header>
                <nav className="navbar navbar-expand-md navbar-dark fixed-bottom bg-dark">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">ADR</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarCollapse" aria-controls="navbarCollapse"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarCollapse">
                            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                                <li className="nav-item">
                                    <span className="nav-link active" aria-current="page" onClick={logout}>
                                        Logout
                                    </span>
                                </li>
                            </ul>
                            <input className="form-control me-2" type="search" id="prompt"
                                   onChange={(e) => promptItem(e.target.value)}
                                   autoComplete={"off"}
                                   onKeyDown={onKeyDownHandler}
                                   placeholder="Prompt" aria-label="Search"/>
                        </div>
                    </div>
                </nav>
            </header>
            <div className={"container-fluid"}>
                <div className={"row flex-nowrap"}>
                    <div className={"col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark"}>
                        <div
                            className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                            <a href="/"
                               className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                                <span className="fs-4">Sidebar</span>
                            </a>
                            <hr/>
                            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                                id="menu">
                                <li className="nav-item">
                                    <a href="/" className="nav-link align-middle px-0">
                                        <span className="ms-1 d-none d-sm-inline">HISTORY</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className="nav-link px-0 align-middle">
                                        <span className="ms-1 d-none d-sm-inline">HISTORY</span></a>
                                </li>
                                <li>
                                    <a href="/" className="nav-link px-0 align-middle">
                                        <span className="ms-1 d-none d-sm-inline">HISTORY</span> </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={"col"}>
                        <main className="d-flex flex-shrink-0 flex-column">
                            <div className="col">
                                {responseItems}
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
