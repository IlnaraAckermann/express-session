const DatabaseSingleton = require("../config/ConfigDB");
const databaseInstance = new DatabaseSingleton();

async function selectProdutos(req, res) {
	databaseInstance.db.all(`SELECT 
		produtos.id,
		produtos.nome,
		produtos.estoque,
		categorias.nome AS categoria,
		clientes.nome as usuario,
		produtos.preco,
		produtos.descricao,
		produtos.url_da_imagem
	FROM 
		produtos
	JOIN 
		categorias ON produtos.id_categoria = categorias.id
	JOIN 
		clientes ON produtos.id_usuario = clientes.id;`, (err, rows) => {
		if (err) {
			throw err;
		}
		res.render('listar', {rows})
	});
}


async function selectMeusProdutos(req, res) {
	databaseInstance.db.all(`SELECT 
		produtos.id,
		produtos.nome,
		produtos.estoque,
		categorias.nome AS categoria,
		clientes.nome as usuario,
		produtos.preco,
		produtos.descricao,
		produtos.url_da_imagem
	FROM 
		produtos
	JOIN 
		categorias ON produtos.id_categoria = categorias.id
	JOIN 
		clientes ON produtos.id_usuario = clientes.id
	WHERE
		produtos.id_usuario =?;`,
		[req.session.usuario.id], (err, rows) => {
		if (err) {
			throw err;
		}
		res.render('listar_meus_produtos', {rows})
	});
}



async function selectProdutoEstoqueMin(req, res) {
	databaseInstance.db.all(
		`SELECT 
			produtos.id,
			produtos.nome,
			produtos.estoque,
			categorias.nome AS categoria,
			clientes.nome as usuario,
			produtos.preco,
			produtos.descricao,
			produtos.url_da_imagem
		FROM 
			produtos
		JOIN 
			categorias ON produtos.id_categoria = categorias.id
		JOIN 
			clientes ON produtos.id_usuario = clientes.id
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
		`SELECT 
			produtos.id,
			produtos.nome,
			produtos.estoque,
			categorias.nome AS categoria,
			clientes.nome as usuario,
			produtos.preco,
			produtos.descricao,
			produtos.url_da_imagem
		FROM 
			produtos
		JOIN 
			categorias ON produtos.id_categoria = categorias.id
		JOIN 
			clientes ON produtos.id_usuario = clientes.id
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
		`SELECT 
			produtos.id,
			produtos.nome,
			produtos.estoque,
			categorias.nome AS categoria,
			clientes.nome as usuario,
			produtos.preco,
			produtos.descricao,
			produtos.url_da_imagem
		FROM 
			produtos
		JOIN 
			categorias ON produtos.id_categoria = categorias.id
		JOIN 
			clientes ON produtos.id_usuario = clientes.id
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
	databaseInstance.db.run(
		"INSERT INTO produtos (nome, estoque, id_categoria, id_usuario, preco, descricao, url_da_imagem) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
            registro.nome,
            registro.estoque,
            registro.categoria,
            req.session.usuario.id,
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
	
	if (req.session.usuario.id !== Number(registro.usuario) ) return res.status(401).send("Ação não autorizada.");
	
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
	if (req.session.usuario.id !== Number(id) ) return res.status(401).send("Ação não autorizada.");
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
	selectProdutoById,
	selectMeusProdutos
};
