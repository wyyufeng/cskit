## 内容系统开发套件

🐱‍🏍🐱‍🏍🐱‍🏍

###Install

```sh
 npm install  @mpfe/cskit
```

### 概念

dataProvider

之前的请求方式存在两个问题

1. 接口返回的数据一般放在了 store 或者组件内清洗组装，这样某种程度上造成了污染，增加了组件的耦合性
2. 接口定义过于分散，看起来费劲(多数情况下其实也不是问题)

dataProvide 使用类似 redux-reducer 的方式，通过传入一个 type 返回对应的的接口调用函数

其实主要的改变在于返回的是一个新的 Promise，而不是 httpClient 的 promise ，这样就可以在数据返回前做清洗组装了(之前咋就没想到呢)
使用 dataProvider 就可以保证组件得到的始终是自身需要的数据

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
import {normalList,QueryList} from '@mpfe/cskit'

//注册model
app.useModel(normalList({
    namespcae:"news",
    dataProvide
}))

// 使用高阶组件
// 高阶组件传给子组件的props
 interface ListData {
  records: Array<any>;
  pageCount: number;
  currentPage: number;
  totalNum: number;
  [other: string]: any;
}


<QueryList namespace="news">
    {
     listData=><YourComponent {...listData}/>
    }
<QueryList>

```

####QueryOne
查询单条信息
🐍 注意：详情数据一般不需要放在 redux store 中，因此`QueryOne`将数据保存在组件`state`中

```javascript
import {QueryOne,withQueryOneByID} from "@mpfe/cskit"

// QueryOne 本身只提供调用dataProvide 和传递数据的作用，因此需要使用 withQueryOneByID 进一步包装，在withQueryOneByID,中默认使用路由中的resource 参数作为ID，因此需要结合路由一起使用

const One = withQueryOneByID(({error,isLoading,data})=><div></div>)

<Route  path="/news/:resource" component={One}/>



```

理论上可以使用这种模式扩展出更多高阶组件
🚲🚲🚲(未完待续)
