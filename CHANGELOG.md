#### 0.0.44 (2020-01-28)

##### Bug Fixes

*  resolve the way media query styles were overridden ([59686a5e](https://github.com/badbatch/styling/commit/59686a5e3850f9a11181511e81ed15b9347dc930))
*  sort media queries overriding each other ([604e8596](https://github.com/badbatch/styling/commit/604e85965ca81d8531b41b0a3efce8e5fe573cd8))
*  issue with configuring output dir from root ([54457f4b](https://github.com/badbatch/styling/commit/54457f4b7d8f4d5a2c34e9d8231bb045d94e5d99))

#### 0.0.43 (2020-01-27)

##### Bug Fixes

*  sort issue around config path resolution ([e483d73f](https://github.com/badbatch/styling/commit/e483d73fad31ab66a438d59947f1bca404d90c84))
*  minor bugs and add todos for others ([7ac7b37e](https://github.com/badbatch/styling/commit/7ac7b37e834011bed0fac386f0b6af9897a6f69b))

#### 0.0.42 (2020-01-24)

##### Chores

*  update repo urls ([1384bdbc](https://github.com/badbatch/styling/commit/1384bdbcee659965a2840f84c51ef7e82dd956b1))
*  adding todo ([9594593d](https://github.com/badbatch/styling/commit/9594593d6e1cf9de64a2fea4132a2d32e8a82ad5))

##### Documentation Changes

*  update readme ([72d86bd4](https://github.com/badbatch/styling/commit/72d86bd4de57a6905f1ad4b65d13a5496228e2f9))
*  update readme ([2056fa61](https://github.com/badbatch/styling/commit/2056fa6148f06c21b1609be2721a1dfb7f3eb455))

##### Bug Fixes

*  update examples in readme ([31410317](https://github.com/badbatch/styling/commit/31410317d3934e62cf435a06a16a8771db9bcc70))
*  update more urls ([ef9c1006](https://github.com/badbatch/styling/commit/ef9c100652d182017422d51788bdac757cc36284))
*  updating various issues in readme ([b36ca7d0](https://github.com/badbatch/styling/commit/b36ca7d0c8f356ef5df0021fb1519b45267945ed))
*  typo in readme ([27fa278e](https://github.com/badbatch/styling/commit/27fa278e20971bb222555dc08cc90cb40e7f6c3e))

#### 0.0.41 (2020-01-24)

##### Chores

*  add to do ([af5bf33e](https://github.com/dylanaubrey/styling/commit/af5bf33e478244bd17511a25d8c57a0b724e13ac))
*  add todo for class name currying bug ([2e20e740](https://github.com/dylanaubrey/styling/commit/2e20e7400ae617607c025ce62bee86b382e0ffce))
*  adding todo and more logs ([536a7cca](https://github.com/dylanaubrey/styling/commit/536a7cca7b356b8489a100f28f6bc154c5a26deb))
*  remove dead dependencies ([2c0ad954](https://github.com/dylanaubrey/styling/commit/2c0ad95405a49b7a6f15dd013f9b1b1480fb74d4))

##### New Features

*  cache css output as well and just copy into dist ([ef5e729c](https://github.com/dylanaubrey/styling/commit/ef5e729c956e2ca7fbd36346d8e938a0653ac84a))
*  improve reading and writing css ([3e35b893](https://github.com/dylanaubrey/styling/commit/3e35b893febaa3e5503161fde29e4842c807451f))
*  add file change package and caching of transpiled files ([77719509](https://github.com/dylanaubrey/styling/commit/7771950984c0dd91e81556c0abb888fdbff57d78))
*  adding esm and removing babel-register to appease rollup ([18d2a904](https://github.com/dylanaubrey/styling/commit/18d2a904f16b1e430496b894b0dedfd30a42e111))

##### Bug Fixes

*  snapshot test with file system path ([9f35732e](https://github.com/dylanaubrey/styling/commit/9f35732e3e1858c22325e90e7e59f5f263ca2acc))
*  resolve concurrency issues and stop unnecessary builds ([522f2423](https://github.com/dylanaubrey/styling/commit/522f24238a08fd3ed930cb5f3181cd04ebe182d4))
*  random refactoring ([02854785](https://github.com/dylanaubrey/styling/commit/02854785945319c47b2eb07b47e534c6d53bf9b1))
*  resolve styling specificity issues ([b08fcc4d](https://github.com/dylanaubrey/styling/commit/b08fcc4d2c437ebe2fcb79a8258a0fcff59a90e9))
*  resolve some of the issues with selector specificity ([d3a5c8e5](https://github.com/dylanaubrey/styling/commit/d3a5c8e5f8cab949c2d3154a01c3408f520bc185))
*  sort bugs in inheriting classnames and tag names ([dc79b011](https://github.com/dylanaubrey/styling/commit/dc79b01159f09e65fb511888754be767d04a3819))
*  revert ordering due to css specificity issues ([2859a076](https://github.com/dylanaubrey/styling/commit/2859a076897fe0e771bf25be32a3d2a10c3a828e))
*  sort failing test ([2ba39af2](https://github.com/dylanaubrey/styling/commit/2ba39af24f26b574bd318a44c0f30b947ede9617))
*  sorting various issues with file change detection ([2c114ff5](https://github.com/dylanaubrey/styling/commit/2c114ff592ebdd9b0ae7b19369a9404da02cd5ff))
*  stringify json output before writing ([7ed544c7](https://github.com/dylanaubrey/styling/commit/7ed544c77c85bba689334fab2bb0648f79178c0a))
*  sort missing ! before fileChange ([b83f83c0](https://github.com/dylanaubrey/styling/commit/b83f83c05961626504a3b68e622308348d753f94))
*  sort out removing file and empty folder method ([adc859a9](https://github.com/dylanaubrey/styling/commit/adc859a916fa0dadd9a0e2c0a5ed9aa9a70eadc3))
*  move temp files to styling folder ([9ef1136e](https://github.com/dylanaubrey/styling/commit/9ef1136ebcb387d21507bb0f6590d39f5a026420))
*  various bugs ([c007e2bf](https://github.com/dylanaubrey/styling/commit/c007e2bf4025602827912ff26294fb7f9ba303c1))
*  make logger avaialbe in client bundle ([e7c8d9ac](https://github.com/dylanaubrey/styling/commit/e7c8d9ac69043e1742989d055500dc1991717cab))

#### 0.0.40 (2020-01-08)

##### New Features

*  adding logging to styling function ([d20f66f3](https://github.com/dylanaubrey/styling/commit/d20f66f3d303922461009408838dd2a3d04ed10a))

#### 0.0.39 (2020-01-07)

##### New Features

*  add additional logging to tranforming file logic ([af86296b](https://github.com/dylanaubrey/styling/commit/af86296b5ec0888b8a7321fcae7aadfb5914f74a))

#### 0.0.38 (2020-01-07)

##### New Features

*  add filtering of props to only valid attributes ([677317b9](https://github.com/dylanaubrey/styling/commit/677317b99bb1b6aa66545206f596b6389947e22e))

##### Tests

*  add additional scenario for styling function ([f3281493](https://github.com/dylanaubrey/styling/commit/f328149344092158d9246ede30e0393cb7b84850))

#### 0.0.37 (2020-01-06)

##### Bug Fixes

*  expose options in plugin function ([b506ff12](https://github.com/dylanaubrey/styling/commit/b506ff1292532bcef21d6f918e5510e7e83d201c))

#### 0.0.36 (2020-01-06)

##### Bug Fixes

*  update helpers build to separate browser exports ([0bfe18f3](https://github.com/dylanaubrey/styling/commit/0bfe18f3c7dd02d0c20a8110e1219f9d254db754))

#### 0.0.35 (2020-01-06)

##### Bug Fixes

*  adding env flag to determine when to write css ([55aa0391](https://github.com/dylanaubrey/styling/commit/55aa0391b51615a85909808d95d0e65c2046aac3))

#### 0.0.34 (2020-01-06)

##### Bug Fixes

*  change hashing mechanism ([38bfcc1a](https://github.com/dylanaubrey/styling/commit/38bfcc1aba6e3aaa0adbbf2ae7643de8ac7b3a5b))

#### 0.0.33 (2020-01-03)

##### Bug Fixes

*  change way path segments are combined ([bc0a8ede](https://github.com/dylanaubrey/styling/commit/bc0a8ede2de9de3e884b970c590cafaaca599280))
*  pass filename down and not just directory ([5969824f](https://github.com/dylanaubrey/styling/commit/5969824fe9eb9270a55c3cc0b26a289932b37102))

#### 0.0.32 (2020-01-03)

##### Bug Fixes

*  update output path build logic ([9caa23b9](https://github.com/dylanaubrey/styling/commit/9caa23b9127866826397c44c238f389c3b36fce8))

#### 0.0.31 (2020-01-03)

##### Bug Fixes

*  sorting bug with way output path was built ([e2cd7a03](https://github.com/dylanaubrey/styling/commit/e2cd7a03c37ef25092bf90a1a4830f54f2e21d18))

#### 0.0.30 (2020-01-03)

##### Refactors

*  change way output path is resolved ([7c4d0065](https://github.com/dylanaubrey/styling/commit/7c4d006570ad3ad46fdcfc8fac32b7a725e03b49))

#### 0.0.29 (2020-01-03)

##### New Features

*  parse sass to css prior to writing ([817d46e3](https://github.com/dylanaubrey/styling/commit/817d46e3d4ce0c4b2c0615edd1772670718389e3))

#### 0.0.28 (2020-01-03)

##### Bug Fixes

*  trying different approach to traversing sub tree ([8bfcdf8b](https://github.com/dylanaubrey/styling/commit/8bfcdf8b84989357073fdf1bcbc87de7ca51b0b3))

#### 0.0.27 (2020-01-03)

##### Refactors

*  rename function to make clearer ([6407eff4](https://github.com/dylanaubrey/styling/commit/6407eff4f6cf5c8657851276683cfac5f5a988c7))

#### 0.0.26 (2020-01-03)

##### Bug Fixes

*  change way exports args are collated ([c0cc59e5](https://github.com/dylanaubrey/styling/commit/c0cc59e5f880f651321e0eb15e1a5779cde4770e))

#### 0.0.25 (2020-01-03)

##### Bug Fixes

*  update what is being passed into call expression ([74545f52](https://github.com/dylanaubrey/styling/commit/74545f52269ca9f7205d519f792b9fd10fb2cc41))

#### 0.0.24 (2020-01-03)

##### New Features

*  change way call expression is replaced ([31348072](https://github.com/dylanaubrey/styling/commit/313480729d7e60944eab5772c24bb4a0dc009801))

#### 0.0.23 (2020-01-03)

##### Bug Fixes

*  filter css variable functions missing condition ([0bb29637](https://github.com/dylanaubrey/styling/commit/0bb29637005240aee1ca45fa392b1be3291ef25a))

#### 0.0.22 (2020-01-03)

##### Bug Fixes

*  update dedupe css function to account for more variants ([649835d3](https://github.com/dylanaubrey/styling/commit/649835d3ce336d7ed7e1a16366e9fb8d8ff90bbc))

#### 0.0.21 (2020-01-02)

##### Refactors

*  update modules to reduce code duplication ([a2310811](https://github.com/dylanaubrey/styling/commit/a2310811f396f3a74ae46a808abfdc8ce876c2d3))

#### 0.0.20 (2020-01-02)

##### Bug Fixes

*  update write css logic to stop silent failure ([f071473c](https://github.com/dylanaubrey/styling/commit/f071473ce98d04d7062d57f09c0aafaad3acde24))

#### 0.0.19 (2020-01-02)

##### Bug Fixes

*  revert removing css file ([d1b1081b](https://github.com/dylanaubrey/styling/commit/d1b1081ba41d001b3a107eab625c7a77a2942ed2))

#### 0.0.18 (2020-01-02)

##### Bug Fixes

*  remove css file before trying to write a new one ([542b79ff](https://github.com/dylanaubrey/styling/commit/542b79ff28ffa573e072fb9d0f1b9ec5d5ddcda6))

#### 0.0.17 (2020-01-02)

##### Bug Fixes

*  stop empty string overriding parent output path ([68bc7593](https://github.com/dylanaubrey/styling/commit/68bc7593cef3e771deef8c5e3a2f4a770fadb11b))

#### 0.0.16 (2020-01-02)

##### Bug Fixes

*  make file writing sync ([22d729d5](https://github.com/dylanaubrey/styling/commit/22d729d5b0f12cbaff3f24d03c81dfad3de7dcdf))

#### 0.0.15 (2020-01-02)

##### New Features

*  adding logging to writing css logic ([cebb70cd](https://github.com/dylanaubrey/styling/commit/cebb70cdf6ee76bd6eac9f536d46801ae13ce7cd))

#### 0.0.14 (2020-01-02)

##### Bug Fixes

*  wrong output path resolution ([fa7a8388](https://github.com/dylanaubrey/styling/commit/fa7a8388477ddc6ca5c0ea8f08de3eb0946b2e7d))

#### 0.0.13 (2020-01-02)

##### Bug Fixes

*  sort bug in loading configs ([3eeca8d4](https://github.com/dylanaubrey/styling/commit/3eeca8d49dbc8882f6f252f1337a54c7e17ad65c))

#### 0.0.12 (2020-01-02)

##### Bug Fixes

*  jest mocking warning ([eb3f19a6](https://github.com/dylanaubrey/styling/commit/eb3f19a6a78130e07efd811915ba80960a249d68))
*  changing how source directory is derived ([8a7faf3e](https://github.com/dylanaubrey/styling/commit/8a7faf3ee9fcc1238b604e6fea0598f182f8feee))

#### 0.0.11 (2020-01-02)

##### Bug Fixes

*  adding logging to loading of themes ([488cf4a5](https://github.com/dylanaubrey/styling/commit/488cf4a5938b14e6a1a4ca6a16ca37830d4e31b6))

#### 0.0.10 (2020-01-02)

##### Bug Fixes

*  adding error logging of styling file eval ([3b925752](https://github.com/dylanaubrey/styling/commit/3b92575262c5a95bfe4e206b9abc423897e8da63))

#### 0.0.9 (2020-01-02)

##### Bug Fixes

*  changing way of evaling styling file to resolve bugs ([b73e1e97](https://github.com/dylanaubrey/styling/commit/b73e1e9793d16632d0fead670e13d5a741c44d7f))

#### 0.0.8 (2020-01-01)

##### Bug Fixes

*  adding logging to eval styling file script ([14499dc5](https://github.com/dylanaubrey/styling/commit/14499dc51d9461401f697abe1ce3f74d316d9d31))

#### 0.0.7 (2019-12-31)

##### Bug Fixes

*  adding even more logging ([faa70799](https://github.com/dylanaubrey/styling/commit/faa70799e49e3d8cfe8226a31767fb78ceffe55f))

#### 0.0.6 (2019-12-31)

##### Bug Fixes

*  adding more logging ([7201650c](https://github.com/dylanaubrey/styling/commit/7201650c6b47f8561ffa02e04a1fe61c444604f9))

#### 0.0.5 (2019-12-31)

##### New Features

*  increasing logging in babel plugin ([df50ab3a](https://github.com/dylanaubrey/styling/commit/df50ab3ada4293a3a454dbe66a38226ceb7f0c15))

#### 0.0.4 (2019-12-31)

##### New Features

*  adding logging to babel plugin ([dffc7b35](https://github.com/dylanaubrey/styling/commit/dffc7b35590186ae6f1c3ec3d69e8c35e33b3aa7))

##### Bug Fixes

*  adding codecov script into ci ([4093634a](https://github.com/dylanaubrey/styling/commit/4093634a1e9d7d6acac8cdff85271400cc59acdf))

#### 0.0.3 (2019-12-31)

##### Bug Fixes

*  add support for css variables in styling function ([c561b5b7](https://github.com/dylanaubrey/styling/commit/c561b5b7edd6da050a9da2e166f8b97ce43d2ad5))

#### 0.0.2 (2019-12-31)

##### Chores

*  work in progress ([373dc94d](https://github.com/dylanaubrey/styling/commit/373dc94d871b4781adf1f7972038dea42426122d))
*  initial bootstrap files ([76fa4c22](https://github.com/dylanaubrey/styling/commit/76fa4c2268e6aa79c7b3120ae467816fbe6bd294))

##### Documentation Changes

*  update readmes with basic info ([556e6d52](https://github.com/dylanaubrey/styling/commit/556e6d52bf447bda97073b3f43592272693838d4))

##### New Features

*  finish core module and fix bugs ([f65db01a](https://github.com/dylanaubrey/styling/commit/f65db01ab68a58f1474d4b2454d2b44b1dbc9933))
*  adding selector prefix config ([e471a670](https://github.com/dylanaubrey/styling/commit/e471a67015c37c2f3530a25c624d7730f5eb84af))
*  complete styled code ([ceeaf445](https://github.com/dylanaubrey/styling/commit/ceeaf445ba960f92bc8143e8a8b290ce7de9f069))
*  adding pre-transform to get variable name ([96454a61](https://github.com/dylanaubrey/styling/commit/96454a61743e805a11cbda01da49225acd0c85f0))
*  enhance styling props format ([537e96ba](https://github.com/dylanaubrey/styling/commit/537e96ba5912815a19bc45d7fce3044359e510ef))
*  finishing babel plugin package ([e545acfb](https://github.com/dylanaubrey/styling/commit/e545acfbaf2535dab1cb3e8ebde04adc68ea2e46))
*  finish transformer module, including babel plugin ([232b2b19](https://github.com/dylanaubrey/styling/commit/232b2b19ea932940fe12c94cdd58d2889e567e16))

##### Bug Fixes

*  linting errors ([8b8e3e6a](https://github.com/dylanaubrey/styling/commit/8b8e3e6aa905c33e3d8a67955e758cdac07ee925))
*  update travis link in readme ([31f6e389](https://github.com/dylanaubrey/styling/commit/31f6e389b9ae9f4361caa9bfdaacdd0a6400a5a3))

##### Refactors

*  change package names and remove old packages ([3bc21d13](https://github.com/dylanaubrey/styling/commit/3bc21d131657737a29cae101b2afc7e09897bd59))
*  rename transformer to babel plugin ([309a387f](https://github.com/dylanaubrey/styling/commit/309a387f4640b11efe50d3b9428651a69889fe28))

