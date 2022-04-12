import {useState} from "react";
import {Grid, FormControl, InputLabel, Input, Button, Typography} from "@mui/material";

export default function NewPost(props) {
    const email = props.email

    const [form, setForm] = useState({
        title: "",
        content: "",
        username: email,
        postdate: new Date(),
        likes: 0,
        likeduser: [],
    })

    const handleSubmit = async function (e) {
        e.preventDefault()
        try {
            const res = await fetch('/api/post/', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            })
            if (!res.ok) {
                throw new Error(res.status)
            }
            window.location.reload();
        } catch (error) {
            console.error(error)
            console.log("Fail to upload!")
        }
    }

    const handleChange = async function (e) {
        const value = e.target.value
        const name = e.target.name

        setForm({
            ...form,
            [name]: value,
        })
    }

    return (
        <>
            <Grid
                container
                sx={{pt: 2}}
                direction="column"
                alignItems="center"
                justifyContent="center"
            >
                <Typography>New post by {email}</Typography>
                <form onSubmit={handleSubmit}>
                    <FormControl>
                        <InputLabel htmlFor="title">Title</InputLabel>
                        <Input
                            type="text"
                            name="title"
                            autoComplete="off"
                            fullWidth
                            multiline
                            onChange={handleChange}
                            required
                            sx={{mb: 2}}
                        />
                    </FormControl>
                    <br/>
                    <FormControl>
                        <InputLabel htmlFor="content">Content</InputLabel>
                        <Input
                            type="text"
                            name="content"
                            autoComplete="off"
                            fullWidth
                            multiline
                            rows={6}
                            onChange={handleChange}
                            required
                            sx={{mb: 2}}
                        />
                    </FormControl>
                    <br/>
                    <Button type="submit">Submit</Button>
                </form>
            </Grid>
        </>
    )
}
