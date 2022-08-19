import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { userLogin } from '../redux/actions';
import rockGlass from '../images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      invalid: true,
    };
  }

  inputRolesValidation = () => {
    const LIMIT_PASSWORD = 6;
    const { email, password } = this.state;
    if (
      email.length > 0
      && email.includes('@')
      && email.endsWith('.com')
      && password.length > LIMIT_PASSWORD
    ) {
      this.setState({
        invalid: false,
      });
    } else {
      this.setState({
        invalid: true,
      });
    }
  }

  handleInputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, () => this.inputRolesValidation());
  }

  handleEnter = async () => {
    // const response = await fetch('https://opentdb.com/api_token.php?command=request');
    // const data = await response.json();
    // const token = await data.token;
    const { email } = this.state;
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    const { history, userLoginDispatch } = this.props;
    userLoginDispatch(email);
    history.push('/foods');
  }

  render() {
    const { email, password, invalid } = this.state;
    return (
      <div className="meals">
        <span className="logo">TRYBE!!</span>
        <object
          className="rocksGlass"
          type="image/svg+xml"
          data={ rockGlass }
        >
          Glass
        </object>
        <div>
          <p>Informe seu email e senha:</p>
          <form>
            <div>
              <input
                type="email"
                name="email"
                placeholder="email"
                data-testid="email-input"
                value={ email }
                onChange={ (event) => this.handleInputChange(event) }
              />
              <input
                type="password"
                name="password"
                placeholder="password"
                data-testid="password-input"
                value={ password }
                onChange={ (event) => this.handleInputChange(event) }
              />
            </div>
            {
              (invalid) ? <p>Por favor preencha corretamente as informações</p> : <> </>
            }
            <button
              type="button"
              disabled={ invalid }
              data-testid="login-submit-btn"
              onClick={ () => this.handleEnter() }
            >
              Enter
            </button>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: propTypes.shape({
    push: propTypes.func,
  }).isRequired,
  userLoginDispatch: propTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  userLoginDispatch: (email) => dispatch(userLogin(email)),
});

export default connect(null, mapDispatchToProps)(Login);
