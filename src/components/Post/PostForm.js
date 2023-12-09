import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/material/styles';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CommentIcon from '@mui/icons-material/Comment';
import { Button, InputAdornment, OutlinedInput } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
    root: {
        width: 800,
        textAlign: "left",
        margin: 20
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    avatar: {
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    },
    link: {
        textDecoration: "none",
        boxShadow: "none",
        color: "white"
    }
}));

function PostForm(props) {

    const { userId, userName, refreshPosts } = props;
    const classes = useStyles();
    const [text, SetText] = useState("");
    const [title, setTitle] = useState("");
    const [isSent, setIsSent] = useState(false);

    const savePost = () => {
        fetch("/posts",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title,
                    userId: userId,
                    text: text,
                }),
            })
            .then((res) => res.json())
            .catch((err) => console.log("error"))
    }

    const handleSubmit = () => {
        savePost();
        setIsSent(true);
        setTitle("");
        SetText("");
        refreshPosts();
    }

    const handleTitle = (value) => {
        setTitle(value);
        setIsSent(false);
    }

    const handleText = (value) => {
        SetText(value);
        setIsSent(false);
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setIsSent(false);
    };

    return (
        <div>
            <Snackbar open={isSent} autoHideDuration={1200} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Your post is sent!
                </Alert>
            </Snackbar>
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Link className={classes.link} to={{ pathname: '/users/' + userId }}>
                            <Avatar aria-label="recipe" className={classes.avatar}>
                                {userName.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    }
                    title={<OutlinedInput
                        id="outlined-adornment-amount"
                        multiline
                        placeholder="Title"
                        inputProps={{ maxLength: 25 }}
                        fullWidth
                        value={title}
                        onChange={(i) => handleTitle(i.target.value)}
                    >
                    </OutlinedInput>}
                />

                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            multiline
                            placeholder="Text"
                            inputProps={{ maxLength: 250 }}
                            fullWidth
                            value={text}
                            onChange={(i) => handleText(i.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <Button
                                        variant="contained"
                                        style={{
                                            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                            color: 'white',
                                            onClick: { handleSubmit }
                                        }}
                                    >Post</Button>
                                </InputAdornment>
                            }>
                        </OutlinedInput>
                    </Typography>
                </CardContent>
            </Card>
            {title}
            {text}
        </div>

    )
}

export default PostForm;