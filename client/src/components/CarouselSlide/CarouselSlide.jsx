import React from "react";
import "./CarouselSlide.css";
import koki from "@assets/image/Carousel/koki.webp";
import blackblur from "@assets/image/Carousel/blackblur.webp"
import { Link } from "react-router-dom";

export function FirstSlide(){
    return(
        <div className="body">
            <p className="kantin">kantin<span className="ku">ku</span></p>
            <div className="slogan">
                <p className="slogan-p">Find Something</p>
                <p className="slogan-p">Delicious For You</p>
            </div>

            <img src={koki} width="100%" alt="Koki">

            </img>
        </div>
    )
}

export function SecondSlide() {
    return(
        <div className="secBody">
            
                <div className="hagy">
                    <p className="masalah">Anda jenuh menunggu <br></br> dalam antrian? Tenang...</p>
                    <p className="solusi">Solusinya ada di<br></br>Aplikasi kami. Solusi<br></br>Instan Pesan Makanan.</p>
                </div>

            <img className="blur" src={blackblur} alt=""></img>
        </div>
    )
}

export function ThirdSlide() {
    return (
        <div className="thirdBody">
            <div className="nasgor">
                <div className="nasigoreng"></div>
            </div>

            <div className="enjoy">
                <p className="enjoy-p">Enjoy<br></br>your food</p>
            </div>

            <div className="button">
                <Link to={"auth/signup"} className="getstarted">Get Started</Link>
            </div>
        </div>
    )
}