# rollup-plugin-inject-process-env

> Inject `process.env` environment variables in a browser rollup bundle.

## Why ?

Because replacing a string typically with `rollup-plugin-replace` works in one case :

```js
    console.log(process.env.NODE_ENV);
```

...but not in all other cases :

```js
    console.log(process.env['NODE_ENV']);
```

```js
    const { NODE_ENV, NODE_PORT } = process.env;
    console.log(NODE_ENV);
```

Worse : sometimes, such substitution :

```js
    if (process.env.NODE_ENV === 'production') {
```

...will be expand to :

```js
    if ('production' === 'production') {
```

...and make some linter complain.

## How ?

### Installation

```bash
npm install --save-dev rollup-plugin-inject-process-env
```

### Usage

Pass any JSON object to the plugin that will be set as the `process.env` value. This object accept members value of any type.

```typescript
    injectProcessEnv(env: {})
```

#### Example :

```js
import injectProcessEnv from 'rollup-plugin-inject-process-env';

// ... usual rollup stuff

    plugins: [
        typescript(),
        injectProcessEnv({ 
            NODE_ENV: 'production',
            SOME_OBJECT: { one: 1, two: [1,2], three: '3' },
            UNUSED: null
         }),
		nodeResolve(),
		commonjs()
	],
```

#### Example with environment variables passed in the CLI :

```js
        injectProcessEnv({ 
            NODE_ENV: process.env.NODE_ENV,
            SOME_OBJECT: JSON.parse(process.env.SOME_OBJECT),
            UNUSED: null
         }),
```

#### Icing on the cake

You might notice that as mentionned in the documentation https://nodejs.org/api/process.html#process_process_env
environment variables are always `string`, `number` or `boolean`.

With **rollup-plugin-inject-process-env**, you may inject safely any JSON object to a `process.env` property.