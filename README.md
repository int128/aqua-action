# aqua-action [![ts](https://github.com/int128/aqua-action/actions/workflows/ts.yaml/badge.svg)](https://github.com/int128/aqua-action/actions/workflows/ts.yaml)

This is an action to install packages using https://github.com/suzuki-shunsuke/aqua.


## Getting Started

Create `aqua.yaml` and add packages.

```yaml
packages:
- name: suzuki-shunsuke/github-comment
  registry: standard
  version: v3.0.1 # renovate: depName=suzuki-shunsuke/github-comment

registries:
- type: standard
  ref: v0.4.2 # renovate: depName=suzuki-shunsuke/aqua-registry
```

To run this action:

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: int128/aqua-action@v1
```


## Inputs

| Name | Default | Description
|------|---------|------------
| `config` | `${{ github.workspace }}/aqua.yaml` | path to config
| `version` | see action.yaml | aqua version


## Outputs

| Name | Description
|------|------------
| `example` | example output
