import { Link } from "react-router-dom";

const FormLogin = () => {
	


	
		return (
			<>
                <div className="heading-bx">
									
					<p className="title">Check your mail to confirm account</p>
					<Link className="btn btn-lg btn-secondary w-100" data-toggle="tab" to="/form-login">Login</Link>
				</div>
			</>
		);
	}


export default FormLogin;