import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { userLogin } from '../redux/actions';
import rockGlass from '../images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from '../styles/login.module.scss';

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
    const {
      containerLogin,
      inputsContainerLogin,
      inputsLogin,
      preencha,
      btnLogin } = style;
    return (
      <div className="meals">
        <span className="logo">IRecipes!!</span>
        <object
          className="rocksGlass"
          type="image/svg+xml"
          data={ rockGlass }
        >
          Glass
        </object>
        <div className={ containerLogin }>
          <p>Informe seu email e senha:</p>
          <form>
            <div className={ inputsContainerLogin }>
              <input
                type="email"
                name="email"
                placeholder="email"
                data-testid="email-input"
                className={ inputsLogin }
                value={ email }
                onChange={ (event) => this.handleInputChange(event) }
              />
              <input
                type="password"
                name="password"
                placeholder="password"
                data-testid="password-input"
                className={ inputsLogin }
                value={ password }
                onChange={ (event) => this.handleInputChange(event) }
              />
            </div>
            {
              (invalid) ? (
                <div className={ preencha }>
                  <p>Por favor preencha corretamente as informações</p>
                </div>) : <> </>
            }
            <button
              type="button"
              disabled={ invalid }
              data-testid="login-submit-btn"
              className={ btnLogin }
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
