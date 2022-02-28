import { Button, Divider } from '@mui/material';
import Paper from '@mui/material/Paper';
import moment from 'moment'
import { Link } from 'react-router-dom'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import InsertCommentRoundedIcon from '@mui/icons-material/InsertCommentRounded';


const PostCard = ({ post: { body, createdAt, id, username, likeCount, commentCount, likes } }) => {

    function likePost() {
        console.log('like Post!')
    }

    function commentPost() {
        console.log('comment Post!')
    }
    return (
        <>
            <Paper elevation={4} sx={{ padding: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', margin: '3px 8px' }}>
                   <div style={{display:'flex', flexGrow: 1 }}>
                   <h4 >{username}</h4>
                    <h4>
                        <Link to={`/posts/${id}`} style={{ textDecoration: 'none', color: 'gray', margin:10 }}>
                            {moment(createdAt).fromNow(/*true*/)}
                        </Link>
                    </h4>
                   </div>
                    <img
                        src='https://ps.w.org/user-avatar-reloaded/assets/icon-128x128.png?rev=2540745'
                        style={{ width: 60, height: 60 }}
                        alt='user Avatar'
                    />
                </div>
                <Divider />

                <p>{body}</p>
                <div>
                    <Button
                        style={{ textTransform: 'capitalize' }}
                        color='secondary'
                        startIcon={likeCount === 0 ? <FavoriteBorderIcon /> : <FavoriteIcon />}
                        onClick={likePost}
                    >
                        {likeCount}
                    </Button>

                    <Button
                        style={{ textTransform: 'capitalize' }}
                        startIcon={<InsertCommentRoundedIcon />}
                        onClick={commentPost}
                    >
                        {commentCount}
                    </Button>
                </div>
            </Paper>
        </>
    );
};

export default PostCard;
