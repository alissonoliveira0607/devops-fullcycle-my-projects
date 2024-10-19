.PHONY: help build destroy

# Exibe a ajuda
help:
	@echo "Uso: make [opção]"
	@echo ""
	@echo "Opções:"
	@echo "  build      Inicia os serviços em segundo plano usando docker-compose."
	@echo "  destroy    Para e remove os serviços, incluindo volumes."
	@echo "  help       Exibe esta mensagem de ajuda."

build:
	@docker-compose up -d

destroy:
	@docker-compose down -v
