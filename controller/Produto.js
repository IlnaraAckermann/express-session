const DatabaseSingleton = require("../config/ConfigDB");
const databaseInstance = new DatabaseSingleton();

async function selectProdutos(req, res) {
	databaseInstance.db.all(`SELECT produtos.id,
		produtos.nome,
		produtos.estoque,
		categorias.nome AS categoria,
		produtos.preco,
		produtos.descricao,
		produtos.url_da_imagem
	FROM produtos
	JOIN categorias ON produtos.id_categoria = categorias.id;`, (err, rows) => {
		if (err) {
			throw err;
		}
		res.render('listar', {rows})
	});
}

async function selectProdutoEstoqueMin(req, res) {
	databaseInstance.db.all(
		`SELECT produtos.id,
				produtos.nome,
				produtos.estoque,
				categorias.nome AS categoria,
				produtos.preco,
				produtos.descricao,
				produtos.url_da_imagem
 		FROM produtos
 		JOIN categorias ON produtos.id_categoria = categorias.id 
		WHERE estoque >= 1
 		ORDER BY produtos.preco ASC;`,
		[],
		(err, rows) => {
			if (err) {
				throw err;
			}
			res.render('listar', {rows})
		}
	);
}

async function ordernarMenorPreco(req, res) {
	databaseInstance.db.all(
		`SELECT produtos.id,
				produtos.nome,
				produtos.estoque,
				categorias.nome AS categoria,
				produtos.preco,
				produtos.descricao,
				produtos.url_da_imagem
 		FROM produtos
 		JOIN categorias ON produtos.id_categoria = categorias.id 
 		ORDER BY produtos.preco ASC;`,
		[],
		(err, rows) => {
			if (err) {
				throw err;
			}
			res.render('listar', {rows})
		}
	);
}

async function ordernarMaiorPreco(req, res) {
	databaseInstance.db.all(
		`SELECT produtos.id,
				produtos.nome,
				produtos.estoque,
				categorias.nome AS categoria,
				produtos.preco,
				produtos.descricao,
				produtos.url_da_imagem
 		FROM produtos
 		JOIN categorias ON produtos.id_categoria = categorias.id 
 		ORDER BY produtos.preco DESC;`,
		[],
		(err, rows) => {
			if (err) {
				throw err;
			};
			res.render('listar', {rows})
		}
	);
}

async function inserirProduto(req, res) {
	let registro = req.body;
	console.log(registro);
	databaseInstance.db.run(
		"INSERT INTO produtos (nome, estoque, id_categoria, id_usuario, preco, descricao, url_da_imagem) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
            registro.nome,
            registro.estoque,
            registro.categoria,
            registro.usuario,
            registro.preco,
            registro.descricao,
            registro.url_da_imagem,
        ],
		(err) => {
			if (err) {
				console.log('deu erro');
                res.status(500).send("Erro ao inserir o produto no banco de dados.");
            } else {
				console.log('foi');
                res.redirect("/");
            }
		}
	
	);
}

async function atualizar(req, res) {
	let registro = req.body;
	console.log(registro);
	databaseInstance.db.run(
		"UPDATE produtos SET nome=?, estoque=?, id_categoria=?, id_usuario=?, preco=?, descricao=?, url_da_imagem=? WHERE id=?",
		[
			registro.nome,
			registro.estoque,
			registro.categoria,
            registro.usuario,
			registro.preco,
			registro.descricao,
			registro.url_da_imagem,
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

async function deleteById(req,res) {
	let id = req.body.id
	const parseId = parseInt(id)
	if(isNaN(parseId)) return res.status(404).send("Id inválido")
	databaseInstance.db.get('DELETE FROM produtos WHERE id=?', [parseId], (err) => {
		if (err) {
			res.status(500).send("Erro ao deletar o produto no banco de dados.");
		} else {
			res.redirect("/");
		}
	} )
}

async function selectProdutoById(req, res) {
	let id = req.query.id;
	const parseId = parseInt(id)
	if(isNaN(parseId)) return res.status(404).send("Id inválido")
	databaseInstance.db.get(`SELECT * FROM produtos WHERE id=?`, [parseId], 
	(err, item) => {
		if (err) {
			throw err;
		}
		if (!item) return res.sendStatus(404)
		 res.render('atualiza_produtos', { item })
		// res.json(item)
	});
}

module.exports = {
	selectProdutos,
	selectProdutoEstoqueMin,
	ordernarMaiorPreco,
	ordernarMenorPreco,
	inserirProduto,
	deleteById,
	atualizar,
	selectProdutoById
};
