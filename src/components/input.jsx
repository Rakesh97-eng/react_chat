const Input = ()=>{
    return(
        <>
        <div className="input">
            <input type="text " placeholder="enter your messages"></input>
            <div className="send">
                <label htmlFor="inupt">
                    <img src="" alt="" />
                </label>
                <input type="file" id="inupt" style={{display:"none"}}/>

                <button>send</button>
            </div>
        </div>
        </>
    )
}

export default Input;