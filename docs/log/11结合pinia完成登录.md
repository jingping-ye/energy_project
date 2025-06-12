# 11 结合 pinia 完成登录

## 问题

### 如果需要独立管理用户名和密码类型，一般会如何组织目录呢？

### 报错

```txt
'LoginParams' is a type and must be imported using a type-only import when 'verbatimModuleSyntax' is enabled.
```

```ts
import { LoginParams } from '@/api/user';
```

这个`verbatimModuleSyntax`的作用是什么，为什么会引发这个报错?

```txt
Argument of type 'string | null' is not assignable to parameter of type 'string'.
  Type 'null' is not assignable to type 'string'.
```

```ts
{
  state:()=>{
    return {
        menu: sessionStorage.getItem('menu') ? JSON.parse(sessionStorage.getItem('menu'))
    }
  }
}
```

原因：`sessionStorage.getItem('menu')`可能为空。这个时候如果使用`JSON.parse(variable)`去解决，就会报错。
解决方法：
使用 typescript 的非空断言`a!`

```ts
{
  state:() => {
    return {
        menu: sessionStorage.getItem('menu') ? JSON.parse(sessionStorage.getItem('menu')!)
    }
  }
}
```

## 为什么使用 pinia

- pinia 数据是响应式
- 性能问题：本地存储要慢一点，pinia 要更快一点。为什么?

## 本地存储

> 注意只能存储字符串

- sessionStorage
- localStorage
  为什么使用 sessionStorage，而不是使用 localStorage
  先从 pinia 中取，再从 sessionStorage 中取。
