# 12useRouter 的使用误区

## ant-design-vue 的表单验证问题

- valid 只代表表单验证通过，不代表接口可以通过。

## vue-router 使用问题

- 所有的组件式函数，只可以在 vue 文件中使用。
- `vue-router` 中的`useRouter`也是组合式函数，所以也只能在 vue 文件中使用，无法在 ts 中使用。
- 如果我们要在 ts 文件中使用组合式函数，则要将 router 作为参数传递过去。
