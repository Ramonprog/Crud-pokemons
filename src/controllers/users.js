const bcrypt = require("bcrypt");
const pool = require("../connect");
const jwt = require("jsonwebtoken");
const senhaJwt = require("../senhaJwt");

const creatingANewUser = async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha)
    return res
      .status(400)
      .json({ mensagem: "todos os campos são obrigatórios" });

  try {
    const senhaCriptografada = await bcrypt.hash(senha, 10);
    const novoUsuario = await pool.query(
      `
        INSERT INTO usuarios (nome, email, senha)
        VALUES($1, $2, $3) RETURNING *
    `,
      [nome, email, senhaCriptografada]
    );

    return res.status(201).json(novoUsuario.rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await pool.query(
      `
      SELECT * FROM usuarios WHERE email = $1
    `,
      [email]
    );

    if (usuario.rowCount < 1)
      return res.status(404).json({ mensagem: "Email ou senha invalida" });

    const senhaValida = await bcrypt.compare(senha, usuario.rows[0].senha);

    if (!senhaValida)
      return res.status(400).json({ mensagem: "Email ou senha invalida" });

    const token = await jwt.sign(
      { id: usuario.rows[0].id, nome: usuario.rows[0].nome },
      senhaJwt,
      { expiresIn: "8h" }
    );

    const { senha: _, ...usuarioLogado } = usuario.rows[0];

    return res.status(200).json({ usuario: usuarioLogado, token });
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

module.exports = {
  creatingANewUser,
  login,
};
