import React from "react";
import { Button } from "react-bootstrap";
import "./buttonList.css";

export function CustomNextButton(props){
    return(
        <Button variant="primary" className={props.className} onClick={props.onClick}>
            Next
        </Button>
    )
}

export function ConfirmButton(props){
    return(
        <Button>
            Confirm
        </Button>
    )
}

export function SignUpButton(props){
    return(
        <button type={props.type} disabled={props.disabled} className="submit-button">
            CREATE ACCOUNT
        </button>
    )
}

export function SignInButton(props){
    return(
        <button type={props.type} disabled={props.disabled} className="submit-button">
            LOG IN
        </button>
    )
}

export function SubmitButtonGoogle(props){
    return(
        <button className="submit-button footer" onClick={props.onClick}>
            <span className="for-icon"></span>
            Login With Google
        </button>
    )
}

export function MenuSubmitButton(props){
    return(
        <button type={props.type} className="menu-submit-button">
            Buat Pesanan
        </button>
    )
}