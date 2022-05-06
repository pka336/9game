/**
 * Header Comment Block: what, who, where, when, why, how
 * Post Like Module
 * Programmer: Fong Sze Chung
 * The post like module called by server when there is a post card and post popup.
 * Version: 2, Date: 2022-05-05
 * Purpose: Generate a like button to handle the like event when user click on the like button
 * Data Stucture:
 * Variable     id              - ObjectId
 *              username        - String
 *              checkprevious   - Boolean
 *              form            - Object of post parameter consists of post ObjectId, email, inside (boolean for checking the user already in the likedlist)
 * Algorithm:
 */

import React, {useEffect, useState} from 'react';
import Checkbox from '@mui/material/Checkbox';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import {pink} from '@mui/material/colors'

export default function Like(props) {
    const id = props.id;
    const username = props.email

    const checkprevious = props.checked
    const label = {inputProps: {'aria-label': 'Checkbox demo'}};

    const [form, setForm] = useState({
        _id: id,
        email: username,
        inside: checkprevious
    })

    useEffect(() => {
        props.setCheck(form.inside)
    }, [form.inside])

    const tryfetch = async(e) => {
        e.persist()
        if (username) {
            const check = e.target.checked
            setForm({
                _id: id,
                email: username,
                inside: check
            })

            try {
                const res = await fetch('/api/like_api', {
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
            } catch (error) {
                console.error(error)
                console.log("Fail to upload!")
            }
        }
    }

    return (
        <Checkbox {...label} checked={form.inside} icon={<FavoriteBorder/>} 
                  checkedIcon={<Favorite sx={{color: pink[300], '&.Mui-checked': {color: pink[300],},}}/>}
                  onChange={tryfetch} style={{position: "relative", width: "auto", height: "auto", zIndex: "2"}}
                  onMouseDown={event => event.stopPropagation()}
                  onClick={event => { event.stopPropagation(); }}
        />
    );
};
