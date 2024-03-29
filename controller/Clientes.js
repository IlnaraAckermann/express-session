const DatabaseSingleton = require("../config/ConfigDB");
const databaseInstance = new DatabaseSingleton();

async function selectClientes(req, res) {
	databaseInstance.db.all(`SELECT * FROM clientes`, (err, rows) => {
		if (err) {
			throw err;
		}
		let usuario = req.session.usuario ? req.session.usuario.id : 'a';
		res.render("listar_clientes", { rows, usuario });
	});
}

async function cadastrarCliente(req, res) {
	let registro = req.body;
	console.log(registro);
	databaseInstance.db.run(
		"INSERT INTO clientes (id, nome, senha, email, endereco) VALUES ( ?, ?, ?, ?)",
		[
			registro.id,
			registro.nome,
			registro.senha,
			registro.email,
			registro.endereco,
		],
		(err) => {
			if (err) {
				res.status(500).send("Erro ao inserir o cliente no banco de dados.");
			} else {
				res.redirect("/");
			}
		}
	);
}

async function atualizarCliente(req, res) {
	let registro = req.body;
	if (req.session.usuario.id !== Number(registro.id) ) return res.status(401).send("Ação não autorizada.");
	databaseInstance.db.run(
		"UPDATE clientes SET nome=?, senha=?, email=?, endereco=? WHERE id=?",
		[
			registro.nome,
			registro.senha,
			registro.email,
			registro.endereco,
			registro.id,
		],
		(err) => {
			if (err) {
				res.status(500).send("Erro ao atualizar o cliente no banco de dados.");
			} else {
				console.log("deu certo");
				console.log(`Linhas alteradas: ${this.changes}`);
				res.redirect("/");
			}
		}
	);
}

async function deleteClienteById(req, res) {
	let id = req.body.id;
	if (req.session.usuario.id !== Number(id) ) return res.status(401).send("Ação não autorizada.");
	databaseInstance.db.get("DELETE FROM clientes WHERE id=?", [id], (err) => {
		if (err) {
			res.status(500).send("Erro ao deletar o cliente no banco de dados.");
		} else {
			res.redirect("/");
		}
	});
}

async function selectClientToUpdate(req, res) {
	let id = req.query.id;
	databaseInstance.db.get(
		`SELECT * FROM clientes WHERE id=?`,
		[id],
		(err, item) => {
			if (err) {
				throw err;
			}
			res.render("atualizar_cliente", { item });
		}
	);
}

async function userLogin(email, senha) {
	try {
		sqlConsultaCad =
			"SELECT ID, Nome FROM clientes WHERE email = ? AND senha = ?";
		let verificador;
		const login = await new Promise((resolve, reject) => {
			databaseInstance.db.get(sqlConsultaCad, [email, senha], (err, row) => {
				if (err) {
					reject(err);
				} else {
					verificador = row;
					resolve(row);
				}
			});
		});
		console.log(login.id);
		if (verificador) return login.id;

		return false;
	} catch (err) {
		console.error(err);
		return false;
	}
}

async function userLogged(req, res, next) {
	const { email, senha } = req.body;

	const login = await userLogin(email, senha);
	if (login) {
		req.session.usuario = {
			email: email,
			senha: senha,
			id: login
		};
		res.redirect("/");
	} else {
		res.redirect("/login");
	}
}

module.exports = {
	selectClientes,
	cadastrarCliente,
	atualizarCliente,
	deleteClienteById,
	selectClientToUpdate,
	userLogged,
	userLogin,
};
