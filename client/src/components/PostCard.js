import { Button, Divider } from '@mui/material';
import Paper from '@mui/material/Paper';
import moment from 'moment'
import { Link } from 'react-router-dom'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import InsertCommentRoundedIcon from '@mui/icons-material/InsertCommentRounded';
import { useAuthContext } from '../context/auth';
import { useEffect, useState } from 'react';
import { useMutation, gql } from '@apollo/client'
import DeleteButton from './DeleteButton';

const PostCard = ({ post: { body, createdAt, id, username, likeCount, commentCount, likes } }) => {

    const { user } = useAuthContext()
    const [liked, setLiked] = useState(false)

    function commentPost() {
        console.log('comment Post!')
    }

    useEffect(() => {
        if(user && likes.find(like => like.username === user.username)){
            setLiked(true)
        }else setLiked(false)
    },[user, likes])

    const [likePost] = useMutation(LIKE_POST_MUTATION,{
        variables:{postId:id}
    })

    const likeButton = user ? (
        liked ? (
            <FavoriteIcon />
        ) : (<FavoriteBorderIcon />)
    ) : (
        <Link to={`/login`} style={{ textDecoration: 'none' }}>
            <FavoriteBorderIcon />
        </Link>
    )

    return (
        <>
            <Paper elevation={5} sx={{ padding: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', margin: '3px 8px' }}>
                    <div style={{ display: 'flex', flexGrow: 1 }}>
                        <h4 >{username}</h4>
                        <h4>
                            <Link to={`/posts/${id}`} style={{ textDecoration: 'none', color: 'gray', margin: 10 }}>
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
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ flexGrow: 1 }}>


                        {/* TODO: separate the like button into a diferent component */}
                        {/* <LikeButton post={{id, likes, likeCount}}/> */}
                        <Button
                            style={{ textTransform: 'capitalize' }}
                            color='secondary'
                            startIcon={likeButton}
                            onClick={likePost}
                        >
                            {likeCount}
                        </Button>


                        <Link to={`/posts/${id}`} style={{ textDecoration: 'none' }}>
                            <Button
                                style={{ textTransform: 'capitalize' }}
                                startIcon={<InsertCommentRoundedIcon />}
                                // onClick={commentPost}
                            >
                                {commentCount}
                            </Button>
                        </Link>


                    </div>

                    <div>
                        {user && user.username === username && (<DeleteButton postId={id} />)}
                    </div>

                </div>
            </Paper>
        </>
    );
};

const LIKE_POST_MUTATION = gql`
    mutation likePost($postId: ID!){
        likePost(postId: $postId){
            id
            likes{
                id username
            }
            likeCount
        }
    }
`

export default PostCard;
