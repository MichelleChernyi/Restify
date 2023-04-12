import { createRef } from 'react';
import {useEffect, useState} from 'react';
function ProfileComment(props) {
    const [threads, setThreads] = useState([])
 
    useEffect(()=>{
        getThreads()
        }, [props])
    const getThreads = () => {
        let curr = props.comment
        var thread = []
        let canReply = false
        while (curr !== null) {
            thread.push(<div className='border p-3'>
                <div className='d-flex justify-content-between'>
                <h6>{curr.user_name} says:</h6>
                </div>
                <p >{curr.content}</p>
                <p className="comment-date">{curr.date}</p>
            </div>)
            curr = curr.reply
            
        }
        
     
      console.log(canReply)
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

export default ProfileComment;