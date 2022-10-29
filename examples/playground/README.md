```sh
$ FOO=bar PORT=1 NODE_ENV=test npm run play
bar
1
test
# Default Foo
$ PORT=1 NODE_ENV=test npm run play
foo
1
test
# Invalid PORT
$ PORT=0 NODE_ENV=test npm run play
Invalid environment variables:
  PORT: Number must be greater than or equal to 1
# Invalid NODE_ENV
$ PORT=1 NODE_ENV=dev npm run play
Invalid environment variables:
  NODE_ENV: Invalid enum value. Expected 'development' | 'production' | 'test', received 'dev'
```
