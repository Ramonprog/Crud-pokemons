const pool = require("../connect");

const criandoPoke = async (req, res) => {
  const { nome, apelido, habilidades, imagem } = req.body;
  const { id } = req.usuario;

  if (!nome || !apelido || !habilidades || !imagem)
    return res
      .status(400)
      .json({ mensagem: "todos os campos são obrigatórios" });

  try {
    const encontrandoPokeUnico = await pool.query(
      `SELECT * FROM pokemons WHERE nome = $1`,
      [nome]
    );
    if (encontrandoPokeUnico.rowCount > 1)
      return res
        .status(400)
        .json({ mensagem: "Pokemon ja consta no banco de dados" });

    const { rows } = await pool.query(
      `
        INSERT INTO pokemons (usuario_id, nome, apelido, habilidades, imagem)
        VALUES ($1, $2, $3, $4, $5) RETURNING *
    `,
      [id, nome, apelido, habilidades, imagem]
    );

    return res.status(200).json(rows[0]);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

const atualizandoApelidoDoPokemon = async (req, res) => {
  const { apelido, id } = req.body;

  try {
    const { rows } = await pool.query(
      `
      UPDATE pokemons SET apelido = $1
      WHERE id = $2 RETURNING *
    `,
      [apelido, id]
    );

    return res.status(200).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

const todospokes = async (req, res) => {
  try {
    const { rows, rowCount } = await pool.query(`
    SELECT p.id, u.nome as treinador, p.nome as pokeNome, p.apelido, p.habilidades, 
    p.imagem FROM usuarios u JOIN pokemons p on p.usuario_id = u.id
    `);

    if (rowCount < 1)
      return res
        .status(404)
        .json({ mensagem: "Cadastre seu primeiro pokemon" });

    return res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

const selecionandoPoke = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows, rowCount } = await pool.query(
      `
    SELECT * FROM pokemons WHERE id=$1
  `,
      [id]
    );
    if (rowCount < 1)
      return res.status(404).json({ mensagem: "Pokemon não encontrado" });

    return res.status(200).json(rows);
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

const deletandopoke = async (req, res) =>{
  const { id } = req.params

  try {
    const {rows, rowCount} = await pool.query(`
      DELETE FROM pokemons WHERE id = $1 RETURNING *
    `,[id])

    if(rowCount < 1) return res.status(400).json({ message: "Poke não encontrado" });

    return res.status(200).json(rows[0]);
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ message: "Erro interno do servidor" });
  }

}

module.exports = {
  criandoPoke,
  atualizandoApelidoDoPokemon,
  todospokes,
  selecionandoPoke,
  deletandopoke
};
