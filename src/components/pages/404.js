import ErrorMessage from '../errorMsg/ErrorMessage';
import {Link} from 'react-router-dom';

export default function Page404() {
    return (
        <div>
            <ErrorMessage/>
            <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px'}}>Page doesn't exist</p>
            <Link to="/" style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'display': 'block'}} >Back
                to main page</Link>
        </div>
    );
}