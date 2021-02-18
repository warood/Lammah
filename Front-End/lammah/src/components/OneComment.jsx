import API_URL from '../apiConfig.js'

import React from 'react'
import Moment from 'react-moment';
// material-ui
import Rating from '@material-ui/lab/Rating';

export default function OneComment(props) {
    return (
        <div className="OneComment" 
        style={{
            marginTop: '15px'
        }}>
            <div className="container">
                <div className="comment-section">
                    <img src={"https://cdn0.iconfinder.com/data/icons/social-media-network-4/48/male_avatar-512.png"} />
                    <div className="comment">
                        <span className="username">
                           {props.comment.user.name}  <span/>
                           <Rating name="size-small" size="small" readOnly  value={props.comment.stars}/>
                        </span>
                        <span className="time">
                        <Moment format=" YYYY/MM/DD   hh:mm">{props.comment.createdAt}</Moment>
                        </span>
                        <p className="comment-content">{props.comment.comment} </p>
                    </div>

                </div>
                <div>
                   
                </div>
                <div>

                </div>

            </div>
        </div>
    )
}
