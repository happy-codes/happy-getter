# happy-getter

When I get data from deep level object, I feel unhappy and fear. Because if some key does't have value, all javascript will broken.

![](https://img.alicdn.com/tfs/TB1PhCHhMoQMeJjy0FpXXcTxpXa-856-220.png)

I had to write some ugly code like `a && a.b && a.b.c` to avoid the js error.

Now, happy getter will make you happy with this.

## Usage

```
npm install happy-getter --save
```

There are two ways to use it.

Just use the function:

```
import getter from 'happy-getter';

const testData = {
  a: {
    b: {
      c: 'c'
    }
  }
};

const c = getter(testData, 'a.b.c');
```

Attach getter function to all Object. The function `attachGetter` is a mixin to enable the object itself to have the getter method, so that you could call getter on the object itself:

```
import {attachGetter} from 'happy-getter';

attachGetter('getter'); // -> the first param is the getter name, default is 'getter', the second param is extra options

const testData = {
  a: {
    b: {
      c: 'c'
    }
  }
};

const c = testData.getter('a.b.c');
```

## Tricks

### catch the error key

If you want to catch the error key, you can use the third params and custom a `errorCallback` function.

```
const c = getter(testData, 'a.b.c', {
  errorCallback: (errPath, allPath) => {
    console.log('errPath', errPath);
    console.log('allPath', allPath);
  }
});
```

or

```
attachGetter('getter', {
  errorCallback: (errPath, allPath) => {
    // todo
  }
});
```

### get array item?

```
const c = getter(testData, 'a["b"][0][10].c');
```

Read the code to get the more info, it's simple.

## About Happy Codes

Simple code make people happy. Welcome https://github.com/happy-codes.