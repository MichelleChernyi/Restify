
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
            thread.push(<div className='border p-3'>
                <div className='d-flex justify-content-between'>
                <h6>{curr.user_name} says:</h6>
                </div>
                <p >{curr.content}</p>
                <p className="comment-date">{curr.date}</p>
            </div>)
            curr = curr.reply
        }
        thread.push(<div className="host-response m-0 p-3">
        <h6>
          {curr.user_name} says:
        </h6>
        <p>{curr.content}</p>
        <p className="comment-date">{curr.date}</p>
      </div>)
      setThreads(thread)
    }
        return (
        <>
            <div className="profile-comment mb-3 p-0 mt-2">
            <div className="border-bottom">
                {threads != [] && threads.map((thread)=> thread)}
                
            </div>
            </div>
        </>
    );
}

export default Comment;