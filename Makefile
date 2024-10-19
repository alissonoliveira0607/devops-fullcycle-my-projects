run_stack_laravel:
	@docker-compose -f ./docker-compose.yaml up -d

destroy_stack_laravel:
	@docker-compose down -f ./docker-compose.yaml -v

node:
	docker-compose up -f ./node/docker-compose.yaml up -d

destroy_node:
	docker-compose down -f ./node/docker-compose.yaml -v

.PHONY: run_stack_laravel destroy_stack_laravel node destroy_node