
import {useEffect, useState} from 'react';
function Comment(props) {
    const [threads, setThreads] = useState([])
    useEffect(()=>{
        getThreads()
        }, [])
    const getThreads = () => {
        let curr = props.comment
        var thread = []
        while (curr.reply !== null) {
            thread.push(<p >{curr.content}</p>)
        }
        thread.push(<div className="host-response m-0 p-3">
        <h6>
          Edward's response:
        </h6>
        <p>{curr.content}</p>
      </div>)
      setThreads(thread)
    }
        return (
        <>
            <div className="profile-comment mb-3 p-0">
            <div className="border-bottom p-3">
                {threads != [] && threads.map((thread)=> thread)}
                
            </div>
            </div>
        </>
    );
}

export default Comment;