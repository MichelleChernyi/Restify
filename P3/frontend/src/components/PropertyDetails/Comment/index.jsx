
import {useEffect, useState} from 'react';
function Comment(props) {
    const [threads, setThreads] = useState([])
    const [reply, setReply] = useState()
    const [replyID, setReplyID] = useState()
    useEffect(()=>{
        getThreads()
        }, [props])
    const getThreads = () => {
        let curr = props.comment
        let me = false
        var thread = []
        let canReply = false
        while (curr.reply !== null) {
            thread.push(<div className='border p-3'>
                <div className='d-flex justify-content-between'>
                <h6>{curr.user_name} says:</h6>
                </div>
                <p >{curr.content}</p>
                <p className="comment-date">{curr.date}</p>
            </div>)
            curr = curr.reply
            if (curr.from_user == props.me) {
                canReply = true
            } else {
                canReply = false
            }
        }
        console.log(props.isHost)
        console.log(props.me)
        if (thread.length == 0 && props.isHost) {
            canReply = true
        }
        thread.push(<div className="host-response m-0 p-3">
        <h6>
          {curr.user_name} says:
        </h6>
        <p>{curr.content}</p>
        <p className="comment-date">{curr.date}</p>
        {(canReply) && <button class='btn btn-primary' data-bs-toggle="modal" data-bs-target="#commentModal" id={curr.id} onClick={(e) => setReplyID(e.target.id)}>Reply</button>}
      </div>)
      console.log(canReply)
      setThreads(thread)
    }
        return (
        <>
            <div className="profile-comment mb-3 p-0 mt-2">
            <div className="border-bottom">
                {threads != [] && threads.map((thread)=> thread)}
                <div className="modal fade" id="commentModal" tabIndex="-1" aria-labelledby="commentModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1 className="modal-title fs-5" id="commentModalLabel">Comment</h1>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          <textarea type="text" placeholder="Comment..." className="form-control shadow-none mb-1" onChange={(e) => setReply(e.target.value)}></textarea>

                        </div>
                        <div className="modal-footer">
                            {console.log(replyID)}
                          <button type="button"  className="btn btn-primary " data-bs-dismiss="modal" onClick={() => props.onReply(reply, replyID)}>Comment</button>
                        </div>
                      </div>
                    </div>
                  </div>
            </div>
            </div>
        </>
    );
}

export default Comment;