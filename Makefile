SHELL := /usr/bin/env bash

.PHONY: setup dev build lint typecheck test contract contract-check e2e

setup:
	npm ci
	@test -f .env.local || cp .env.example .env.local

dev:
	npm run dev

build:
	npm run build

lint:
	npm run lint

typecheck:
	npm run typecheck

test:
	npm run test

contract:
	npm run contract

contract-check:
	npm run contract:check

e2e:
	npm run e2e
