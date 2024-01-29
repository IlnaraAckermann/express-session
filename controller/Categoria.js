const DatabaseSingleton = require("../config/ConfigDB");
const databaseInstance = new DatabaseSingleton();

async function inserirCategoria(req, res) {
	let registro = req.body;
	console.log(registro);
	databaseInstance.db.run(
		"INSERT INTO categorias (id, nome) VALUES (?, ?)",
		[
			registro.id,
			registro.nome
		],
		(err) => {
			if (err) {
				throw err;
			}else {
                res.redirect("/");
            }
		}
	);
}

async function selectCategorias(req, res) {
	databaseInstance.db.all(`SELECT * FROM categorias`, (err, rows) => {
		if (err) {
			throw err;
		}
		// res.render('listar-categoria', {rows})
		res.json(rows)
		console.table(rows);
	});
}

async function deleteById(req,res) {
	let id = req.body.id
	databaseInstance.db.get('DELETE FROM categorias WHERE id=?', [id], (err) => {
		if (err) {
			res.status(500).send("Erro ao deletar a categoria no banco de dados.");
		} else {
			res.redirect("/");
		}
	} )
}

async function atualizar(req, res) {
	let registro = req.body;
	databaseInstance.db.run(
		"UPDATE produtos SET nome=? WHERE id=?",
		[
			registro.nome,
			registro.id,
		],
		(err) => {
			if (err) {
                res.status(500).send("Erro ao atualizar o produto no banco de dados.");
            } else {
                res.redirect("/");
            }
		}
	
	);
}


module.exports = {
	selectCategorias,
	inserirCategoria,
	atualizar,
	deleteById
}