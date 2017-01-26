import React from 'react';
import './footer.scss'

export default class extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <footer className="footer-basic-centered">
                    <p id="footerTitle" className="footer-company-motto">The company motto.</p>
                    <p id="footerLinks"className="footer-links">
                        <a href="#">Home</a>
                        ·
                        <a href="#"> <i className=" fa fa-facebook"></i> </a>
                        .
                        <a href="#">Blog</a>
                        ·
                        <a href="#">Pricing</a>
                        ·
                        <a href="#">About</a>
                        ·
                        <a href="#">Faq</a>
                        ·
                        <a href="#">Contact</a>
                    </p>
                    <div style={{margin : "0 auto", width : "100%"}}>
                        <ul className="social"  style={{display :"inline-block"}}>
                            <li> <a href="#" > <i style={{ fontWeight : "bold"}}> LT! </i></a> </li>
                            <li> <a href="#"> <i className="fa fa-facebook"></i></a></li>
                            <li> <a href="#"> <i className="fa fa-instagram"></i> </a> </li>
                        </ul>
                    </div>
                    
    

				<div>
					<i className="fa fa-map-marker"></i>
					<p><span>21 Revolution Street</span> Paris, France</p>
				</div>

				<div>
					<i className="fa fa-phone"></i>
					<p>+1 555 123456</p>
				</div>

				<div>
					<i className="fa fa-envelope"></i>
					<p><a href="mailto:support@company.com">support@company.com</a></p>
				</div>

                </footer>
            </div>
        );
    }
}