module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  // 0：不报错， 2：使用本条规则
  rules: {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    //语句强制分号结尾
    'semi': [2, 'always'],
    'handle-callback-err': 0,
    //小括号里面要不要有空格
    'space-in-parens': [0, 'never'],
    //函数调用时 函数名与()之间不能有空格
    'no-spaced-func': 2,
    //强制驼峰法命名
    'camelcase': 2,
    //在创建对象字面量时不允许键重复 {a:1,a:1}
    'no-dupe-keys': 2,
    //块语句中的内容不能为空
    'no-empty': 2,
    //禁止对null使用==或!=运算符
    'no-eq-null': 2,
    //不能有未定义的变量
    'no-undef': 1,
    // 禁止不规则空格
    'no-irregular-whitespace': 0,
    // 禁止多空格
    'no-multi-spaces': 0,
    //禁止使用javascript:void(0)
    'no-script-url': 0,
    //声明时必须赋初值
    'init-declarations': 0,
    'object-curly-spacing': 0,
    'object-property-newline': 0,
    //不能有声明后未被使用的变量或参数
    'no-unused-vars': [2, {'vars': 'all', 'args': 'after-used'}],
    //函数参数不能重复
    'no-dupe-args': 2,
    //注释风格允许没有空格
    'spaced-comment': 0,
    //函数定义时括号前面要不要有空格
    'space-before-function-paren': [0, "always"],
    //避免多行表达式
    'no-unexpected-multiline': 2,
    //不能有无法执行的代码
    'no-unreachable': 2
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
