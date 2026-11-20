SHELL := /usr/bin/env bash

.PHONY: setup dev build lint typecheck test verify format-check docs-check contract contract-check contract-lint e2e doctor

setup:
	npm run setup

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

verify:
	npm run verify

format-check:
	npm run format:check

docs-check:
	npm run docs:check

contract:
	npm run contract

contract-check:
	npm run contract:check

contract-lint:
	npm run contract:lint

e2e:
	npm run e2e

doctor:
	npm run doctor
