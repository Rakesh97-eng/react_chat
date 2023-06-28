const Login = ()=>{
    return(
        <>
        <span className="title">Register</span>
        <div className="formContainer">
            <div className="formwrapper">
                <span className="logo">Chat</span>
                <span className="title">Register</span>

                <form>
                    <input type="text" placeholder="display name"/>
                    <input type="email" placeholder="email"/>
                    <input type="password" placeholder="password"/>
                    <input style={{"display":"none"}} id="file" type="file"/>
                    <label htmlFor="file">Add file</label>
                    <button>sign Up</button>
                </form>

            </div>

        </div>
        </>
    )
}

export default Login;