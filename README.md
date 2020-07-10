point-cloud-converter
========

A CLI-based Tool to Convert xyz Point Clouds into a Mesh.


### Setup

```bash
# clone Repo
git clone git@github.com:elfrank/point-cloud-converter.git

# install nvm: https://github.com/nvm-sh/nvm

# configure node version
nvm use
```

### Usage

```bash
# usage
node scripts/convert -h

# export points as boxes in OBJ format
node scripts/convert.js -i {YOUR_XYZ_FILE} -o output/pc_as_boxes.obj -p box -c 0xff0000 -s 0.005

# export points as spheres in OBJ format
node scripts/convert.js -i {YOUR_XYZ_FILE} -o output/pc_as_spheres.obj -p sphere -c 0xff0000 -s 0.005
```
