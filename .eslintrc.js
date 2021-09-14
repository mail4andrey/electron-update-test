module.exports = {
	env: {
		browser: true,
		es6: true,
		node: true,
		es2017: true
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:promise/recommended',
		'plugin:sonarjs/recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'plugin:@typescript-eslint/all',
		// 'prettier',
		// 'prettier/@typescript-eslint',
		// 'prettier/react',
		// 'prettier/standard',
		'plugin:import/errors',
		'plugin:import/warnings',
		'plugin:import/typescript',
		// 'plugin:unicorn/recommended'
		// "plugin:jsdoc/recommended"
	],
	ignorePatterns: [],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		"ecmaVersion": 2020,
		project: 'tsconfig.json',
		sourceType: 'module'
	},
	plugins: [
		'react',
		'react-hooks',
		'promise',
		'optimize-regex',
		'sonarjs',
		'@typescript-eslint',
		// 'prettier',
		'import',
		'jsdoc',
		'prefer-arrow',
		// 'unicorn'
	],
	rules: {
		// новые правила
		'@typescript-eslint/no-invalid-this': 'off',

		// prettier отключен, так как любит все переформатировать под себя
		// 'prettier/prettier': ['warn'], //prettier

		//---------------------------------------------------
		// Форматирование кода
		//---------------------------------------------------
		//отступы
		indent: 'off',
		'@typescript-eslint/indent': [
			'warn',
			'tab',
			{
				SwitchCase: 1
			}
		],
		//пробел перед скобками с аргументами функции
		'space-before-function-paren': 'off',
		'@typescript-eslint/space-before-function-paren': [
			'warn',
			{
				anonymous: 'always',
				named: 'never',
				asyncArrow: 'always'
			}
		],
		// символ новой строки как в windows
		'linebreak-style': ['error', 'windows'],
		// кавычки как символ '
		quotes: ['error', 'single'],
		// точка с запятой в конце строки
		semi: 'off',
		'@typescript-eslint/semi': ['error'],
		// удалить повторяющиеся точки с запятой
		'no-extra-semi': 'off',
		'@typescript-eslint/no-extra-semi': ['error'],
		// точка с запятой у переменных
		'@typescript-eslint/member-delimiter-style': [
			'warn',
			{
				multiline: {
					delimiter: 'semi',
					requireLast: true
				},
				singleline: {
					delimiter: 'semi',
					requireLast: true
				}
			}
		],
		// количество классов в файле
		'max-classes-per-file': ['error', 1],

		// название файлов
		// 'unicorn/filename-case': [
		// 	'error',
		// 	{
		// 		cases: {
		// 			camelCase: true,
		// 			pascalCase: true
		// 		}
		// 	}
		// ],
		// // запрет использования сокращений
		// 'unicorn/prevent-abbreviations': [
		// 	'warn',
		// 	{
		// 		replacements: {
		// 			prop: {
		// 				property: false
		// 			},
		// 			props: {
		// 				properties: false
		// 			}
		// 		}
		// 	}
		// ],

		//---------------------------------------------------
		// Документирование кода
		//---------------------------------------------------
		// Наличие описания методов, свойств и т.п.
		'jsdoc/require-jsdoc': [
			'warn',
			{
				require: {
					ClassDeclaration: true,
					ArrowFunctionExpression: true,
					ClassExpression: true,
					FunctionExpression: true,
					MethodDefinition: true,
					FunctionDeclaration: true
				}
			}
		],
		'jsdoc/check-alignment': 1,
		'jsdoc/check-examples': 1,
		'jsdoc/check-indentation': 1,
		'jsdoc/check-param-names': 1,
		'jsdoc/check-syntax': 1,
		'jsdoc/check-tag-names': 1,
		'jsdoc/check-types': 1,

		//---------------------------------------------------
		// Настройки импорта модулей
		//---------------------------------------------------
		//
		'import/no-unresolved': 'off',
		// отключаем проверку наличия модуля в файле, так как у нас используются index файлы
		'import/named': 'off',
		// не делаем export default
		'import/no-default-export': 'error',
		'import/no-deprecated': 'error',
		'import/no-unassigned-import': 'error',
		// проверка на цикличные ссылки при импорте
		'import/no-cycle': 'error',
		// удаляем неиспользуемые модули
		'import/no-unused-modules': 'error',
		// сортировка и группировка импортируемых модулей
		'import/order': [
			'warn',
			{
				// пустая строка между группами
				'newlines-between': 'always',
				alphabetize: {
					order: 'asc',
					caseInsensitive: true
				},
				groups: [
					// модули реакт и тп
					'internal',
					//наши index файлы
					'external',
					// 'index',
					// путь с ./
					'sibling',
					'builtin',
					'parent',
					'unknown'
				],
				pathGroups: [
					{
						pattern: '~/**',
						group: 'external'
					}
				]
			}
		],

		//---------------------------------------------------
		// Ограничения по выражениям и языку
		//---------------------------------------------------
		// отключаем. лучше then чем await
		'promise/prefer-await-to-then': 'off',

		// отключена строгая проверка в условии, т.е. bar !== undefined
		'@typescript-eslint/strict-boolean-expressions': 'off',

		// предупреждение об использовании ! в ненулевых утверждениях для более строгой проверки
		'@typescript-eslint/no-non-null-assertion': 'off', //+

		//стрелочные функции наше все
		'prefer-arrow/prefer-arrow-functions': [
			'warn',
			{
				disallowPrototype: true,
				singleReturnOnly: true,
				classPropertiesAllowed: false
			}
		],

		// требовать типы свойств, методов и т.п.
		'@typescript-eslint/typedef': [
			'warn',
			{
				//требовать тип свойства объекта, даже если происходит инициализация данными
				memberVariableDeclaration: false
			}
		],

		// для аргументов функции нельзя присваивать новые значения
		'no-param-reassign': 'error',

		'sonarjs/prefer-immediate-return': 'off',

		// аргументы и функции должны иметь тип. тип any также выдает предупреждение
		'@typescript-eslint/explicit-module-boundary-types': ['off'],
		// классы со статическими методами. надо переводить на const объекты
		'@typescript-eslint/no-extraneous-class': 'warn',
		// сложность метода. по умолчанию разрешено 20 ветвлений
		complexity: 'off',
		// порядок следования свойств, полей методов и т.п.
		'@typescript-eslint/member-ordering': 'warn',
		// явная проверка длины массива
		// 'unicorn/explicit-length-check': [
		// 	'error',
		// 	{
		// 		'non-zero': 'not-equal'
		// 	}
		// ],
		// неиспользуемые переменные
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': [
			'error',
			{
				argsIgnorePattern: '^_'
				// varsIgnorePattern: '^_$'
			}
		],

		// пустые интерфейсы. при наследовании не является ошибкой
		'@typescript-eslint/no-empty-interface': [
			'warn',
			{
				allowSingleExtends: true
			}
		],
		// запрет использования магических чисел
		'@typescript-eslint/no-magic-numbers': [
			'warn',
			{
				ignoreNumericLiteralTypes: true,
				ignoreEnums: true,
				enforceConst: true,
				ignoreReadonlyClassProperties: true,
				ignore: [0, 24, 60, 1000]
			}
		],

		// запрет на использование алиасов типа - declare type
		'@typescript-eslint/no-type-alias': [
			'error',
			{
				// разрешены объединения - declare type CellSize = 'small' | 'medium' 
				allowAliases : 'in-unions'
			}
		],

		//---------------------------------------------------
		// Автосгенерированные правила и копия из интернетов
		//---------------------------------------------------

		'constructor-super': 'error',
		'for-direction': ['error'],
		'getter-return': ['error'],
		'no-async-promise-executor': ['error'],
		'no-case-declarations': ['error'],
		'no-class-assign': ['error'],
		'no-compare-neg-zero': ['error'],
		'no-cond-assign': 'error',
		'no-const-assign': ['error'],
		'no-constant-condition': ['error'],
		'no-control-regex': ['error'],
		'no-debugger': 'error',
		'no-delete-var': ['error'],
		'no-dupe-args': ['error'],
		'no-dupe-class-members': ['error'],
		'no-dupe-keys': ['error'],
		'no-duplicate-case': 'error',
		'no-empty': 'error',
		'no-empty-character-class': ['error'],
		'no-empty-pattern': ['error'],
		'no-ex-assign': ['error'],
		'no-extra-boolean-cast': ['error'],
		'no-fallthrough': 'error',
		'no-func-assign': ['error'],
		'no-global-assign': ['error'],
		'no-inner-declarations': ['error'],
		'no-invalid-regexp': ['error'],
		'no-irregular-whitespace': 'error',
		'no-misleading-character-class': ['error'],
		'no-mixed-spaces-and-tabs': ['error'],
		'no-new-symbol': ['error'],
		'no-obj-calls': ['error'],
		'no-octal': ['error'],
		'no-prototype-builtins': ['error'],
		'no-redeclare': 'error',
		'no-regex-spaces': ['error'],
		'no-self-assign': ['error'],
		'no-shadow-restricted-names': ['error'],
		'no-sparse-arrays': 'error',
		'no-this-before-super': ['error'],
		'no-undef': ['error'],
		'no-unexpected-multiline': ['error'],
		'no-unreachable': ['error'],
		'no-unsafe-finally': 'error',
		'no-unsafe-negation': ['error'],
		'no-unused-labels': 'error',
		'no-useless-catch': ['error'],
		'no-useless-escape': ['error'],
		'no-with': ['error'],
		'require-yield': ['error'],
		'use-isnan': 'error',
		'valid-typeof': ['error'],
		'arrow-body-style': ['error', 'as-needed'], //+
		'arrow-parens': ['error', 'as-needed'],
		// camelcase: 'error',
		// 'comma-dangle': 'off',
		// curly: 'error',
		'default-case': 'error',
		'dot-notation': 'error',
		'eol-last': 'error',
		eqeqeq: ['error', 'always'],
		'guard-for-in': 'error',
		'id-blacklist': [
			'error',
			'any',
			'Number',
			'number',
			'String',
			'string',
			'Boolean',
			'boolean',
			'Undefined'
		],
		'id-match': 'error',
		// 'jsdoc/no-types': 'error',
		'max-len': [
			// макс длина строки
			'error',
			{
				code: 240,
				ignoreUrls: true,
				ignoreStrings: true,
				ignoreTemplateLiterals: true,
				ignoreRegExpLiterals: true
				// "ignorePattern": "^\\s*var\\s.+=\\s*require\\s*\\("
			}
		],
		'new-parens': 'error',
		'newline-per-chained-call': 'error',
		'no-bitwise': 'error',
		'no-caller': 'error',
		'no-console': [
			'error',
			{
				allow: [
					'log',
					'debug',
					'warn',
					'error',
					'dir',
					'assert',
					'clear',
					'count',
					'countReset',
					'group',
					'groupCollapsed',
					'groupEnd',
					'Console',
					'dirxml',
					'table',
					'markTimeline',
					'profile',
					'profileEnd',
					'timeline',
					'timelineEnd',
					'timeStamp',
					'context'
				]
			}
		],
		'no-duplicate-imports': 'error',
		'no-eval': 'error',
		'no-extra-bind': 'error',
		'no-magic-numbers': 'off', //+
		'no-multiple-empty-lines': [
			'error',
			{
				max: 2
			}
		],
		'no-new-func': 'error',
		'no-new-wrappers': 'error',
		'no-plusplus': 'error',
		'no-return-await': 'error',
		'no-sequences': 'error',
		'no-shadow': [
			//+
			'error',
			{
				hoist: 'all',
				builtinGlobals: true,
				allow: ['event']
			}
		],
		'no-template-curly-in-string': 'error',
		'no-throw-literal': 'error',
		'no-trailing-spaces': 'error',
		'no-undef-init': 'error',
		'no-underscore-dangle': 'error', //+
		'no-unused-expressions': 'error',
		'no-useless-constructor': 'error',
		'no-var': 'error',
		'no-void': 'error',
		'object-shorthand': ['error', 'always'],
		'one-var': ['error', 'never'],
		'prefer-const': [
			'error',
			{
				destructuring: 'any'
			}
		],
		'prefer-object-spread': 'error',
		'prefer-readonly': 'off', //+
		'prefer-template': 'error',
		'quote-props': ['error', 'as-needed'],
		radix: 'error',
		'spaced-comment': 'error',
		yoda: 'error',

		'no-duplicate-imports': ['error', { includeExports: true }],
		'no-template-curly-in-string': 'error',
		'block-scoped-var': 'error',
		curly: ['error', 'all'], //+
		eqeqeq: 'error',
		'no-alert': 'warn',
		'no-console': 'warn',
		'no-else-return': ['error', { allowElseIf: false }],
		'no-implicit-coercion': 'error',
		'no-labels': 'error',
		'no-lone-blocks': 'error',
		'no-multi-spaces': 'error',
		'no-new': 'error',
		'no-new-func': 'error',
		'no-new-wrappers': 'error',
		'no-return-await': 'error',
		'no-self-compare': 'error',
		'no-sequences': 'error',
		'no-throw-literal': 'error',
		'no-unused-expressions': 'error',
		'no-useless-call': 'error',
		'no-useless-concat': 'error',
		'no-useless-return': 'error',
		'prefer-promise-reject-errors': 'error',
		radix: 'error',
		// 'no-undefined': 'error',
		'array-bracket-newline': ['error', { multiline: true }],
		// 'comma-dangle': ['error', 'always-multiline'],
		'comma-style': 'error',
		'eol-last': 'error',
		'key-spacing': 'error',
		'keyword-spacing': 'error',
		'new-parens': 'error',
		'no-bitwise': 'warn',
		'no-lonely-if': 'warn',
		'no-multiple-empty-lines': 'error',
		'no-nested-ternary': 'error',
		'no-new-object': 'error',
		'no-tabs': ['error', { allowIndentationTabs: true }],
		'no-trailing-spaces': 'error',
		'no-unneeded-ternary': 'error',
		'no-whitespace-before-property': 'error',
		'object-curly-newline': 'error',
		// 'object-curly-spacing': ['error', 'always'],
		// note you must disable the base rule as it can report incorrect errors
		"object-curly-spacing": "off",
		"@typescript-eslint/object-curly-spacing": ["error", 'always'],
		'semi-spacing': 'error',
		'space-before-blocks': 'error',

		'space-in-parens': 'error', //+
		'space-infix-ops': 'error',
		'space-unary-ops': 'error',
		'spaced-comment': ['error', 'always'],
		'switch-colon-spacing': 'error',
		'arrow-spacing': 'error',
		'generator-star-spacing': ['error', 'after'],
		'no-confusing-arrow': 'error',
		// 'no-confusing-arrow': ["error", {"allowParens": false}],
		'no-useless-computed-key': 'error',
		'no-useless-rename': 'error',
		'object-shorthand': ['error', 'always'],
		'prefer-arrow-callback': 'warn',
		'prefer-destructuring': 'warn',
		'rest-spread-spacing': ['error', 'never'],
		'template-curly-spacing': 'error',

		//autogen

		'@typescript-eslint/adjacent-overload-signatures': 'error',
		'@typescript-eslint/array-type': 'error',
		'@typescript-eslint/await-thenable': 'error',
		// '@typescript-eslint/ban-ts-ignore': 'error',
		'@typescript-eslint/ban-types': 'error',
		// '@typescript-eslint/class-name-casing': 'error',
		'@typescript-eslint/consistent-type-assertions': 'error',
		'@typescript-eslint/consistent-type-definitions': 'error',
		'@typescript-eslint/explicit-member-accessibility': [
			'error',
			{
				accessibility: 'explicit',
				overrides: {
					accessors: 'explicit',
					constructors: 'explicit',
					parameterProperties: 'explicit'
				}
			}
		],
		'@typescript-eslint/interface-name-prefix': 'error',
		'@typescript-eslint/no-empty-function': 'error',
		'@typescript-eslint/no-floating-promises': [
			'error',
			{
				ignoreVoid: true
			}
		],
		'@typescript-eslint/no-for-in-array': 'error',
		'@typescript-eslint/no-inferrable-types': [
			'error',
			{
				ignoreParameters: true
			}
		],
		'@typescript-eslint/no-misused-new': 'error',
		'@typescript-eslint/no-namespace': 'error',
		'@typescript-eslint/no-parameter-properties': 'error',
		'@typescript-eslint/no-require-imports': 'error',
		'@typescript-eslint/no-this-alias': 'error',
		'@typescript-eslint/no-unnecessary-qualifier': 'error',
		'@typescript-eslint/no-unnecessary-type-arguments': 'error',
		'@typescript-eslint/no-unnecessary-type-assertion': 'error',
		'@typescript-eslint/no-var-requires': 'error',
		'@typescript-eslint/prefer-for-of': 'error',
		'@typescript-eslint/prefer-function-type': 'error',
		'@typescript-eslint/prefer-namespace-keyword': 'error',
		'@typescript-eslint/promise-function-async': 'error',
		'@typescript-eslint/quotes': ['error', 'single'],
		'@typescript-eslint/restrict-plus-operands': 'error',
		'@typescript-eslint/triple-slash-reference': 'error',
		'@typescript-eslint/type-annotation-spacing': 'error',
		'@typescript-eslint/unbound-method': 'error',
		'@typescript-eslint/unified-signatures': 'error',

		'@typescript-eslint/no-extra-parens': [
			'error',
			'all',
			{
				ignoreJSX: 'multi-line'
				// "returnAssign": false
			}
		],
		//dodo
		'@typescript-eslint/brace-style': ['error', '1tbs'],
		'@typescript-eslint/quotes': ['error', 'single', { avoidEscape: true }],
		'@typescript-eslint/func-call-spacing': ['error', 'never'],
		'@typescript-eslint/no-useless-constructor': 'error',
		'@typescript-eslint/prefer-for-of': 'warn',
		'@typescript-eslint/no-parameter-properties': 'error',
		'@typescript-eslint/no-unnecessary-type-arguments': 'warn',
		'@typescript-eslint/prefer-function-type': 'warn',
		// использовать readonly где возможно
		'@typescript-eslint/prefer-readonly': 'error',
		'@typescript-eslint/no-explicit-any': 'off',
		// '@typescript-eslint/camelcase': ['error', { properties: 'never' }],
		'@typescript-eslint/explicit-function-return-type': [
			'error',
			{
				allowExpressions: true
			}
		],
		'@typescript-eslint/interface-name-prefix': 'off',

		//---------------------------------------------------
		// Настройки реакта
		//---------------------------------------------------
		// количество пропов в одной строке
		'react/jsx-max-props-per-line': [
			2,
			{
				maximum: 1
			}
		],
		// при ошибке выше, первый проп тоже переносится на новую строку
		'react/jsx-first-prop-new-line': 'error',

		'react/display-name': [2],
		'react/jsx-key': [2],
		'react/jsx-no-comment-textnodes': [2],
		'react/jsx-no-duplicate-props': [2],
		'react/jsx-no-target-blank': [2],
		'react/jsx-no-undef': [2],
		'react/jsx-uses-react': [2],
		'react/jsx-uses-vars': [2],
		'react/no-children-prop': [2],
		'react/no-danger-with-children': [2],
		'react/no-deprecated': [2],
		'react/no-direct-mutation-state': [2],
		'react/no-find-dom-node': [2],
		'react/no-is-mounted': [2],
		'react/no-render-return-value': [2],
		'react/no-string-refs': [2],
		'react/no-unescaped-entities': [2],
		'react/no-unknown-property': [2],
		'react/no-unsafe': [0],
		'react/prop-types': [2],
		'react/react-in-jsx-scope': [2],
		'react/require-render-return': [2],

		'react/no-access-state-in-setstate': 'error',
		'react/no-danger': 'error',
		'react/no-multi-comp': 'error',
		'react/no-this-in-sfc': 'error',
		'react/prefer-stateless-function': ['error', { "ignorePureComponents": true }],
		'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
		'react/jsx-no-bind': 'warn',
		'react/jsx-no-literals': 'warn',
		'react/jsx-no-useless-fragment': 'error',
		'react/jsx-pascal-case': 'error',

		// Проверяем правила хуков
		'react-hooks/rules-of-hooks': 'error',
		// Проверяем зависимости эффекта
		'react-hooks/exhaustive-deps': 'warn',

		'optimize-regex/optimize-regex': 'warn',

		'@typescript-eslint/restrict-template-expressions': 'off',
		'@typescript-eslint/restrict-plus-operands': 'off',
		'promise/always-return': 'off',

		// новые
		// "@typescript-eslint/naming-convention": [
		// 	"error",
		// 	{ "selector": "variableLike", "format": ["camelCase"] }
		//   ]
		'@typescript-eslint/prefer-readonly-parameter-types': [
			'off',
			// {
			// 	checkParameterProperties: false
			// }
		]
	},
	settings: {
		"react": {
			// "createClass": "createReactClass", // Regex for Component Factory to use,
			// 								   // default to "createReactClass"
			// "pragma": "React",  // Pragma to use, default to "React"
			"version": "detect", // React version. "detect" automatically picks the version you have installed.
								 // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
								 // default to latest and warns if missing
								 // It will default to "detect" in the future
			// "flowVersion": "0.53" // Flow version
		  },
	}
};
