

const checkAuth = (req, res, next) => {
	
	if (req.session && req.session.usuario) {
		// O usuário está autenticado
		next();
	} else {
		// O usuário não está autenticado
		res.redirect("/login"); // Redireciona para a página de login, por exemplo
	}
};

module.exports = {
	checkAuth,
};
