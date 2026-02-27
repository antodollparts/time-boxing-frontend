import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2000);
    }, 1500);
  };

  return (
    <>

      <div className="login-root">
      {/* Panel izquierdo*/}
        <div className="left-panel">
          <span className="brand-tag">Bienvenido(a)</span>
          <h1 className="brand-title">
            Tu espacio
            <em>de tiempo.</em>
          </h1>
          <div className="decorative-line" />
          <p className="brand-desc">
             Cada sesión, una experiencia diseñada para ti.
          </p>
        </div>

        {/* RPanel derecho */}
        <div className="right-panel">
          <h2 className="form-greeting">Iniciar sesión</h2>
          <p className="form-sub">Ingresa tus credenciales para continuar</p>

          <div className="field-group">
            <label className="field-label">Correo electrónico</label>
            <input
              className="field-input"
              type="email"
              placeholder="tu@correo.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="field-group">
            <label className="field-label">Contraseña</label>
            <input
              className="field-input"
              type="password"
              placeholder="contraseña"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <a className="forgot-link">¿Olvidaste tu contraseña?</a>

          <button
            className={`submit-btn ${loading ? "loading" : ""} ${submitted ? "success" : ""}`}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <span className="spinner" /> : submitted ? "¡Bienvenido!" : "Entrar"}
          </button>

          <p className="register-text">
            ¿No tienes cuenta? <a>Regístrate gratis</a>
          </p>
        </div>
      </div>
    </>
  );
}