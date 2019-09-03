## 内容系统开发套件

🐱‍🏍🐱‍🏍🐱‍🏍

###Install

```sh
 npm install  @mpfe/cskit
```

### 概念

dataProvider
一种可以给组件提供所需数据的方法，该方法返回一个 Promise，其 resolve 的参数为已经呗过滤过的数据，使用这个函数的作用在于保持组件的相对干净，并提供统一的数据格式

```javascript
export default (httpClient: any) => {
  return (type: string) => {
    switch (type) {
      case "QUERY_ONE_BY_ID":
        return (resource: string) => {
          return new Promise((resolve, reject) => {
            httpClient
              .get(`/api/queryArchivesById/${resource}`)
              .then((res: any) => {
                resolve(res.data.data);
              })
              .catch((err: any) => reject(err));
          });
        };
      case "QUERY_ONE_BY_NO":
        return (resource: string) => {
          return new Promise((resolve, reject) => {
            httpClient
              .get(`/api/queryArchivesByNo/${resource}`)
              .then((res: any) => {
                resolve(res.data.data);
              })
              .catch((err: any) => reject(err));
          });
        };

      default:
        return Promise.resolve();
    }
  };
};
```

###Usage

`cskit`需要和 👽[map](https://www.npmjs.com/package/@mpfe/mpa) 配合使用

####`topRoutes` 🛴🛴(完善中)
获取路由

```javascript
// ... init mpa
import { topRoutes } from "@mpfe/cskit";

app.useModel(topRoutes({ dataProvider }));
```

####`normalList`
获取列表
🐍 注意：列表数据多数情况下可能需要放在 redux store 中维护，因此在使用`QueryList`时，请确保已经注册了对应`namespace`的`model`

```javascript
import { normalList, QueryList } from "@mpfe/cskit";

//注册model
app.useModel(
  normalList({
    namespcae: "news",
    dataProvide
  })
);
```

#### 高阶组件

- QueryList

QueryList 需要和 mpa 结合使用，将数据放在 store 中

```javascript

<QueryList namespace="news">
    {
     listData=><YourComponent {...listData}/>
    }
</QueryList>

<SQueryList>

</SQueryList>



```

- QueryOne
  查询单条信息
