import "../css/Register.css";

const Register = () => {
  return (
    <form className="register-form">
      <input name="name" placeholder="Name" autocomplete="off"/>
      <label for="role">Shop or Customer?</label>
      <select id="role" name="role">
        <option value="customer">Customer</option>
        <option value="shop">Shop</option>
      </select>
      <input name="email" placeholder="Email" type="email" autoComplete="off"/>
      <input name="password" type="password" placeholder="Password" autocomplete="off"/>
      <input name="phone_number" type="number" placeholder="Phone Number" autocomplete="off"/>
      <button>Join for free</button>
    </form>
  );
};

export default Register;
