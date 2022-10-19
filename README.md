# aqua-action [![ts](https://github.com/int128/aqua-action/actions/workflows/ts.yaml/badge.svg)](https://github.com/int128/aqua-action/actions/workflows/ts.yaml)

This is an action to install packages using https://github.com/aquaproj/aqua.


## Getting Started

Create `aqua.yaml` and add packages.

```yaml
registries:
- type: standard
  ref: v3.78.0 # renovate: depName=aquaproj/aqua-registry

packages:
- name: suzuki-shunsuke/github-comment@v4.0.0 # renovate: depName=suzuki-shunsuke/github-comment
```

To run this action,

```yaml
    steps:
      - uses: actions/checkout@v2
      - uses: int128/aqua-action@v1
```

This action saves the downloaded packages (`~/.aqua`) into cache and restores it next time.


## Inputs

| Name | Default | Description
|------|---------|------------
| `config` | `${{ github.workspace }}/aqua.yaml` | path to config
| `version` | see action.yaml | aqua version
| `token` | `${{ github.token }}` | GitHub token for aqua
