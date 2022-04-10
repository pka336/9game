import {Card, CardActionArea, CardContent, CardMedia} from "@mui/material"
import {Box, Typography} from "@mui/material"
import {makeStyles} from "@material-ui/styles"
import {Grid} from "@mui/material"
import Like from "./like_post"


export default function IndexCard(props) {
    const cardTextStyle = makeStyles({
        textEllipsis: {
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            "-webkit-line-clamp": 12,
            "-webkit-box-orient": "vertical"
        }
    });
    const classes = cardTextStyle()

    const likeduser = props.likeduser
    const currentuser = props.currentuser
    const check = (likeduser?.includes(currentuser)) ? true : false
    return (
        <Card sx={{width: 300, height: 400, boxShadow: 5}}>
            <CardActionArea href={`/post/${props.id}/comnt`}>
                <Box component="div" sx={{height: 300, p: 2}} style={{top: "0", width: "auto"}}>
                    {/*<CardMedia
                        component="img"
                        height="140"
                        image=""
                        alt={content}
                        sx={{m: 2}}
                    />*/}

                    <Typography gutterBottom variant="body1"
                                component="div"
                                sx={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitLineClamp: '13',
                                    WebkitBoxOrient: 'vertical',
                                }}>
                        {props.content}
                    </Typography>
                </Box>

                <Box component="div"
                     direction="row"
                     alignItems="center"
                     justifyContent="left"
                     sx={{height: 68, px: 1}}
                     style={{display: "flex"}}
                >
                    <Like id={props.id} likes={props.likes}
                          likeduser={props.likeduser}
                          email={props.currentuser} checked={check}
                    />
                    <Typography noWrap variant="h5" component="div" sx={{my: 1}}>
                        {props.title}
                    </Typography>
                </Box>

            </CardActionArea>
        </Card>
    )
}
