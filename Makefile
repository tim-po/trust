default:
	@echo "please select a command from makefile"

component:
	@mkdir ./src/components/$(name)
	@touch ./src/components/$(name)/index.css
	@touch ./src/components/$(name)/index.tsx
	@touch ./src/components/$(name)/localization.tsx
	@cat ./src/components/AComponentSnippet/index.tsx | sed 's?SnippetComponent?'$(name)'?' | sed 's?some-classname?'$(name)'?' | sed 's?SnippetComponentDefaultProps?'$(name)DefaultProps'?' | sed 's?SnippetComponentPropType?'$(name)PropType'?' > ./src/components/$(name)/index.tsx
	@cat ./src/components/AComponentSnippet/index.css | sed 's?some-classname?'$(name)'?'  > ./src/components/$(name)/index.css
	@echo "export default {\n}" > ./src/components/$(name)/localization.tsx

page:
	@mkdir ./src/pages/$(name)
	@touch ./src/pages/$(name)/index.css
	@touch ./src/pages/$(name)/index.tsx
	@touch ./src/pages/$(name)/localization.tsx
	@cat ./src/pages/APageSnippet/index.tsx | sed 's?SnippetPage?'$(name)'?' | sed 's?some-classname?'$(name)'?' | sed 's?SnippetPageDefaultProps?'$(name)DefaultProps'?' | sed 's?SnippetPagePropType?'$(name)PropType'?'  > ./src/pages/$(name)/index.tsx
	@cat ./src/pages/APageSnippet/index.css | sed 's?some-classname?'$(name)'?'  > ./src/pages/$(name)/index.css
	@echo "export default {\n}" > ./src/pages/$(name)/localization.tsx
