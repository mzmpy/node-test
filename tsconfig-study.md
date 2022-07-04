## 使用`tsconfig.json`的情况

- 不带任何输入文件的情况下调用`tsc`，编译器会从当前目录开始逐级向上查找父目录的`tsconfig.json`文件
- 不带任何输入文件的情况下调用`tsc`，且使用命令行参数`--project`（或`-p`）指定一个包含`tsconfig.json`文件的目录
- `Note`：当指定输入文件的时候，`tsconfig.json`文件会被忽略

## `tsconfig.json`的属性包括

- `compilerOptions`：`compilerOptions`属性可以被忽略，这时候编译器会使用内置的**编译器选项**配置
- `files`、`include`和`exclude`选项：由它们共同指定了应该包含哪些文件到编译中；`files`是一个包含绝对路径或者相对路径的文件列表，它的优先级最高，它指定的文件（包括`outDir`目录下的文件）都会被包含进来；`include`和`exclude`属性指定一个文件`glob`匹配模式列表（`*`、`?`、`**/`）；`exclude`的优先级高于`include`，使用`include`引入的文件可以被`exclude`过滤掉；如果没有特殊指定， `exclude`默认情况下会排除`node_modules`，`bower_components`，`jspm_packages`和`outDir`目录；如果`files`和`include`都没有被指定，编译器默认包含当前目录和子目录下所有的`TypeScript`文件（`.ts`，`.d.ts`和`.tsx`），并且任何被`files`和`include`指定的文件引用的文件都会被包含进来
- `@types`、`typeRoots`和`types`：`typeRoots`和`types`都是`compilerOptions`里的属性，它们的值都是一个包含了指定路径的列表；默认所有可见的`@types`包会在编译过程中被加进来；如果指定了`typeRoots`，那么只有`typeRoots`下的包才会被加进来；如果指定了`types`，那么只会包含`@types`中相应的（由`types`指定的）包，即使用`types`会禁用自动引用`%types`中的包
- `extends`：`extends`也是`tsconfig.json`的顶层属性，其值是一个包含指定的继承文件路径的字符串；`tsconfig.json`文件中的配置会先被加载，然后被来自继承文件中的配置重写