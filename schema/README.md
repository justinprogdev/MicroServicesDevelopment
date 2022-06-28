# Converting From Protobuf to C# or TS

## For TypeScript

The command is:

```shell
protoc .\someproto.proto --csharp_out .
```

## For TypeScript

Using the plugin from https://github.com/stephenh/ts-proto

```shell
protoc --plugin=protoc-gen-ts_proto=.\node_modules\.bin\protoc-gen-ts_proto.cmd --ts_proto_out=. ./addressbook.proto
```
